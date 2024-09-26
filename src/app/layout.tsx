import { ReactNode } from 'react';

import './globals.css';

export const metadata = {
  title: 'ConectaBem',
  description: 'ConectaBem',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
