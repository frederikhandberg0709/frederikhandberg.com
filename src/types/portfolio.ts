export interface PortfolioMeta {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  tags: string[];
  readingTime?: string;
  slug: string;
}

export interface PortfolioProject extends PortfolioMeta {
  content: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}
