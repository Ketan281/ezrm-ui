import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'EZRM - Home',
  description: 'Welcome to EZRM - Raw Materials Simplified',
};

export default function HomePage() {
  redirect('/login');

  return null;
}
