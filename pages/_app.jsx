import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ApolloProvider } from '@apollo/client';

import { hygraph } from '../services/hygraph';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Grupo Cultural Adimó</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          defaultRadius: 'md',
          primaryColor: 'red',
          defaultGradient: {
            from: 'red.6',
            to: 'red.8',
          },

          components: {
            Container: {
              defaultProps: {
                size: 'xl',
                p: 'md',
              },
            },
            Title: {
              defaultProps: {
                sx: (theme) => ({
                  color:
                    theme.colorScheme === 'dark' ? theme.white : theme.black,
                }),
              },
            },
            Text: {
              defaultProps: {
                component: 'p',
              },
            },
            Button: {
              defaultProps: {
                variant: 'gradient',
                size: 'md',
              },
            },
            Autocomplete: {
              defaultProps: {
                size: 'md',
              },
            },
            TextInput: {
              defaultProps: {
                size: 'md',
              },
            },
            PasswordInput: {
              defaultProps: {
                size: 'md',
              },
            },
            Textarea: {
              defaultProps: {
                size: 'md',
              },
            },
            Notification: {
              styles: (theme) => ({
                title: {
                  fontSize: theme.fontSizes.md,
                  fontWeight: 'bold',
                  marginTop: 0,
                },
                description: {
                  fontSize: theme.fontSizes.md,
                  marginTop: 0,
                  marginBottom: 0,
                },
              }),
            },
          },
        }}
      >
        <ApolloProvider client={hygraph}>
          <NotificationsProvider autoClose={15000}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ApolloProvider>
      </MantineProvider>
    </>
  );
}
