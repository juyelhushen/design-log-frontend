import { Upload } from "lucide-react";
import { useRef } from "react";

type Props = {
  onFileSelected: (file: File) => void;
  label?: string;
};

export default function ImageUploadButton({ onFileSelected, label = "Upload Image" }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePickFile = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePickFile}
        className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50"
      >
        <Upload className="h-4 w-4" />
        {label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
    </>
  );
}