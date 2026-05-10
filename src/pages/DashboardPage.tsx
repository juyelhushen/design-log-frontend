import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-zinc-500">Manage posts, subscribers, and performance.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/blogs/new")}
            className="rounded-2xl bg-zinc-900 px-4 py-2 text-white"
          >
            Create Blog
          </button>
          <button
            onClick={() => navigate("/blogs")}
            className="rounded-2xl border border-zinc-200 px-4 py-2"
          >
            View Blogs
          </button>
        </div>
      </div>
    </div>
  );
}