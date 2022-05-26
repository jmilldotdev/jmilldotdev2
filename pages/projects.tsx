import { Box, css, H2 } from '@maximeheckel/design-system';
import FeaturedProjectCard from '@theme/components/FeaturedProjectCard';
import Grid from '@theme/components/Grid';
import ProjectCard from '@theme/components/ProjectCard';
import Layout from '@theme/layout';
import { getAllFilesFrontMatter } from 'lib/mdx';
import React from 'react';
import { PostType, Project } from 'types/post';

const wrapperGrid = css({
  '> *': {
    gridColumn: 2,
  },
});

interface Props {
  projects: Project[];
}

const ProjectsPage = (props: Props) => {
  const { projects } = props;
  const categories = projects
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <Grid columns="medium" gapX={4} gapY={12} className={wrapperGrid()}>
        <Box>
          <section>
            <H2>Featured</H2>
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <FeaturedProjectCard key={project.slug} project={project} />
              ))}
          </section>
          {categories.map((category) => (
            <section key={category}>
              <H2>{category}</H2>
              <Grid columns={2} css={{ width: '100%' }} gapX={6} gapY={6}>
                {projects
                  .filter(
                    (project) =>
                      project.category === category && !project.featured
                  )
                  .map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
              </Grid>
            </section>
          ))}
        </Box>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps() {
  const projects = await getAllFilesFrontMatter(PostType.PROJECT);

  return { props: { projects } };
}

export default ProjectsPage;
