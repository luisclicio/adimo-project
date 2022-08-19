import Head from 'next/head';
import { Container } from '@mantine/core';

import { MainNavbar } from '../navbar/MainNavbar';
import { Footer } from '../Footer';
import { ContactDialog } from '../ContactDialog';

export function MainLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title} - Grupo Cultural Adimó`}</title>
      </Head>

      <MainNavbar />

      <Container>{children}</Container>

      <ContactDialog />

      <Footer />
    </>
  );
}
