import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'XFL — Xavaskor Futbol Ligasi',
  description: 'Samarqand xavaskor futbolining yangi davri. Jamoa top, raqib top, maydon top — hammasi bir joyda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={`${inter.className} bg-xfl-bg text-xfl-text min-h-screen antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
