import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'ui/mdx-components';

interface PostProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const post = await getPost(params);

  if (!post) return {};

  return { title: post.title, description: post.description };
};

async function getPost(params: PostProps['params']) {
  const slug = params?.slug;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) null;

  return post;
}

const PostLayout = async ({ params }: PostProps) => {
  const post = await getPost(params);

  if (!post) notFound();

  return (
    <article className="prose mx-auto max-w-xl py-8 dark:prose-invert">
      <div className="mb-8 text-center">
        <h1>{post.title}</h1>
        <time dateTime={post.date} className="mb-1 text-xs text-gray-500">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <Mdx code={post.body.code} />
    </article>
  );
};

export default PostLayout;
