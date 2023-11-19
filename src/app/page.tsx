import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Link from 'next/link';

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-gray-800 hover:text-gray-900 dark:text-violet-700 dark:hover:text-violet-950"
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

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Bla Bla Blog</h1>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
}
