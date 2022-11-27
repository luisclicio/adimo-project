import { Paper, Text, Group, createStyles, Stack } from '@mantine/core';
import { IconClock, IconMail, IconMapPin, IconPhone } from '@tabler/icons';

import { BrowserOnly } from './BrowserOnly';
import { ContactForm } from './ContactForm';

import { constants } from '../services/constants';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      backgroundColor: theme.colors.dark[8],
      border: `1px solid ${theme.colors.dark[8]}`,
      borderRadius: theme.radius.md,
      display: 'flex',
      padding: theme.spacing.xl,

      [BREAKPOINT]: {
        flexDirection: 'column',
        padding: 0,
      },
    },

    form: {
      paddingTop: theme.spacing.xl,
      paddingLeft: theme.spacing.xl,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
      },
    },

    contacts: {
      borderRadius: theme.radius.md,
      background: `linear-gradient(${theme.defaultGradient.deg}deg, ${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][8]} 100%)`,
      border: '1px solid transparent',
      padding: theme.spacing.xl,
      flex: '0 0 320px',

      [BREAKPOINT]: {
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
      },
    },

    title: {
      color: theme.white,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: theme.spacing.md,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function ContactSection({ ...props }) {
  const { classes } = useStyles();
  const { contact, address } = constants;

  return (
    <Paper className={classes.wrapper} {...props}>
      <div className={classes.contacts}>
        <Text size="xl" className={classes.title}>
          Informações de contato
        </Text>

        <Stack>
          <ContactIcon
            label="E-mail"
            value={contact.email}
            icon={<IconMail size={28} color="white" />}
            link={`mailto:${contact.email}`}
          />

          <ContactIcon
            label="Telefone"
            value={contact.phone}
            icon={<IconPhone size={28} color="white" />}
            link={`tel:${contact.phone}`}
          />

          <ContactIcon
            label="Endereço"
            value={[
              address.street,
              address.number,
              address.neighborhood,
              'Picos',
            ].join(', ')}
            icon={<IconMapPin size={28} color="white" />}
            link={constants.address.googleMaps}
          />

          <ContactIcon
            label="Horário de funcionamento"
            value="De segunda a sábado, das 8h às 17h"
            icon={<IconClock size={28} color="white" />}
          />
        </Stack>
      </div>

      <BrowserOnly>
        <ContactForm className={classes.form} />
      </BrowserOnly>
    </Paper>
  );
}

function ContactIcon({ label, value, icon, link = null }) {
  return (
    <Group align="center" noWrap>
      {icon}

      <Stack spacing={0} sx={{ flex: 1 }}>
        <Text my={0} size="sm" color="gray.1">
          {label}
        </Text>

        {link ? (
          <Text
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            my={0}
            color="white"
            sx={{ fontWeight: 'bold' }}
          >
            {value}
          </Text>
        ) : (
          <Text my={0} color="white" sx={{ fontWeight: 'bold' }}>
            {value}
          </Text>
        )}
      </Stack>
    </Group>
  );
}
