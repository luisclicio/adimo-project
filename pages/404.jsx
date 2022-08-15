import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from '@mantine/core';
import { IconArrowBack } from '@tabler/icons';
import Link from 'next/link';

import { MainLayout } from '../components/layout/MainLayout';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors.dark[4],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFoundTitle() {
  const { classes } = useStyles();

  return (
    <MainLayout title="Página não encontrada">
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Página não encontrada.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Você tentou acessar uma página inexistente. Verifique a URL para
          descobrir se algo foi digitado incorretamente.
        </Text>

        <Group position="center">
          <Link href="/" passHref>
            <Button component="a" size="md" leftIcon={<IconArrowBack />}>
              Ir para a página inicial
            </Button>
          </Link>
        </Group>
      </Container>
    </MainLayout>
  );
}
