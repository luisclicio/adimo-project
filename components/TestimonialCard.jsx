import { Text, Avatar, Group, Stack, Paper } from '@mantine/core';

export function TestimonialCard({ content, author }) {
  return (
    <Paper
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[8],
      })}
    >
      <Group>
        <Avatar src={author.image} alt={author.name} radius="50%" size="xl" />

        <Stack spacing={0}>
          <Text size="md" my={0}>
            {author.name}
          </Text>
          <Text size="sm" my={0} color="dimmed">
            {author.role}
          </Text>
        </Stack>
      </Group>

      <Text mt="md">{content}</Text>
    </Paper>
  );
}
