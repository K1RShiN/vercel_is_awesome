type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('データの取得に失敗しました');
  }

    return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>投稿一覧</h1>
      <p>このページはサーバーサイドでレンダリングされています。</p>
      <ul>
        {posts.map((any) => (
          <li key={any.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', listStyle: 'none' }}>
            <h2 style={{ fontSize: '1.2rem' }}>{any.title}</h2>
            <p>{any.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
        