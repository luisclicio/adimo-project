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

import { MainLayout } from '../components/layout/MainLayout';
import { Section } from '../components/Section';
import { AppGrid } from '../components/AppGrid';
import { ViewMoreButton } from '../components/ViewMoreButton';
import { TestimonialCard } from '../components/TestimonialCard';
import { EventsGrid } from '../components/EventsGrid';
import { ArticlesGrid } from '../components/ArticlesGrid';
import { ContactSection } from '../components/Contact';

// Fake data
import FAKE from '../services/fake';

export default function Home() {
  return (
    <MainLayout title="Página Inicial">
      <HeroSection carrouselImages={FAKE.carrouselImages} />
      <ActivitiesSection activities={FAKE.activities} />
      <TestimonialsSection testimonials={FAKE.testimonials} />
      <EventsSection events={FAKE.events} />
      <ArticlesSection articles={FAKE.articles} />
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
    },
  },
}));

function HeroSection({ carrouselImages }) {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          pariatur, eos quis earum, nulla vero recusandae deleniti quia ipsum
          aspernatur cupiditate mollitia! Nulla, odit. Ullam id odit vitae
          dolorum recusandae?
        </Text>
      </div>

      <Carousel
        withControls={false}
        withIndicators
        loop
        plugins={[autoplay.current]}
        className={classes.carrousel}
      >
        {carrouselImages.map((image) => (
          <Carousel.Slide key={image.url}>
            <Image
              src={image.url}
              alt={image.caption}
              fit="cover"
              radius="md"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}

function ActivitiesSection({ activities }) {
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
          <Group key={activity.title} noWrap spacing="md">
            <Image
              src={activity.image}
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

function TestimonialsSection({ testimonials }) {
  return (
    <Section
      title="Depoimentos"
      description="Veja alguns dos depoimentos de nossos membros."
    >
      <AppGrid>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            author={testimonial.author}
            content={testimonial.content}
          />
        ))}
      </AppGrid>
    </Section>
  );
}

function EventsSection({ events }) {
  return (
    <Section
      title="Próximos eventos"
      description="Conheça nossos próximos eventos."
    >
      <EventsGrid events={events} />

      <Center mt="xl">
        <ViewMoreButton label="Veja mais eventos" link="/eventos" />
      </Center>
    </Section>
  );
}

function ArticlesSection({ articles }) {
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
