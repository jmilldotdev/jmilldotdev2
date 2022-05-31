import { Card, H3, Text } from '@maximeheckel/design-system';
import { projects } from 'config/internals';
import Link from 'next/link';
import React from 'react';
import { Project } from 'types/post';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`${projects}/${project.slug}`}>
      <a
        style={{
          textDecoration: 'none',
          color: 'var(--maximeheckel-colors-typeface-secondary)',
        }}
      >
        <Card depth={1}>
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
  );
};

export default ProjectCard;
