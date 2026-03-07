'use client';

import { ReactNode } from 'react';
import { TableOfContents } from './table-of-contents';

interface PostLayoutWrapperProps {
  children: ReactNode;
}

export function PostLayoutWrapper({ children }: PostLayoutWrapperProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 xl:grid xl:grid-cols-[1fr_minmax(0,36rem)_1fr] xl:gap-8">
      <div className="hidden xl:block" />

      <main className="min-w-0">{children}</main>

      <aside className="hidden xl:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
