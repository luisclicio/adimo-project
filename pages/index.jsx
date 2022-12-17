import { useRef } from 'react';
import {
  createStyles,
  Title,
  Text,
  Box,
  Image,
  Center,
  SimpleGrid,
  Group,
  Stack,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { gql } from '@apollo/client';

import { MainLayout } from '../components/layout/MainLayout';
import { Section } from '../components/Section';
import { AppGrid } from '../components/AppGrid';
import { ViewMoreButton } from '../components/ViewMoreButton';
import { TestimonialCard } from '../components/TestimonialCard';
import { EventsGrid } from '../components/EventsGrid';
import { ArticlesGrid } from '../components/ArticlesGrid';
import { ContactSection } from '../components/Contact';

import { hygraph } from '../services/hygraph';

export default function Home({
  featuredPhotos = [],
  activities = [],
  testimonials = [],
  events = [],
  articles = [],
}) {
  return (
    <MainLayout title="Página Inicial">
      <HeroSection carrouselImages={featuredPhotos} />
      {activities.length > 0 && <ActivitiesSection activities={activities} />}
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      {events.length > 0 && <EventsSection events={events} />}
      {articles.length > 0 && <ArticlesSection articles={articles} />}
      <ContactSection mt={64} />
    </MainLayout>
  );
}

const useHeroStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    gap: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
    },
  },

  content: {
    maxWidth: 480,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.white,
    fontSize: 48,
    lineHeight: 1.3,
    fontWeight: 'bold',

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.md,
    padding: '4px 12px',
  },

  carrousel: {
    borderRadius: theme.radius.md,
    maxHeight: '400px',
    maxWidth: '45%',
    overflow: 'hidden',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      maxHeight: '300px',
    },
  },
}));

function HeroSection({ carrouselImages = [] }) {
  const { classes } = useHeroStyles();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Box component="section" className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          <span className={classes.highlight}>Projeto Adimó:</span> educação,
          esporte e cultura uma questão de cidadania
        </Title>

        <Text mt="md" size="lg">
          Promovendo a educação integral e a participação social de crianças e
          adolescentes. Somos uma entidade sem fins lucrativos, que desenvolve
          ações de combate ao racismo e todo tipo de intolerância. Também
          promovemos a inclusão social de nossos participantes. Atuamos na
          cidade de Picos-PI e macrorregião.
        </Text>
      </div>

      {carrouselImages.length > 0 && (
        <Carousel
          withControls={false}
          withIndicators
          loop
          plugins={[autoplay.current]}
          className={classes.carrousel}
        >
          {carrouselImages.map((image) => (
            <Carousel.Slide key={image.id}>
              <Image
                src={image.url}
                alt={image.caption}
                fit="cover"
                radius="md"
                height="400px"
                style={{ objectPosition: 'center ' }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Box>
  );
}

function ActivitiesSection({ activities = [] }) {
  return (
    <Section
      title="Nossas atividades"
      description="Conheça algumas das atividades e oficinas que realizamos."
    >
      <SimpleGrid
        cols={2}
        spacing={32}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        {activities.map((activity) => (
          <Group key={activity.id} noWrap spacing="md">
            <Image
              src={activity.coverImage.url}
              alt={activity.title}
              radius="md"
              sx={{
                flex: 1,
                maxWidth: '240px',
              }}
              styles={{
                image: {
                  maxHeight: '156px',
                },
              }}
            />

            <Stack spacing={8} sx={{ flex: 1 }}>
              <Text weight={700} size="lg" m={0} color="white">
                {activity.title}
              </Text>
              <Text color="dimmed" m={0}>
                {activity.schedule}
              </Text>
            </Stack>
          </Group>
        ))}
      </SimpleGrid>

      <Center mt="xl">
        <ViewMoreButton label="Saiba mais sobre nós" link="/sobre" />
      </Center>
    </Section>
  );
}

function TestimonialsSection({ testimonials = [] }) {
  return (
    <Section
      title="Depoimentos"
      description="Veja alguns dos depoimentos de nossos membros."
    >
      <AppGrid>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            author={testimonial.author}
            content={testimonial.content}
          />
        ))}
      </AppGrid>
    </Section>
  );
}

function EventsSection({ events = [] }) {
  return (
    <Section
      title="Próximos eventos"
      description="Veja alguns do nossos próximos eventos."
    >
      <EventsGrid events={events} />

      <Center mt="xl">
        <ViewMoreButton label="Veja mais eventos" link="/eventos" />
      </Center>
    </Section>
  );
}

function ArticlesSection({ articles = [] }) {
  return (
    <Section
      title="Últimas notícias"
      description="Veja nossas últimas publicações."
    >
      <ArticlesGrid articles={articles} />

      <Center mt="xl">
        <ViewMoreButton label="Veja mais notícias" link="/noticias" />
      </Center>
    </Section>
  );
}

export async function getStaticProps() {
  const { data } = await hygraph.query({
    query: gql`
      query GetHomeData($now: DateTime!) {
        featuredPhotos {
          id
          caption
          image {
            url
          }
        }

        activities(where: { isActive: true }) {
          id
          title
          schedule
          coverImage {
            url
          }
        }

        testimonials {
          id
          authorName
          authorRole
          authorImage {
            url
          }
          content
        }

        events(orderBy: publishedAt_DESC, where: { date_gt: $now }, first: 3) {
          id
          title
          slug
          date
          location
          coverImage {
            url
          }
        }

        posts(orderBy: publishedAt_DESC, first: 3) {
          id
          title
          description
          slug
          publishedAt
          coverImage {
            url
          }
        }
      }
    `,
    variables: {
      now: new Date(),
    },
  });

  return {
    props: {
      featuredPhotos:
        data?.featuredPhotos.map((featuredPhoto) => ({
          ...featuredPhoto,
          url: featuredPhoto.image?.url,
        })) ?? [],
      activities: data?.activities ?? [],
      testimonials:
        data?.testimonials.map((testimonial) => ({
          ...testimonial,
          author: {
            name: testimonial.authorName,
            role: testimonial.authorRole,
            image: testimonial.authorImage?.url,
          },
        })) ?? [],
      events: data?.events ?? [],
      articles: data?.posts ?? [],
    },
    revalidate: 5 * 60, // Revalidate page after 5 minutes
  };
}
