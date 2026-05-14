import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { createLowlight, all } from "lowlight";
import { Table } from "@tiptap/extension-table";

const lowlight = createLowlight(all);

export const editorExtensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  Highlight,
  Image.configure({
    inline: false,
    allowBase64: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Placeholder.configure({
    placeholder: "Start writing your article...",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
];
