import {
  Header,
  Title,
  Text,
  Box,
  SimpleGrid,
  Divider,
  Button,
  Group,
} from '@mantine/core';
import { IconBrandWhatsapp, IconMail } from '@tabler/icons';
import { QRCodeSVG } from 'qrcode.react';

import { MainLayout } from '../components/layout/MainLayout';

import { constants } from '../services/constants';

export default function Home() {
  return (
    <MainLayout title="Apoie">
      <Header unstyled py="xl">
        <Box sx={{ maxWidth: '640px' }}>
          <Title color="white">
            Apoie nossa causa e ajude a transformar a vida de muitas crianças e
            adolescentes.
          </Title>
          <Text size="lg">
            Contribua no futuro de várias crianças e adolescentes para que
            desenvolvam as habilidades necessárias e sejam agentes
            transformadores na sociedade.
          </Text>
        </Box>
      </Header>

      <SimpleGrid
        component="main"
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        <Box component="section" mb="xl">
          <Title order={2}>Seja doador</Title>

          <Box component="article" mt="md">
            <Title order={3}>Transferência via Pix</Title>

            <Box mx="auto" sx={{ maxWidth: '320px' }}>
              <Text align="center">
                Leia o QR Code abaixo com o código do Pix pelo aplicativo do seu
                banco
              </Text>

              <Box
                component={QRCodeSVG}
                value={constants.bank.pixCode}
                bgColor="#1A1B1E"
                fgColor="#FFFFFF"
                size={180}
                sx={{ width: '100%' }}
              />
            </Box>

            <Box mt="md">
              <Text mx={0} my={4} color="white">
                Chave Pix: <strong>{constants.bank.pixKey}</strong>
              </Text>
              <Text mx={0} my={4} color="white">
                CNPJ: <strong>{constants.cnpj}</strong>
              </Text>
              <Text mx={0} my={4} color="white">
                Banco: <strong>{constants.bank.name}</strong>
              </Text>
              <Text mx={0} my={4} color="white">
                Titular: <strong>{constants.bank.owner}</strong>
              </Text>
            </Box>
          </Box>

          <Divider mt="lg" />

          <Box component="article" mt="md">
            <Title order={3}>Transferência bancária</Title>

            <Box mt="sm">
              <Text mx={0} my={4} color="white">
                Banco: <strong>{constants.bank.name}</strong>
              </Text>
              <Text mx={0} my={4} color="white">
                Conta: <strong>{constants.bank.account}</strong>
              </Text>
              <Text mx={0} my={4} color="white">
                Agência: <strong>{constants.bank.agency}</strong>
              </Text>
            </Box>
          </Box>
        </Box>

        <Box component="section">
          <Title order={2}>Seja voluntário</Title>

          <Text color="white">
            Deseja ser um voluntário? Entre em contato conosco a partir do
            formulário que se encontra no canto da página, ou por meio do nosso
            WhatsApp e e-mail. Ficaremos muito felizes em te atender e auxiliar
            a fazer parte do nosso projeto!
          </Text>

          <Group spacing="md">
            <Button
              component="a"
              href={constants.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              leftIcon={<IconBrandWhatsapp />}
            >
              WhatsApp
            </Button>

            <Button
              component="a"
              href={`mailto:${constants.contact.email}`}
              variant="light"
              spacing="md"
              leftIcon={<IconMail />}
            >
              E-mail
            </Button>
          </Group>
        </Box>
      </SimpleGrid>
    </MainLayout>
  );
}
