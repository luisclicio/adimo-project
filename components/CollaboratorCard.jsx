import { Text, Button, Paper, Image } from '@mantine/core';

export function CollaboratorCard({ avatar, name, role, followLink }) {
  return (
    <Paper
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[8],
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      })}
    >
      <Image
        src={avatar}
        alt={name}
        fit="contain"
        height={172}
        radius="md"
        mx="auto"
      />
      <Text align="center" size="lg" weight="bold" mt="md" mb={0}>
        {name}
      </Text>
      <Text align="center" color="dimmed" my={0}>
        {role}
      </Text>

      {followLink && (
        <Button
          component="a"
          href={followLink}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          mt="md"
        >
          Seguir
        </Button>
      )}
    </Paper>
  );
}
