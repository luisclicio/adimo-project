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

  return (
    <Box
      component="form"
      className={cx(classes.form, className)}
      sx={sx}
      onSubmit={(event) => event.preventDefault()}
    >
      <Text size="xl" className={classes.title}>
        Fale conosco
      </Text>

      <SimpleGrid
        cols={elementsFullWidth ? 1 : 2}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        <TextInput label="Seu nome" placeholder="Ex: João Silva" required />

        <TextInput
          type="email"
          label="Seu e-mail"
          placeholder="Ex: joaosilva@mail.com"
          required
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
      />

      <Textarea
        mt="md"
        label="Mensagem"
        placeholder="Conteúdo da mensagem"
        minRows={3}
        required
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
