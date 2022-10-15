import {
  Header,
  Title,
  Text,
  useMantineTheme,
  TypographyStylesProvider,
} from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../../components/layout/MainLayout';
import { PhotoCard } from '../../components/PhotoCard';

import { hygraph } from '../../services/hygraph';
import { Time } from '../../components/Time';

export default function Article({ article }) {
  const theme = useMantineTheme();

  return (
    <MainLayout title={article.title} size="sm">
      <Header unstyled py="xl">
        <Title color="white">{article.title}</Title>
        <Text size="lg">{article.description}</Text>
        <Text>
          Publicado em: <Time datetime={article.publishedAt} />
        </Text>
        <PhotoCard
          image={article.coverImage.url}
          caption=""
          height="380px"
          sx={{ mt: theme.spacing.md }}
        />
      </Header>

      <TypographyStylesProvider>
        <div
          dangerouslySetInnerHTML={{
            __html: article.content.html,
          }}
        />
      </TypographyStylesProvider>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const { data } = await hygraph.query({
    query: gql`
      query GetPostsSlugs {
        posts {
          slug
        }
      }
    `,
  });

  return {
    paths: data?.posts.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { data } = await hygraph.query({
    query: gql`
      query GetPost($slug: String!) {
        post(where: { slug: $slug }) {
          id
          title
          slug
          publishedAt
          description
          content {
            html
          }
          coverImage {
            url
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (!data?.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: data.post,
    },
    revalidate: 5 * 60, // Revalidate page after 5 minutes
  };
}
