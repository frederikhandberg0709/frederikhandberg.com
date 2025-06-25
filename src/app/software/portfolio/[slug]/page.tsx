import TableOfContents from "@/components/portfolio/TableOfContents";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import { getAllPostSlugs, getPostData } from "../../../../../lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import MDXContent from "@/components/portfolio/MDXContent";
import remarkGfm from "remark-gfm";
import { TOCItem } from "@/types/portfolio";
import { extractHeadings } from "@/utils/mdx-utils";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${postData.title} | Frederik Handberg`,
    description: postData.excerpt,
    metadataBase: new URL("https://frederikhandberg.com"),
    openGraph: {
      images: postData.coverImage ? [postData.coverImage] : [],
    },
  };
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PortfolioProjectPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const slug = params.slug;
  const postData = await getPostData(slug);

  if (!postData || !postData.content) {
    notFound();
  }

  const mdxSource = await serialize(postData.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  const headings: TOCItem[] = extractHeadings(postData.content);

  return (
    <PortfolioLayout
      meta={{
        title: postData.title,
        date: postData.date,
        excerpt: postData.excerpt,
        author: postData.author,
        coverImage: postData.coverImage,
        tags: postData.tags,
        readingTime: postData.readingTime,
        slug: postData.slug,
      }}
      tableOfContents={
        headings.length > 0 ? <TableOfContents items={headings} /> : undefined
      }
    >
      <MDXContent source={mdxSource} />
    </PortfolioLayout>
  );
}
