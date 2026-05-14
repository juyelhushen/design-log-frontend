import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { editorExtensions } from "./editorExtensions";
import EditorToolbar from "./EditorToolbar";
import EditorBubbleMenu from "./EditorBubbleMenu";
import { fileToBase64 } from "../../utils/editor";
import ImagePicker from "./ImagePicker.";

type Props = {
  initialContent?: string;
  onContentChange?: (html: string) => void;
  onSaveDraft: (html: string) => void;
  onPublish: (html: string) => void;
  saving?: boolean;
  publishing?: boolean;
};

export default function BlogEditor({
  initialContent = "",
  onContentChange,
  onSaveDraft,
  onPublish,
  saving = false,
  publishing = false,
}: Props) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc max-w-none min-h-[520px] rounded-b-[28px] bg-white p-5 focus:outline-none md:p-8",
      },
    },
    onUpdate({ editor }) {
      onContentChange?.(editor.getHTML());
    },
  });

useEffect(() => {
    if (!editor) return;
    if (initialContent) editor.commands.setContent(initialContent);
  }, [editor, initialContent]);

  const handlePickImage = async (file: File) => {
    if (!editor) return;
    const src = await fileToBase64(file);
    editor.chain().focus().setImage({ src, alt: file.name }).run();
  };

  const html = editor?.getHTML() ?? initialContent;

  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
      {editor && <EditorBubbleMenu editor={editor} />}

      <EditorToolbar
        editor={editor}
        onPickImage={() => document.getElementById("editor-image-picker")?.click()}
        onSaveDraft={() => onSaveDraft(html)}
        onPublish={() => onPublish(html)}
        saving={saving}
        publishing={publishing}
      />

      <div className="px-4 pt-4 md:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          <span className="font-medium text-zinc-900">Tip:</span>
          Use H1/H2 for sections, Highlight for emphasis, and Code Block for snippets.
        </div>

        <div className="mb-4 flex items-center gap-3">
          <ImagePicker onFileSelected={handlePickImage} />
          <span className="text-xs text-zinc-500">Supports screenshots, diagrams, and inline images.</span>
        </div>
      </div>

      <EditorContent editor={editor} />

      <input id="editor-image-picker" type="file" accept="image/*" className="hidden" />
    </div>
  );
}