import { getAllPosts } from "@/lib/mdx/posts";
import PostCard from "@/components/post/PostCard";
import HeroSection from "@/components/common/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム",
  description:
    "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
  openGraph: {
    title: "パルムちゃんブログ",
    description:
      "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
    url: "https://paruparu.com",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "パルムちゃんブログ - ホーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "パルムちゃんブログ",
    description:
      "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
    images: ["/og/home.jpg"],
  },
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* ファーストビュー */}
      <HeroSection />
      {/* 記事一覧セクション */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 記事一覧 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            最新の記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">まだ記事がありません。</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
