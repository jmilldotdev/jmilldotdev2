/* eslint-disable react/no-unescaped-entities */
import {
  css,
  styled,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VisuallyHidden,
  H1,
  H2,
} from '@maximeheckel/design-system';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Grid from '@theme/components/Grid';
import Layout from '@theme/layout';
import { getAllFilesFrontMatter } from 'lib/mdx';
import { Post, PostType } from 'types/post';
import { url } from 'config/site';
import { notes, projects, startHere } from 'config/internals';
import FeaturedPostCard from '@theme/components/FeaturedPostCard';

const NewsletterForm = dynamic(
  () => import('@theme/components/NewsletterForm')
);

interface Props {
  posts: Post[];
}

let year = 0;

const wrapperGrid = css({
  '> *': {
    gridColumn: 2,
  },
});

const IndexPage = (props: Props) => {
  const { posts } = props;
  const offsetHeight = 128;

  return (
    <Layout footer header headerProps={{ offsetHeight }}>
      <Grid columns="medium" gapX={4} gapY={12} className={wrapperGrid()}>
        <Box>
          <H1>
            Hey, I'm jmill.{' '}
            <Text variant="secondary" size="7" weight="4">
              I'm a software engineer, creative coder, writer, and information
              nerd. Welcome to my humble internet home. 🏡
            </Text>
          </H1>
          <Flex
            gap={4}
            css={{
              marginLeft: '-var(--space-3)',
              marginRight: '-var(--space-3)',
            }}
          >
            <a
              href={startHere}
              style={{ textDecoration: 'none' }}
              tabIndex={-1}
            >
              <Button variant="secondary" endIcon={<Icon.External />}>
                Start Here
              </Button>
              <VisuallyHidden as="p">
                Link redirects to my start here page: {url + startHere}
              </VisuallyHidden>
            </a>
            <a href={projects} style={{ textDecoration: 'none' }} tabIndex={-1}>
              <Button variant="secondary" endIcon={<Icon.External />}>
                Projects
              </Button>
              <VisuallyHidden as="p">
                Link redirects to my projects page: {url + projects}
              </VisuallyHidden>
            </a>
            <a href={notes} style={{ textDecoration: 'none' }} tabIndex={-1}>
              <Button variant="secondary" endIcon={<Icon.External />}>
                Notebook
              </Button>
              <VisuallyHidden as="p">
                Link redirects to my notes page: {url + notes}
              </VisuallyHidden>
            </a>
          </Flex>
        </Box>
        <section>
          <H2>Featured Articles</H2>
          <Grid
            as="ul"
            css={{
              marginLeft: '0px',
              marginBottom: '0px',
              padding: '0px',
            }}
            data-testid="featured-list"
            gapY={4}
          >
            {posts
              .filter((post) => post.featured)
              .map((post) => {
                return (
                  <FeaturedPostCard
                    post={post}
                    key={post.slug}
                  ></FeaturedPostCard>
                );
              })}
          </Grid>
        </section>
        <section>
          <H2>All articles</H2>
          <Grid
            as="ul"
            css={{
              margin: 0,
              padding: 0,
            }}
            data-testid="article-list"
            gapY={1}
          >
            {posts.map((post) => {
              const currentYear = new Date(post.date).getFullYear();
              let printYear;

              if (currentYear !== year) {
                printYear = true;
                year = currentYear;
              } else {
                printYear = false;
              }

              return (
                <li
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    marginBottom: 'calc(1.45rem / 2)',
                    lineHeight: '1.9',
                    letterSpacing: '0.3px',
                  }}
                  key={post.slug}
                  data-testid="article-item"
                >
                  {printYear ? (
                    <Text
                      as="p"
                      weight="4"
                      css={{
                        paddingTop: '30px',
                      }}
                    >
                      {currentYear}
                    </Text>
                  ) : null}
                  <Link href={`/posts/${post.slug}/`} passHref>
                    {/* Revisit this component: merge Anchor and block together (extend block from Anchor) */}
                    <a style={{ textDecoration: 'none', fontWeight: 500 }}>
                      <Block data-testid="article-link">
                        <Text
                          as="p"
                          size="1"
                          variant="tertiary"
                          weight="3"
                          css={{
                            minWidth: '52px',
                            marginRight: '32px',
                            marginBottom: '0px',
                          }}
                        >
                          {format(new Date(Date.parse(post.date)), 'MMM dd')}
                        </Text>
                        {post.title}
                      </Block>
                    </a>
                  </Link>
                </li>
              );
            })}
          </Grid>
        </section>
        <section>
          <H2>Newsletter</H2>
          <NewsletterForm large />
        </section>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter(PostType.BLOGPOST);
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return { props: { posts } };
}

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

export default IndexPage;
