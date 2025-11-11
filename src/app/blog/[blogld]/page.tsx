import { Metadata } from 'next';

// ページコンポーネントが使用する型定義は export しても問題ありません
export type ArticleContent = {
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author?: {
    name: string;
    email?: string;
  };
};

// 🚨 【修正箇所 1】: export を削除してローカル関数にする
async function blodDetailData(blogId: string): Promise<ArticleContent> {
  // ここでは仮のデータを返しています。実際にはAPIからデータを取得するなどの処理を行います。
  return {
    title: `ブログ記事のタイトル ${blogId}`,
    description: `これはブログ記事 ${blogId} の説明文です。`,
    content: `これはブログ記事 ${blogId} の内容です。詳細な情報がここに含まれます。`,
    publishedAt: new Date().toISOString(),
  };
}

// generateMetadata は Next.js の仕様で export が必要です
export const generateMetadata = async ({ params }: { params: { blogId: string } }): Promise<Metadata> => {
  // 注意: パラメータ名が [blogld] フォルダに対応しているか確認してください。
  // フォルダ名が [blogld] の場合、params.blogld となる可能性があります。
  const blogData: ArticleContent = await blodDetailData(params.blogId);

  return {
    title: blogData.title,
    description: blogData.title
  };
}

// 🚨 【修正箇所 2】: ページコンポーネントを追加 (これが無いとページとして機能しません)
export default async function BlogDetailPage({ params }: { params: { blogId: string } }) {
    // ページロード時にデータを取得
    const blogData = await blodDetailData(params.blogId);
    
    return (
        <main style={{ padding: '20px' }}>
            <h1>{blogData.title}</h1>
            <p>公開日: {new Date(blogData.publishedAt).toLocaleDateString()}</p>
            <hr />
            <p>{blogData.content}</p>
        </main>
    );
}

// この修正でビルドエラーが解消し、ページがデプロイされるはずです。