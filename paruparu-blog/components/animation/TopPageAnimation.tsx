"use client";

import { motion } from 'framer-motion';
import { Post } from '@/lib/types';
import PostCard from '@/components/post/PostCard';

interface TopPageAnimationProps {
  posts: Post[];
}

export default function TopPageAnimation({ posts }: TopPageAnimationProps) {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3, // ヒーローセクションのアニメーションが終わってから開始するように調整
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヒーローセクション */}
      <motion.section
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4"
          variants={heroVariants}
        >
          パルムちゃんと暮らす毎日
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          variants={heroVariants}
        >
          写真とひとことを毎日更新。パルムちゃんの日常をお届けします。
        </motion.p>
      </motion.section>

      {/* 記事一覧 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <PostCard post={post} />
            </motion.div>
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
