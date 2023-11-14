'use client';

import dynamic from 'next/dynamic';

const App = dynamic(async () => await import('../App'), { ssr: false });

// eslint-disable-next-line import/no-default-export
export default function Page() {
  return <App />;
}
