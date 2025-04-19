"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      {filename && (
        <div className="rounded-t-lg border-b border-gray-700 bg-gray-800 px-4 py-2 font-mono text-sm text-gray-300">
          {filename}
        </div>
      )}

      <div className="relative text-sm">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-gray-800/60 p-2 text-gray-300 opacity-0 transition-colors hover:bg-gray-700 focus:opacity-100 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </button>

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          className={`${filename ? "rounded-t-none" : ""} overflow-hidden rounded-lg`}
          customStyle={{
            margin: 0,
            borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
