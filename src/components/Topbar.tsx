import { Bell, Menu, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  onOpenMobileMenu: () => void;
};

export default function Topbar({ onOpenMobileMenu }: Props) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-zinc-200 px-4 py-4 md:px-6 xl:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="rounded-2xl border border-zinc-200 p-2 xl:hidden"
            onClick={onOpenMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <div className="text-sm text-zinc-500">Good morning, Juyel 👋</div>
            <div className="text-lg font-semibold tracking-tight md:text-xl">
              Here’s what’s happening with your newsletter.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="rounded-2xl border border-zinc-200 p-2">
            <Search className="h-4 w-4" />
          </button>
          <button className="rounded-2xl border border-zinc-200 p-2">
            <Bell className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate("/blogs/new")}
            className="hidden rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white md:inline-flex md:items-center md:gap-2"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </div>
    </header>
  );
}