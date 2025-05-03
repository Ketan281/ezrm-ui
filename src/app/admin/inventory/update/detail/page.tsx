'use client';

// Import the Detail component from the same folder
import Detail from '../Detail';
import { useSearchParams } from 'next/navigation';

export default function DetailPage() {
  const searchParams = useSearchParams();

  // Extract product details from query parameters
  const product = {
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    description: searchParams.get('description') || '',
    inventory: searchParams.get('inventory') || '',
    loreal: searchParams.get('loreal') || '',
    price: searchParams.get('price') || '',
    rating: searchParams.get('rating') || '',
  };

  return <Detail product={product} />;
}