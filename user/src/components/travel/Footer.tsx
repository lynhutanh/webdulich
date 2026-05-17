import React from 'react';
import Link from 'next/link';
import { Compass, Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020817] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Newsletter */}
      <div className="relative border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-violet-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-4 h-px bg-cyan-400" />
                <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.25em]">// NEWSLETTER</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 font-heading">Nhận ưu đãi độc quyền</h3>
              <p className="text-white/40 font-body font-light text-sm">Đăng ký nhận bản tin để không bỏ lỡ các deal du lịch hấp dẫn</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input type="email" placeholder="Nhập email của bạn..."
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/5 backdrop-blur text-white placeholder-white/25 border border-white/10 focus:outline-none focus:border-cyan-500/50 transition font-body text-sm" />
              <button className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2 whitespace-nowrap font-heading text-sm">
                <Send className="w-4 h-4" /> Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-heading">Travel<span className="text-cyan-400">Go</span></span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed mb-6 font-body">
              Nền tảng đặt tour du lịch hàng đầu Việt Nam. Chúng tôi mang đến những trải nghiệm du lịch tuyệt vời nhất với giá tốt nhất.
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/80 font-semibold mb-5 font-heading text-sm uppercase tracking-wider">Khám phá</h4>
            <ul className="space-y-3">
              {[
                { href: '/tours', label: 'Tất cả tours' },
                { href: '/tours?category=beach', label: 'Tour biển đảo' },
                { href: '/tours?category=mountain', label: 'Tour núi rừng' },
                { href: '/tours?category=cultural', label: 'Tour văn hóa' },
                { href: '/blog', label: 'Blog du lịch' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-cyan-400 transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white/80 font-semibold mb-5 font-heading text-sm uppercase tracking-wider">Hỗ trợ</h4>
            <ul className="space-y-3">
              {[
                { href: '/profile', label: 'Tài khoản của tôi' },
                { href: '/profile?tab=bookings', label: 'Đặt tour của tôi' },
                { href: '/wishlist', label: 'Danh sách yêu thích' },
                { href: '/faq', label: 'Câu hỏi thường gặp' },
                { href: '/contact', label: 'Liên hệ hỗ trợ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-cyan-400 transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/80 font-semibold mb-5 font-heading text-sm uppercase tracking-wider">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/35">123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-white/35">1800 1234 (Miễn phí)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-white/35">hello@travelgo.vn</span>
              </li>
            </ul>
            <div className="mt-5 p-3 border border-white/5 bg-white/3 rounded-xl">
              <p className="text-[10px] text-white/30 mb-1 font-mono uppercase tracking-wider">Giờ làm việc</p>
              <p className="text-sm text-white/70 font-medium">T2 - T7: 8:00 - 20:00</p>
              <p className="text-sm text-white/70 font-medium">CN: 9:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-mono">© 2026 TRAVELGO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono">CHÍNH SÁCH BẢO MẬT</Link>
            <Link href="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono">ĐIỀU KHOẢN SỬ DỤNG</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
