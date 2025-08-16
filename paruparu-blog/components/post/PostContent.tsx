"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PostContentProps {
  title: string;
  date: string;
  image?: string;
  content: string;
  formattedDate: string;
}

export default function PostContent({
  title,
  date,
  image,
  content,
  formattedDate,
}: PostContentProps) {
  return (
    <>
      {/* 記事ヘッダー */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <time dateTime={date} className="text-gray-500 text-sm">
          {formattedDate}
        </time>
      </header>

      {/* 記事画像 */}
      {image && (
        <div className="mb-8">
          <motion.div
            className="relative h-64 md:h-96 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              quality={85}
            />
          </motion.div>
        </div>
      )}

      {/* 記事本文 */}
      <article className="prose prose-lg max-w-none prose-gray">
        <div
          className="markdown-content text-black"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
}
