import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getConfig from 'next/config';
import { authService } from '@services/auth.service';
import { useCurrentUserStore, usePublicSiteSettingsStore } from 'src/stores';
import { LazyHydrate } from '@components/common';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@components/ui';
import { Menu, X, Home, Settings, LogOut, ChevronDown } from 'lucide-react';
import { LocaleSwitcher } from '@components/LocaleSwitcher';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const { publicRuntimeConfig } = getConfig() || {};
const USER_BASE_URL = publicRuntimeConfig?.SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');

function resolveUrl(url: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${USER_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();
  const { currentUser, clearCurrentUser } = useCurrentUserStore();
  const { site_name, site_logo } = usePublicSiteSettingsStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearCurrentUser();
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
              {site_logo ? (
                <img src={resolveUrl(site_logo)} alt="" className="h-8 w-auto object-contain" />
              ) : null}
              <span>{site_name || 'Base Code'}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/home"
                className={`flex items-center gap-2 text-sm font-medium transition ${
                  router.pathname === '/home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="w-4 h-4" />
                Trang chủ
              </Link>
              <Link
                href="/user/settings"
                className={`flex items-center gap-2 text-sm font-medium transition ${
                  router.pathname === '/user/settings'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                Cài đặt
              </Link>
            </nav>

            {/* User menu */}
            <div className="flex items-center gap-4">
              <LocaleSwitcher />
              {currentUser ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm text-gray-600"
                      >
                        <span>{currentUser?.name || currentUser?.email}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600 focus:bg-red-50 focus:text-red-700"
                        onSelect={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Đăng nhập
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/home"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                Trang chủ
              </Link>
              <Link
                href="/user/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                Cài đặt
              </Link>
              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content - hydrate when browser is idle to reduce TBT */}
      <main>
        <LazyHydrate whenIdle>
          <div>{children}</div>
        </LazyHydrate>
      </main>
    </div>
  );
}
