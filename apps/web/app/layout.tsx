import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LaunchKit Studio',
  description: 'Build polished SaaS landing pages faster.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
