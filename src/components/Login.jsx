import { useState } from "react";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setMessage("لازم تكتب الإيميل والباسوورد");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("https://backpack-recant-pebbly.ngrok-free.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({ email, password }),
            });

            const textData = await response.text();
            let data;
            try {
                data = JSON.parse(textData);
            } catch (err) {
                throw new Error("الرد القادم ليس JSON، تأكدي من الضغط على Visit Site في رابط ngrok");
            }

            console.log("Login response:", data);

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            const token = data.token || data.access_token;

            if (token) {
                onLoginSuccess(token);
                setMessage("تم تسجيل الدخول بنجاح ✅");
            } else {
                setMessage("ما لقيت التوكن بالرد، شيك على الـ Console");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage(error.message || "فشل تسجيل الدخول، تأكد من البيانات");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "جاري الدخول..." : "Login"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;