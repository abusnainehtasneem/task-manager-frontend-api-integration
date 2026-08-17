import { useState } from "react";
import Login from "./components/Login";
import CreateTask from "./components/CreateTask";
import Logout from "./components/Logout";
import "./App.css";

function App() {
    const [token, setToken] = useState(null);

    return (
        <div className="App">
            {!token ? (
                <Login onLoginSuccess={(receivedToken) => setToken(receivedToken)} />
            ) : (
                <>
                    <CreateTask token={token} />
                    <Logout token={token} onLogoutSuccess={() => setToken(null)} />
                </>
            )}
        </div>
    );
}

export default App;