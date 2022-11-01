import {
  createStyles,
  Header,
  Container,
  Group,
  Menu,
  Text,
  Stack,
  Avatar,
  Tooltip,
  ActionIcon,
  Indicator,
} from '@mantine/core';
import { IconBell, IconExternalLink, IconLogout } from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Logo } from '../Logo';

const HEADER_BAR_HEIGHT = '72px';

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
}));

export function AdminNavbar() {
  const { classes, cx } = useStyles();
  const { data } = useSession();

  return (
    <>
      <Header className={cx(classes.header, classes.bgBlur)}>
        <Container fluid className={classes.inner}>
          <Link href="/admin">
            <a>
              <Logo height="40px" />
            </a>
          </Link>

          <Group>
            <Tooltip
              label="Ver site"
              events={{ hover: true, focus: true, touch: true }}
              withArrow
            >
              <ActionIcon
                component="a"
                href="/"
                target="_blank"
                variant="default"
                size="lg"
              >
                <IconExternalLink size={24} />
              </ActionIcon>
            </Tooltip>

            <Tooltip
              label="Caixa de mensagens"
              events={{ hover: true, focus: true, touch: true }}
              withArrow
            >
              <Indicator dot size={16} offset={4} disabled={false} label="3">
                <Link href="/admin/mensagens" passHref>
                  <ActionIcon component="a" variant="default" size="lg">
                    <IconBell size={24} />
                  </ActionIcon>
                </Link>
              </Indicator>
            </Tooltip>

            <Menu shadow="xl" position="bottom-end">
              <Menu.Target>
                <Avatar
                  src={data?.user?.image}
                  alt={data?.user?.name}
                  size="md"
                  color="red.6"
                  sx={{ cursor: 'pointer' }}
                />
              </Menu.Target>

              <Menu.Dropdown sx={{ minWidth: '200px' }}>
                <Stack px="sm" py="sm" spacing="0">
                  <Text my="0" weight="bold">
                    {data?.user?.name}
                  </Text>
                  <Text color="dimmed" my="0">
                    {data?.user?.email}
                  </Text>
                </Stack>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  icon={<IconLogout size={16} />}
                  onClick={signOut}
                >
                  Encerrar sessão
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </Header>
    </>
  );
}
