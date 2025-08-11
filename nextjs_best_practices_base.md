# Next.js ベストプラクティス実装ルール（パルムちゃんブログ版 base.md）

> 本書は「パルムちゃんブログサイト」プロジェクトの実装規約です。外注/社内共通の参照元とし、PRレビューのチェックリストとしても使用します。

---

## 0. 本プロジェクトの前提

- フレームワーク: Next.js (App Router) + TypeScript + Tailwind CSS
- 記事本文: **MDX**（Git管理）
- コメント: **Supabase**（匿名可, Markdown Lite対応）
- 表示導線: Topカード→**モーダル**（URLは`/post/[slug]`へpushState）と、**個別記事ページ**（SSR/SSG）を併用
- 管理: `/admin`でコメント削除（**サーバ側で権限チェック**必須）

---

## 1. ルーティングとファイル構造

### ディレクトリ構成（本プロジェクト最適化版）

```
├── app/
│   ├── (public)/
│   │   ├── page.tsx                # トップ（一覧+カード）
│   │   ├── post/
│   │   │   └── [slug]/page.tsx     # 個別記事ページ（SSR/SSG）
│   │   └── contact/page.tsx        # お問い合わせ
│   ├── admin/
│   │   ├── page.tsx                # 管理コンパネ（要認証）
│   │   └── layout.tsx              # 管理用レイアウト（任意）
│   └── api/
│       └── comments/
│           ├── route.ts            # GET(必要時)/POST: コメント取得/投稿
│           └── [id]/route.ts       # DELETE: コメント削除（管理者のみ）
│
├── components/
│   ├── common/                     # 共通UI（Header, Button 等）
│   ├── post/                       # 投稿表示（カード/モーダル/詳細）
│   └── comments/                   # コメントUI（Box/List）
│
├── content/                        # MDX 記事
│   └── posts/
│       └── yyyy-mm-dd-slug.mdx
│
├── hooks/                          # カスタムフック（最小限）
│
├── lib/
│   ├── supabase/                   # Supabaseクライアント/DAO
│   ├── mdx/                        # MDXレンダラ/メタ抽出
│   ├── security/                   # Turnstile, レート制限, サニタイズ
│   ├── types/                      # 型定義
│   └── utils/                      # 汎用ユーティリティ（date, format 等）
│
├── public/
│   ├── images/
│   ├── icons/
│   └── og/                         # OGP画像テンプレ
│
├── styles/                         # グローバルCSS
└── middleware.ts                   # 認証/保護（/adminへのガード等）
```

### 命名規則

- ページ: `page.tsx` / レイアウト: `layout.tsx` / ローディング: `loading.tsx` / エラー: `error.tsx` / 404: `not-found.tsx`
- MDXファイル: `yyyy-mm-dd-slug.mdx`（先頭メタに `title`, `date`, `image`, `excerpt`, `slug`）
- コンポーネント: PascalCase, フォルダは機能単位

---

## 2. コンポーネント設計（RSC優先）

- **Server Componentsをデフォルト**。データ取得・SEOが絡む部分はRSCで実装
- **Client Components**は以下に限定
  - ブラウザAPI・イベントハンドラ・`useState`/`useEffect`が必要
  - モーダル開閉、コメント投稿フォーム、無限スクロール等のUI相互作用

- `"use client"` はファイル先頭にのみ付与。過剰なクライアント化は禁止

---

## 3. データ取得とAPI設計

### 原則

- **RSCで直接データ取得**を最優先（GETエンドポイント乱立を避ける）
- ただし**クライアントからの動的更新が必要**な箇所（例: モーダル内コメント一覧をSWRで再取得）では、**GET APIを最小限で許可**

### APIルートの方針

- `app/api/comments/route.ts`
  - `GET ?post=slug` : **必要な場合のみ**コメント一覧（idempotent, public）
  - `POST` : コメント投稿（Turnstile検証 + サニタイズ + レート制限）

- `app/api/comments/[id]/route.ts`
  - `DELETE` : コメント削除（**サーバ側で管理者認可**）

> **補足**: 変更系は**Server Actions**も可。ただしTurnstile等の外部検証・認可が絡む場合は**Route Handler**を優先（監査/境界が明瞭）。

### キャッシュ/再検証（RSCのfetch）

- 既定はRSCのキャッシュに従う
- 記事一覧/詳細: `revalidate` を適切に設定（例: 60〜600秒）
- コメントGET: `cache: "no-store"`（最新性優先）

---

## 4. セキュリティ

- **Turnstile**: コメント投稿時に必須（Bot対策）
- **入力バリデーション**: サーバ側で必須（長さ/禁止語/URL数など）
- **Markdownレンダリング**: `rehype-sanitize` 等でXSS対策、リンクには `rel="nofollow ugc noopener"`
- **レート制限**: IPハッシュ×時間窓（例: 1分3件, 1時間30件）
- **RLS/認可**: 削除はサーバAPIのみ実行、DB側は一般ユーザーにDELETE不可設定
- **環境変数**: 機密は`.env`、クライアント公開は`NEXT_PUBLIC_`前置
- **CSP**: 本番は厳格なCSPヘッダを設定（`next.config.js`またはMiddlewareで）

---

## 5. パフォーマンス最適化

- 画像は **`next/image`** を必須使用、`sizes`/`priority`を適切化
- OGP画像はテンプレ生成（将来自動生成可）
- モーダルはコード分割（ダイナミックインポート）で初期負荷を削減
- `font-display: swap`、`preconnect`/`dns-prefetch`の最適化

---

## 6. エラーハンドリング & UX

- `error.tsx`でユーザーフレンドリーに復旧UIを提供（再読み込み/トップへ）
- `loading.tsx`とSuspenseで骨組み表示
- コメント投稿は楽観的更新ではなく**確定レス**を待ってから反映（スパム対策上）

---

## 7. 型安全性

- TypeScriptは`strict: true`
- API入出力は**型を共有**（`lib/types`）
- Supabaseの型は生成（`supabase gen types`）し`lib/types`に保存

---

## 8. デプロイ & 環境

- ビルドは`NODE_ENV=production`で行う
- 画像ドメインは`next.config.js`の`images.remotePatterns`で許可
- 本番・ステージングで環境変数を分離（特にSupabase URL/Key, Turnstile）

---

## 9. アクセシビリティ

- モーダルは**フォーカストラップ**と**ESC/Ctrl+W**で閉じる
- 画像に`alt`必須、ボタンに`aria-label`必須
- カラーコントラスト AA 以上

---

## 10. ログ/監査

- 重要イベント（投稿/削除/失敗）はサーバログに記録（IPハッシュ・UA）
- PIIは保存しない（任意名のみ）。IPは**ハッシュ**で保持

---

## 11. テスト

- 重要ユースケースのE2E（Playwright）
  - トップ→モーダル→戻る
  - `/post/[slug]`直アクセス
  - コメント投稿/削除（権限）

- ユニット: サニタイズ/バリデーション/レート制限

---

## 12. コーディング規約

- ESLint + Prettier + Tailwind Plugin
- コンポーネントは小さく単一責務、`console.log`は開発中のみ（PR時は削除）
- CSSはTailwind中心。例外的に`styles/globals.css`にユーティリティ化

---

## 13. 実装チェックリスト（抜粋）

- [ ] `/` 一覧がSSRで表示される
- [ ] カードクリックでモーダルOPEN & `pushState('/post/[slug]')`
- [ ] `popstate`でモーダルCLOSE & スクロール位置復元
- [ ] `/post/[slug]`はSSR/SSGでOGP含め表示
- [ ] コメント投稿: Turnstile→POST→サニタイズ→保存→リスト再取得
- [ ] コメント削除: 管理者のみDELETE→UI反映
- [ ] XSS/リンク属性/CSPが有効
- [ ] 画像は`next/image`で最適化
- [ ] 環境変数/鍵類の秘匿

---

## 14. よくある質問（FAQ）

**Q1. GET APIは作らない方針？**

- 原則RSCでのサーバ取得を推奨。ただし**クライアント再取得が必要**な箇所（コメント一覧等）は**限定的にGETを許可**します。

**Q2. Server ActionsとRoute Handlersの使い分けは？**

- 外部検証（Turnstile）や認可境界、監査ログが必要な場合は**Route Handler**。単純な更新は**Server Actions**でも可。

**Q3. 画像アップロードは？**

- MVPでは**コメントの画像アップロードは非対応**。記事の画像はMDX側で静的参照 or 既存CDNを使用。

---

## 15. 付録：MDXメタ（frontmatter）例

```mdx
---
title: "朝んぽのごきげんワン"
date: "2025-08-11"
slug: "first-wan"
image: "/images/posts/first-wan.jpg"
excerpt: "今日は涼しくて最高！"
---

本文はMDX。**太字**やリンク、画像等が利用可能。
```

---

## 16. 付録：コメント制約（Markdown Lite）

- 許可: `**太字**`, `*斜体*`, `[リンク](url)`, `- 箇条書き`
- 禁止: HTMLタグ直書き、画像/動画の直接埋め込み（MVP）
- 長さ: 1〜500文字程度（変更可）
- URL本数: 最大2本/コメント

---
