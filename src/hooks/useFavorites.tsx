'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
