import { Metadata } from 'next';

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
export async function blodDetailData(blogId: string): Promise<ArticleContent> {
    // ここでは仮のデータを返しています。実際にはAPIからデータを取得するなどの処理を行います。
    return {
        title: `ブログ記事のタイトル ${blogId}`,
        description: `これはブログ記事 ${blogId} の説明文です。`,
        content: `これはブログ記事 ${blogId} の内容です。詳細な情報がここに含まれます。`,
        publishedAt: new Date().toISOString(),
    
    };
}

export const generateMetadata = async ({ params }: { params: { blogId: string } }): Promise<Metadata> => {

    const blogData: ArticleContent = await blodDetailData(params.blogId);

    return {
        title: blogData.title,
        description: blogData.title
    };
} 

