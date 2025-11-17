"use client";

import { useState, useEffect } from 'react'

type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export default function Page() {
    const [data, setData] = useState<Todo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] =useState(true);

    useEffect(() => {
        const fetchData =async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response =await fetch('https://jsonplaceholder.typicode.com/todos/1');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json()
                setData(result)
            } catch (e) {
                console.error('An error occurred while fetching the data: ', e);

                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('データ取得中に不明なエラーが発生しました。');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>Not Found</p>;
    }

    return (
        <div>
            <h2>遅延読み込みデータ</h2>
            <pre>{JSON.stringify(data)}</pre>
        </div> 
    );
}
