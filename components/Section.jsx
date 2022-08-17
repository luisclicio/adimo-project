import { Text, Container, Title, Box } from '@mantine/core';

export function Section({ title, description, children, ...props }) {
  return (
    <Box component="section" py={64} {...props}>
      <Title order={2} align="center">
        {title}
      </Title>

      <Container size="xs" p={0}>
        <Text color="dimmed" align="center" mt="xs">
          {description}
        </Text>
      </Container>

      <Box mt={32}>{children}</Box>
    </Box>
  );
}
