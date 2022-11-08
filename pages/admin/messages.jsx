import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Header,
  List,
  Loader,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronLeft, IconRefresh } from '@tabler/icons';

import { AdminLayout } from '../../components/layout/AdminLayout';
import { Time } from '../../components/Time';

export default function Messages() {
  const { loading, error, data } = useQuery(gql`
    query GetMessages {
      messages(orderBy: createdAt_DESC) {
        id
        message
        senderEmail
        senderName
        senderPhone
        subject
        wasRead
        createdAt
      }
    }
  `);

  return (
    <AdminLayout title="Caixa de mensagens">
      <Box py="md">
        <Header unstyled>
          <Group align="center" position="apart" mb="md">
            <Link href="/admin">
              <Anchor
                sx={{
                  alignItems: 'center',
                  display: 'inline-flex',
                  transform: 'translateX(-6px)',
                }}
              >
                <IconChevronLeft />
                Voltar
              </Anchor>
            </Link>

            <Button
              variant="default"
              leftIcon={<IconRefresh />}
              onClick={() => window.location.reload()}
            >
              Atualizar
            </Button>
          </Group>

          <Title>Caixa de mensagens</Title>
          <Text m={0} mt="xs" size="lg">
            Mensagens enviadas pelos visitantes do site.
          </Text>
        </Header>

        {loading ? (
          <Box
            px="md"
            sx={{ display: 'grid', height: '70vh', placeItems: 'center' }}
          >
            {error ? (
              <Stack align="center" position="center" mt="xl" pt="xl">
                <Text m="0" size="lg">
                  Falha ao carregar mensagens!
                </Text>
              </Stack>
            ) : (
              <Stack align="center" position="center" mt="xl" pt="xl">
                <Loader size="lg" />
                <Text m="0" size="lg">
                  Carregando mensagens...
                </Text>
              </Stack>
            )}
          </Box>
        ) : (
          <SimpleGrid
            component={List}
            listStyleType="none"
            mt="xl"
            cols={3}
            spacing="md"
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'sm', cols: 1 },
            ]}
          >
            {data?.messages.map((message) => (
              <MessageCard key={message.key} message={message} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </AdminLayout>
  );
}

function MessageCard({ message }) {
  const theme = useMantineTheme();
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [updateMessageStatusMutation] = useMutation(gql`
    mutation ReadMessage($id: ID!) {
      updateMessage(where: { id: $id }, data: { wasRead: true }) {
        id
        wasRead
      }

      publishMessage(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `);

  const [isRead, setIsRead] = useState(Boolean(message.wasRead));

  const handleReadMessage = useCallback(() => {
    open();

    if (!isRead) {
      updateMessageStatusMutation({
        variables: {
          id: message.id,
        },
        onCompleted(data) {
          setIsRead(data?.updateMessage?.wasRead);
        },
        onError(error) {
          console.error(error);
        },
      });
    }
  }, [isRead, message.id, open, updateMessageStatusMutation]);

  return (
    <>
      <List.Item
        p="md"
        sx={{
          backgroundColor: isRead ? theme.colors.dark[7] : theme.colors.dark,
          border: `1px solid ${theme.colors.dark[5]}`,
          borderRadius: theme.radius.md,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              flex: '1',
            }}
          >
            <Text size="lg" color="white" weight="bold" m={0}>
              {message.subject}
            </Text>

            <Text m={0} mt={8} lineClamp={2}>
              {message.message}
            </Text>

            <Text size="sm" m={0} mt="sm">
              <Text component="span" m={0} weight="bold">
                Enviada por:{' '}
              </Text>
              {message.senderName}
            </Text>

            <Text size="sm" m={0} mt={4}>
              <Text component="span" m={0} weight="bold">
                Recebida em:{' '}
              </Text>
              <Time datetime={new Date(message.createdAt)} />
            </Text>
          </Box>

          <Button
            variant={isRead ? 'outline' : 'filled'}
            fullWidth
            mt="md"
            onClick={handleReadMessage}
          >
            Ler mensagem
          </Button>
        </Box>
      </List.Item>

      <Modal
        title={
          <>
            Recebida em: <Time datetime={new Date(message.createdAt)} />
          </>
        }
        size="lg"
        padding="md"
        overlayBlur={2}
        opened={modalOpened}
        onClose={close}
      >
        <Stack spacing="sm">
          <Text size="lg" color="white" weight="bold" m={0}>
            {message.subject}
          </Text>

          <Text m={0}>
            <Text component="span" m={0} weight="bold">
              Enviada por:{' '}
            </Text>
            {message.senderName}
          </Text>

          {message.senderEmail && (
            <Text m={0}>
              <Text component="span" m={0} weight="bold">
                Email:{' '}
              </Text>
              <Text component="a" href={`mailto:${message.senderEmail}`} m={0}>
                {message.senderEmail}
              </Text>
            </Text>
          )}

          {message.senderPhone && (
            <Text m={0}>
              <Text component="span" m={0} weight="bold">
                Telefone:{' '}
              </Text>
              <Text component="a" href={`tel:${message.senderPhone}`} m={0}>
                {message.senderPhone}
              </Text>
            </Text>
          )}

          <Divider />

          <Text m={0} color="white">
            {message.message}
          </Text>
        </Stack>
      </Modal>
    </>
  );
}
