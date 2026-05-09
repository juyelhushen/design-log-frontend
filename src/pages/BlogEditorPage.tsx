import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlogApi,
  getBlogBySlugApi,
  updateBlogApi,
  type BlogCreateRequest,
} from "../api/blog";

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!isEdit || !id) return;
      try {
        const res = await getBlogBySlugApi(id);
        setTitle(res.data.title);
        setSummary(res.data.summary || "");
        setContent(res.data.content);
        setTags((res.data.tags || []).join(", "));
      } catch {
        setError("Failed to load blog for editing");
      }
    };

    load();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload: BlogCreateRequest = {
      title,
      summary,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit && id) {
        await updateBlogApi(Number(id), payload);
        navigate(`/blogs/${id}`);
      } else {
        const res = await createBlogApi(payload);
        navigate(`/blogs/${res.data.slug}`);
      }
    } catch {
      setError("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold">
        {isEdit ? "Edit Blog" : "Create Blog"}
      </h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border px-4 py-2"
        />

        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          className="w-full rounded-lg border px-4 py-2"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content..."
          rows={12}
          className="w-full rounded-lg border px-4 py-2"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags separated by commas"
          className="w-full rounded-lg border px-4 py-2"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </form>
    </div>
  );
}


export default BlogEditorPage;