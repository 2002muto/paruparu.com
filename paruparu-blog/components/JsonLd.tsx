interface JsonLdProps {
  type: "website" | "article";
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export default function JsonLd({
  type,
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author = "パルムちゃん",
}: JsonLdProps) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : "Article",
    name: title,
    description,
    url,
    image: image || "https://paruparu.com/og/default.jpg",
    publisher: {
      "@type": "Organization",
      name: "パルムちゃんブログ",
      url: "https://paruparu.com",
    },
    author: {
      "@type": "Person",
      name: author,
    },
  };

  const articleData =
    type === "article"
      ? {
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }
      : {};

  const data = { ...baseData, ...articleData };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
