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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          defaultRadius: 'lg',
          primaryColor: 'red',
          defaultGradient: {
            from: 'red.6',
            to: 'red.8',
          },

          components: {
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
                size: 'lg',
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
