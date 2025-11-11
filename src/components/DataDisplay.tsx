'use client';

import { useState } from 'react'; 
import { Item } from '@/app/hikaku/page';

interface DataDisplayProps {
    initialItems: Item[];
}

async function getMoreData(page: number): Promise<Item[]> {
    console.log(`--- クライアント側で追加データを取得中 ---`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        { id: page * 3 + 1, name: `クライアント側データ${page * 3 + 1}`, source: 'client' },
        { id: page * 3 + 2, name: `クライアント側データ${page * 3 + 2}`, source: 'client' },
        { id: page * 3 + 3, name: `クライアント側データ${page * 3 + 3}`, source: 'client' },
    ];
}

export function DataDisplay({ initialItems }: DataDisplayProps) {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);


    const handleLoadMore = async () => {
        setIsLoading(true);
        const newItems = await getMoreData(page);

        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
            <h2>データリスト</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id} style={{ color: item.source === 'server' ? 'green' : 'blue' }}>
                        {item.name} ({item.source})
                    </li>
                ))}
            </ul>

            <button
                onClick={handleLoadMore}
                disabled={isLoading}
                style={{ marginTop: '10px', padding: '8px 15px' }}>
                {isLoading ? '読み込み中...' : 'もっと読み込む'}
            </button>

            <p style={{ marginTop: '10px'}}> 現在の表示アイテム数: {items.length} </p>
        </div>
    );
}