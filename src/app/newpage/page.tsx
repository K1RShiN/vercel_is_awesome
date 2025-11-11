import ClientInteractiveForm from './client-interactive-form';

// Post型の定義
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// 🌟 修正点: 戻り値の型を Post[] (Postの配列) と指定する
async function getInitialPosts(): Promise<Post[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5' );
    // データを取得できない場合に備えてチェックを入れることが推奨されますが、
    // 型安全のためにはここでは型アサーションを使用します。
    const posts: Post[] = await res.json();
    return posts;
}

export default async function Page() {
    // initialPostsの型は、Promise<Post[]>の解決後の型である Post[] として正しく推論される
    const initialPosts = await getInitialPosts();

    return (
        <main>
            <h1>新しいページ</h1>
            <ul>
                {/* 修正後: initialPostsは Post[] と認識されるため、mapメソッドが安全に使用できる */}
                {initialPosts.map((post: Post) => ( // mapのコールバック引数postの型もPostと推論される
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>

            <hr />

            <ClientInteractiveForm />
        </main>
    );
}