"use client";

import CodeBlock from "./CodeBlock";
import Link from "next/link";
import { formatId } from "@/utils/mdx-utils";
import { MDXImage } from "./MDXImage";

const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      id={formatId(props.children as string)}
      {...props}
      className="mb-4 mt-8 text-3xl font-bold"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={formatId(props.children as string)}
      {...props}
      className="mb-4 mt-8 text-2xl font-bold"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={formatId(props.children as string)}
      {...props}
      className="mb-4 mt-6 text-xl font-bold"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-4 leading-relaxed" />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          {...props}
          className="text-blue-600 hover:underline dark:text-blue-400"
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline dark:text-blue-400"
        {...props}
      />
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-4 ml-6 list-disc" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="my-4 ml-6 list-decimal" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="mt-2" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-gray-300 pl-4 italic dark:border-gray-700"
    />
  ),
  img: MDXImage,
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) =>
    children as React.ReactElement,
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      return (
        <CodeBlock language={match[1]} code={children as string} {...props} />
      );
    }

    return (
      <code
        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  Callout: ({
    children,
    type = "info",
  }: {
    children: React.ReactNode;
    type?: "info" | "warning" | "error";
  }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
      warning:
        "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300",
      error:
        "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
    };

    return (
      <div className={`my-6 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
        {children}
      </div>
    );
  },
};

export default MDXComponents;
