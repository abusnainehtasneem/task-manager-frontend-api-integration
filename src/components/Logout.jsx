import { useState } from "react";

function Logout({ token, onLogout }) {
    const [loading, setLoading] = useState(false);

    const API_URL = "https://backpack-recant-pebbly.ngrok-free.dev/api/logout";

    const handleLogout = async () => {
        setLoading(true);
        try {
            if (token) {
                await fetch(`${API_URL}?ngrok-skip-browser-warning=true`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        "Authorization": `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
            onLogout();
        }
    };

    return (
        <button onClick={handleLogout} disabled={loading}>
            {loading ? "جاري الخروج..." : "Logout"}
        </button>
    );
}

export default Logout;