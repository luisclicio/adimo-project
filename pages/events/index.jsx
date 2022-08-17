import { Header, Title, Text } from '@mantine/core';

import { MainLayout } from '../../components/layout/MainLayout';
import { EventsGrid } from '../../components/EventsGrid';

// Fake data
import FAKE from '../../services/fake';

export default function Events() {
  return (
    <MainLayout title="Eventos">
      <Header unstyled py="xl">
        <Title color="white">Eventos</Title>
        <Text size="lg">
          Descubra os nossos próximos eventos e os que já realizamos.
        </Text>
      </Header>

      <EventsGrid events={FAKE.events} />
    </MainLayout>
  );
}
