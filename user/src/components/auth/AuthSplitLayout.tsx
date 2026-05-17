import React from 'react';
import { Compass } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { LocaleSwitcher } from '@components/LocaleSwitcher';
import Link from 'next/link';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#020817]">
      {/* Left panel — hologram */}
      <div className="relative w-full md:w-1/2 min-h-[280px] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img src="https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020817]/80 via-cyan-900/30 to-[#020817]/80" />
        <div className="absolute inset-0 holo-grid opacity-30" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        {/* Scanline */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent holo-scanline" />

        <div className="relative z-10 px-8 py-12 text-center max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-heading">Travel<span className="text-cyan-400">Go</span></span>
          </Link>

          {/* Corner brackets decoration */}
          <div className="relative inline-block mb-6">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/50" />
            <div className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/50" />
            <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/50" />
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/50" />
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-heading px-4 py-2">
              {t('auth.welcomeTitle')}
            </h1>
          </div>

          <p className="text-white/45 leading-relaxed font-body">
            {t('auth.welcomeDesc')}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {[{ v: '500+', l: 'Tours' }, { v: '50K+', l: 'Khách hàng' }, { v: '4.9★', l: 'Đánh giá' }].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-lg font-black text-white font-heading" style={{ textShadow: '0 0 15px rgba(34,211,238,0.4)' }}>{s.v}</p>
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#030d1f] border-l border-white/5 px-6 py-10 md:py-12 relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <LocaleSwitcher />
        </div>
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
