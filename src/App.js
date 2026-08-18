import { useState } from "react";
import Login from "./components/Login";
import CreateTask from "./components/CreateTask";
import Logout from "./components/Logout";
import TaskList from "./components/TaskList";

function App() {
    const [token, setToken] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTaskCreated = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleLogout = () => {
        setToken("");
        setRefreshKey(0);
    };

    return (
        <div className="App" style={{ textAlign: "center", padding: "20px" }}>
            {!token ? (
                <Login onLoginSuccess={(newToken) => setToken(newToken)} />
            ) : (
                <div>
                    <Logout token={token} onLogout={handleLogout} />
                    <CreateTask token={token} onTaskCreated={handleTaskCreated} />
                    <hr style={{ margin: "30px 0" }} />
                    <TaskList token={token} key={refreshKey} />
                </div>
            )}
        </div>
    );
}

export default App;