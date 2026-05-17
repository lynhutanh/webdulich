import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Compass, BookOpen, Users, Settings, BarChart3, LogOut, Compass as Logo, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/tours', label: 'Quản lý Tours', icon: Compass },
  { href: '/admin/bookings', label: 'Quản lý Đặt tour', icon: BookOpen },
  { href: '/admin/users', label: 'Quản lý Users', icon: Users },
  { href: '/admin/analytics', label: 'Thống kê', icon: BarChart3 },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
];

interface AdminSidebarProps { collapsed?: boolean; }

export default function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const router = useRouter();
  const isActive = (href: string, exact?: boolean) => exact ? router.pathname === href : router.pathname.startsWith(href);

  return (
    <aside className={`bg-[#020817] border-r border-white/5 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Top scanline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 0 15px rgba(34,211,238,0.3)' }}>
          <Logo className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-white text-sm font-heading">TravelGo</p>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">ADMIN PANEL</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                active
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                  : 'text-white/35 hover:bg-white/3 hover:text-white/70 border border-transparent'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}>
              <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : 'text-white/25 group-hover:text-white/50'}`} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1 font-body">{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4 text-cyan-400/60" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-4 border-t border-white/5">
        <Link href="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:bg-white/3 hover:text-white/60 transition-all border border-transparent ${collapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium font-body">Về trang chủ</span>}
        </Link>
      </div>
    </aside>
  );
}
