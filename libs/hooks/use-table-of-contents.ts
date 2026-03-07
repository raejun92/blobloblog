'use client';

import { useCallback, useEffect, useState } from 'react';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents() {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from DOM
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3, h4');
    const extractedHeadings: TocHeading[] = Array.from(elements)
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1], 10),
      }));

    setHeadings(extractedHeadings);

    // Make headings clickable in the article
    elements.forEach((el) => {
      if (!el.id) return;
      const heading = el as HTMLElement;
      heading.style.cursor = 'pointer';
      heading.addEventListener('click', () => {
        window.history.pushState(null, '', `#${heading.id}`);
        heading.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Handle initial hash
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setActiveId(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  // Intersection Observer for active state
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Handle browser history changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveId(hash);
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Click handler for TOC items
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, '', `#${id}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  return { headings, activeId, handleClick };
}
