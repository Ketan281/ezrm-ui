import type { Metadata } from 'next';
import ClientProvider from './ClientProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ERMM - Login',
  description: 'Login to ERMM - Raw Materials Simplified',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}