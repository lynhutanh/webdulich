import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import { tours, formatPrice } from 'src/data/mockData';
import { ChevronRight, User, Mail, Phone, Calendar, Users, Shield, CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';

const paymentMethods = [
  { id: 'card',   label: 'Thẻ tín dụng / Ghi nợ',      icon: CreditCard },
  { id: 'wallet', label: 'Ví điện tử (MoMo, ZaloPay)',  icon: Wallet },
  { id: 'bank',   label: 'Chuyển khoản ngân hàng',      icon: Building2 },
];

const inputCls = 'w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition';
const labelCls = 'block text-xs font-mono text-white/40 uppercase tracking-wider mb-1.5';

export default function BookingPage() {
  const router = useRouter();
  const { tourId, guests: guestsParam, date: dateParam } = router.query;
  const tour = tours.find((t) => t.id === tourId) || tours[0];
  const guests = Number(guestsParam) || 2;
  const date = (dateParam as string) || tour.departureDate;

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '', agreeTerms: false });
  const [loading, setLoading] = useState(false);

  const total = tour.price * guests;
  const deposit = Math.round(total * 0.3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push('/booking/success');
  };

  return (
    <TravelLayout>
      <div className="pt-20 bg-[#020817] min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-white/30 font-mono">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tours" className="hover:text-cyan-400 transition-colors">Tours</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/tours/${tour.id}`} className="hover:text-cyan-400 transition-colors line-clamp-1 max-w-xs">{tour.title}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/60">Đặt tour</span>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 relative z-10">
          <div className="flex items-center gap-4">
            {[{ n: 1, label: 'Thông tin' }, { n: 2, label: 'Thanh toán' }, { n: 3, label: 'Xác nhận' }].map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all font-mono ${
                    step >= s.n ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' : 'border border-white/10 text-white/25'
                  }`}>
                    {step > s.n ? <CheckCircle className="w-5 h-5 text-cyan-400" /> : s.n}
                  </div>
                  <span className={`text-sm font-mono hidden sm:block ${step >= s.n ? 'text-cyan-300' : 'text-white/25'}`}>{s.label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px transition-all ${step > s.n ? 'bg-cyan-500/50' : 'bg-white/8'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 relative z-10">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 p-6">
                    <div className="inline-flex items-center gap-2 mb-6">
                      <span className="w-4 h-px bg-cyan-400" />
                      <h2 className="text-lg font-bold text-white font-heading">Thông tin liên hệ</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Họ và tên *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Số điện thoại *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0901234567" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Ngày khởi hành</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input type="date" value={date} readOnly className={`${inputCls} opacity-50 cursor-not-allowed [color-scheme:dark]`} />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelCls}>Ghi chú (tùy chọn)</label>
                        <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3}
                          placeholder="Yêu cầu đặc biệt, dị ứng thức ăn, v.v."
                          className="w-full px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 resize-none transition" />
                      </div>
                    </div>
                    <label className="flex items-start gap-3 mt-4 cursor-pointer">
                      <input type="checkbox" checked={form.agreeTerms} onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })} className="mt-0.5 accent-cyan-500" required />
                      <span className="text-sm text-white/40">Tôi đồng ý với <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">điều khoản dịch vụ</Link> và <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">chính sách bảo mật</Link></span>
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 p-6">
                    <div className="inline-flex items-center gap-2 mb-6">
                      <span className="w-4 h-px bg-violet-400" />
                      <h2 className="text-lg font-bold text-white font-heading">Phương thức thanh toán</h2>
                    </div>
                    <div className="space-y-3 mb-6">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === method.id ? 'border-cyan-500/50 bg-cyan-500/8' : 'border-white/5 bg-white/3 hover:border-white/10'
                        }`}>
                          <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="accent-cyan-500" />
                          <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-cyan-400' : 'text-white/25'}`} />
                          <span className={`font-medium text-sm ${paymentMethod === method.id ? 'text-cyan-300' : 'text-white/50'}`}>{method.label}</span>
                        </label>
                      ))}
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 bg-white/3 border border-white/5 rounded-xl">
                        <p className="text-xs font-mono text-white/40 uppercase tracking-wider">Thông tin thẻ</p>
                        <input placeholder="Số thẻ" className="w-full px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 transition" />
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="MM/YY" className="px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 transition" />
                          <input placeholder="CVV" className="px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 transition" />
                        </div>
                        <input placeholder="Tên chủ thẻ" className="w-full px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 transition" />
                        <p className="text-xs text-white/25 flex items-center gap-1 font-mono"><Shield className="w-3 h-3 text-green-400" /> Thông tin thẻ được mã hóa SSL 256-bit</p>
                      </div>
                    )}

                    <div className="mt-4 p-4 border border-amber-500/20 bg-amber-500/8 rounded-xl">
                      <p className="text-sm font-semibold text-amber-300 mb-1">Đặt cọc 30%</p>
                      <p className="text-xs text-amber-400/70">Bạn chỉ cần thanh toán <strong className="text-amber-300">{formatPrice(deposit)}</strong> ngay bây giờ. Số còn lại thanh toán trước ngày khởi hành 7 ngày.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Order summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 overflow-hidden sticky top-24">
                  <img src={tour.image} alt={tour.title} className="w-full h-40 object-cover opacity-70" />
                  <div className="p-5 space-y-4">
                    <h3 className="font-bold text-white leading-snug font-heading">{tour.title}</h3>
                    <div className="space-y-2 text-sm text-white/40 font-mono">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-400" />{new Date(date).toLocaleDateString('vi-VN')}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4 text-cyan-400" />{guests} người</div>
                    </div>
                    <div className="border-t border-white/5 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/35">{formatPrice(tour.price)} × {guests}</span>
                        <span className="text-white/70">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/35">Phí dịch vụ</span>
                        <span className="text-green-400">Miễn phí</span>
                      </div>
                      <div className="flex justify-between font-bold text-base border-t border-white/5 pt-2">
                        <span className="text-white">Tổng cộng</span>
                        <span className="text-cyan-400">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm border border-amber-500/20 bg-amber-500/8 rounded-lg px-3 py-2">
                        <span className="text-amber-400/70">Đặt cọc ngay</span>
                        <span className="font-bold text-amber-300">{formatPrice(deposit)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {step === 2 && (
                        <button type="button" onClick={() => setStep(1)}
                          className="flex-1 py-2.5 border border-white/10 text-white/50 font-medium rounded-xl hover:bg-white/5 transition text-sm">
                          Quay lại
                        </button>
                      )}
                      <button type="submit" disabled={loading}
                        className="flex-1 py-2.5 border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 font-bold rounded-xl hover:bg-cyan-500/25 hover:border-cyan-400/60 transition-all disabled:opacity-60 text-sm font-heading">
                        {loading ? 'Đang xử lý...' : step === 1 ? 'Tiếp tục' : 'Xác nhận đặt tour'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </TravelLayout>
  );
}
