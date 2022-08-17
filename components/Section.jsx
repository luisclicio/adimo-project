import { Text, Container, Title, Box } from '@mantine/core';

export function Section({ title, description, children, sx = {}, ...props }) {
  return (
    <Box
      component="section"
      py={64}
      sx={(theme) => ({
        [theme.fn.smallerThan('sm')]: {
          paddingTop: theme.spacing.xl * 2,
          paddingBottom: theme.spacing.xl * 2,
        },
        ...sx,
      })}
      {...props}
    >
      <Title order={2} align="center">
        {title}
      </Title>

      <Container size="xs" p={0}>
        <Text align="center" mt="xs">
          {description}
        </Text>
      </Container>

      <Box mt={32}>{children}</Box>
    </Box>
  );
}
