import { Header, Title, Text } from '@mantine/core';

import { MainLayout } from '../components/layout/MainLayout';
import { AppGrid } from '../components/AppGrid';
import { PhotoCard } from '../components/PhotoCard';

// Fake data
import FAKE from '../services/fake';

export default function Gallery() {
  const photos = FAKE.photos;

  return (
    <MainLayout title="Galeria de fotos">
      <Header unstyled py="xl">
        <Title color="white">Galeria de fotos</Title>
        <Text size="lg">Veja imagens dos nossos eventos e oficinas.</Text>
      </Header>

      <AppGrid>
        {photos.map((photo) => (
          <PhotoCard
            key={photo.image}
            image={photo.image}
            caption={photo.caption}
          />
        ))}
      </AppGrid>
    </MainLayout>
  );
}
