import { useEffect, useState } from "react";
import keycloak from "./keycloak";
import api from "./api";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";

export default function App() {
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [page, setPage] = useState("dashboard");

    // регистрация или получение пользователя из user-service
    useEffect(() => {
        const registerUser = async () => {
            const profile = await keycloak.loadUserInfo();
            const request = {
                email: profile.email,
                firstName: profile.given_name || "",
                lastName: profile.family_name || "",
                keycloakId: keycloak.subject,
                password: "", // не используется
            };

            const res = await api.post("/api/users/register", request);
            setUser(res.data);
        };
        registerUser();
    }, []);

    const loadActivities = async () => {
        const res = await api.get("/api/activities", {
            headers: { "X-USER-ID": user.id },
        });
        setActivities(res.data);
    };

    const handleAddActivity = async (activity) => {
        await api.post("/api/activities", activity);
        loadActivities();
        setPage("dashboard");
    };

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar onNavigate={setPage} />
            <div className="p-6">
                {page === "dashboard" && (
                    <Dashboard user={user} activities={activities} loadActivities={loadActivities} />
                )}
                {page === "add" && <AddActivity user={user} onAdd={handleAddActivity} />}
            </div>
        </div>
    );
}
