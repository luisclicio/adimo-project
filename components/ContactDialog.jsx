import { Affix, Button, Dialog, ScrollArea, Transition } from '@mantine/core';
import { IconMessage, IconX } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import { useState } from 'react';

import { ContactForm } from './ContactForm';
import { BrowserOnly } from './BrowserOnly';

export function ContactDialog() {
  const [opened, setOpened] = useState(false);
  const [scroll] = useWindowScroll();

  function toggleOpened() {
    setOpened((open) => !open);
  }

  return (
    <>
      <Dialog
        opened={opened}
        transition="slide-up"
        transitionDuration={200}
        position={{ bottom: 72, right: 16 }}
        p="md"
        sx={(theme) => ({
          [theme.fn.smallerThan('xs')]: {
            height: 'auto',
            width: 'auto',
          },
        })}
      >
        <ScrollArea>
          <BrowserOnly>
            <ContactForm
              elementsFullWidth
              sx={(theme) => ({
                [theme.fn.smallerThan('xs')]: {
                  maxHeight: '340px',
                  maxWidth: '300px',
                },
              })}
            />
          </BrowserOnly>
        </ScrollArea>
      </Dialog>

      <Affix position={{ bottom: 16, right: 16 }}>
        <Transition transition="slide-up" mounted={opened || scroll.y > 10}>
          {(transitionStyles) => (
            <Button
              p={0}
              sx={(theme) => ({
                boxShadow: theme.shadows.xl,
                height: '48px',
                width: '48px',
              })}
              style={transitionStyles}
              onClick={toggleOpened}
            >
              {opened ? <IconX /> : <IconMessage />}
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
