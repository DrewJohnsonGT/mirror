import { Analytics } from '@vercel/analytics/react';

// eslint-disable-next-line import/no-default-export
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Mirror</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
