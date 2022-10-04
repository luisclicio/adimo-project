import {
  Header,
  Title,
  Text,
  useMantineTheme,
  TypographyStylesProvider,
} from '@mantine/core';

import { MainLayout } from '../../components/layout/MainLayout';
import { PhotoCard } from '../../components/PhotoCard';

// Fake data
import FAKE from '../../services/fake';

export default function Article({ article }) {
  const theme = useMantineTheme();

  return (
    <MainLayout title={article.title} size="sm">
      <Header unstyled py="xl">
        <Title color="white">{article.title}</Title>
        <Text size="lg">{article.description}</Text>
        <PhotoCard
          image={article.image}
          caption=""
          height="380px"
          sx={{ mt: theme.spacing.md }}
        />
      </Header>

      <TypographyStylesProvider>
        <div
          dangerouslySetInnerHTML={{
            __html: `<h2>Subtítulo da postagem aqui</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem corporis illum officia repellendus vero adipisci, et aut quo, debitis error cumque eum! Repellat quod adipisci quis nihil debitis, voluptatem qui.</p>
              <img src="/images/articles/image-02.webp" />
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem corporis illum officia repellendus vero adipisci, et aut quo, debitis error cumque eum! Repellat quod adipisci quis nihil debitis, voluptatem qui.</p>
            `,
          }}
        />
      </TypographyStylesProvider>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: FAKE.articles.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      article: FAKE.articles.find((article) => article.slug === params.slug),
    },
    revalidate: 2 * 60, // In seconds
  };
}
