'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProvider;
