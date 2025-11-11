import Link from "next/link";
import React from "react"; // React をインポート

// Next.jsのページコンポーネントとしてデフォルトエクスポートします
export default function LinkPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>リンクテストページ</h1>
      
      {/* 修正: Link コンポーネント内で明示的に return を使用 */}
      <Link href="/about">
        {/* Next.js 13以降、Linkコンポーネントの直接の子に <a> タグは不要です */}
        About Page
      </Link>
      
      {/* 以前の形式 (aタグが必要な場合はこの形式)
      <Link href="/about" legacyBehavior>
        <a>About Page</a>
      </Link>
      */}
      
    </main>
  );
}