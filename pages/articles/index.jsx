import { Header, Title, Text } from '@mantine/core';

import { MainLayout } from '../../components/layout/MainLayout';
import { ArticlesGrid } from '../../components/ArticlesGrid';

// Fake data
import FAKE from '../../services/fake';

export default function Articles() {
  return (
    <MainLayout title="Notícias e publicações">
      <Header unstyled py="xl">
        <Title color="white">Notícias e publicações</Title>
        <Text size="lg">Conheça os eventos e ações que já realizamos.</Text>
      </Header>

      <ArticlesGrid articles={FAKE.articles} />
    </MainLayout>
  );
}
