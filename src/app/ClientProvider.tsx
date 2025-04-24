'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';
import EmotionCache from './EmotionCache';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCache>
      <Provider store={store}>{children}</Provider>
    </EmotionCache>
  );
}