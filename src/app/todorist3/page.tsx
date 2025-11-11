"use client";

import { useState, useMemo } from 'react' // useEffect, useContext は不要に
import styles from './TodoList.module.css';

import { ThemeProvider, useTheme } from '../../context/ThemeContext';
// 💡 TodoProviderとuseTodoをインポート
import { TodoProvider, useTodo } from '../../context/TodoContext'; 

// 💡 Contextに移動したため、以下を削除または移動:
// - interface TodoItem { ... }
// - type FilterType = "all" | "active" | "completed";
// - const STORAGE_KEY = "todorist_todos";
// - const loadInitialTodos = (): TodoItem[] => { ... };

// 💡 FilterTypeのみ残します (ページ固有のローカル状態のため)
type FilterType = "all" | "active" | "completed";

// --- ラッパーコンポーネントで二つのProviderを適用 ---
export default function TodoristPageWrapper() {
  return (
    <TodoProvider> {/* TodoProviderを外側に配置し、テーマに依存しないようにする */}
    <ThemeProvider>
      <TodoristPage />
    </ThemeProvider>
    </TodoProvider>
  );
}

function TodoristPage() {
    // 💡 useTheme からテーマ状態を取得
    const { theme, toggleTheme } = useTheme();

    // 💡 useTodo からリストの状態と操作関数を全て取得
    const { 
        todos,               // リスト状態
        incompleteCount,     // 未完了数 (Contextで計算)
        addTodo,             // 追加関数
        removeTodo,          // 削除関数
        toggleTodo,          // トグル関数
        isLoaded             // ロード状態
    } = useTodo(); 

    // 💡 ローカルで保持するのは、入力テキストとフィルターの状態のみ
    const [newTodoText, setNewTodoText] = useState("");
    const [filter, setFilter] = useState<FilterType>("all"); 

    // Contextで計算される incompleteCount をそのまま利用

    // フィルタリングロジックはページに残す
    const filteredTodos = useMemo(() => {
        console.log(`フィルタリング中...: ${filter}`);
        switch (filter) {
            case "active":
                return todos.filter(todo => !todo.isCompleted);
            case "completed":
                return todos.filter(todo => todo.isCompleted);
            case "all":
            default:
                return todos;
        }
    }, [todos, filter]);


    // 💡 ロード/保存ロジック、addTodo/removeTodo/toggleTodo 関数は全て削除。
    //    Contextの関数を使うため、handleAddTodoというラッパーを作成する。
    const handleAddTodo = () => {
        if (newTodoText.trim() === "") return;
        addTodo(newTodoText); // 💡 Contextの addTodo を実行
        setNewTodoText("");
    };

    if (!isLoaded) { // 💡 isLoaded は Context から取得
        return (
            <div className={styles.loadingContainer}>
                <p>データをロード中...</p>
            </div>
        );
    }

    const FilterButton = ({ type, label }: { type: FilterType; label: string }) => (
        <button
            onClick={() => setFilter(type)}
            className={`${styles.filterButton} ${filter === type ? styles.activeFilter : ''}`}
            title={`${label}のToDoを表示`}
        >
            {label}
        </button>
    );

  return (

    <div className={`${styles.container} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      <div className={styles.header}>
      <h1>ToDoリスト</h1>
        {/* テーマ切り替えボタンを追加 */}
        <button 
                onClick={toggleTheme} 
                className={styles.themeToggle}
                title={`テーマを${theme === 'light' ? 'ダーク' : 'ライト'}に切り替える`}
            >
                {theme === 'light' ? '🌙 ダークモードへ' : '☀️ ライトモードへ'} 
            </button>
        </div>

        <p style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: incompleteCount > 0 ? '#d9534f' : '#5cb85c' // 1つ以上あれば赤、ゼロなら緑
        }}>
            未完了のToDo: {incompleteCount} 件
        </p>
        <div className={styles.filterGroup}>
            <FilterButton type="all" label="すべて" />
            <FilterButton type="active" label="未完了" />
            <FilterButton type="completed" label="完了済み" />
        </div>

      <input
        id="new-todo"
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        className={styles.todoInput}
        placeholder="TODOを入力してください"
        title="新しいTODOを入力"
      />
      <button 
        onClick={handleAddTodo} // 💡 Contextの addTodo を使用するラッパーに変更
        className={styles.addButton}
      >
        追加
      </button>

      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <li 
            key={todo.id} 
            className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ''}`}
          >
            {todo.text}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)} // 💡 Contextの関数
                className={styles.checkbox}
                title={`${todo.text}を${todo.isCompleted ? '未完了' : '完了'}にする`}
              />
              完了
            </label>
            <button
              onClick={() => removeTodo(todo.id)} // 💡 Contextの関数
              className={styles.deleteButton}
              title={`${todo.text}を削除`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}