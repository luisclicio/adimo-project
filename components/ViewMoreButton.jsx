import { Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import Link from 'next/link';

export function ViewMoreButton({ link, label, ...props }) {
  return (
    <Link href={link} passHref>
      <Button
        component="a"
        variant="outline"
        size="md"
        rightIcon={<IconArrowRight />}
        {...props}
      >
        {label}
      </Button>
    </Link>
  );
}
