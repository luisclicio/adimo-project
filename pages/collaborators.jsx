import { Header, Title, Text } from '@mantine/core';
import { gql } from '@apollo/client';

import { MainLayout } from '../components/layout/MainLayout';
import { AppGrid } from '../components/AppGrid';
import { CollaboratorCard } from '../components/CollaboratorCard';

import { hygraph } from '../services/hygraph';

const TYPES_MAP = {
  Apoiador: 'Apoiador',
  Padrinho: 'Padrinho',
  Voluntario: 'Voluntário',
};

export default function Collaborators({ collaborators = [] }) {
  return (
    <MainLayout title="Parceiros e colaboradores">
      <Header unstyled py="xl">
        <Title color="white">Parceiros e colaboradores</Title>
        <Text size="lg">
          Conheça os padrinhos, voluntários e apoiadores que fazem o projeto
          acontecer.
        </Text>
      </Header>

      <AppGrid>
        {collaborators.length > 0 ? (
          collaborators.map((collaborator) => (
            <CollaboratorCard
              key={collaborator.name}
              name={collaborator.name}
              avatar={collaborator.avatar.url}
              role={TYPES_MAP[collaborator.type]}
              followLink={collaborator.followLink}
            />
          ))
        ) : (
          <Text>Nenhum colaborador cadastrado.</Text>
        )}
      </AppGrid>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const { data } = await hygraph.query({
    query: gql`
      query GetCollaborators {
        collaborators {
          id
          name
          type
          followLink
          avatar {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      collaborators: data?.collaborators ?? [],
    },
    revalidate: 10 * 60, // Revalidate page after 10 minutes
  };
}
