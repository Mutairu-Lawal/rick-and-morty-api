'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavorites } from '@/hooks/useFavorites';
import CharacterCard from '@/components/CharacterCard';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

function PageContent() {
  // Reset state when on home route
  useEffect(() => {
    if (window.location.pathname === '/') {
      setSearchInput('');
      const params = new URLSearchParams();
      params.set('page', '1');
      router.replace(`/?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams?.get('page') || 1);
  const statusParam = searchParams?.get('status') || 'all';
  const qParam = searchParams?.get('q') || '';

  const [searchInput, setSearchInput] = useState(qParam);
  const debounced = useDebounce(searchInput, 400);

  const { toggleFavorite, isFavorite } = useFavorites();

  // sync debounced search to URL
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (debounced) params.set('q', debounced);
    else params.delete('q');
    params.set('page', '1');
    router.push(`${window.location.pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const page = pageParam;

  const { data, isLoading, isError, refetch } = useQuery<
    CharactersResponse,
    Error
  >({
    queryKey: ['characters', page, debounced, statusParam],
    queryFn: () => getCharacters(page, debounced, statusParam),
    // keepPreviousData is not a valid option for useQuery in v5
  });

  const results: Character[] = data?.results || [];

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p>Error loading characters...</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search & Filter */}
      <div className="mb-4 flex gap-4 items-center">
        <h2 className="text-2xl font-semibold">Characters</h2>
        <div className="ml-auto flex gap-2 items-center">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name..."
            className="border rounded px-3 py-2"
            aria-label="Search characters"
          />
          <select
            value={statusParam}
            onChange={(e) => {
              const params = new URLSearchParams(
                Array.from(searchParams.entries())
              );
              if (e.target.value && e.target.value !== 'all')
                params.set('status', e.target.value);
              else params.delete('status');
              params.set('page', '1');
              router.push(`${window.location.pathname}?${params.toString()}`);
            }}
            className="border rounded px-3 py-2"
            aria-label="Filter by status"
          >
            <option value="all" className="bg-gray-900 dark:bg-gray-800">
              All Status
            </option>
            <option value="alive" className="bg-gray-900 dark:bg-gray-800">
              Alive
            </option>
            <option value="dead" className="bg-gray-900 dark:bg-gray-800">
              Dead
            </option>
            <option value="unknown" className="bg-gray-900 dark:bg-gray-800">
              Unknown
            </option>
          </select>
        </div>
      </div>

      {/* Character Grid */}
      {isLoading ? (
        <div>Loading...</div>
      ) : results.length === 0 ? (
        <div className="p-6">No characters found for your search.</div>
      ) : (
        <div>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {results.map((char: Character) => (
              <CharacterCard
                key={char.id}
                character={char}
                isFavorite={isFavorite(char.id)}
                onToggleFavorite={() => toggleFavorite(char.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => {
                const params = new URLSearchParams(
                  Array.from(searchParams.entries())
                );
                params.set('page', String(Math.max(1, page - 1)));
                router.push(`${window.location.pathname}?${params.toString()}`);
              }}
              className="px-3 py-1 rounded border"
            >
              Prev
            </button>
            <div className="flex-1 text-center">Page {page}</div>
            <button
              disabled={!data?.info?.next}
              onClick={() => {
                const params = new URLSearchParams(
                  Array.from(searchParams.entries())
                );
                params.set('page', String(page + 1));
                router.push(`${window.location.pathname}?${params.toString()}`);
              }}
              className="px-3 py-1 rounded border"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
