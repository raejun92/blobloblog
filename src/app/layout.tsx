import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from 'provider/theme-provider';
import ProgressBar from 'ui/progress-bar';

const ThemeToggle = dynamic(() => import('@/ui/theme-toggle'), { ssr: false });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'blo blo blog',
  description: 'Blogging anything',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-white text-slate-900 antialiased duration-500 dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProgressBar />
          <header>
            <div className="mx-auto flex max-w-xl items-center justify-between pt-2">
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
