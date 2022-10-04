import { Text } from '@mantine/core';

export function Time({ datetime, onlyDate = false, ...props }) {
  const formattedDatetime = new Date(datetime).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: onlyDate ? undefined : 'short',
  });

  return (
    <Text component="time" dateTime={formattedDatetime} {...props}>
      {formattedDatetime}
    </Text>
  );
}
