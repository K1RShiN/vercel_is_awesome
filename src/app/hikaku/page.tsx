import { DataDisplay } from '@/components/DataDisplay';

export interface Item {
    id: number;
    name: string;
    source: 'server' | 'client';
}

async function getInitialData(): Promise<Item[]> {
    console.log('--- サーバー側でデータを取得中 ---');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
        { id: 1, name: 'サーバー側データ1', source: 'server' },
        { id: 2, name: 'サーバー側データ2', source: 'server' },
        { id: 3, name: 'サーバー側データ3', source: 'server' },
    ];
}

export default async function HikakuPage() {
    const initialItems = await getInitialData();
    
    return (
        <main>
            <h1>SSRのページ</h1>
            <p>この初期データはサーバー側でレンダリングされました。</p>
            <DataDisplay initialItems={initialItems} />
        </main>
    );
}