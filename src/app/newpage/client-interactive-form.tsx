'use client';

import { useState, useEffect } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function ClientInteractiveForm() {
    const [extraPosts, setExtraPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchExtraPosts = async () => {
        setIsLoading(true);

        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5&_start=5')
        const newPosts = await res.json();
        setExtraPosts(newPosts);
        setIsLoading(false); 
    };

    return (
        <div>
            <h2>  新しいページ２ </h2>
            <button onClick={fetchExtraPosts} disabled={isLoading}>
                {isLoading ? '読み込み中...' : '新しいページを読み込む'}
            </button>

            {extraPosts.length > 0 && (
                <ul>
                    {extraPosts.map(post => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}