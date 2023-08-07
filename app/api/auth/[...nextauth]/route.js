import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        // 大陆挂梯子访问，请求响应比较慢，防止超时
        timeout: 1000 * 40,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 1000 * 40,
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw Error('Please enter an email and password');
          // return new NextResponse('Please enter an email and password', { status: 400 });
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw Error('No user found');
          // return new NextResponse('No user found', { status: 400 });
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        // if password does not match
        if (!passwordMatch) {
          throw Error('Incorrect password');
          // return new NextResponse('Incorrect password', { status: 400 });
        }
        console.log(`user112`, user);
        return user;
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    session: async (sessionObj) => {
      console.log(`sessionObj`, sessionObj);
      return {
        ...sessionObj.session,
        user: {
          ...sessionObj?.user,
          ...sessionObj?.session?.user,
          ...sessionObj?.token,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
