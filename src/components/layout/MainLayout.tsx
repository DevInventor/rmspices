import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TopbarBanner } from './TopbarBanner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden">
      <TopbarBanner />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

