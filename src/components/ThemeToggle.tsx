'use client';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600"
    >
      {theme === 'light' ? '🌙 Dark' : '☀ Light'}
    </button>
  );
}
