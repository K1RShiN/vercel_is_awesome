async function fetchPostData(id) {

    console.log(`[SSR] 投稿ID: &{id} のデータをサーバー側でフェッチ中...`);
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

