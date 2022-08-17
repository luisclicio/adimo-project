import { Header, Title, Text, Image, Group, Box } from '@mantine/core';
import dynamic from 'next/dynamic';

import { MainLayout } from '../components/layout/MainLayout';
import { Section } from '../components/Section';

const Map = dynamic(async () => (await import('../components/Map')).Map, {
  ssr: false,
});

export default function Home() {
  return (
    <MainLayout title="Sobre">
      <Header unstyled py="xl">
        <Title color="white">Sobre o projeto</Title>
        <Text size="lg">Conheça melhor o projeto e como atuamos.</Text>

        <Group
          align="flex-start"
          sx={(theme) => ({
            marginTop: theme.spacing.xl * 2,
            columnGap: theme.spacing.xl * 2,

            [theme.fn.smallerThan('sm')]: {
              flexDirection: 'column',
            },
          })}
        >
          <Box sx={{ flex: 1 }}>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              optio aliquam eum ratione architecto possimus id deserunt
              consectetur, molestiae ea vero in maxime eos aut odio tempora
              exercitationem, quisquam vel! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Eaque optio aliquam eum ratione
              architecto possimus id deserunt consectetur, molestiae ea vero in
              maxime eos aut odio tempora exercitationem, quisquam vel!
            </Text>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              optio aliquam eum ratione architecto possimus id deserunt
              consectetur, molestiae ea vero in maxime eos aut odio tempora
              exercitationem, quisquam vel! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Eaque optio aliquam eum ratione
              architecto possimus id deserunt consectetur, molestiae ea vero in
              maxime eos aut odio tempora exercitationem, quisquam vel!
            </Text>
          </Box>

          <Image
            src="https://picsum.photos/id/104/1000/700"
            alt=""
            radius="md"
            sx={{ flex: 1 }}
          />
        </Group>
      </Header>

      <Group
        mt="xl"
        sx={(theme) => ({
          columnGap: theme.spacing.xl * 2,

          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
          },
        })}
      >
        <Section title="Missão" sx={{ flex: 1 }}>
          <Text align="center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            optio aliquam eum ratione architecto possimus id deserunt
            consectetur, molestiae ea vero in maxime eos aut odio tempora
            exercitationem, quisquam vel! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Eaque optio aliquam eum ratione
            architecto possimus id deserunt consectetur, molestiae ea vero in
            maxime eos aut odio tempora exercitationem, quisquam vel!
          </Text>
        </Section>

        <Section title="Visão" sx={{ flex: 1 }}>
          <Text align="center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            optio aliquam eum ratione architecto possimus id deserunt
            consectetur, molestiae ea vero in maxime eos aut odio tempora
            exercitationem, quisquam vel! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Eaque optio aliquam eum ratione
            architecto possimus id deserunt consectetur, molestiae ea vero in
            maxime eos aut odio tempora exercitationem, quisquam vel!
          </Text>
        </Section>
      </Group>

      <Section
        title="Localização"
        description="Nossa instituição fica localizada no bairro Centro, rua Coronel Francisco Santos, Nº 252, em Picos, PI."
      >
        <Map
          mt="xl"
          center={[-7.0839, -41.47]}
          zoom={15}
          markers={[
            {
              title: 'Grupo Cultural Adimó',
              position: [-7.0839, -41.47],
              content: (
                <Text size="sm" weight="bold" align="center">
                  Grupo Cultural Adimó
                </Text>
              ),
            },
          ]}
        />
      </Section>
    </MainLayout>
  );
}
