import React from 'react';
import Navbar from '@components/travel/Navbar';
import Footer from '@components/travel/Footer';

interface TravelLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function TravelLayout({ children, hideFooter = false }: TravelLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#020817]">
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}