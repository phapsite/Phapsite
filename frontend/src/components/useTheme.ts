// hooks/useTheme.ts - Manual implementation
'use client';

import {
    useEffect,
    useState
} from 'react';

export function useTheme() {
    const [isDark,
        setIsDark] = useState(false);

    useEffect(() => {
        // Check initial theme
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const newIsDark = document.documentElement.classList.contains('dark');
            setIsDark(newIsDark);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return {
        isDark,
        toggleTheme
    };
}