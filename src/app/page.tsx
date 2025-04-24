import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ERMM - Home',
  description: 'Welcome to ERMM - Raw Materials Simplified',
};

// A simple Server Component that redirects to the login page
export default function HomePage() {
  // Optionally, check authentication state here (e.g., via a server-side check)
  // For now, redirect to /login as a default behavior
  redirect('/login');
  // redirect('/signup');

  return null; // This won't render since we redirect
}