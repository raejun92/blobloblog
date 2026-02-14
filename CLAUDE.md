# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**blobloblog** is a personal tech blog built with Next.js 13 App Router, TypeScript, and Contentlayer for MDX-based content management. Blog posts are written in MDX under `contents/posts/` and statically generated at build time.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build (also triggers Contentlayer content generation)
- `npm run lint` — Run ESLint (next/core-web-vitals)
- `npm start` — Start production server

## Architecture

### Content Pipeline

MDX files in `contents/posts/` → Contentlayer processes them (defined in `contentlayer.config.ts`) → generates typed data at `.contentlayer/generated` → consumed by pages via `import { allPosts } from 'contentlayer/generated'`.

Each post requires `title` and `date` frontmatter fields. `slug` and `url` are computed automatically from the file path. Code blocks are syntax-highlighted server-side using rehype-pretty-code with Shiki (one-dark-pro theme).

### Routing

- `/` — Home page listing all posts (`src/app/page.tsx`)
- `/posts/[slug]` — Dynamic post pages, statically generated via `generateStaticParams()` (`src/app/posts/[slug]/page.tsx`)

### Component Organization

- `src/app/` — Next.js App Router pages and layout
- `ui/` — Presentational components (MDX renderer, theme toggle, progress bar, table of contents)
- `provider/` — Context providers (theme-provider wrapping next-themes)
- `libs/` — Utilities (`cn()` function combining clsx + tailwind-merge)

### Key Patterns

- **Dark mode**: Class-based via next-themes (`darkMode: ['class']` in Tailwind). Use `dark:` prefix for dark variants.
- **Client components**: Theme toggle and progress bar are dynamically imported with `{ ssr: false }` to avoid hydration mismatches.
- **Styling**: Tailwind CSS + `@tailwindcss/typography` for prose content. Use `cn()` from `@/libs/utils` for conditional class merging.
- **Global styles**: Custom code block line numbering and scrollbar hiding in `src/app/globals.css`.

## Path Aliases (tsconfig.json)

- `@/*` → project root (`./`)
- `contentlayer/generated` → `./.contentlayer/generated`

## Code Style

Enforced by Prettier (`.prettierrc`):
- 120 char print width, single quotes, trailing commas, semicolons
- Auto-sorted imports via `@trivago/prettier-plugin-sort-imports`
- Auto-sorted Tailwind classes via `prettier-plugin-tailwindcss`
