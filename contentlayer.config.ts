import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
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

export default makeSource({ contentDirPath: './contents', documentTypes: [Post] });
