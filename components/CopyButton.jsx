import {
  CopyButton as CopyButtonMantine,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons';

export function CopyButton({
  value,
  className,
  icon = <IconCopy size={16} />,
}) {
  return (
    <CopyButtonMantine value={value} timeout={2500}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'Copiado' : 'Copiar'}
          events={{ hover: true, focus: true, touch: true }}
          withArrow
          position="right"
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            onClick={copy}
            className={className}
          >
            {copied ? <IconCheck size={16} /> : icon}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButtonMantine>
  );
}
