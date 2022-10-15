import { Header, Box, Title, Text } from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../../components/layout/MainLayout';
import { EventsGrid } from '../../components/EventsGrid';

import { hygraph } from '../../services/hygraph';

export default function Events({ events = [] }) {
  const nextEvents = events.filter(({ date }) => new Date(date) > new Date());
  const previousEvents = events.filter(
    ({ date }) => new Date(date) <= new Date()
  );

  return (
    <MainLayout title="Eventos">
      <Header unstyled py="xl">
        <Title color="white">Eventos</Title>
        <Text size="lg">
          Descubra os nossos próximos eventos e os que já realizamos.
        </Text>
      </Header>

      {events.length > 0 ? (
        <>
          {nextEvents.length > 0 && (
            <Box component="section" mb="xl">
              <Title order={2} mb="md">
                Próximos eventos
              </Title>
              <EventsGrid events={nextEvents} />
            </Box>
          )}
          {previousEvents.length > 0 && (
            <Box component="section" pt="xl">
              <Title order={2} mb="md">
                Eventos anteriores
              </Title>
              <EventsGrid events={previousEvents} />
            </Box>
          )}
        </>
      ) : (
        <Text>Nenhum evento cadastrado.</Text>
      )}
    </MainLayout>
  );
}

export async function getStaticProps() {
  const { data } = await hygraph.query({
    query: gql`
      query GetEvents {
        events(orderBy: publishedAt_DESC) {
          id
          title
          slug
          date
          location
          coverImage {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      events: data?.events ?? [],
    },
    revalidate: 5 * 60, // Revalidate page after 5 minutes
  };
}
