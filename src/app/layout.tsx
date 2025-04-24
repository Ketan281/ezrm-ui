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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}