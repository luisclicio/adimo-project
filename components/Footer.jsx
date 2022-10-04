import {
  createStyles,
  Text,
  Container,
  Group,
  Stack,
  Box,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons';

import { Logo } from './Logo';

const footerData = [
  {
    title: 'Recursos',
    links: [
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
      {
        label: 'Apoie',
        url: '/apoie',
      },
      {
        label: 'Entrar',
        url: '/login',
      },
    ],
  },
  {
    title: 'Siga-nos',
    links: [
      {
        label: 'Facebook',
        url: 'https://facebook.com/grupoculturaladimo',
        external: true,
      },
      {
        label: 'Instagram',
        url: 'https://instagram.com/grupoculturaladimo',
        external: true,
      },
    ],
  },
];

const socialLinks = [
  {
    label: '@grupoculturaladimo',
    url: 'https://facebook.com/grupoculturaladimo',
    icon: <IconBrandFacebook stroke={1.5} />,
  },
  {
    label: '@grupoculturaladimo',
    url: 'https://instagram.com/grupoculturaladimo',
    icon: <IconBrandInstagram stroke={1.5} />,
  },
];

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    backgroundColor: theme.colors.dark[6],
    borderTop: `1px solid ${theme.colors.dark[5]}`,
  },

  description: {
    marginTop: theme.spacing.xs,
  },

  inner: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    gap: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  groups: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colors.dark[1],
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: theme.spacing.xs / 2.5,
    },
  },

  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    marginBottom: theme.spacing.xs / 2,
    color: theme.white,
    textTransform: 'uppercase',
  },

  afterFooter: {
    alignItems: 'center',
    borderTop: `1px solid ${theme.colors.dark[4]}`,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px 16px',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },

  social: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.xs,
    },

    [theme.fn.largerThan('xs')]: {
      justifyContent: 'flex-end',
    },
  },

  devLinks: {
    color: theme.colors.blue[5],
    fontWeight: 'bold',

    '&:hover': {
      color: theme.colors.blue[6],
      textDecoration: 'underline',
      textUnderlineOffset: theme.spacing.xs / 2.5,
    },
  },
}));

function DevLink({ name, url }) {
  const { classes } = useStyles();

  return (
    <Text
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.devLinks}
    >
      {name}
    </Text>
  );
}

export function Footer() {
  const { classes, theme } = useStyles();

  const groups = footerData.map((group) => {
    const links = group.links.map((link) => {
      if (link?.external) {
        return (
          <Text
            key={link.url}
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            {link.label}
          </Text>
        );
      }

      return (
        <Link key={link.url} href={link.url}>
          <Text component="a" href={link.url} className={classes.link}>
            {link.label}
          </Text>
        </Link>
      );
    });

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container
        className={classes.inner}
        style={{
          paddingTop: theme.spacing.xl * 2,
          paddingBottom: theme.spacing.xl * 2,
        }}
      >
        <Stack sx={{ flex: 1 }} spacing={1}>
          <Group spacing={theme.spacing.md}>
            <Logo height="48px" />
            <Text color="white" size="lg" my={0} sx={{ fontWeight: 'bold' }}>
              Grupo Cultural Adimó
            </Text>
          </Group>

          <Text className={classes.description}>
            Educação, esporte e cultura uma questão de cidadania.
          </Text>
        </Stack>

        <div className={classes.groups}>{groups}</div>
      </Container>

      <Container className={classes.afterFooter}>
        <Stack spacing="xs" sx={{ width: '100%' }}>
          <Text size="sm" m={0}>
            {new Date().getFullYear()} Grupo Cultural Adimó. CNPJ
            09.483.532/0001-00.
          </Text>
          <Text size="sm" m={0}>
            Rua Cel. Francisco Santos, Centro, 252, 64600-096 - Picos, PI.
          </Text>
        </Stack>

        <Box className={classes.social}>
          {socialLinks.map((link) => (
            <Button
              key={link.url}
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              compact
              size="md"
              leftIcon={link.icon}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Container>

      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm" m={0}>
          Site desenvolvido por{' '}
          <DevLink name={'Luís Clício'} url={'https://github.com/luisclicio'} />
          ,{' '}
          <DevLink
            name={'José Wanderlei'}
            url={'https://github.com/wanderleisi'}
          />{' '}
          e{' '}
          <DevLink
            name={'Vinícius de Sousa'}
            url={'https://github.com/viniciussousa891'}
          />
          .
        </Text>
      </Container>
    </footer>
  );
}
