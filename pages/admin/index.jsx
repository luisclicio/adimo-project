import dynamic from 'next/dynamic';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { IconDownload, IconEye, IconSearch } from '@tabler/icons';

import { AdminLayout } from '../../components/layout/AdminLayout';
import { Time } from '../../components/Time';

import { StudentsListPDF } from '../../pdf/StudentsListPDF';
import { StudentReportPDF } from '../../pdf/StudentReportPDF';

const PDFDownloadLink = dynamic(
  async () => (await import('@react-pdf/renderer')).PDFDownloadLink,
  {
    ssr: false,
  }
);

export default function Home() {
  const {
    loading,
    error,
    data: { students = [] } = {},
  } = useQuery(gql`
    query GetStudents {
      students {
        id
        fullName
        avatar {
          url
        }
        cpf
        sex
        birthdate
        email
        phones
        schooling
        motherName
        fatherName
        address
        neighborhood
        observations
        activities {
          id
          title
          schedule
        }
      }
    }
  `);
  const [searched, setSearched] = useState('');

  const filteredStudents =
    searched.length > 0
      ? students.filter(
          (student) =>
            student.fullName.toLowerCase().includes(searched.toLowerCase()) ||
            student.activities.some((activity) =>
              activity.title.toLowerCase().includes(searched.toLowerCase())
            )
        )
      : students;

  return (
    <AdminLayout title="Painel administrativo">
      {loading ? (
        <Box
          px="md"
          sx={{ display: 'grid', height: '70vh', placeItems: 'center' }}
        >
          {error ? (
            <Stack align="center" position="center" mt="xl" pt="xl">
              <Text m="0" size="lg">
                Falha ao carregar dados dos estudantes!
              </Text>
            </Stack>
          ) : (
            <Stack align="center" position="center" mt="xl" pt="xl">
              <Loader size="lg" />
              <Text m="0" size="lg">
                Carregando dados dos estudantes...
              </Text>
            </Stack>
          )}
        </Box>
      ) : (
        <section>
          <Title order={2}>Estudantes matriculados</Title>

          <Group align="center" position="apart" mt="sm" noWrap>
            <TextInput
              placeholder="Busque por estudantes ou atividades..."
              icon={<IconSearch size={16} />}
              value={searched}
              onChange={(event) => setSearched(event.target.value)}
              sx={{
                maxWidth: '360px',
                width: '100%',
              }}
            />

            {students.length > 0 && (
              <PDFDownloadLink
                document={<StudentsListPDF students={filteredStudents} />}
                fileName="lista-de-estudantes.pdf"
              >
                {({ loading: loadingPdf }) =>
                  loadingPdf ? (
                    <Button variant="default" loading disabled>
                      Carregando...
                    </Button>
                  ) : (
                    <Button variant="default" leftIcon={<IconDownload />}>
                      Exportar
                    </Button>
                  )
                }
              </PDFDownloadLink>
            )}
          </Group>

          <Stack component="ul" p="0" mt="sm">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </Stack>
        </section>
      )}
    </AdminLayout>
  );
}

function StudentCard({ student }) {
  const theme = useMantineTheme();
  const [modalOpened, { open, close }] = useDisclosure(false);

  const filename = useMemo(
    () => `GCA_${student.fullName.replace(/\s+/g, '-')}.pdf`,
    [student]
  );

  return (
    <>
      <Paper
        component="li"
        px="md"
        py="sm"
        sx={{ background: theme.colors.dark[8], listStyle: 'none' }}
      >
        <Group position="apart" spacing="md" noWrap>
          <Group noWrap>
            <Avatar src={student?.avatar?.url} alt="" size="md" color="red.6" />
            <Text m="0">{student.fullName}</Text>
          </Group>

          <Tooltip
            label="Ver mais"
            events={{ hover: true, focus: true, touch: true }}
            withArrow
            position="bottom"
          >
            <ActionIcon size="lg">
              <IconEye size={24} onClick={open} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>

      <Modal
        title="Informações do estudante"
        size="md"
        padding="md"
        overlayBlur={2}
        opened={modalOpened}
        onClose={close}
      >
        <Stack align="center">
          <Avatar
            src={student?.avatar?.url}
            alt={student.fullName}
            size={136}
            color="red.6"
          />

          <PDFDownloadLink
            document={<StudentReportPDF student={student} />}
            fileName={filename}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <Button variant="default" loading disabled>
                  Carregando...
                </Button>
              ) : (
                <Button variant="default" leftIcon={<IconDownload />}>
                  Exportar
                </Button>
              )
            }
          </PDFDownloadLink>
        </Stack>

        <Stack mt="xl" spacing="xs">
          <InfoItem label="Nome" value={student.fullName} />
          <InfoItem label="Sexo" value={student.sex} />
          <InfoItem label="CPF" value={student.cpf} />
          <InfoItem
            label="Data de nascimento"
            value={student.birthdate}
            isDate
          />
          {student?.email && <InfoItem label="E-mail" value={student.email} />}
          {student?.schooling && (
            <InfoItem label="Escolaridade" value={student.schooling} />
          )}
          {student?.motherName && (
            <InfoItem label="Mãe" value={student.motherName} />
          )}
          {student?.fatherName && (
            <InfoItem label="Pai" value={student.fatherName} />
          )}
          {student?.phones.length > 0 && (
            <InfoItem label="Telefone(s)" value={student?.phones.join(', ')} />
          )}
          {student?.address && (
            <InfoItem label="Endereço" value={student.address} />
          )}
          {student?.neighborhood && (
            <InfoItem label="Bairro" value={student.neighborhood} />
          )}
          {student?.observations && (
            <InfoItem label="Observações" value={student.observations} />
          )}
        </Stack>

        <Divider my="xl" />

        <Box>
          <Title order={4}>Atividades/Oficinas</Title>

          {student?.activities?.length > 0 ? (
            <Stack mt="xs" spacing="xs">
              {student?.activities?.map((activity) => (
                <Group key={activity.id} position="apart" spacing="xs">
                  <Text weight="bold" m="0">
                    {activity.title}
                  </Text>
                  <Box sx={{ borderBottom: '1px dashed', flex: 1 }} />
                  <Text m="0">{activity.schedule}</Text>
                </Group>
              ))}
            </Stack>
          ) : (
            <Text m="0" mt="xs">
              O aluno não está matriculado em atividades.
            </Text>
          )}
        </Box>
      </Modal>
    </>
  );
}

function InfoItem({ label, value, isDate = false }) {
  return (
    <Text m="0">
      <Text component="span" weight="bold" m="0">
        {label}:{' '}
      </Text>
      {isDate ? <Time datetime={value} onlyDate /> : value}
    </Text>
  );
}
