export const extractPlainText = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
};

export const generateExcerpt = (html: string, maxLength = 180) => {
  const text = extractPlainText(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};