"use client";

import { useState, useMemo } from 'react' 

import styles from './TodoList.module.css';

import { ThemeProvider, useTheme } from '../../context/ThemeContext';

import { TodoProvider, useTodo } from '../../context/TodoContext';

type FilterType = "all" | "active" | "completed";

export default function TodoristPageWrapper() {
  return (
    <TodoProvider> 
    <ThemeProvider>
      <TodoristPage />
    </ThemeProvider>
    </TodoProvider>
  );
}

function TodoristPage() {

    const { theme, toggleTheme } = useTheme();


    const { 
        todos, 
        incompleteCount, 
        addTodo, 
        removeTodo, 
        toggleTodo,
        reorderTodo, 
        isLoaded 
    } = useTodo();


    const [newTodoText, setNewTodoText] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");

    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [dragOverId, setDragOverId] = useState<number | null>(null);

    const handleDragStart = (id: number, e: React.DragEvent<HTMLLIElement>) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = "move";
    };
    const handleDragEnter = (id: number) => {
        if (draggedId === id) return;
        setDragOverId(id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };
    const handleDragEnd = () => {
        if (draggedId === null || dragOverId === null) {
            setDraggedId(null);
            setDragOverId(null);
            return;
        }

        const startIndex = todos.findIndex(todo => todo.id === draggedId);
        const endIndex = todos.findIndex(todo => todo.id === dragOverId);

        reorderTodo(startIndex, endIndex);

        setDraggedId(null);
        setDragOverId(null);
    };

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

    const handleAddTodo = () => {
        if (newTodoText.trim() === "") return;
        addTodo(newTodoText.trim());
        setNewTodoText("");
    };

    if (!isLoaded) {
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
      <h1 className={styles.title}>
            {process.env.NEXT_PUBLIC_APP_TITLE || "TODOリスト"}
      </h1>
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
            color: incompleteCount > 0 ? '#d9534f' : '#5cb85c'
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
        onClick={handleAddTodo}
        className={styles.addButton}
      >
        追加
      </button>

      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <li 
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(todo.id, e)}
            onDragEnter={() => handleDragEnter(todo.id)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            className={`${styles.todoItem} ${todo.isCompleted ? styles.completedTodo : ''}`}
          >
            {todo.text}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
                className={styles.checkbox}
                title={`${todo.text}を${todo.isCompleted ? '未完了' : '完了'}にする`}
              />
              完了
            </label>
            <button
              onClick={() => removeTodo(todo.id)}
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
