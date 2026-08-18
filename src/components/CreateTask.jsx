import { useState } from "react";

function CreateTask({ token, onTaskCreated }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const API_URL = "https://backpack-recant-pebbly.ngrok-free.dev/api/tasks";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !categoryId) {
            setMessage("يرجى تعبئة جميع الحقول");
            return;
        }

        if (!token) {
            setMessage("التوكن مفقود! يرجى تسجيل الدخول مجدداً");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${API_URL}?ngrok-skip-browser-warning=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    description: "وصف افتراضي للمهمة",
                    category_id: Number(categoryId),
                }),
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

            setMessage("تم إنشاء المهمة بنجاح ✅");

            if (typeof onTaskCreated === "function") {
                onTaskCreated();
            }

            setName("");
            setCategoryId("");

        } catch (error) {
            console.error("Error creating task:", error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="اكتب عنوان المهمة"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Category ID"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "جاري الإنشاء..." : "Create Task"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateTask;