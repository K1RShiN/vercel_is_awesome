"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

// ToDoアイテムの型定義
interface TodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
}

const STORAGE_KEY = "todorist_todos";

export default function TodoistPage2() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = () => {
    if (newTodoText.trim() === '') return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: newTodoText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>TODOリスト</h1>

      {/* 入力フォーム */}
      <div className={styles.inputContainer}>
        <div style={{ flex: 1 }}>
          <label htmlFor="todo-input" className={styles.label}>
            新しいTODO
          </label>
          <input
            id="todo-input"
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
            className={styles.todoInput}
            placeholder="TODO を入力してください"
            title="新しいTODOを入力してEnterキーを押す"
            aria-label="新しいTODO入力フィールド"
          />
        </div>
        <button
          onClick={addTodo}
          className={styles.addButton}
          title="TODOを追加"
          aria-label="TODOを追加ボタン"
          style={{ alignSelf: 'flex-end' }}
        >
          追加
        </button>
      </div>

      {/* TODOリスト */}
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${styles.todoItem} ${
              todo.isCompleted ? styles.completed : ''
            }`}
          >
            <label htmlFor={`todo-${todo.id}`} className={styles.todoCheckboxLabel}>
              <input
                id={`todo-${todo.id}`}
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
                className={styles.checkbox}
                title={`${todo.text}を${
                  todo.isCompleted ? '未完了' : '完了'
                }にする`}
                aria-label={`${todo.text}を完了にする`}
              />
              <span
                className={`${styles.todoText} ${
                  todo.isCompleted ? styles.completed : ''
                }`}
              >
                {todo.text}
              </span>
            </label>

            <button
              onClick={() => deleteTodo(todo.id)}
              className={styles.deleteButton}
              title={`${todo.text}を削除`}
              aria-label={`${todo.text}を削除ボタン`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}