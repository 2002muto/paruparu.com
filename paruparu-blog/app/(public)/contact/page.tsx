import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "パルムちゃんブログについてのご質問やご意見がございましたら、お気軽にお問い合わせください。",
  openGraph: {
    title: "お問い合わせ | パルムちゃんブログ",
    description:
      "パルムちゃんブログについてのご質問やご意見がございましたら、お気軽にお問い合わせください。",
    url: "https://paruparu.com/contact",
    images: [
      {
        url: "/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "お問い合わせ - パルムちゃんブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | パルムちゃんブログ",
    description:
      "パルムちゃんブログについてのご質問やご意見がございましたら、お気軽にお問い合わせください。",
    images: ["/og/contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">お問い合わせ</h1>

        <p className="text-gray-600 mb-8">
          パルムちゃんブログについてのご質問やご意見がございましたら、お気軽にお問い合わせください。
        </p>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-4">
              スパム対策のため、以下の認証を完了してください。
            </p>
            <div className="flex items-center justify-center h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300">
              <span className="text-gray-500 text-sm">
                Turnstile認証（準備中）
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
