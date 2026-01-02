import { useState, useEffect } from 'react';

const STREAK_KEY = 'dsa_streak_data';

export function useStreak() {
    const [streak, setStreak] = useState(0);
    const [history, setHistory] = useState([]); // List of ISO date strings (YYYY-MM-DD)
    const [solvedToday, setSolvedToday] = useState(false);

    // Helper to get today's date string in LOCAL TIME (YYYY-MM-DD)
    const getTodayStr = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const checkStatus = () => {
        const data = localStorage.getItem(STREAK_KEY);
        const todayStr = getTodayStr();

        if (data) {
            const parsed = JSON.parse(data);
            setStreak(parsed.streak || 0);
            setHistory(parsed.history || []);

            if (parsed.history && parsed.history.includes(todayStr)) {
                setSolvedToday(true);
            } else {
                setSolvedToday(false);
            }
        }
    };

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        const handleStorage = () => checkStatus();
        window.addEventListener('storage', handleStorage);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    const markSolved = () => {
        // We allow re-clicking to toggle? No, usually just Mark. 
        // But if they clicked, UI disables it.
        if (solvedToday) return;

        const todayStr = getTodayStr();

        // Calculate new streak based on YESTERDAY in LOCAL TIME
        let newStreak = streak;

        const d = new Date();
        d.setDate(d.getDate() - 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const yesterdayStr = `${year}-${month}-${day}`;

        if (history.includes(yesterdayStr)) {
            newStreak += 1;
        } else {
            newStreak = 1;
        }

        const newHistory = [...history, todayStr];

        const newData = {
            streak: newStreak,
            history: newHistory
        };

        localStorage.setItem(STREAK_KEY, JSON.stringify(newData));

        setStreak(newStreak);
        setHistory(newHistory);
        setSolvedToday(true);
    };

    return { streak, history, solvedToday, markSolved };
}
