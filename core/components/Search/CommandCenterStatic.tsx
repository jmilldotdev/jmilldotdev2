import { css, Icon, VisuallyHidden } from '@maximeheckel/design-system';
import { startHere } from 'config/internals';
import { emailAddress, twitterUrl } from 'config/site';
import Link from 'next/link';
import { MAX_HEIGHT } from './constants';
import { Separator, Item, KBD } from './Styles';

const commandCenterStaticWrapper = css({
  backgroundColor: 'var(--maximeheckel-colors-body)',
  maxHeight: `${MAX_HEIGHT}px`,
  overflowY: 'scroll',
});

const CommandCenterStatic = () => (
  <div className={commandCenterStaticWrapper()}>
    <Separator>Shortcuts</Separator>
    <Item data-nohover data-testid="shortcut" key="search-shortcut">
      <span>Command Center</span>
      <div>
        <KBD>ctrl</KBD>
        <KBD>k</KBD>
      </div>
    </Item>
    <Item data-nohover data-testid="shortcut" key="theme-shortcut">
      <span>Switch Theme</span>
      <div>
        <KBD>ctrl</KBD>
        <KBD>t</KBD>
      </div>
    </Item>
    <Separator>Navigation</Separator>
    <Item data-testid="navigation" key="home-navigation">
      <Link href="/">
        <a>
          <Icon.Arrow size={4} />
          <span style={{ marginLeft: '20px' }}>Home</span>
        </a>
      </Link>
    </Item>
    <Item data-testid="navigation" key="design-navigation">
      <Link href={startHere}>
        <a>
          <Icon.Arrow size={4} />
          <span style={{ marginLeft: '20px' }}>Start Here</span>
        </a>
      </Link>
    </Item>
    <Separator>Links</Separator>
    <Item data-testid="link" key="twitter-social-link">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <Icon.Twitter />
        <span style={{ marginLeft: '15px' }}>Twitter</span>
        <VisuallyHidden as="p">
          Link redirects to my Twitter profile page
          {twitterUrl}.
        </VisuallyHidden>
      </a>
    </Item>
    <Item data-testid="link" key="email-link">
      <a
        href={`mailto:${emailAddress}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon.Contact />
        <span style={{ marginLeft: '15px' }}>Contact</span>
        <VisuallyHidden as="p">
          Link opens your default mail client with my email address
          {emailAddress} prefilled.
        </VisuallyHidden>
      </a>
    </Item>
    <Item data-testid="link" key="rss-link">
      <Link href="/rss.xml" data-testid="rss-link" aria-label="RSS Feed">
        <a title="RSS Feed">
          <Icon.RSS />
          <span style={{ marginLeft: '15px' }}>RSS</span>
          <VisuallyHidden as="p">
            Link redirects to the rss.xml file.
          </VisuallyHidden>
        </a>
      </Link>
    </Item>
  </div>
);

export { CommandCenterStatic };
