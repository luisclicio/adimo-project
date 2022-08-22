import { useMantineTheme, Box, Text } from '@mantine/core';

export function PhotoCard({ image, caption }) {
  const theme = useMantineTheme();

  return (
    <Box component="figure" sx={{ margin: 0 }}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundImage: `url(${image})`,
          borderRadius: theme.radius.md,
          display: 'flex',
          height: '300px',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          sx={{
            background: theme.fn.rgba(theme.colors.dark[8], 0.4),
            backdropFilter: 'blur(8px)',
            inset: 0,
            position: 'absolute',
          }}
        />
        <Box
          component="img"
          src={image}
          loading="lazy"
          sx={{
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            width: '100%',
          }}
        />
      </Box>

      <Text component="figcaption" m="xs">
        {caption}
      </Text>
    </Box>
  );
}
