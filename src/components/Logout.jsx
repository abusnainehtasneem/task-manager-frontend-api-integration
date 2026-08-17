import { useState } from "react";

function Logout({ token, onLogoutSuccess }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogout = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "https://baked-issuing-vocalist.ngrok-free.dev/api/logout?ngrok-skip-browser-warning=true",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            const data = await response.json();
            console.log("Logout response:", data);

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            onLogoutSuccess();
        } catch (error) {
            console.error("Error logging out:", error);
            setMessage(error.message || "صار خطأ بتسجيل الخروج");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? "جاري تسجيل الخروج..." : "Logout"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Logout;