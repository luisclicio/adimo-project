import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

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
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
