import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  deleteBlogApi,
  getBlogBySlugApi,
  publishBlogApi,
  type BlogResponse,
} from "../api/blog";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBlog = async () => {
    if (!slug) return;
    try {
      const res = await getBlogBySlugApi(slug);
      setBlog(res.data);
    } catch {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const handlePublish = async () => {
    if (!blog) return;
    await publishBlogApi(blog.id);
    await loadBlog();
  };

  const handleDelete = async () => {
    if (!blog) return;
    await deleteBlogApi(blog.id);
    window.location.href = "/blogs";
  };

  if (loading) return <p className="text-gray-600">Loading blog...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!blog) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="mt-3 text-gray-600">{blog.summary}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {blog.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {blog.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-2 py-1 text-xs text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <article className="prose max-w-none whitespace-pre-wrap">
        {blog.content}
      </article>

      <div className="flex gap-3 pt-2">
        <button
          onClick={handlePublish}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Publish
        </button>
        <Link
          to={`/blogs/edit/${blog.id}`}
          className="rounded-lg border px-4 py-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-lg border px-4 py-2 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
