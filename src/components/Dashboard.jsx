import { useState, useEffect } from 'react';
import { useStreak } from '../hooks/useStreak';
import Calendar from './Calendar';
import TodoList from './TodoList';

export default function Dashboard() {
    const [greeting, setGreeting] = useState('');
    const { streak, solvedToday, markSolved, history } = useStreak();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    return (
        <div className="animate-slide-up">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    {greeting}, Coder
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Keep the fire burning.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Left Column: Todo List */}
                <div style={{ order: 2 }}> {/* On mobile, we might want this second, or first? Let's assume standard flow */}
                    {/* Actually for 2 column desktop, left is 1, right is 2. grid-template-columns handles it. */}
                    <TodoList />
                </div>

                {/* Right Column: Streak & Calendar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Streak Main Card */}
                    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(255, 100, 0, 0.3)' }}>
                            {streak} <span style={{ fontSize: '2rem', verticalAlign: 'middle' }}>Days</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Current Streak</p>

                        <button
                            className={`btn ${solvedToday ? 'btn-glass' : 'btn-primary'}`}
                            onClick={markSolved}
                            disabled={solvedToday}
                            style={{ fontSize: '1.1rem', padding: '1rem 3rem', width: '100%', transform: solvedToday ? 'scale(0.95)' : 'scale(1)' }}
                        >
                            {solvedToday ? 'Problem Solved for Today' : '🔥 Mark Problem Solved'}
                        </button>
                    </div>

                    {/* Calendar */}
                    <Calendar history={history} />
                </div>
            </div>
        </div>
    );
}
