import ProjectLayout from 'layouts/Project';
import { getFileBySlug, getFiles } from 'lib/mdx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { FrontMatterSnippet, PostType, Project } from 'types/post';
import MDXComponents from '@theme/components/MDX/MDXComponents';

interface ProjectProps {
  project?: FrontMatterSnippet;
}

const Project = ({ project }: ProjectProps) => {
  const { isFallback } = useRouter();

  if (isFallback || !project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectLayout frontMatter={project.frontMatter}>
      <MDXRemote
        {...project.mdxSource}
        components={{
          ...MDXComponents,
        }}
      />
    </ProjectLayout>
  );
};

export default Project;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles(PostType.PROJECT);

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
    const project = await getFileBySlug(
      PostType.PROJECT,
      params!.slug as string
    );

    return { props: { project } };
  } catch (error) {
    // eslint-disable-next-line
    return { notFound: true };
  }
};
