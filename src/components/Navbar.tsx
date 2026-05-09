import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-bold tracking-tight">
          Newsletter
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "font-medium" : "text-gray-600"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "font-medium" : "text-gray-600"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/blogs/new"
            className={({ isActive }) =>
              isActive ? "font-medium" : "text-gray-600"
            }
          >
            New Blog
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user?.name || user?.email || "Guest"}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
