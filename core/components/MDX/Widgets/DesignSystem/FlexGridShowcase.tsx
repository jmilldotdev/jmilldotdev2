import { Box, Flex } from '@maximeheckel/design-system';
import Card from '@theme/components/Card';
import { HighlightedCodeText } from '@theme/components/Code/CodeBlock';
import Grid from '@theme/components/Grid';
import React from 'react';

const StyledBox = () => (
  <Box
    css={{
      height: 50,
      width: 50,
      borderRadius: 'var(--border-radius-2)',
      background: 'var(--maximeheckel-colors-brand)',
    }}
  />
);

const FlexGridShowcase = () => {
  const codeString = `const App = () => {
  return (
    <>
      <Flex
        alignItems="center"
        direction="column"
        justifyContent="center"
        gap="2"
      >
        <Box css={...} />
        <Box css={...} />
      </Flex>
      <Grid columns="2" gap="4">
        <Box css={...} />
        <Box css={...} />
        <Box css={...} />
        <Box css={...} />
      </Grid>
    </>
  );
};`;

  return (
    <Card
      css={{
        marginBottom: '2.25rem',
      }}
    >
      <Card.Body as={Flex} direction="column" dotMatrix gap="6">
        <Flex
          alignItems="center"
          direction="column"
          justifyContent="center"
          gap="2"
        >
          <StyledBox />
          <StyledBox />
        </Flex>
        <Grid columns="2" gap="4">
          <StyledBox />
          <StyledBox />
          <StyledBox />
          <StyledBox />
        </Grid>
      </Card.Body>
      <HighlightedCodeText codeString={codeString} language="jsx" />
    </Card>
  );
};

export default FlexGridShowcase;
