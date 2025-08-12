'use client';
import Link from 'next/link';
import Image from 'next/image';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) {
  return (
    <div className="border rounded p-2 bg-white dark:bg-gray-800 h-full flex flex-col">
      <Image
        src={character.image}
        alt={character.name}
        className="rounded mb-2 w-full object-cover"
        width={140}
        height={140}
        style={{ height: 140 }}
      />
      <h3 className="font-semibold">{character.name}</h3>
      <p className="text-sm">
        {character.status} • {character.species}
      </p>
      <div className="mt-auto flex justify-between items-center">
        <Link
          href={`/characters/${character.id}`}
          className="text-blue-600 dark:text-blue-300"
        >
          Details
        </Link>
        <button onClick={onToggleFavorite} aria-label="Toggle favorite">
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}
