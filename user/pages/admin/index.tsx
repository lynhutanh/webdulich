import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { bookings, tours, users, formatPrice } from 'src/data/mockData';
import { TrendingUp, TrendingDown, Users, Compass, BookOpen, DollarSign, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Tổng doanh thu', value: formatPrice(125000000), change: '+12.5%', up: true, icon: DollarSign, color: 'from-cyan-500 to-cyan-600' },
  { label: 'Đặt tour tháng này', value: '48', change: '+8.2%', up: true, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
  { label: 'Tổng người dùng', value: users.length.toString(), change: '+5.1%', up: true, icon: Users, color: 'from-purple-500 to-purple-600' },
  { label: 'Tours đang hoạt động', value: tours.length.toString(), change: '-2.3%', up: false, icon: Compass, color: 'from-amber-500 to-amber-600' },
];

const recentBookings = bookings.slice(0, 5);

const statusColors = {
  confirmed: 'text-green-300 bg-green-500/10',
  pending: 'text-amber-300 bg-amber-500/10',
  cancelled: 'text-red-300 bg-red-500/10',
  completed: 'text-cyan-300 bg-cyan-500/10',
};
const statusLabels = { confirmed: 'Xác nhận', pending: 'Chờ', cancelled: 'Hủy', completed: 'Hoàn thành' };

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#0a1628]/80 rounded-2xl border border-white/5 hover:border-white/10 p-5 transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${stat.up ? 'text-green-300 bg-green-500/10' : 'text-red-300 bg-red-500/10'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/35">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-[#0a1628]/80 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <h2 className="font-bold text-white">Đặt tour gần đây</h2>
            <Link href="/admin/bookings" className="text-sm text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Khách hàng</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Tour</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Ngày</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Tổng tiền</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-white">{booking.userName}</p>
                        <p className="text-xs text-white/35">{booking.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white/60 line-clamp-1 max-w-[160px]">{booking.tourName}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white/35 whitespace-nowrap">
                      {new Date(booking.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-white whitespace-nowrap">
                      {formatPrice(booking.totalPrice)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Top tours */}
          <div className="bg-[#0a1628]/80 rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Tours nổi bật</h2>
              <Link href="/admin/tours" className="text-xs text-cyan-400 font-medium">Xem thêm</Link>
            </div>
            <div className="space-y-3">
              {tours.slice(0, 4).map((tour) => (
                <div key={tour.id} className="flex items-center gap-3">
                  <img src={tour.image} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0 opacity-80" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white line-clamp-1">{tour.title}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" /> {tour.rating} ({tour.reviewCount})
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 whitespace-nowrap">{formatPrice(tour.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-[#0a1628]/80 rounded-2xl border border-white/5 p-5">
            <h2 className="font-bold text-white mb-4">Thống kê nhanh</h2>
            <div className="space-y-3">
              {[
                { label: 'Đặt tour hôm nay', value: '5', color: 'bg-cyan-500' },
                { label: 'Chờ xác nhận', value: bookings.filter((b) => b.status === 'pending').length.toString(), color: 'bg-amber-500' },
                { label: 'Hoàn thành tháng này', value: bookings.filter((b) => b.status === 'completed').length.toString(), color: 'bg-green-500' },
                { label: 'Đã hủy', value: bookings.filter((b) => b.status === 'cancelled').length.toString(), color: 'bg-red-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-white/60">{item.label}</span>
                  </div>
                  <span className="font-bold text-white text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
