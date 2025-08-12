import './globals.css';
import Providers from '@/lib/Providers';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export const metadata = {
  title: 'Rick & Morty Explorer',
  description: 'Explore characters from the Rick & Morty API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Providers>
          <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
            <Link href={'/'}>
              <h1 className="text-xl font-bold">Rick & Morty Explorer</h1>
            </Link>
            <ThemeToggle />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
