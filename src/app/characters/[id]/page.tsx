'use client';
import { useQuery } from '@tanstack/react-query';
import { getCharacter } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <img src={data.image} alt={data.name} className="w-48 rounded" />
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p>
        {data.status} - {data.species}
      </p>
    </div>
  );
}
