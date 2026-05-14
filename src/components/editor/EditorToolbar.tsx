import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Quote,
  Code2,
  Highlighter,
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Save,
  Send,
} from "lucide-react";
import type { Editor } from "@tiptap/react";
import { useMemo, useState } from "react";

type Props = {
  onSaveDraft: () => void;
  onPublish: () => void;
  onPickImage: () => void;
  saving?: boolean;
  publishing?: boolean;
};

function ToolbarButton({
  onClick,
  active = false,
  children,
  title,
  disabled = false,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-sm transition ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {children}
    </button>
  );
}

export default function EditorToolbar({
  editor,
  onSaveDraft,
  onPublish,
  onPickImage,
  saving = false,
  publishing = false,
}: Props) {
  const [showMore, setShowMore] = useState(false);

  const canRun = !!editor;

  const currentHeading = useMemo(() => {
    if (!editor) return "P";
    if (editor.isActive("heading", { level: 1 })) return "H1";
    if (editor.isActive("heading", { level: 2 })) return "H2";
    return "P";
  }, [editor]);

  return (
    <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarButton
            title="Undo"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!canRun || !editor!.can().chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!canRun || !editor!.can().chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>

          <div className="mx-1 h-8 w-px bg-zinc-200" />

          <div className="flex items-center gap-1 rounded-2xl border border-zinc-200 bg-white p-1">
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              onClick={() => editor?.chain().focus().setParagraph().run()}
            >
              {currentHeading}
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </button>
          </div>

          <div className="mx-1 hidden h-8 w-px bg-zinc-200 md:block" />

          <div className="flex flex-wrap items-center gap-1">
            <ToolbarButton
              title="Bold"
              active={editor?.isActive("bold")}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Italic"
              active={editor?.isActive("italic")}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Strike"
              active={editor?.isActive("strike")}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Highlight"
              active={editor?.isActive("highlight")}
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
            >
              <Highlighter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Quote"
              active={editor?.isActive("blockquote")}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Code block"
              active={editor?.isActive("codeBlock")}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            >
              <Code2 className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="mx-1 hidden h-8 w-px bg-zinc-200 md:block" />

          <div className="flex flex-wrap items-center gap-1">
            <ToolbarButton
              title="Bullet list"
              active={editor?.isActive("bulletList")}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Ordered list"
              active={editor?.isActive("orderedList")}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Horizontal rule"
              onClick={() => editor?.chain().focus().setHorizontalRule().run()}
            >
              <Minus className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Link"
              onClick={() => {
                const url = window.prompt("Enter URL");
                if (!url) return;
                editor
                  ?.chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }}
            >
              <Link2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton title="Insert image" onClick={onPickImage}>
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="mx-1 hidden h-8 w-px bg-zinc-200 lg:block" />

          <div className="hidden items-center gap-1 lg:flex">
            <ToolbarButton
              title="Align left"
              active={editor?.isActive({ textAlign: "left" })}
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Align center"
              active={editor?.isActive({ textAlign: "center" })}
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Align right"
              active={editor?.isActive({ textAlign: "right" })}
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 lg:hidden"
          >
            More
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .setContent(editor?.getText() ?? "")
                .run()
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            title="Preview/Reset helper"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save draft"}
          </button>

          <button
            type="button"
            onClick={onPublish}
            disabled={publishing}
            className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {showMore && (
        <div className="border-t border-zinc-200 px-4 py-3 md:px-6 lg:hidden">
          <div className="flex flex-wrap gap-2">
            <ToolbarButton
              title="Align left"
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Align center"
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              title="Align right"
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>
      )}
    </div>
  );
}
