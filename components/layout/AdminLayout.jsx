import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Container } from '@mantine/core';

import { AdminNavbar } from '../navbar/AdminNavbar';

export function AdminLayout({ title, children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login');
    },
  });

  if (status === 'loading') {
    return;
  }

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
