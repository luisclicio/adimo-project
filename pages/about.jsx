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
              O <strong>Grupo Cultural Adimó</strong> é uma entidade sem fins
              lucrativos fundada no ano de 2006 na cidade de Picos, Piauí, por
              uma experiência vinda do movimento negro. O Grupo Adimó atende a
              comunidade de Picos-PI e cidades vizinhas, desenvolvendo ações de
              <strong> combate ao racismo e todo tipo de intolerância</strong>.
              Também trabalha com projetos sociais que promovem educação
              integral através de atos que buscam a inclusão dos participantes
              na sociedade e no mercado de trabalho.
            </Text>
            <Text>
              Hoje o grupo conta com o selo UNICEF, conquistado no ano de 2013
              através da área de educação e participação social de crianças e
              adolescentes. Isso permitiu ao grupo maior visibilidade,
              demonstrando o verdadeiro compromisso do grupo Adimó em fortalecer
              as políticas públicas para os jovens.
            </Text>
          </Box>

          <Image
            src="/images/image-01.webp"
            // src="https://picsum.photos/id/104/1000/700"
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
            O Grupo Cultural Adimó traz consigo a proposta de promover educação
            integral através de atos que buscam a inclusão de seus participantes
            na sociedade e no mercado de trabalho. Assim, assegura a efetivação
            de seus direitos sociais como previstos na Constituição Brasileira,
            resgatando a autoestima, além de estimular o exercício da cidadania
            com base na inclusão social.
          </Text>
        </Section>

        <Section title="Visão" sx={{ flex: 1 }}>
          <Text align="center">
            O projeto busca ser reconhecido como uma organização essencial para
            a qualidade de vida e construção do ambiente familiar de famílias
            menos favorecidas. Através do desenvolvimento de atividades
            (oficinas, práticas de esportes), o grupo busca alcançar cada vez
            mais novos participantes, de modo a promover o fortalecimento da
            identidade negra nos bairros, periferias e comunidades. Além de
            estimular a cidadania e promover ainda mais a igualdade entre as
            pessoas.
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
