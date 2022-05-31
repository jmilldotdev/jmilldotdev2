import { Box, Card, H3, styled, Text } from '@maximeheckel/design-system';
import { projects } from 'config/internals';
import { motion, MotionProps } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { Project } from 'types/post';

const cardVariants = {
  hover: {
    scale: 1.05,
  },
  initial: {
    scale: 1,
  },
};

const glowVariants = {
  hover: {
    opacity: 0.8,
  },
  initial: {
    scale: 1.05,
    opacity: 0,
  },
};

const FeaturedProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.li
      style={{
        position: 'relative',
        marginLeft: '-var(--space-1)',
        marginRight: '-var(--space-1)',
        listStyle: 'none',
        cursor: 'pointer',
        marginBottom: 'calc(1.45rem / 2)',
        lineHeight: '1.9',
        letterSpacing: '0.3px',
      }}
      key={project.slug}
      data-testid="featured-article-item"
      initial="initial"
      whileHover="hover"
    >
      <Link href={`${projects}/${project.slug}`}>
        <a
          style={{
            textDecoration: 'none',
            color: 'var(--maximeheckel-colors-typeface-secondary)',
          }}
        >
          <Glow
            css={{
              background: project.colorFeatured,
            }}
            variants={glowVariants}
            transition={{
              type: 'tween',
              ease: 'easeOut',
              duration: 0.4,
            }}
          />
          <Box
            css={{
              height: '95%',
              width: '105%',
              position: 'absolute',
              borderRadius: 'var(--border-radius-2)',
              top: '50%',
              left: '50%',
              background: 'var(--maximeheckel-colors-body)',
              transform: 'translateY(-50%) translateX(-50%)',
              filter: 'blur(20px)',
              transition: '0.5s',

              '@media(max-width: 700px)': {
                display: 'none',
              },
            }}
          />
          <Card<MotionProps>
            as={motion.div}
            variants={cardVariants}
            transition={{
              type: 'tween',
              ease: 'easeOut',
              duration: 0.4,
            }}
            depth={1}
          >
            <Card.Body>
              <H3
                gradient
                css={{
                  marginBottom: '8px',
                  backgroundImage: project.colorFeatured!,
                }}
              >
                {project.title}
              </H3>
              <Text as="p" css={{ marginBottom: '0px' }}>
                {project.description}
              </Text>
            </Card.Body>
          </Card>
        </a>
      </Link>
    </motion.li>
  );
};

const Glow = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  webkitFilter: 'blur(15px)',
  filter: 'blur(15px)',
  borderRadius: 'var(--border-radius-2)',
});

export default FeaturedProjectCard;
