import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome {user?.name || user?.email || "user"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 rounded-lg bg-black px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}