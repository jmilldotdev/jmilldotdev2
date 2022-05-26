import {
  Anchor,
  Button,
  Flex,
  Text,
  EM,
  H3,
} from '@maximeheckel/design-system';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';
import { useMutation } from 'react-query';
import TextInput from '@theme/components/TextInput';
import Glow from '@theme/components/Glow';
import Card from '@theme/components/Card';
import { NewsletterHeader } from './Icons';
import { NewsletterFormContent, ErrorMessage } from './Styles';
import { subscribeCall } from './utils';
import List from '../List';
import { newsletterArchiveUrl } from 'config/site';

const textOutVariant = {
  checked: {
    display: 'none',
    opacity: 0,
  },
  unchecked: {},
};

const textInVariant = {
  checked: {
    display: 'block',
    opacity: 1,
  },
  unchecked: {
    display: 'none',
    opacity: 0,
  },
};

const checkVariant = {
  checked: {
    width: 20,
  },
  unchecked: {
    width: 0,
  },
};

interface Props {
  large?: boolean;
}

const NewsletterForm = (props: Props) => {
  const { large = false } = props;
  const [email, setEmail] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  const opacity = useMotionValue(1);
  const pathLength = useTransform(opacity, [0.05, 0.5], [1, 0]);
  const opacityTextIn = useTransform(opacity, [0, 0.1], [1, 0]);

  const [subscribe, { isError, isLoading, isSuccess, error }] = useMutation(
    subscribeCall
  );

  React.useEffect(() => {
    setIsChecked(false);
  }, [isError]);

  return (
    <Card
      depth={1}
      style={{
        marginLeft: '-var(--space-1)',
        marginRight: '-var(--space-1)',
      }}
    >
      {large ? (
        <Flex
          justifyContent="center"
          css={{
            paddingTop: 'var(--space-8)',
          }}
        >
          <NewsletterHeader />
        </Flex>
      ) : null}
      <NewsletterFormContent withOffset={large}>
        {large ? (
          <H3
            css={{
              maxWidth: '600px',
            }}
          >
            Want more jmill in your life?
          </H3>
        ) : (
          <H3
            css={{
              maxWidth: '600px',
            }}
          >
            Want more jmill in your life?
          </H3>
        )}
        {large ? (
          <>
            <Text
              as="p"
              css={{
                marginBottom: '0px',
              }}
              variant="secondary"
            >
              Subscribe to{' '}
              <Anchor underline href={newsletterArchiveUrl}>
                my newsletter
              </Anchor>{' '}
              to receive a monthly digest containing:
            </Text>
            <br />
            <List variant="unordered">
              <List.Item>
                <Text
                  as="p"
                  css={{
                    marginBottom: '0px',
                  }}
                  variant="secondary"
                >
                  A quick recap of <EM>the coolest stuff I wrote and built</EM>{' '}
                  each month.
                </Text>
              </List.Item>
              <List.Item>
                <Text
                  as="p"
                  css={{
                    marginBottom: '0px',
                  }}
                  variant="secondary"
                >
                  <EM>Exclusive previews</EM>{' '}
                  {`of the top-secret stuff I'm
                  working on`}
                </Text>
              </List.Item>
            </List>
          </>
        ) : (
          <>
            <Text
              as="p"
              css={{
                marginBottom: '0px',
              }}
              variant="secondary"
            >
              Get a monthly email from me about my ideas, as well as exclusive
              previews of upcoming articles and projects.
            </Text>
            <br />
          </>
        )}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await subscribe({ email });
              setIsChecked(true);
            } catch (e) {}
          }}
        >
          <Flex
            alignItems="flex-start"
            gap="3"
            css={{
              flexDirection: 'row',
              '@media (max-width: 500px)': {
                flexDirection: 'column',
              },
            }}
          >
            <TextInput
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="your@email.com"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
            <Glow>
              <Button
                aria-label="Subscribe to my newsletter"
                disabled={isLoading}
                title="Subscribe to my newsletter"
                type="submit"
                variant="primary"
              >
                <motion.div
                  initial={false}
                  animate={isChecked ? 'checked' : 'unchecked'}
                  variants={textOutVariant}
                  transition={{
                    duration: 0.7,
                  }}
                  style={{ opacity }}
                >
                  {isLoading ? 'Loading...' : 'Sign me up!'}
                </motion.div>
                <motion.svg
                  initial="unchecked"
                  animate={isChecked ? 'checked' : 'unchecked'}
                  variants={checkVariant}
                  stroke="currentColor"
                  height="22"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M1.8492 7.39712L7.39362 12.3822L18.0874 1.36591"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ pathLength }}
                  />
                </motion.svg>
                <motion.div
                  initial="unchecked"
                  animate={isChecked ? 'checked' : 'unchecked'}
                  variants={textInVariant}
                  style={{ marginLeft: '8px', opacity: opacityTextIn }}
                >
                  Done! 🎉
                </motion.div>
              </Button>
            </Glow>
          </Flex>
        </form>
        {/* <NewsLetterForm
            animate={isChecked ? 'checked' : 'unchecked'}
            variants={formVariant}
            transition={{
              ease: 'easeOut',
              duration: 0.3,
            }}
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                await subscribe({ email });
                setIsChecked(true);
              } catch (e) {}
            }}
          >
            <NewsLetterInput
              animate={isChecked ? 'checked' : 'unchecked'}
              variants={inputVariant}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
              }}
              disabled={isChecked || isLoading}
              name="email"
              type="email"
              id="emailInput"
              placeholder="Your email"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <VisuallyHidden>
              <label htmlFor="emailInput">Your email address</label>
            </VisuallyHidden>
            <NewsLetterSubmitButton
              initial={false}
              animate={isChecked ? 'checked' : 'unchecked'}
              variants={buttonVariant}
              whileHover="hover"
              whileTap="press"
              transition={{
                type: 'spring',
                stiffness: 200,
                mass: 1,
                damping: 8,
              }}
              disabled={isChecked || isLoading}
              custom={isChecked}
              type="submit"
              aria-label="Subscribe to my newsletter"
              title="Subscribe to my newsletter"
            >
              
            </NewsLetterSubmitButton>
          </NewsLetterForm> */}
        {error ? (
          // @ts-ignore
          error.message.includes('already subscribed') ? (
            <ErrorMessage>Looks like you already subscribed!</ErrorMessage>
          ) : (
            <ErrorMessage>Whoops! We just hit a snag here.</ErrorMessage>
          )
        ) : null}
        {isSuccess ? (
          <Text
            as="p"
            css={{
              margin: '16px 0px 0px 0px',
              textAlign: 'center',
            }}
          >
            (You will receive a confirmation email in a few seconds)
          </Text>
        ) : null}
      </NewsletterFormContent>
    </Card>
  );
};

export default NewsletterForm;
