import {
  createStyles,
  Header,
  Container,
  Group,
  Stack,
  Button,
  Burger,
  Transition,
} from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Logo } from '../Logo';

const links = [
  {
    label: 'Início',
    url: '/',
  },
  {
    label: 'Sobre',
    url: '/sobre',
  },
  {
    label: 'Fotos',
    url: '/galeria',
  },
  {
    label: 'Eventos',
    url: '/eventos',
  },
  {
    label: 'Notícias',
    url: '/noticias',
  },
  {
    label: 'Parceiros',
    url: '/parceiros',
  },
];

const HEADER_BAR_HEIGHT = '80px';

const useStyles = createStyles((theme) => ({
  bgBlur: {
    background: theme.fn.rgba(theme.colors.dark[7], 0.7),
    backdropFilter: 'blur(8px)',
  },

  header: {
    height: HEADER_BAR_HEIGHT,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  linksDesktop: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  linksMobile: {
    position: 'fixed',
    inset: 0,
    top: HEADER_BAR_HEIGHT,
    zIndex: 100,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  linkItem: {
    borderRadius: theme.radius.md,
    border: '1px solid transparent',
    color: theme.colors.dark[0],
    display: 'block',
    fontSize: theme.fontSizes.md,
    lineHeight: 1,
    padding: '8px 12px',
    textDecoration: 'none',
    transition: '100ms',

    '&:hover': {
      backgroundColor: theme.colors.dark[6],
      borderColor: theme.colors.dark[5],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  linkItemMobile: { padding: '12px 16px' },

  linkItemActive: {
    borderColor: theme.colors.red[6],
    color: theme.colors.red[6],
  },
}));

export function MainNavbar() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const { classes, cx } = useStyles();

  return (
    <>
      <Header className={cx(classes.header, classes.bgBlur)}>
        <Container className={classes.inner}>
          <Group>
            <Burger
              className={classes.burger}
              size="sm"
              opened={opened}
              onClick={() => {
                toggle();
                setScrollLocked((locked) => !locked);
              }}
            />

            <Link href="/">
              <a>
                <Logo height="48px" />
              </a>
            </Link>
          </Group>

          <Group component="nav" spacing={8} className={classes.linksDesktop}>
            {links.map((link) => (
              <Link key={link.url} href={link.url}>
                <a
                  className={cx(classes.linkItem, {
                    [classes.linkItemActive]: router.asPath === link.url,
                  })}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </Group>

          <Link href="/apoie" passHref>
            <Button component="a" size="md">
              Apoie
            </Button>
          </Link>
        </Container>
      </Header>

      <Transition transition="slide-right" duration={300} mounted={opened}>
        {(styles) => (
          <Container
            className={cx(classes.linksMobile, classes.bgBlur)}
            style={styles}
          >
            <Stack component="nav" spacing={8}>
              {links.map((link) => (
                <Link key={link.url} href={link.url} passHref>
                  <a
                    className={cx(classes.linkItem, classes.linkItemMobile, {
                      [classes.linkItemActive]: router.asPath === link.url,
                    })}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </Stack>
          </Container>
        )}
      </Transition>
    </>
  );
}
