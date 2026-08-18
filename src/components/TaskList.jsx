import { useState, useEffect } from "react";

function TaskList({ token }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = "https://backpack-recant-pebbly.ngrok-free.dev/api/tasks";

    const fetchTasks = async () => {
        if (!token) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}?ngrok-skip-browser-warning=true`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const textData = await response.text();
            let data;
            try {
                data = JSON.parse(textData);
            } catch (err) {
                throw new Error("الرد القادم ليس JSON");
            }

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            console.log("Tasks API Response:", data);

            const taskArray = data.tasks || (Array.isArray(data) ? data : data.data || []);

            setTasks(taskArray);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    return (
        <div>
            <h2>قائمة المهام (My Tasks)</h2>
            <button onClick={fetchTasks} style={{ marginBottom: "15px" }}>
                🔄 تحديث القائمة
            </button>

            {loading && <p>جاري تحميل المهام...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && tasks.length === 0 && <p>.لا توجد مهام معروضة حالياً</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map((task) => (
                    <li
                        key={task.id || Math.random()}
                        style={{
                            border: "1px solid #ccc",
                            margin: "8px auto",
                            padding: "10px",
                            maxWidth: "400px",
                            borderRadius: "5px",
                        }}
                    >
                        <strong>{task.name}</strong>
                        {task.description && <p>{task.description}</p>}
                        {task.category_id && <div>Category ID: {task.category_id}</div>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;