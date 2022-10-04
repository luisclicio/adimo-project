import Head from 'next/head';
import { Container } from '@mantine/core';

import { AdminNavbar } from '../navbar/AdminNavbar';

export function AdminLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title} - Painel - Grupo Cultural Adimó`}</title>
      </Head>

      <AdminNavbar />

      <Container>{children}</Container>
    </>
  );
}
