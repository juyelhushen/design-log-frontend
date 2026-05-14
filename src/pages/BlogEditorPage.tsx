import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditor from "../components/editor/BlogEditor";
import { createBlogApi, publishBlogApi } from "../api/blog";
import { generateExcerpt } from "../utils/editor";

export default function BlogEditorPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  const handleSaveDraft = async (html: string) => {
    setSaving(true);
    setError("");

    try {
      const payload = {
        title,
        summary: summary || generateExcerpt(html),
        content: html,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await createBlogApi(payload);
      navigate(`/blogs/${res.data.slug}`);
    } catch {
      setError("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (html: string) => {
    setPublishing(true);
    setError("");

    try {
      const payload = {
        title,
        summary: summary || generateExcerpt(html),
        content: html,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await createBlogApi(payload);
      await publishBlogApi(res.data.id);
      navigate(`/blogs/${res.data.slug}`);
    } catch {
      setError("Failed to publish blog");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {slug ? "Edit Blog" : "Create Blog"}
              </h1>
              <p className="mt-1 text-zinc-500">
                Write long-form posts with code blocks, highlights, and images.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog title"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
              />
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags, separated by commas"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary / excerpt"
              className="min-h-[110px] w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <BlogEditor
        initialContent={contentHtml}
        onContentChange={setContentHtml}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        saving={saving}
        publishing={publishing}
      />
    </div>
  );
}
