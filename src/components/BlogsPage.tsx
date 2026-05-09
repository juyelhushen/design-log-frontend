import { useEffect, useState } from "react";
import { getBlogsApi, type BlogListItemResponse } from "../api/blog";
import { Link } from "react-router-dom";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogListItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await getBlogsApi({
          page: 0,
          size: 20,
          sort: "createdAt,desc",
        });
        setBlogs(res.data.content ?? []);
      } catch {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) return <p className="text-gray-600">Loading blogs...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="mt-1 text-gray-600">
            Your posts, drafts, and published articles.
          </p>
        </div>
        <Link
          to="/blogs/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          New Blog
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {blog.summary || blog.slug}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                {blog.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2 py-1 text-xs text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Link
                to={`/blogs/${blog.slug}`}
                className="text-sm font-medium underline"
              >
                Read
              </Link>
              <span className="text-xs text-gray-500">
                {blog.createdAt || ""}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
