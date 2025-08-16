import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

export async function mdxToHtml(mdxContent: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(mdxContent);

  return result.toString();
}

// 見出しと画像を最適化されたHTMLに変換
export function processContent(html: string): string {
  // 見出しのスタイリングを改善
  let processedHtml = html.replace(
    /<h1([^>]*)>/g,
    '<h1$1 class="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">'
  );
  
  processedHtml = processedHtml.replace(
    /<h2([^>]*)>/g,
    '<h2$1 class="text-2xl font-bold text-gray-800 mb-4 mt-6">'
  );
  
  processedHtml = processedHtml.replace(
    /<h3([^>]*)>/g,
    '<h3$1 class="text-xl font-bold text-gray-800 mb-3 mt-5">'
  );

  // 段落のスタイリングを改善
  processedHtml = processedHtml.replace(
    /<p([^>]*)>/g,
    '<p$1 class="mb-4 leading-relaxed">'
  );

  // 画像を最適化されたHTMLに変換
  processedHtml = processedHtml.replace(/<img([^>]+)>/g, (match, attributes) => {
    // src属性を抽出
    const srcMatch = attributes.match(/src="([^"]+)"/);
    const altMatch = attributes.match(/alt="([^"]*)"/);
    
    if (srcMatch) {
      const src = srcMatch[1];
      const alt = altMatch ? altMatch[1] : "";
      
      return `
        <div class="my-8 text-center">
          <img 
            src="${src}" 
            alt="${alt}" 
            class="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            loading="lazy"
          />
          ${alt ? `<p class="text-sm text-gray-500 mt-2">${alt}</p>` : ""}
        </div>
      `;
    }
    
    return match;
  });

  return processedHtml;
}
