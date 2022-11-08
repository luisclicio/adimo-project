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
import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { gql, useMutation } from '@apollo/client';

const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage(
    $senderName: String!
    $senderEmail: String!
    $senderPhone: String!
    $subject: String!
    $message: String!
  ) {
    createMessage(
      data: {
        senderName: $senderName
        senderEmail: $senderEmail
        senderPhone: $senderPhone
        subject: $subject
        message: $message
      }
    ) {
      id
    }
  }
`;

const PUBLISH_MESSAGE_MUTATION = gql`
  mutation PublishMessage($id: ID!) {
    publishMessage(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

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
  const [createMessageMutation, { createLoading }] = useMutation(
    CREATE_MESSAGE_MUTATION
  );
  const [publishMessageMutation, { publishLoading }] = useMutation(
    PUBLISH_MESSAGE_MUTATION
  );

  const [name, setName] = useLocalStorage({
    key: 'contact.name',
    defaultValue: '',
  });
  const [email, setEmail] = useLocalStorage({
    key: 'contact.email',
    defaultValue: '',
  });
  const [phone, setPhone] = useLocalStorage({
    key: 'contact.phone',
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

    createMessageMutation({
      variables: {
        senderName: name,
        senderEmail: email,
        senderPhone: phone,
        subject,
        message,
      },
      onCompleted(data) {
        const messageId = data?.createMessage?.id;

        if (messageId) {
          publishMessageMutation({
            variables: { id: messageId },
            onCompleted() {
              clearForm();

              showNotification({
                title: 'Mensagem enviada!',
                color: 'green',
                position: 'top-right',
                autoClose: 10000,
                icon: <IconCheck size={24} />,
              });
            },
          });
        }
      },
      onError(error) {
        console.error(error);

        showNotification({
          title: 'Mensagem não enviada!',
          message:
            'Não foi possível enviar a mensagem. Verifique se os campos estão preenchidos corretamente.',
          color: 'red',
          position: 'top-right',
          icon: <IconX size={24} />,
        });
      },
    });
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPhone('');
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

      <TextInput
        label="Seu nome"
        placeholder="Ex: João Silva"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <SimpleGrid
        cols={elementsFullWidth ? 1 : 2}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt="xs"
        spacing="xs"
      >
        <TextInput
          type="email"
          label="Seu e-mail"
          placeholder="Ex: joaosilva@mail.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextInput
          type="tel"
          label="Seu telefone"
          placeholder="Ex: (89) 99999-9999"
          value={phone}
          required
          onChange={(event) => setPhone(event.target.value)}
        />
      </SimpleGrid>

      <Autocomplete
        mt="xs"
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
        mt="xs"
        label="Mensagem"
        placeholder="Conteúdo da mensagem"
        minRows={3}
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <Group position="right" mt="xs">
        <Button
          type="submit"
          loading={createLoading || publishLoading}
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
