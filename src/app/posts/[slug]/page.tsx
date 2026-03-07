import { allPosts } from 'contentlayer2/generated';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'ui/mdx-components';
import { PostLayoutWrapper } from '@/ui/post-layout-wrapper';

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) return {};

  return { title: post.title, description: post.description };
};

const PostLayout = async ({ params }: PostProps) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <PostLayoutWrapper>
      <article className="prose py-8 dark:prose-invert">
        <div className="mb-8 text-center">
          <h1>{post.title}</h1>
          <time dateTime={post.date} className="mb-1 text-xs text-gray-500">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <Mdx code={post.body.code} />
      </article>
    </PostLayoutWrapper>
  );
};

export default PostLayout;
