import { Header, Title, Text } from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../components/layout/MainLayout';
import { AppGrid } from '../components/AppGrid';
import { PhotoCard } from '../components/PhotoCard';

import { hygraph } from '../services/hygraph';

export default function Gallery({ photos = [] }) {
  return (
    <MainLayout title="Galeria de fotos">
      <Header unstyled py="xl">
        <Title color="white">Galeria de fotos</Title>
        <Text size="lg">Veja imagens dos nossos eventos e oficinas.</Text>
      </Header>

      <AppGrid>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              image={photo.image.url}
              caption={photo.caption}
            />
          ))
        ) : (
          <Text>Nenhuma foto publicada.</Text>
        )}
      </AppGrid>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const { data } = await hygraph.query({
    query: gql`
      query GetPhotos {
        photos(orderBy: publishedAt_DESC) {
          id
          caption
          image {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      photos: data?.photos ?? [],
    },
    revalidate: 60, // Revalidate page after 60 seconds
  };
}
