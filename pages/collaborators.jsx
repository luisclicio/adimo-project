import { Header, Title, Text } from '@mantine/core';

import { MainLayout } from '../components/layout/MainLayout';
import { AppGrid } from '../components/AppGrid';
import { CollaboratorCard } from '../components/CollaboratorCard';

// Fake data
import FAKE from '../services/fake';

export default function Collaborators() {
  const collaborators = FAKE.collaborators;

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
        {collaborators.map((collaborator) => (
          <CollaboratorCard
            key={collaborator.name}
            name={collaborator.name}
            avatar={collaborator.avatar}
            role={collaborator.role}
            followLink={collaborator.followLink}
          />
        ))}
      </AppGrid>
    </MainLayout>
  );
}
