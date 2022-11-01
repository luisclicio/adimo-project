import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import {
  TextInput,
  PasswordInput,
  Title,
  Text,
  Container,
  Button,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import { MainLayout } from '../components/layout/MainLayout';

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (status === 'authenticated') {
    router.replace('/admin');
    return;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!signInResult.ok) {
      showNotification({
        title: signInResult.error ?? 'Erro ao entrar na conta.',
        color: 'red',
        icon: <IconX size={24} />,
      });
      return;
    }

    router.replace('/admin');
  }

  return (
    <MainLayout title="Entrar na conta administrativa">
      <Container size="xs" mt={40} px={0}>
        <Title
          align="center"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Entrar na conta
        </Title>

        <Text color="dimmed" align="center" mt="xs">
          Informe as credenciais abaixo para acessar o painel administrativo.
        </Text>

        <Box component="form" mt={40} onSubmit={handleSubmit}>
          <LoadingOverlay visible={status === 'loading'} overlayBlur={2} />

          <TextInput
            type="email"
            label="E-mail"
            placeholder="Ex: joaosilva@mail.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PasswordInput
            label="Senha"
            placeholder="··········"
            required
            mt="md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button type="submit" fullWidth mt="md">
            Entrar
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}
