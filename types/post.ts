import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export enum PostType {
  SNIPPET = 'snippet',
  BLOGPOST = 'blogPost',
  PROJECT = 'project',
  NOTE = 'note',
}

export const typeToPath = {
  [PostType.BLOGPOST]: 'posts',
  [PostType.SNIPPET]: 'snippets',
  [PostType.PROJECT]: 'projects',
  [PostType.NOTE]: 'notes',
};

export type ReadingTime = {
  text: string;
};

export type Post = {
  colorFeatured?: string;
  cover?: string;
  date: string;
  updated?: string;
  featured?: boolean;
  fontFeatured?: string;
  keywords?: string[];
  slug: string;
  subtitle: string;
  title: string;
  type: PostType.BLOGPOST;
};

export type FrontMatterPost = {
  frontMatter: Post & {
    readingTime: ReadingTime;
  };
  tweetIDs: string[];
  mdxSource: MDXRemoteSerializeResult;
};

export type Snippet = {
  date: string;
  language: string;
  slug: string;
  title: string;
  description: string;
  snippetImage: string;
  type: PostType.SNIPPET;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  colorFeatured?: string;
  type: PostType.PROJECT;
  github?: string;
  cover?: string;
};

export type Note = {
  title: string;
  slug: string;
  type: PostType.NOTE;
};

export type FrontMatter<T> = {
  frontMatter: T;
  mdxSource: MDXRemoteSerializeResult;
};

export type PostByType<T> = T extends PostType.BLOGPOST
  ? Post
  : T extends PostType.SNIPPET
  ? Snippet
  : T extends PostType.PROJECT
  ? Project
  : T extends PostType.NOTE
  ? Note
  : never;

export type FrontMatterPostType<T> = T extends PostType.BLOGPOST
  ? FrontMatterPost
  : T extends PostType.SNIPPET
  ? FrontMatter<Snippet>
  : T extends PostType.PROJECT
  ? FrontMatter<Project>
  : T extends PostType.NOTE
  ? FrontMatter<Note>
  : never;
