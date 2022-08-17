import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Anchor,
  Badge,
} from '@mantine/core';
import { IconShare } from '@tabler/icons';
import Link from 'next/link';

import { useLocation } from '../hooks/useLocation';
import { CopyButton } from './CopyButton';
import { Time } from './Time';

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    transition: '300ms',

    '&:hover': {
      transform: 'translateY(-8px)',
    },

    [`&:hover > .${getRef('title')}`]: {
      color: theme.colors.red[5],
    },
  },

  title: {
    ref: getRef('title'),
    color: theme.white,
    display: 'block',
    fontSize: theme.fontSizes.lg,
    marginTop: theme.spacing.md / 2,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colors.dark[6],

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[5],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export function EventCard({
  slug,
  image,
  title,
  date,
  local,
  className,
  ...others
}) {
  const { classes, cx } = useStyles();
  const { origin = '' } = useLocation();

  const pagePath = `/eventos/${slug}`;

  return (
    <Card
      component="article"
      className={cx(classes.card, className)}
      {...others}
    >
      <Card.Section>
        <Link href={pagePath} passHref>
          <a>
            <Image src={image} alt={title} height={180} />
          </a>
        </Link>
      </Card.Section>

      <Badge variant="gradient" mt="md">
        Evento
      </Badge>

      <Link href={pagePath} passHref>
        <Anchor className={classes.title} weight="bold">
          {title}
        </Anchor>
      </Link>

      <Text my={8}>
        <Text component="span" sx={{ fontWeight: 'bold' }}>
          Local:
        </Text>{' '}
        {local}
      </Text>

      <Text my={8}>
        <Text component="span" sx={{ fontWeight: 'bold' }}>
          Horário:
        </Text>{' '}
        <Time datetime={date} />
      </Text>

      <Group position="right" className={classes.footer}>
        <CopyButton
          value={`${origin}${pagePath}`}
          icon={<IconShare size={16} />}
          className={classes.action}
        />
      </Group>
    </Card>
  );
}
