// hooks/useTheme.ts - Manual implementation
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
var react_1 = require("react");
function useTheme() {
    var _a = (0, react_1.useState)(false), isDark = _a[0], setIsDark = _a[1];
    (0, react_1.useEffect)(function () {
        // Check initial theme
        var isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
        // Listen for theme changes
        var observer = new MutationObserver(function () {
            var newIsDark = document.documentElement.classList.contains('dark');
            setIsDark(newIsDark);
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return function () { return observer.disconnect(); };
    }, []);
    var toggleTheme = function () {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };
    return {
        isDark: isDark,
        toggleTheme: toggleTheme
    };
}
exports.useTheme = useTheme;
