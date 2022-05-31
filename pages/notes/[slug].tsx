import MDXComponents from '@theme/components/MDX/MDXComponents';
import NoteLayout from 'layouts/Note';
import { getFileBySlug, getFiles } from 'lib/mdx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { PostType, Note } from 'types/post';

interface NoteProps {
  note?: Note;
}

const Note = ({ note }: NoteProps) => {
  const { isFallback } = useRouter();

  if (isFallback || !note) {
    return <div>Loading...</div>;
  }

  return (
    <NoteLayout frontMatter={note.frontMatter}>
      <MDXRemote
        {...note.mdxSource}
        components={{
          ...MDXComponents,
        }}
      />
    </NoteLayout>
  );
};

export default Note;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles(PostType.NOTE);

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const note = await getFileBySlug(PostType.NOTE, params!.slug as string);

    return { props: { note } };
  } catch (error) {
    // eslint-disable-next-line
    return { notFound: true };
  }
};
