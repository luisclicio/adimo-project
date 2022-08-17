import { SimpleGrid } from '@mantine/core';

export function AppGrid({ children }) {
  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'xs', cols: 1 },
      ]}
    >
      {children}
    </SimpleGrid>
  );
}
