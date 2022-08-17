import { Card, Image, Text, Group, createStyles, Anchor } from '@mantine/core';
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
    marginTop: theme.spacing.md,
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

export function ArticleCard({
  image,
  slug,
  title,
  description,
  publishedAt,
  className,
  ...others
}) {
  const { classes, cx } = useStyles();
  const { origin = '' } = useLocation();

  const pagePath = `/noticias/${slug}`;

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

      <Link href={pagePath} passHref>
        <Anchor className={classes.title} weight="bold">
          {title}
        </Anchor>
      </Link>

      <Text size="sm" lineClamp={3}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Text size="sm" color="dimmed" m={0}>
          Publicado em: <Time datetime={publishedAt} />
        </Text>

        <CopyButton
          value={`${origin}${pagePath}`}
          icon={<IconShare size={16} />}
          className={classes.action}
        />
      </Group>
    </Card>
  );
}
