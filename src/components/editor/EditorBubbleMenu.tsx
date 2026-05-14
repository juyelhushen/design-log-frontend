import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, Italic, Highlighter, Link2 } from "lucide-react";

type Props = {
  editor: Editor;
};

export default function EditorBubbleMenu({ editor }: Props) {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150 }}
      shouldShow={({ editor }) => editor.state.selection.content().size > 0}
    >
      <div className="flex items-center gap-1 rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-xl px-3 py-2 text-sm ${editor.isActive("bold") ? "bg-zinc-900 text-white" : "text-zinc-700"}`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-xl px-3 py-2 text-sm ${editor.isActive("italic") ? "bg-zinc-900 text-white" : "text-zinc-700"}`}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`rounded-xl px-3 py-2 text-sm ${editor.isActive("highlight") ? "bg-zinc-900 text-white" : "text-zinc-700"}`}
        >
          <Highlighter className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (!url) return;
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          className="rounded-xl px-3 py-2 text-sm text-zinc-700"
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>
    </BubbleMenu>
  );
}