import React from "react";

interface HighlightTextProps {
  text: string;
  searchTerm: string;
  highlightClassName?: string;
}

/**
 * Komponen untuk men-highlight bagian teks yang cocok dengan kata kunci pencarian
 */
const HighlightText: React.FC<HighlightTextProps> = ({ text, searchTerm, highlightClassName = "font-bold text-blue-800" }) => {
  // Jika search term kosong, kembalikan teks asli
  if (!searchTerm.trim()) {
    return <>{text}</>;
  }

  // Escape special characters dalam search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    // Cari semua posisi yang cocok dengan searchTerm (case insensitive)
    const regex = new RegExp(escapedSearchTerm, "gi");
    const matches: { start: number; end: number }[] = [];
    let match;

    // Clone string untuk regex exec
    const textToSearch = String(text);

    // Find all matches
    while ((match = regex.exec(textToSearch)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    // Jika tidak ada yang cocok, kembalikan teks asli
    if (matches.length === 0) {
      return <>{text}</>;
    }

    // Build hasil dengan bagian yang di-highlight
    const result: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      // Tambahkan teks sebelum match
      if (match.start > lastIndex) {
        result.push(<span key={`text-${i}`}>{text.substring(lastIndex, match.start)}</span>);
      }

      // Tambahkan teks yang di-highlight
      result.push(
        <span key={`highlight-${i}`} className={highlightClassName}>
          {text.substring(match.start, match.end)}
        </span>
      );

      lastIndex = match.end;
    });

    // Tambahkan teks setelah match terakhir
    if (lastIndex < text.length) {
      result.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{result}</>;
  } catch (error) {
    // Fallback jika terjadi error saat regex
    console.error("Error highlighting text:", error);
    return <>{text}</>;
  }
};

export default HighlightText;
