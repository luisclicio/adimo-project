import { Text } from '@mantine/core';

export function Time({ datetime, ...props }) {
  const formattedDatetime = new Date(datetime).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <Text component="time" dateTime={formattedDatetime} {...props}>
      {formattedDatetime}
    </Text>
  );
}
