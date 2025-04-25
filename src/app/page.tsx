import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ERMM - Home',
  description: 'Welcome to ERMM - Raw Materials Simplified',
};

export default function HomePage() {
  redirect('/login');
  

  return null; 
}