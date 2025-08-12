'use client';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  ...rest
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 ${className}`}
      {...rest}
    />
  );
}
