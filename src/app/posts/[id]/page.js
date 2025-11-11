// src/app/posts/[id]/page.js

// fetchPostData関数はページコンポーネント内で使用するため、exportは不要です
async function fetchPostData(id) {

    console.log(`[SSR] 投稿ID: ${id} のデータをサーバー側でフェッチ中...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const dummyPosts = {
        '1': { id: '1', title: '一番目の投稿', content: 'これは最初の投稿の内容です。' },
        '2': { id: '2', title: '二番目の投稿', content: 'これは二番目の投稿の内容です。' },
        '3': { id: '3', title: '三番目の投稿', content: 'これは三番目の投稿の内容です。' },
    };
    const post = dummyPosts[id];
    if (!post) {
        return null;
    }
    return { id, ...post };
}

// ページコンポーネントを定義し、デフォルトエクスポートします
// Next.jsは、paramsを受け取って動的ルートのID（id）を渡します
export default async function PostDetailPage({ params }) {
    
    const post = await fetchPostData(params.id);

    if (!post) {
        return (
            <main style={{ padding: '20px' }}>
                <h1>404 - 投稿が見つかりません</h1>
                <p>指定されたIDの投稿は存在しません。</p>
            </main>
        );
    }

    return (
        <main style={{ padding: '20px' }}>
            <h1>{post.title}</h1>
            <p style={{ marginTop: '20px' }}>{post.content}</p>
        </main>
    );
}

