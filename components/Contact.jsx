import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Stack,
} from '@mantine/core';
import { IconClock, IconMail, IconMapPin, IconPhone } from '@tabler/icons';

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
      boxSizing: 'border-box',
      flex: 1,
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

  return (
    <Paper className={classes.wrapper} {...props}>
      <div className={classes.contacts}>
        <Text size="xl" className={classes.title}>
          Informações de contato
        </Text>

        <Stack>
          <ContactIcon
            label="E-mail"
            value="gcadimo@hotmail.com"
            icon={<IconMail size={28} color="white" />}
            link="mailto:gcadimo@hotmail.com"
          />

          <ContactIcon
            label="Telefone"
            value="(XX) XXXXX-XXXX"
            icon={<IconPhone size={28} color="white" />}
            link="tel:00000000000"
          />

          <ContactIcon
            label="Endereço"
            value="Praça Josino Ferreira, 252, Centro, Picos"
            icon={<IconMapPin size={28} color="white" />}
            link="https://goo.gl/maps/A7qG9UqEwyC12wT37"
          />

          <ContactIcon
            label="Horário de funcionamento"
            value="De quarta a sexta, das 14h às 16h30min"
            icon={<IconClock size={28} color="white" />}
          />
        </Stack>
      </div>

      <form
        className={classes.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <Text size="xl" className={classes.title}>
          Fale conosco
        </Text>

        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <TextInput label="Seu nome" placeholder="Ex: João Silva" required />

          <TextInput
            type="email"
            label="Seu e-mail"
            placeholder="Ex: joaosilva@mail.com"
            required
          />
        </SimpleGrid>

        <TextInput
          mt="md"
          label="Assunto"
          placeholder="Ex: Tirar dúvidas, Agendar visita, etc."
          required
        />

        <Textarea
          mt="md"
          label="Mensagem"
          placeholder="Conteúdo da mensagem"
          minRows={3}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit" className={classes.control}>
            Enviar
          </Button>
        </Group>
      </form>
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
