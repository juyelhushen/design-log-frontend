import { useRef } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";

type Props = {
  onFileSelected: (file: File) => void;
};

export default function ImagePicker({ onFileSelected }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        <Upload className="h-4 w-4" />
        Upload image
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.currentTarget.value = "";
        }}
      />
    </>
  );
}