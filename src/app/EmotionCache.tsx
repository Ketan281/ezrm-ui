'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// Create an Emotion cache instance
const cache = createCache({ key: 'css', prepend: true });

export default function EmotionCache({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}