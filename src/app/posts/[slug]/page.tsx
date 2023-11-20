import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <div className="[&>*:last-child]:mb-0 [&>*]:mb-3" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export default PostLayout;
