import { css, Box, Text, H1, H2, styled } from '@maximeheckel/design-system';
import Grid from '@theme/components/Grid';
import Layout from '@theme/layout';
import { notes } from 'config/internals';
import Link from 'next/link';
import React from 'react';
import { Note } from 'types/post';

const wrapperGrid = css({
  '> *': {
    gridColumn: 2,
  },
});

const Block = styled(Box, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '10px',
  borderRadius: 'var(--border-radius-2)',
  marginLeft: '-10px',
  height: '60px',
  boxShadow: 'none',
  backgroundColor: 'var(--article-block-background-color, "transparent")',
  color:
    'var(--article-block-color, var(--maximeheckel-colors-typeface-primary))',
  transition: 'background-color 0.25s, box-shadow 0.25s, color 0.25s',

  '&:focus': {
    '--article-block-background-color': 'var(--maximeheckel-colors-emphasis)',
    '--article-block-color': 'var(--maximeheckel-colors-brand)',
  },

  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      '--article-block-background-color': 'var(--maximeheckel-colors-emphasis)',
      '--article-block-color': 'var(--maximeheckel-colors-brand)',
    },
  },

  '@media (max-width: 700px)': {
    height: '100px',
  },
});

const note: Note = {
  title: 'GPT-3 Prompts',
  slug: 'gpt-3-prompts',
};

const NotesPage = () => {
  return (
    <Layout footer header headerProps={{ offsetHeight: 128 }}>
      <Grid columns="medium" gapX={4} gapY={12} className={wrapperGrid()}>
        <Box>
          <H1>Notebook</H1>
          <Text as="p">
            This is a place to keep notes and ideas. It is a place for
            works-in-progress, and things that I value but are not quite as
            polished as my published essays.
          </Text>
          <section>
            <H2>Most Recent Notes</H2>
            <Link href={`/${notes}/${note.slug}/`} passHref>
              {/* Revisit this component: merge Anchor and block together (extend block from Anchor) */}
              <a style={{ textDecoration: 'none', fontWeight: 500 }}>
                <Block data-testid="article-link">{note.title}</Block>
              </a>
            </Link>
          </section>
        </Box>
      </Grid>
    </Layout>
  );
};

export default NotesPage;
