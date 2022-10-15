import { Header, Title, Text } from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../../components/layout/MainLayout';
import { ArticlesGrid } from '../../components/ArticlesGrid';

import { hygraph } from '../../services/hygraph';

export default function Articles({ articles = [] }) {
  return (
    <MainLayout title="Notícias e publicações">
      <Header unstyled py="xl">
        <Title color="white">Notícias e publicações</Title>
        <Text size="lg">Conheça os eventos e ações que já realizamos.</Text>
      </Header>

      {articles.length > 0 ? (
        <ArticlesGrid articles={articles} />
      ) : (
        <Text>Nenhum artigo publicado.</Text>
      )}
    </MainLayout>
  );
}

export async function getStaticProps() {
  const { data } = await hygraph.query({
    query: gql`
      query GetPosts {
        posts(orderBy: publishedAt_DESC) {
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
  });

  return {
    props: {
      articles: data?.posts ?? [],
    },
    revalidate: 5 * 60, // Revalidate page after 5 minutes
  };
}
