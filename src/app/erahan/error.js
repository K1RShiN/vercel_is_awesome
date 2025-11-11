'use client';
import { useEffect } from "react";

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '20px', color: 'red' }}>
            <h1>データの読み込みに失敗しました</h1>
            <p>ごめんなさい。サーバーからデータを取得中に問題が発生しました。</p>
            
            <button
                onClick={
                    () => reset()
                }
            >
                再読み込みを試す
            </button>
            <details style={{ marginTop: '10px', whiteSpace: 'pre-wrap'}}>
                {error.message}
            </details>
        </div>
    );
}
