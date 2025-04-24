import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'A Next.js app with Redux',
};

// This is a Server Component that just renders the Client Component
export default function PageServer() {
  return <Page />;
}

// Import the Client Component
import Page from './page'; 