import { Metadata } from 'next';

// 1. メタデータのエクスポート (これはOK)
export const metadata: Metadata = {
  title: 'ブログ一覧 | タイトル', // 分かりやすいように少し変更
  description: 'ブログ記事の一覧ページです。',
};

// 2. 必須のページコンポーネントを追加 (これがないとエラーになる)
export default function BlogPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>ブログ記事一覧</h1>
      <p>現在準備中です。以下から他のページへどうぞ。</p>
      {/* ここにブログ記事のリスト表示ロジックを後で追加します */}
    </main>
  );
}