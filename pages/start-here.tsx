import {
  Anchor,
  Box,
  Button,
  css,
  EM,
  Text,
} from '@maximeheckel/design-system';
import Grid from '@theme/components/Grid';
import Layout from '@theme/layout';
import { twitterUrl } from 'config/site';
import Image from 'next/image';
import React from 'react';

const wrapperGrid = css({
  '> *': {
    gridColumn: 2,
  },
});

const roundedFull = css({
  borderRadius: '50%',
});

const StartHerePage = () => {
  return (
    <Layout footer header headerProps={{ offsetHeight: 128 }}>
      <Grid columns="medium" gapX={4} gapY={12} className={wrapperGrid()}>
        <Box>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Image
              src="/static/images/me-sq.jpg"
              alt="A picture of me"
              width={200}
              height={200}
              className={roundedFull()}
            />
          </div>
          <Text as="p" size="3" variant="secondary">
            {`My name's Jonathan Miller, but I go by`} <EM>jmill</EM>.
          </Text>

          <Text as="p" size="3" variant="secondary">
            I am <EM>29</EM> years old,{' '}
            {`and currently living the nomadic life.
            You can find me me wherever it's 80+ and sunny. 😎`}
          </Text>

          <Text as="p" size="3" variant="secondary">
            I am a <EM>software engineer, creative coder, writer,</EM> and{' '}
            <EM>PKM nerd</EM>.
          </Text>

          <Text as="p" size="3" variant="secondary">
            Some of my main interests include:
            <ul>
              <li>
                <EM>Large Language Models</EM> (like GPT-3)
              </li>
              <li>
                <EM>Text-to-Image models</EM> and AI art
              </li>
              <li>
                <EM>Cryptocurrency and NFTs</EM>
              </li>
              <li>
                <EM>Chatbots and automation</EM>
              </li>
              <li>
                <EM>Personal Knowledge Management</EM> and the science of
                thought
              </li>
            </ul>
            Some other interests include:{' '}
            <EM>tarot & divination, cooking, swimming, climbing, poker</EM>, and{' '}
            <EM>collecting rare books</EM>.
          </Text>

          <Text as="p" size="3" variant="secondary">
            You should check out <Anchor href={'/projects'}>my projects</Anchor>
            , or reach out on <Anchor href={twitterUrl}>Twitter</Anchor>.
          </Text>

          <Anchor href="/assets/resume.pdf">
            <Button variant="secondary" startIcon={<span>⬇️</span>}>
              Resume.pdf
            </Button>
          </Anchor>
        </Box>
      </Grid>
    </Layout>
  );
};

export default StartHerePage;
