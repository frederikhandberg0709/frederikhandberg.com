import { ContentRenderer } from "./ContentRenderer";

interface ReplyContentRendererProps {
  content: string;
  className?: string;
}

export function ReplyContentRenderer({
  content,
  className = "",
}: ReplyContentRendererProps) {
  return (
    <ContentRenderer content={content} className={`text-sm ${className}`} />
  );
}
