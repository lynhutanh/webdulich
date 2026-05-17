import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import { CheckCircle, Download, Share2, Home, Compass, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { tours, formatPrice } from 'src/data/mockData';

export default function BookingSuccessPage() {
  const [show, setShow] = useState(false);
  const tour = tours[0];
  const bookingId = 'BK' + Math.random().toString(36).substr(2, 6).toUpperCase();

  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  return (
    <TravelLayout>
      <div className="min-h-screen bg-[#020817] pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className={`max-w-2xl mx-auto relative z-10 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Success icon */}
          <div className="text-center mb-10">
            <div className="relative inline-flex">
              <div className="w-24 h-24 border border-green-500/30 bg-green-500/10 rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 40px rgba(34,197,94,0.2)' }}>
                <CheckCircle className="w-14 h-14 text-green-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mt-5 mb-2 font-heading">Đặt Tour Thành Công!</h1>
            <p className="text-white/40 font-body">Cảm ơn bạn đã tin tưởng TravelGo. Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ.</p>
          </div>

          {/* Booking card */}
          <div className="rounded-3xl border border-white/5 bg-[#0a1628]/80 overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-b border-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-sm mb-1 font-mono">MÃ ĐẶT TOUR</p>
                  <p className="text-2xl font-black tracking-wider text-white font-heading" style={{ textShadow: '0 0 20px rgba(34,211,238,0.4)' }}>{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-sm mb-1 font-mono">TRẠNG THÁI</p>
                  <span className="border border-green-500/40 bg-green-500/10 text-green-300 text-sm font-semibold px-3 py-1 rounded-full font-mono">ĐÃ XÁC NHẬN</span>
                </div>
              </div>
            </div>

            {/* Tour info */}
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <img src={tour.image} alt={tour.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 opacity-80" />
                <div>
                  <h3 className="font-bold text-white mb-1 font-heading">{tour.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-white/40 font-mono">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{tour.destination}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-cyan-400" />{new Date(tour.departureDate).toLocaleDateString('vi-VN')}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-cyan-400" />2 người</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-white/3 border border-white/5 rounded-2xl mb-6">
                {[
                  { label: 'Tên khách hàng', value: 'Nguyễn Thị Hương' },
                  { label: 'Email', value: 'huong@email.com' },
                  { label: 'Số điện thoại', value: '0901234567' },
                  { label: 'Hướng dẫn viên', value: tour.guide },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] text-white/30 mb-1 font-mono uppercase tracking-wider">{item.label}</p>
                    <p className="font-semibold text-white/80 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-white/40">Giá tour × 2 người</span><span className="text-white/70">{formatPrice(tour.price * 2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">Đã đặt cọc (30%)</span><span className="text-green-400 font-medium">{formatPrice(Math.round(tour.price * 2 * 0.3))}</span></div>
                <div className="flex justify-between font-bold text-base border-t border-white/5 pt-2">
                  <span className="text-white">Còn lại cần thanh toán</span>
                  <span className="text-cyan-400">{formatPrice(Math.round(tour.price * 2 * 0.7))}</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mx-6 mb-6 p-4 border border-amber-500/20 bg-amber-500/8 rounded-xl">
              <p className="text-sm font-semibold text-amber-300 mb-1">📌 Lưu ý quan trọng</p>
              <ul className="text-xs text-amber-400/70 space-y-1">
                <li>• Vui lòng thanh toán số tiền còn lại trước ngày khởi hành 7 ngày</li>
                <li>• Mang theo CMND/CCCD và mã đặt tour khi check-in</li>
                <li>• Liên hệ hotline 1800 1234 nếu cần hỗ trợ</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 text-white/50 font-medium rounded-xl hover:border-white/20 hover:text-white/70 transition">
              <Download className="w-4 h-4" /> Tải xác nhận PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 text-white/50 font-medium rounded-xl hover:border-white/20 hover:text-white/70 transition">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/" className="flex items-center justify-center gap-2 py-3 border border-white/10 bg-white/3 text-white/60 font-medium rounded-xl hover:bg-white/5 transition">
              <Home className="w-4 h-4" /> Trang chủ
            </Link>
            <Link href="/tours" className="flex items-center justify-center gap-2 py-3 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-medium rounded-xl hover:bg-cyan-500/20 transition">
              <Compass className="w-4 h-4" /> Khám phá thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </TravelLayout>
  );
}
