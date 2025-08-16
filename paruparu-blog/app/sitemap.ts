import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/mdx/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paruparu.com";

  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // 記事ページ
  const postSlugs = getAllPostSlugs();
  const postPages = postSlugs.map((slug) => ({
    url: `${baseUrl}/post/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
