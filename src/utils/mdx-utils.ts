import { TOCItem } from "../types/portfolio";

export function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = [];

  const headingRegex = /^(#{1,3})\s+(.+)$/gm;

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({
      level,
      text,
      id,
    });
  }

  return headings;
}

export function formatId(text: string): string {
  return (
    text
      ?.toString()
      ?.toLowerCase()
      ?.replace(/\s+/g, "-")
      ?.replace(/[^\w-]+/g, "")
      ?.replace(/--+/g, "-")
      ?.replace(/^-+/, "")
      ?.replace(/-+$/, "") || ""
  );
}
