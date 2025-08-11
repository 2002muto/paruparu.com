export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          管理パネル
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* コメント管理 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              コメント管理
            </h2>
            <p className="text-gray-600 mb-4">
              投稿されたコメントの一覧表示と削除を行えます。
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">
                認証機能は準備中です。
              </p>
            </div>
          </div>

          {/* 記事管理 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              記事管理
            </h2>
            <p className="text-gray-600 mb-4">
              記事の作成・編集・削除を行えます。
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">
                記事管理機能は準備中です。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            現在の状況
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 認証システム: 準備中</li>
            <li>• コメント管理: 準備中</li>
            <li>• 記事管理: 準備中</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
