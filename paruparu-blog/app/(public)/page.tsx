import { getAllPosts } from '@/lib/mdx/posts';
import PostCard from '@/components/post/PostCard';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヒーローセクション */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          パルムちゃんと暮らす毎日
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          写真とひとことを毎日更新。パルムちゃんの日常をお届けします。
        </p>
      </section>

      {/* 記事一覧 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              まだ記事がありません。
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
