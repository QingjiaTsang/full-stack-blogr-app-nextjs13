'use client';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children, session }) => (
  // 这里好像传不传session都可以，貌似SessionProvider组件内部会自动获取session
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
