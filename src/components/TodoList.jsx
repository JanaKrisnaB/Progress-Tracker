import React, { useState, useEffect } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('dsa_todos');
        if (saved) {
            setTodos(JSON.parse(saved));
        } else {
            // Default items
            setTodos([
                { id: 1, text: 'Review Binary Search', completed: false },
                { id: 2, text: 'Solve LeetCode Daily', completed: false }
            ]);
        }
    }, []);

    const saveTodos = (newTodos) => {
        setTodos(newTodos);
        localStorage.setItem('dsa_todos', JSON.stringify(newTodos));
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newTodos = [...todos, { id: Date.now(), text: input, completed: false }];
        saveTodos(newTodos);
        setInput('');
    };

    const toggleTodo = (id) => {
        const newTodos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTodos(newTodos);
    };

    const removeTodo = (id) => {
        const newTodos = todos.filter(t => t.id !== id);
        saveTodos(newTodos);
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem' }}>Focus List</h3>

            <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add task..."
                    style={{
                        flex: 1, padding: '0.75rem', borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-main)', outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>+</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.75rem', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.03)',
                            transition: 'var(--transition)'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            style={{ accentColor: 'var(--primary)', width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
                        />
                        <span style={{
                            flex: 1,
                            color: todo.completed ? 'var(--text-muted)' : 'var(--text-main)',
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => removeTodo(todo.id)}
                            style={{
                                background: 'none', border: 'none', color: 'var(--text-muted)',
                                cursor: 'pointer', fontSize: '1.1rem', padding: '0 0.25rem'
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                {todos.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', fontStyle: 'italic' }}>
                        No active tasks. Time to grind!
                    </p>
                )}
            </div>
        </div>
    );
}
