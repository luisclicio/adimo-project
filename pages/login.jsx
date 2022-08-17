import {
  TextInput,
  PasswordInput,
  Title,
  Text,
  Container,
  Button,
  Box,
} from '@mantine/core';

import { MainLayout } from '../components/layout/MainLayout';

export default function Login() {
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

        <Box component="form" mt={40}>
          <TextInput
            type="email"
            label="E-mail"
            placeholder="Ex: joaosilva@mail.com"
            required
          />
          <PasswordInput
            label="Senha"
            placeholder="··········"
            required
            mt="md"
          />

          <Button type="submit" fullWidth mt="md">
            Entrar
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}
