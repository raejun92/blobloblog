import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from 'provider/theme-provider';
import ThemeToggle from 'ui/theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'blo blo blog',
  description: 'Blogging anything',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <div className="mx-auto mt-2 flex max-w-xl items-center justify-between">
              <Link href="/">Home</Link>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
