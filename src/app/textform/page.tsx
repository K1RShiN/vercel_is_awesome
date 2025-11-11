'use client';

import { useState } from "react";

export default function Home() {

    const [inputText, setInputText] = useState("");

    const handleInputCange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };
    
    return (
        <main style={{ padding: '2rem' }}>
            <h1>テキスト入力フォーム</h1>

            <input 
                type="text" 
                value={inputText} 
                onChange={handleInputCange} 
                placeholder="ここにテキストを入力してください" 
                style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', maxWidth: '400px', marginTop: '1rem', color: '#333' }}
            />

            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                入力されたテキスト: <strong>{inputText}</strong>
            </p>
        </main>
    );
}