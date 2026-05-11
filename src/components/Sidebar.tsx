import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  BarChart3,
  PenSquare,
  Settings,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/blogs", label: "Blogs", icon: FileText },
  { to: "/subscribers", label: "Subscribers", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/drafts", label: "Drafts", icon: PenSquare },
  { to: "/settings", label: "Settings", icon: Settings },
];

type Props = {
  mobileMenuOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ mobileMenuOpen, onCloseMobile }: Props) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-200 bg-white px-5 py-6 transition-transform duration-300 xl:static xl:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <Sparkles className="h-5 w-5" />
            Letterly
          </div>
          <button onClick={onCloseMobile} className="rounded-lg p-2 xl:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-zinc-100 font-medium text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button className="mt-6 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      {mobileMenuOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
          onClick={onCloseMobile}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}