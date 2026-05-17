import React, { useState } from 'react';
import AdminSidebar from '@components/travel/AdminSidebar';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#020817] overflow-hidden">
      {/* Holo grid overlay */}
      <div className="fixed inset-0 holo-grid opacity-10 pointer-events-none z-0" />

      <AdminSidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="bg-[#020817]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
          {/* Scanline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {title && (
              <div className="flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400" />
                <h1 className="text-base font-bold text-white font-heading">{title}</h1>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 border border-white/8 bg-white/3 rounded-xl px-3 py-2 w-56 focus-within:border-cyan-500/30 transition-colors">
              <Search className="w-4 h-4 text-white/25" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent text-sm outline-none text-white/60 placeholder-white/20 w-full"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Admin user */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <img src="https://i.pravatar.cc/32?img=6" alt="" className="w-7 h-7 rounded-full ring-2 ring-cyan-500/30" />
              <span className="hidden md:block text-sm font-medium text-white/60">Admin</span>
              <ChevronDown className="w-4 h-4 text-white/25" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#020817]">
          {children}
        </main>
      </div>
    </div>
  );
}
