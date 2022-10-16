import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Header,
  Title,
  Text,
  useMantineTheme,
  TypographyStylesProvider,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../../components/layout/MainLayout';
import { PhotoCard } from '../../components/PhotoCard';
import { Time } from '../../components/Time';

import { hygraph } from '../../services/hygraph';

const Map = dynamic(async () => (await import('../../components/Map')).Map, {
  ssr: false,
});

export default function Event({ event }) {
  const theme = useMantineTheme();

  const { latitude, longitude } = event.coordinates;

  return (
    <MainLayout title={event.title} size="sm">
      <Header unstyled py="xl">
        <Breadcrumbs>
          <Link href="/" passHref>
            <Anchor component="a">Início</Anchor>
          </Link>
          <Link href="/eventos" passHref>
            <Anchor component="a">Eventos</Anchor>
          </Link>
          <Text>{event.title}</Text>
        </Breadcrumbs>

        <Title color="white">{event.title}</Title>

        <Text mb={0} mt="md">
          <Text component="span" sx={{ fontWeight: 'bold' }}>
            Local do evento:
          </Text>{' '}
          <Anchor href="#map">{event.location}</Anchor>
        </Text>

        <Text mb={0} mt="sm">
          <Text component="span" sx={{ fontWeight: 'bold' }}>
            Horário do evento:
          </Text>{' '}
          <Time datetime={event.date} />
        </Text>

        <Text mt="sm">
          Publicado em: <Time datetime={event.publishedAt} />
        </Text>

        <PhotoCard
          image={event.coverImage.url}
          caption=""
          height="380px"
          sx={{ mt: theme.spacing.md }}
        />
      </Header>

      <TypographyStylesProvider>
        <div
          dangerouslySetInnerHTML={{
            __html: event.description.html,
          }}
        />
      </TypographyStylesProvider>

      <Map
        id="map"
        center={[latitude, longitude]}
        markers={[{ position: [latitude, longitude] }]}
        zoom={15}
      />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const { data } = await hygraph.query({
    query: gql`
      query GetEventsSlugs {
        events {
          slug
        }
      }
    `,
  });

  return {
    paths: data?.events.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { data } = await hygraph.query({
    query: gql`
      query GetEvent($slug: String!) {
        event(where: { slug: $slug }) {
          id
          title
          slug
          date
          location
          publishedAt
          coverImage {
            url
          }
          coordinates {
            latitude
            longitude
          }
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (!data?.event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: data.event,
    },
    revalidate: 5 * 60, // Revalidate page after 5 minutes
  };
}
