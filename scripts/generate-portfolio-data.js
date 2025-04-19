import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, "..", "content");
const outputDir = path.join(__dirname, "..", "src", "generated");

function generatePortfolioData() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const portfolioItems = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      coverImage: data.coverImage,
      tags: data.tags || [],
      readingTime: readingTime(content).text,
      content: content,
    };
  });

  portfolioItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  fs.writeFileSync(
    path.join(outputDir, "portfolio-data.json"),
    JSON.stringify(portfolioItems, null, 2),
  );

  console.log(
    `✅ Generated portfolio data for ${portfolioItems.length} projects`,
  );
}

generatePortfolioData();
