'use client';

import { useState, useEffect, use } from "react";
import { getHeapCodeStatistics } from "v8";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function CSRPage() {
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }

    setPosts([]); // 初期化
    setLoading(true);
    fetchPosts();
    
}, []);

return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>投稿一覧（クライアントサイド）</h1>
      <p>このページは、JavaScriptが実行された後にデータが取得され、表示されます。</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', listStyle: 'none' }}>
              <h2 style={{ fontSize: '1.2rem' }}>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

