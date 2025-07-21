import type { Metadata } from 'next';
import ClientProvider from './ClientProvider';
import './globals.css';
import { ToastContainer} from 'react-toastify';

export const metadata: Metadata = {
  title: 'EZRM - Home',
  description: 'Welcome to EZRM - Raw Materials Simplified',
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
      <body>
        <ClientProvider>{children}</ClientProvider>
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
