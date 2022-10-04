import {
  Box,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Autocomplete,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    form: {
      boxSizing: 'border-box',
      flex: 1,
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

    fullWidth: {
      flex: 1,
      width: '100%',
    },
  };
});

export function ContactForm({
  elementsFullWidth = false,
  className = {},
  sx = {},
}) {
  const { classes, cx } = useStyles();

  const [name, setName] = useLocalStorage({
    key: 'contact.name',
    defaultValue: '',
  });
  const [email, setEmail] = useLocalStorage({
    key: 'contact.email',
    defaultValue: '',
  });
  const [subject, setSubject] = useLocalStorage({
    key: 'contact.subject',
    defaultValue: '',
  });
  const [message, setMessage] = useLocalStorage({
    key: 'contact.message',
    defaultValue: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    clearForm();
  }

  function clearForm() {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <Box
      component="form"
      className={cx(classes.form, className)}
      sx={sx}
      onSubmit={handleSubmit}
    >
      <Text size="xl" className={classes.title}>
        Fale conosco
      </Text>

      <SimpleGrid
        cols={elementsFullWidth ? 1 : 2}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        <TextInput
          label="Seu nome"
          placeholder="Ex: João Silva"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextInput
          type="email"
          label="Seu e-mail"
          placeholder="Ex: joaosilva@mail.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </SimpleGrid>

      <Autocomplete
        mt="md"
        label="Assunto"
        placeholder="Ex: Tirar dúvidas, Agendar visita, etc."
        data={[
          'Matrícula',
          'Tirar dúvidas',
          'Tornar-se padrinho',
          'Tornar-se voluntário',
          'Sugestão',
          'Agendar visita',
          'Outros',
        ]}
        required
        value={subject}
        onChange={setSubject}
      />

      <Textarea
        mt="md"
        label="Mensagem"
        placeholder="Conteúdo da mensagem"
        minRows={3}
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <Group position="right" mt="md">
        <Button
          type="submit"
          className={cx(classes.control, {
            [classes.fullWidth]: elementsFullWidth,
          })}
        >
          Enviar
        </Button>
      </Group>
    </Box>
  );
}
