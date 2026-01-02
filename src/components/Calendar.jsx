import React, { useState } from 'react';

const Calendar = ({ history }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        // 0 = Sunday, 1 = Monday, ... 6 = Saturday
        // Adjust to make Monday start (1 = Monday ... 7 = Sunday) if desired
        // Standard JS: 0=Sun. Let's stick to Sun-Sat first or we can do Mon-Sun.
        // Screenshot shows Mon-Sun.
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // 0 (Sun) -> 6, 1 (Mon) -> 0
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSolved = (day) => {
        // Format: YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${year}-${month}-${dayStr}`;
        return history.includes(dateStr);
    };

    // Generate grid
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalSlots = [...blanks, ...days];

    return (
        <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={prevMonth} className="btn btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                    &lt;
                </button>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {monthNames[currentDate.getMonth()]} <span style={{ color: 'var(--text-muted)' }}>{currentDate.getFullYear()}</span>
                </span>
                <button onClick={nextMonth} className="btn btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                    &gt;
                </button>
            </div>

            {/* Weekdays */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '1rem', textAlign: 'center' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{day}</div>
                ))}
            </div>

            {/* Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {totalSlots.map((day, index) => {
                    if (!day) return <div key={`blank-${index}`}></div>;

                    const solved = isSolved(day);
                    return (
                        <div key={day} style={{
                            aspectRatio: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            fontSize: '0.9rem',
                            color: 'var(--text-muted)',
                            background: solved ? 'transparent' : 'rgba(255,255,255,0.03)',
                            position: 'relative'
                        }}>
                            {solved ? (
                                <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px rgba(255, 69, 0, 0.5))' }}>🔥</span>
                            ) : day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
