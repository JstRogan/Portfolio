import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        identifier: { label: 'Email or username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const identifier = (credentials?.identifier ?? '').toString();
        const password = (credentials?.password ?? '').toString();
        const expected = process.env.ADMIN_PASSWORD || 'admin';
        if (password !== expected) return null;
        return { id: identifier || 'admin', name: 'Admin' };
      },
    }),
  ],
};
