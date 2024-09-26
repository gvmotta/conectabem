import { ReactNode } from 'react';

export const metadata = {
  title: 'Bulletproof React',
  description: 'Welcome to Bulletproof React',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
