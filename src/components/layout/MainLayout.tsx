import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TopbarBanner } from './TopbarBanner';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { FloatingCallButton } from './FloatingCallButton';
import { ScrollToTop } from '../common/ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <TopbarBanner />
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
      <FloatingCallButton />
      <WhatsAppFloatingButton />
    </div>
  );
};

