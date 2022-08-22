import dynamic from 'next/dynamic';
import { Box, Button, TextInput } from '@mantine/core';
import { IconDownload } from '@tabler/icons';
import { useState } from 'react';

import { MainLayout } from '../../components/layout/MainLayout';

import { ReportPDF } from '../../pdf/report';

const PDFDownloadLink = dynamic(
  async () => (await import('@react-pdf/renderer')).PDFDownloadLink,
  {
    ssr: false,
  }
);

export default function Home() {
  const [name, setName] = useState('');

  return (
    // TODO: replaces `MainLayout` with `AdminLayout`
    <MainLayout title="Painel administrativo">
      <TextInput
        label="Seu nome"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Box mt="md">
        <PDFDownloadLink
          document={<ReportPDF title="Relatório" name={name} />}
          fileName="relatorio.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button variant="subtle" loading disabled>
                Carregando...
              </Button>
            ) : (
              <Button variant="subtle" leftIcon={<IconDownload />}>
                Baixar relatório
              </Button>
            )
          }
        </PDFDownloadLink>
      </Box>
    </MainLayout>
  );
}
