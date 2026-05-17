import React, { useState } from 'react';
import TravelLayout from '@layouts/TravelLayout';
import { bookings, formatPrice } from 'src/data/mockData';
import { User, Mail, Phone, MapPin, Camera, Edit3, Calendar, CheckCircle, XCircle, AlertCircle, Star, Settings, Heart, BookOpen } from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { id: 'profile',  label: 'Hồ sơ',    icon: User },
  { id: 'bookings', label: 'Đặt tour',  icon: BookOpen },
  { id: 'reviews',  label: 'Đánh giá',  icon: Star },
  { id: 'settings', label: 'Cài đặt',   icon: Settings },
];

const statusConfig = {
  confirmed: { label: 'Đã xác nhận', color: 'text-green-300 bg-green-500/10 border-green-500/30',  icon: CheckCircle },
  pending:   { label: 'Chờ xác nhận', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30', icon: AlertCircle },
  cancelled: { label: 'Đã hủy',       color: 'text-red-300 bg-red-500/10 border-red-500/30',       icon: XCircle },
  completed: { label: 'Hoàn thành',   color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',    icon: CheckCircle },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: 'Nguyễn Thị Hương', email: 'huong@email.com', phone: '0901234567', location: 'Hà Nội', bio: 'Yêu thích du lịch và khám phá những vùng đất mới.' });
  const userBookings = bookings.filter((b) => b.userId === 'u1');

  const inputCls = 'w-full px-3 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 transition';

  return (
    <TravelLayout>
      <div className="min-h-screen bg-[#020817] pt-20 relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />

        {/* Cover */}
        <div className="h-48 relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=60" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/15 to-violet-600/20" />
          <div className="absolute inset-0 holo-grid opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Avatar & name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-8">
            <div className="relative">
              <img src="https://i.pravatar.cc/120?img=1" alt="" className="w-28 h-28 rounded-2xl border-2 border-cyan-500/30 shadow-lg object-cover" style={{ boxShadow: '0 0 30px rgba(34,211,238,0.15)' }} />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-black text-white font-heading">{form.name}</h1>
              <p className="text-white/35 text-sm flex items-center gap-1 mt-0.5 font-mono"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{form.location}</p>
            </div>
            <div className="flex items-center gap-3 pb-2">
              {[
                { v: userBookings.length, l: 'Tours đã đặt' },
                { v: '4.9', l: 'Đánh giá TB' },
              ].map((s) => (
                <div key={s.l} className="text-center px-4 py-2 border border-white/5 bg-white/3 rounded-xl">
                  <p className="text-xl font-black text-cyan-400 font-heading">{s.v}</p>
                  <p className="text-xs text-white/30 font-mono">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/5 mb-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-white/35 hover:text-white/60'
                }`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-3 gap-6 pb-12">
              <div className="md:col-span-2 rounded-2xl border border-white/5 bg-[#0a1628]/80 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-white font-heading">Thông tin cá nhân</h2>
                  <button onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 rounded-xl hover:bg-cyan-500/20 transition">
                    <Edit3 className="w-4 h-4" /> {editing ? 'Hủy' : 'Chỉnh sửa'}
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Họ và tên', key: 'name', icon: User },
                    { label: 'Email', key: 'email', icon: Mail },
                    { label: 'Số điện thoại', key: 'phone', icon: Phone },
                    { label: 'Địa chỉ', key: 'location', icon: MapPin },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1.5">{field.label}</label>
                      {editing ? (
                        <input value={form[field.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className={inputCls} />
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-white/60 py-2.5">
                          <field.icon className="w-4 h-4 text-white/20" /> {form[field.key as keyof typeof form]}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1.5">Giới thiệu</label>
                    {editing ? (
                      <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
                    ) : (
                      <p className="text-sm text-white/60 py-2.5 font-body">{form.bio}</p>
                    )}
                  </div>
                </div>
                {editing && (
                  <button onClick={() => setEditing(false)} className="mt-4 px-6 py-2.5 border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 font-medium rounded-xl hover:bg-cyan-500/25 transition text-sm font-heading">
                    Lưu thay đổi
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 p-5">
                  <h3 className="font-bold text-white mb-4 font-heading">Thống kê</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Tours đã đặt', value: userBookings.length, color: 'text-cyan-400' },
                      { label: 'Tours hoàn thành', value: userBookings.filter((b) => b.status === 'completed').length, color: 'text-green-400' },
                      { label: 'Tổng chi tiêu', value: formatPrice(userBookings.reduce((s, b) => s + b.totalPrice, 0)), color: 'text-violet-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-sm text-white/35 font-body">{stat.label}</span>
                        <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/wishlist" className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-[#0a1628]/80 hover:border-red-500/20 hover:bg-[#0a1628] transition group">
                  <div className="w-10 h-10 border border-red-500/20 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:border-red-500/40 transition">
                    <Heart className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white/80 text-sm font-heading">Danh sách yêu thích</p>
                    <p className="text-xs text-white/30 font-mono">2 TOURS ĐÃ LƯU</p>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Bookings tab */}
          {activeTab === 'bookings' && (
            <div className="pb-12 space-y-4">
              {userBookings.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-white/5 bg-[#0a1628]/60">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h3 className="font-bold text-white mb-2 font-heading">Chưa có đặt tour nào</h3>
                  <p className="text-white/35 mb-6 font-body">Hãy khám phá và đặt tour đầu tiên của bạn</p>
                  <Link href="/tours" className="px-6 py-2.5 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 rounded-xl font-medium hover:bg-cyan-500/20 transition font-heading">Khám phá tours</Link>
                </div>
              ) : (
                userBookings.map((booking) => {
                  const status = statusConfig[booking.status];
                  return (
                    <div key={booking.id} className="rounded-2xl border border-white/5 bg-[#0a1628]/80 overflow-hidden hover:border-white/10 transition">
                      <div className="flex flex-col sm:flex-row">
                        <img src={booking.tourImage} alt="" className="w-full sm:w-36 h-32 sm:h-auto object-cover flex-shrink-0 opacity-70" />
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-bold text-white/85 font-heading">{booking.tourName}</h3>
                            <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap font-mono ${status.color}`}>
                              <status.icon className="w-3 h-3" /> {status.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-white/35 mb-3 font-mono">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{booking.destination}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-cyan-400" />{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-cyan-400" />{booking.guests} người</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-cyan-400 font-heading">{formatPrice(booking.totalPrice)}</span>
                            <span className="text-xs text-white/25 font-mono">Mã: {booking.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div className="pb-12 max-w-lg">
              <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 p-6 space-y-5">
                <h2 className="font-bold text-white font-heading">Cài đặt tài khoản</h2>
                {[
                  { label: 'Thông báo email', desc: 'Nhận email về đặt tour và ưu đãi', on: true },
                  { label: 'Thông báo SMS', desc: 'Nhận SMS xác nhận đặt tour', on: false },
                  { label: 'Bản tin hàng tuần', desc: 'Nhận gợi ý tour và deal hấp dẫn', on: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-medium text-white/80 text-sm font-heading">{setting.label}</p>
                      <p className="text-xs text-white/30 font-body">{setting.desc}</p>
                    </div>
                    <button className={`w-11 h-6 rounded-full relative transition-colors ${setting.on ? 'bg-cyan-500/60 border border-cyan-500/40' : 'bg-white/10 border border-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${setting.on ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
                <div className="pt-2">
                  <button className="w-full py-2.5 border border-red-500/30 text-red-400 font-medium rounded-xl hover:bg-red-500/10 transition text-sm font-heading">
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TravelLayout>
  );
}
