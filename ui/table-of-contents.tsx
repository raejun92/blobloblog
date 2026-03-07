'use client';

import { cn } from '@/libs/utils';
import { useTableOfContents } from '@/libs/hooks/use-table-of-contents';

export function TableOfContents() {
  const { headings, activeId, handleClick } = useTableOfContents();

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-64 overflow-y-auto xl:block"
    >
      <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">목차</h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                'block w-full truncate text-left transition-colors duration-200 hover:text-slate-900 dark:hover:text-slate-100',
                activeId === heading.id
                  ? 'font-medium text-slate-900 dark:text-slate-100'
                  : 'text-slate-500 dark:text-slate-400',
              )}
              title={heading.text}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', window.location.pathname);
        }}
        className="mt-6 text-xs text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
      >
        ↑ 맨 위로
      </button>
    </nav>
  );
}
