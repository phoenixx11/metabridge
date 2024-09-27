import './globals.css';
import Navigation from '../components/Navigation';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />  {/* Add the Navigation Bar */}
        {children}  {/* Render the page content */}
      </body>
    </html>
  );
}
