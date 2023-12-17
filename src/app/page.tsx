import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Link from 'next/link';

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="prose mx-auto max-w-xl py-8 dark:prose-invert">
      <h1 className="mb-8 text-center font-black">Blo Blo Blog</h1>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
}

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1">
        <Link
          href={post.url}
          className="text-gray-800 no-underline hover:text-gray-900 dark:text-violet-700 dark:hover:text-violet-400"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mb-1">{post.description}</p>
      <time dateTime={post.date} className="block text-xs text-gray-600 [&>*:last-child]:mb-0 [&>*]:mb-3">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  );
}
