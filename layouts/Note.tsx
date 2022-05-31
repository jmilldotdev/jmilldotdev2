import { Anchor, css } from '@maximeheckel/design-system';
import Grid from '@theme/components/Grid';
import Hero from '@theme/components/Hero';
import Layout from '@theme/layout';
import { notes } from 'config/internals';
import Link from 'next/link';
import React from 'react';
import { Note } from 'types/post';

interface Props {
  children: React.ReactNode;
  frontMatter: Note;
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

const NoteLayout = ({ children, frontMatter }: Props) => {
  const { title } = frontMatter;
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
              <Link href={`${notes}`} passHref>
                <Anchor arrow="left" data-testid="home-link" discreet>
                  Notes
                </Anchor>
              </Link>
            </div>
            <Hero.Title
              className="p-name"
              data-testid={`project-title-${title}`}
            >
              {title}
            </Hero.Title>
          </Hero>
          <div className={contentClass()}>{children}</div>
        </Grid>
      </article>
    </Layout>
  );
};

export default NoteLayout;
