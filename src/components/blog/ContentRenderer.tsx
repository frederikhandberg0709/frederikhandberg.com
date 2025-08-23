import Link from "next/link";
import LinkPreview from "../LinkPreview";
import Image from "next/image";
import styleHashtags from "@/utils/styleHashtags";
import { useImageOverlay } from "@/utils/useImageOverlay";
import React, { useState } from "react";
import { SequentialContentProcessor } from "@/utils/content/sequentialProcessor";
import { QuotedPost } from "./QuotedPost";
import { ContentBlock } from "@/types/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface ContentRendererProps {
  content: string;
  className?: string;
}

export function ContentRenderer({
  content,
  className = "",
}: ContentRendererProps) {
  const { theme } = useTheme();
  const codeStyle = theme === "dark" ? oneDark : oneLight;
  const { setOverlayImage } = useImageOverlay();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const processedContent = SequentialContentProcessor.process(content);
  const { blocks } = processedContent;

  const handleImageError = (url: string) => {
    setImageErrors((prev) => new Set(prev).add(url));
  };

  const isMultiLineElement = (line: string, index: number, lines: string[]) => {
    if (!line) return false;

    if (line.startsWith("```")) return true;

    let codeBlockCount = 0;
    for (let i = 0; i <= index; i++) {
      if (lines[i]?.startsWith("```")) codeBlockCount++;
    }
    if (codeBlockCount % 2 === 1) return true;

    if (/^\s*[-*+]\s/.test(line)) return true;

    if (/^\s+/.test(line) && !/^\s*[-*+]\s/.test(line)) {
      for (let j = index - 1; j >= 0; j--) {
        const prevLine = lines[j];
        if (!prevLine) continue;

        if (/^\s*[-*+]\s/.test(prevLine)) {
          return true;
        }

        if (prevLine.trim() && !prevLine.match(/^\s/)) {
          break;
        }
      }
    }

    return false;
  };

  const renderBlock = (
    block: ContentBlock,
    index: number,
    totalBlocks: number,
  ) => {
    const isLastBlock = index === totalBlocks - 1;

    switch (block.type) {
      case "text":
        const lines = block.content.split("\n");
        const processedLines: { content: string; isMarkdown: boolean }[] = [];
        let currentGroup = "";
        let inMarkdownBlock = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const isMultiLine = isMultiLineElement(line, i, lines);

          if (isMultiLine || inMarkdownBlock) {
            currentGroup += (currentGroup ? "\n" : "") + line;
            inMarkdownBlock = true;

            if (
              line.startsWith("```") &&
              currentGroup.split("```").length % 2 === 0
            ) {
              processedLines.push({ content: currentGroup, isMarkdown: true });
              currentGroup = "";
              inMarkdownBlock = false;
            } else if (
              (i + 1 >= lines.length ||
                !isMultiLineElement(lines[i + 1], i + 1, lines)) &&
              !line.startsWith("```")
            ) {
              processedLines.push({ content: currentGroup, isMarkdown: true });
              currentGroup = "";
              inMarkdownBlock = false;
            }
          } else {
            if (currentGroup) {
              processedLines.push({ content: currentGroup, isMarkdown: true });
              currentGroup = "";
            }
            processedLines.push({ content: line, isMarkdown: false });
          }
        }

        if (currentGroup) {
          processedLines.push({ content: currentGroup, isMarkdown: true });
        }

        return (
          <div key={block.index} className="leading-normal">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {processedLines.map((item, index) => (
                <div key={index}>
                  {item.isMarkdown ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <>{children}</>,
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const language = match ? match[1] : "";
                          const isCodeBlock = className && language;

                          if (isCodeBlock) {
                            return (
                              <SyntaxHighlighter
                                style={codeStyle}
                                language={language}
                                PreTag="div"
                                className="my-4 rounded-md"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            );
                          }

                          return (
                            <code
                              className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        ul: ({ children }) => (
                          <ul className="my-2 ml-5 list-disc pl-0">
                            {children}
                          </ul>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {styleHashtags(item.content || "\u00A0")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "image":
        if (imageErrors.has(block.content)) return null;

        return (
          <div
            key={block.index}
            className={`relative ${isLastBlock ? "mt-3" : "my-3"}`}
          >
            <Image
              src={block.content}
              alt="Media content"
              onClick={() => setOverlayImage(block.content)}
              width={1000}
              height={1000}
              className="w-full scale-100 cursor-pointer rounded-xl transition hover:opacity-90 active:scale-[0.98]"
              onError={() => handleImageError(block.content)}
            />
          </div>
        );

      case "video":
        return (
          <video
            key={block.index}
            src={block.content}
            className={`w-full rounded-[10px] ${isLastBlock ? "mt-3" : "my-3"}`}
            controls
            autoPlay
            muted
          />
        );

      case "link":
        return (
          <div key={block.index} className={isLastBlock ? "mt-3" : "my-3"}>
            <LinkPreview
              url={block.content}
              fallback={
                <Link
                  href={block.content}
                  className="break-all text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.content}
                </Link>
              }
            />
          </div>
        );

      case "nostr_note":
        return (
          <div key={block.index} className={isLastBlock ? "mt-3" : "my-3"}>
            <QuotedPost noteId={block.content} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {blocks.map((block, index) => renderBlock(block, index, blocks.length))}
    </div>
  );
}
