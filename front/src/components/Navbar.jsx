import keycloak from "../keycloak";

export default function Navbar({ onNavigate }) {
    return (
        <nav className="bg-white shadow flex justify-between p-4 items-center">
            <h1 className="text-xl font-semibold text-blue-600">🏋️‍♀️ Fitness Tracker</h1>
            <div className="flex gap-4">
                <button onClick={() => onNavigate("dashboard")} className="hover:text-blue-600">
                    Dashboard
                </button>
                <button onClick={() => onNavigate("add")} className="hover:text-blue-600">
                    Add Activity
                </button>
                <button
                    onClick={() => keycloak.logout({ redirectUri: "http://localhost:5173" })}
                    className="text-red-500 hover:underline"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
