import { useCallback, useEffect, useMemo, useState } from "react";
import { blogEditorExtensions } from "./editorExtensions";
import EditorToolbar from "./EditorToolbar";
import ImageUploadButton from "./ImageUploadButton";
import { Sparkles } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

type Props = {
  initialTitle?: string;
  initialSummary?: string;
  initialTags?: string;
  initialContent?: string;
  onChange?: (data: {
    title: string;
    summary: string;
    tags: string[];
    contentHtml: string;
    contentText: string;
  }) => void;
};

export default function BlogRichEditor({
  initialTitle = "",
  initialSummary = "",
  initialTags = "",
  initialContent = "<p>Start writing your blog here...</p>",
  onChange,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [summary, setSummary] = useState(initialSummary);
  const [tags, setTags] = useState(initialTags);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: blogEditorExtensions,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[520px] max-w-none outline-none prose prose-zinc prose-lg prose-headings:tracking-tight prose-pre:bg-zinc-950 prose-pre:text-zinc-50 prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-lg",
      },
    },
  });

  const pushChange = useCallback(() => {
    if (!editor || !onChange) return;

    onChange({
      title,
      summary,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      contentHtml: editor.getHTML(),
      contentText: editor.getText(),
    });
  }, [editor, onChange, summary, tags, title]);

  useEffect(() => {
    pushChange();
  }, [pushChange]);

  const insertImage = useCallback(() => {
    const url = window.prompt("Paste image URL");
    if (!url || !editor) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor || !linkUrl.trim()) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run();
    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const onFileSelected = useCallback(
    async (file: File) => {
      if (!editor) return;

      // Replace this later with backend upload API.
      const objectUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: objectUrl, alt: file.name }).run();
    },
    [editor]
  );

  const htmlPreview = useMemo(() => editor?.getHTML() || "", [editor, editor?.state]);

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-[#f7f5f2] p-3 text-zinc-900 md:p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-[0_24px_90px_rgba(0,0,0,0.08)]">
        <div className="border-b border-zinc-200 px-4 py-4 md:px-6 xl:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                <Sparkles className="h-4 w-4" />
                Rich Blog Editor
              </div>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Write with code, images, highlights and formatting
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm">
                Save Draft
              </button>
              <button className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white">
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-120px)] xl:grid-cols-[1.4fr_0.6fr]">
          <div className="border-r border-zinc-200">
            <div className="border-b border-zinc-200 px-4 py-4 md:px-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-zinc-300"
                placeholder="Title"
              />
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                className="mt-3 w-full resize-none bg-transparent text-sm text-zinc-500 outline-none placeholder:text-zinc-300"
                placeholder="Summary / excerpt"
              />
            </div>

            <EditorToolbar
              editor={editor}
              showLinkInput={showLinkInput}
              linkUrl={linkUrl}
              setLinkUrl={setLinkUrl}
              onToggleLinkInput={() => setShowLinkInput((v) => !v)}
              onAddLink={addLink}
              onInsertImage={insertImage}
              onUploadImage={() => document.getElementById("editor-image-upload")?.click()}
              onInsertTable={() =>
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              }
            />

            <div className="px-4 py-5 md:px-6">
              <BubbleMenu
                editor={editor}
                // tippyOptions={{ duration: 100 }}
                tippyOptions={{ duration: 100, theme: "light-border" }}
                shouldShow={({ editor }) => editor.isEditable && !editor.state.selection.empty}
              >
                <div className="flex items-center gap-1 rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg">
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm italic hover:bg-zinc-100"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                  >
                    Highlight
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                    onClick={() => setShowLinkInput(true)}
                  >
                    Link
                  </button>
                </div>
              </BubbleMenu>

              <div className="mx-auto max-w-4xl rounded-[28px] border border-zinc-200 bg-white p-5 md:p-8">
                <EditorContent editor={editor} />
              </div>

              <div className="mt-4">
                <ImageUploadButton
                  onFileSelected={onFileSelected}
                  label="Upload image to editor"
                />
              </div>
            </div>
          </div>

          <aside className="bg-[#fcfbf9] p-4 md:p-6">
            <div className="sticky top-4 space-y-5">
              <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold tracking-tight">Post settings</h2>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium">
                    Draft
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-zinc-600">
                  <div className="rounded-2xl border border-zinc-200 px-3 py-2">
                    Visibility: Public
                  </div>
                  <div className="rounded-2xl border border-zinc-200 px-3 py-2">
                    Author: You
                  </div>
                  <div className="rounded-2xl border border-zinc-200 px-3 py-2">
                    Reading time: 7 min
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold tracking-tight">Tags</h2>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none"
                  placeholder="system-design, hld, lld"
                />
                <p className="mt-2 text-xs text-zinc-500">Use comma-separated tags.</p>
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold tracking-tight">HTML preview</h2>
                <div className="mt-3 max-h-64 overflow-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600">
                  <pre className="whitespace-pre-wrap">{htmlPreview}</pre>
                </div>
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold tracking-tight">Supported features</h2>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  <li>• Headings and rich text formatting</li>
                  <li>• Code blocks with syntax highlighting</li>
                  <li>• Images via URL and file upload</li>
                  <li>• Highlighting selected text</li>
                  <li>• Links, quotes, lists, tables</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}