import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types";
import { mdxToHtml, processContent } from "./mdxToHtml";

const postsDirectory = path.join(process.cwd(), "content/posts");

// 全ての記事を取得（日付順でソート）
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        image: data.image,
        excerpt: data.excerpt,
        content,
      } as Post;
    });

  // 日付順でソート（新しい順）
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 特定の記事を取得
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // MDXをHTMLに変換
    const htmlContent = await mdxToHtml(content);
    const processedContent = processContent(htmlContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      image: data.image,
      excerpt: data.excerpt,
      content: processedContent,
    } as Post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 記事のスラッグ一覧を取得
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

// 最新の記事を取得
export function getLatestPosts(count: number = 10): Post[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, count);
}
