import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/') },
  },
}));

const rehypeOptions = {
  theme: 'one-dark-pro',
  keepBackground: true,
};

export default makeSource({
  contentDirPath: './contents',
  documentTypes: [Post],
  mdx: {
    // @ts-expect-error
    rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
  },
});
