import { PortfolioMeta } from "../src/types/portfolio";
import { cache } from "react";
import portfolioData from "@/generated/portfolio-data.json";

export const getAllPostSlugs = cache((): string[] => {
  return portfolioData.map((item) => item.slug);
});

export function getPostMeta(slug: string): PortfolioMeta {
  const post = portfolioData.find((item) => item.slug === slug);
  if (!post) {
    throw new Error(`Post not found:${slug}`);
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: post.author,
    coverImage: post.coverImage,
    tags: post.tags || [],
    readingTime: post.readingTime,
  };
}

export function getAllPostsMeta(): PortfolioMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}

export const getPostData = cache(async (slug: string) => {
  const post = portfolioData.find((item) => item.slug === slug);
  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    author: post.author,
    coverImage: post.coverImage,
    tags: post.tags || [],
    readingTime: post.readingTime,
    content: post.content,
  };
});
