// app/layout.tsx
'use client';

import React from 'react';
import Navigation from '../components/Navigation'; 
import { EthereumProvider } from '../contexts/EthereumContext'; 
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EthereumProvider> {/* Wrap the entire app in the EthereumProvider */}
          <Navigation /> {/* Add the Navigation component */}
          {children} {/* Render the page-specific content */}
        </EthereumProvider>
      </body>
    </html>
  );
}

