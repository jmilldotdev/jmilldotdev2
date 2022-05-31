import { Anchor, css, Flex, H2, Text } from '@maximeheckel/design-system';
import { projects } from 'config/internals';
import React from 'react';
import { Project } from 'types/post';
import siteConfig from 'config/site';
import Layout from '@theme/layout';
import Grid from '@theme/components/Grid';
import Hero from '@theme/components/Hero';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  frontMatter: Project;
}

const contentClass = css({
  padding: '20px 0px',
  gridColumn: '2',
  color: 'var(--maximeheckel-colors-typeface-secondary)',

  h3: {
    marginTop: '2em',
  },

  section: {
    marginTop: '5em',
  },
});

const ProjectLayout = ({ children, frontMatter }: Props) => {
  const { slug, title, cover, github, description } = frontMatter;
  const path = `/${projects}/${slug}/`;
  const postUrl = `${siteConfig.url}${path}`;

  const headerProps = {
    title,
    offsetHeight: 128,
    showProgressBarOnMobile: true,
  };

  return (
    <Layout footer={true} header={true} headerProps={headerProps}>
      <article className="h-entry">
        <Grid columns="small" gapX={4}>
          <Hero>
            <div
              style={{ marginBottom: '24px', fontSize: 'var(--font-size-2)' }}
            >
              <Link href={`${projects}`} passHref>
                <Anchor arrow="left" data-testid="home-link" discreet>
                  Projects
                </Anchor>
              </Link>
            </div>
            <Hero.Title
              className="p-name"
              data-testid={`project-title-${title}`}
            >
              {title}
            </Hero.Title>
            <Hero.Info>
              <Flex
                css={{
                  marginBottom: 'var(--space-3)',
                }}
                wrap="wrap"
              >
                <Text
                  variant={'tertiary'}
                  size={'5'}
                  css={{ marginBottom: '0rem' }}
                >
                  {description}
                </Text>
              </Flex>
            </Hero.Info>
            {cover ? <Hero.Img className="u-photo" src={cover} /> : null}
          </Hero>
          <div className={contentClass()}>{children}</div>
        </Grid>
      </article>
    </Layout>
  );
};

export default ProjectLayout;
