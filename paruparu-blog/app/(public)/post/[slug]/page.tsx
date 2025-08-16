import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx/posts";
import { formatDate } from "@/lib/utils/date";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PostContent from "@/components/post/PostContent";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// メタデータを生成
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ["パルム", "犬", "ブログ", "ペット", "日常", "写真", post.title],
    authors: [{ name: "パルムちゃん" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://paruparu.com/post/${params.slug}`,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "https://paruparu.com/og/default.jpg",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      publishedTime: post.date,
      modifiedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image
        ? [post.image]
        : ["https://paruparu.com/og/default.jpg"],
    },
    alternates: {
      canonical: `/post/${params.slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくず */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900">{post.title}</li>
        </ol>
      </nav>

      {/* 記事コンテンツ */}
      <PostContent
        title={post.title}
        date={post.date}
        image={post.image}
        content={post.content}
        formattedDate={formatDate(post.date)}
      />

      {/* コメントセクション（後で実装） */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">コメント</h2>
        <p className="text-gray-500">コメント機能は準備中です。</p>
      </section>

      {/* JSON-LD構造化データ */}
      <JsonLd
        type="article"
        title={post.title}
        description={post.excerpt}
        url={`https://paruparu.com/post/${params.slug}`}
        image={post.image}
        publishedTime={post.date}
        modifiedTime={post.date}
      />
    </div>
  );
}
