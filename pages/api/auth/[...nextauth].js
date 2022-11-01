import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';

import { hygraph } from '../../../services/hygraph';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      authorize: async ({ email, password }) => {
        try {
          const { data } = await hygraph.query({
            query: gql`
              query GetAdminByEmail($email: String!) {
                admin(where: { email: $email }) {
                  id
                  password
                  fullName
                }
              }
            `,
            variables: {
              email,
            },
          });

          const admin = data?.admin;

          if (!admin) {
            throw new Error('Administrador não encontrado.');
          }

          const isValid = password === admin.password;

          if (!isValid) {
            throw new Error('Credenciais inválidas.');
          }

          return {
            id: admin.id,
            email,
            name: admin.fullName,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.userId = token.sub;
      return Promise.resolve(session);
    },
  },
});
