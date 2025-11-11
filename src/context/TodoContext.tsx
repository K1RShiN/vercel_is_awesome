"use client";

import React, { createContext, useReducer, useEffect, useContext, ReactNode, useMemo } from 'react';

interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TodoState {
    todos: TodoItem[];
    isLoaded: boolean;
}

const initialState: TodoState = {
    todos: [],
    isLoaded: false,
};

interface AddTodoAction { type: 'ADD_TODO'; payload: { text: string } }
interface RemoveTodoAction { type: 'REMOVE_TODO'; payload: { id: number } }
interface ToggleTodoAction { type: 'TOGGLE_TODO'; payload: { id: number } }
interface SetTodosAction { type: 'SET_TODOS'; payload: { todos: TodoItem[] } }
interface SetIsLoadedAction { type: 'SET_IS_LOADED'; payload: { isLoaded: boolean } }
interface ReorderTodosAction { type: 'REORDER_TODOS'; payload: { startIndex: number, endIndex: number } }

type TodoAction =
    | AddTodoAction
    | RemoveTodoAction
    | ToggleTodoAction
    | SetTodosAction
    | SetIsLoadedAction
    | ReorderTodosAction;

interface TodoContextType {
    todos: TodoItem[];
    incompleteCount: number;
    addTodo: (text: string) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    reorderTodo: (startIndex: number, endIndex: number) => void;
    isLoaded: boolean;
}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        //追加
        case 'ADD_TODO':
            const newTodo: TodoItem = {
                id: Date.now(),
                text: action.payload.text,
                isCompleted: false,
            };
            return { ...state, todos: [...state.todos, newTodo],};
        //削除
        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id),};
        //切替
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
                ),
            };
        //並び替え
        case 'REORDER_TODOS':
            const { startIndex, endIndex } = action.payload;
            const newTodos = Array.from(state.todos);

            const [movedItem] = newTodos.splice(startIndex, 1);
            newTodos.splice(endIndex, 0, movedItem);
            return { ...state, todos: newTodos,};

        //初期設定
        case 'SET_TODOS':
            return { ...state, todos: action.payload.todos,};
        //ロード状態設定
        case 'SET_IS_LOADED':
            return { ...state, isLoaded: action.payload.isLoaded,};
        
        default:
            return state;
    }
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = "todorist_todos";

const loadInitialTodos = (): TodoItem[] => {
    if (typeof window === "undefined") {
        return [];
    }
    try {
        const storedTodos = localStorage.getItem(STORAGE_KEY);
        if (!storedTodos) {
            return [];
        }
        const parsedTodos: TodoItem[] = JSON.parse(storedTodos);
        return parsedTodos.map(todo => ({
            ...todo,
            isCompleted: todo.isCompleted === undefined ? false : todo.isCompleted,
        }));
    } catch (error) {
        console.error("Failed to load initial todos:", error);
        return [];
    }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const {todos, isLoaded} = state;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const initialTodos = loadInitialTodos();
            dispatch({ type: 'SET_TODOS', payload: { todos: initialTodos } });
            dispatch({ type: 'SET_IS_LOADED', payload: { isLoaded: true } });
        }
    }, []);

    useEffect(() => {
        if (!isLoaded || typeof window === "undefined") {
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error("Failed to save todos to localStorage:", error);
        }
    }, [todos, isLoaded]);

    const incompleteCount = useMemo(() => {
        return todos.filter(todo => !todo.isCompleted).length;
    }, [todos]);

    const addTodo = (text: string) => {
        if (text.trim() === "") return;
        dispatch({ type: 'ADD_TODO', payload: { text } });
    };

    const removeTodo = (id: number) => {
        dispatch({ type: 'REMOVE_TODO', payload: { id } });
    };

    const toggleTodo = (id: number) => {
        dispatch({ type: 'TOGGLE_TODO', payload: { id } });
    };

    const reorderTodo = (startIndex: number, endIndex: number) => {
        if (startIndex === endIndex) return;
        dispatch({ type: 'REORDER_TODOS', payload: { startIndex, endIndex } });
    };

    const contextValue = useMemo(() => ({
        todos,
        incompleteCount,
        addTodo,
        removeTodo,
        toggleTodo,
        reorderTodo,
        isLoaded,
    }), [todos, incompleteCount, isLoaded]);

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};