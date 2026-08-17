import { useState } from "react";

function CreateTask({ token }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setMessage("لازم تكتب عنوان المهمة");
            return;
        }
        if (!categoryId) {
            setMessage("لازم تكتب رقم الـ category");
            return;
        }

        if (!token) {
            setMessage("التوكن مفقود! رجاءً سجل الدخول أولاً");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("https://baked-issuing-vocalist.ngrok-free.dev/api/tasks?ngrok-skip-browser-warning=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    description :"bkjvndk",
                    category_id: Number(categoryId),
                }),
            });

            // قراءة الرد كنص أولاً لمنع خطأ JSON.parse
            const textData = await response.text();
            let data;
            try {
                data = JSON.parse(textData);
            } catch (err) {
                console.error("الرد المرجّع ليس JSON:", textData);
                throw new Error("السيرفر أرجع رد غير متوقع (شيك الـ Console)");
            }

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            console.log("Task created:", data);
            setMessage("تم إنشاء المهمة بنجاح ✅");
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