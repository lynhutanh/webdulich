import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Globe, ChevronDown, Heart, User, LogOut, LayoutDashboard, Compass, BookOpen, Phone } from 'lucide-react';

const navLinks = [
  { href: '/tours', label: 'Tours', icon: Compass },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Liên hệ', icon: Phone },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const mockUser = { name: 'Nguyễn Hương', avatar: 'https://i.pravatar.cc/40?img=1', role: 'user' };
  const isLoggedIn = true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#020817]/90 backdrop-blur-md border-b border-cyan-500/10 shadow-lg shadow-black/20'
        : 'bg-transparent'
    }`}>
      {/* Top scanline */}
      {scrolled && <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-heading">
              Travel<span className="text-cyan-400">Go</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all font-body ${
                  router.pathname.startsWith(link.href)
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all font-mono">
              <Globe className="w-4 h-4" /><span>VI</span><ChevronDown className="w-3 h-3" />
            </button>

            {isLoggedIn ? (
              <>
                <Link href="/wishlist"
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all">
                  <Heart className="w-5 h-5" />
                </Link>

                <div className="relative hidden md:block">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all">
                    <img src={mockUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover ring-2 ring-cyan-500/40" />
                    <span className="text-sm font-medium text-white/80">{mockUser.name.split(' ').pop()}</span>
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#0a1628]/95 backdrop-blur-md rounded-2xl border border-cyan-500/20 py-2 animate-fade-in shadow-xl shadow-black/40">
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-sm font-semibold text-white">{mockUser.name}</p>
                        <p className="text-xs text-white/40 font-mono">THÀNH VIÊN</p>
                      </div>
                      {[
                        { href: '/profile', icon: User, label: 'Hồ sơ của tôi' },
                        { href: '/wishlist', icon: Heart, label: 'Danh sách yêu thích' },
                      ].map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                          <item.icon className="w-4 h-4 text-white/30" /> {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <Link href="/auth/login" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut className="w-4 h-4" /> Đăng xuất
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  Đăng nhập
                </Link>
                <Link href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                  Đăng ký
                </Link>
              </div>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:bg-white/5 transition-all">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020817]/95 backdrop-blur-md border-t border-cyan-500/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
                <link.icon className="w-5 h-5 text-white/30" /> {link.label}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-3 mt-3 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <User className="w-5 h-5 text-white/30" /> Hồ sơ
                  </Link>
                  <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <Heart className="w-5 h-5 text-white/30" /> Yêu thích
                  </Link>
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" /> Đăng xuất
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-center font-medium text-white/70 border border-white/10 hover:bg-white/5">Đăng nhập</Link>
                  <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-center font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600">Đăng ký</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
