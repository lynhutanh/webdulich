import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { bookings, formatPrice, Booking } from 'src/data/mockData';
import { Search, Eye, CheckCircle, XCircle, AlertCircle, Clock, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';

const statusConfig = {
  confirmed: { label: 'Xác nhận', color: 'text-green-300 bg-green-500/10 border-green-500/30', icon: CheckCircle },
  pending: { label: 'Chờ xác nhận', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30', icon: AlertCircle },
  cancelled: { label: 'Đã hủy', color: 'text-red-300 bg-red-500/10 border-red-500/30', icon: XCircle },
  completed: { label: 'Hoàn thành', color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30', icon: CheckCircle },
};

const ITEMS = 5;

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingList, setBookingList] = useState(bookings);

  const filtered = bookingList.filter((b) => {
    const matchSearch = b.userName.toLowerCase().includes(search.toLowerCase()) || b.tourName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const updateStatus = (id: string, status: Booking['status']) => {
    setBookingList((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    setSelectedBooking(null);
  };

  return (
    <AdminLayout title="Quản lý Đặt tour">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50 appearance-none"
            >
              <option value="all" className="bg-[#0a1628]">Tất cả</option>
              <option value="pending" className="bg-[#0a1628]">Chờ xác nhận</option>
              <option value="confirmed" className="bg-[#0a1628]">Đã xác nhận</option>
              <option value="completed" className="bg-[#0a1628]">Hoàn thành</option>
              <option value="cancelled" className="bg-[#0a1628]">Đã hủy</option>
            </select>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 bg-white/5 text-white/60 text-sm font-medium rounded-xl hover:bg-white/10 transition whitespace-nowrap">
          <Download className="w-4 h-4" /> Xuất Excel
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const count = bookingList.filter((b) => b.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${statusFilter === key ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-white/5 bg-[#0a1628]/80 hover:border-white/10'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <cfg.icon className="w-4 h-4 text-white/30" />
                <span className="text-xs text-white/60">{cfg.label}</span>
              </div>
              <p className="text-2xl font-black text-white">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-[#0a1628]/80 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a1628] border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Mã đặt</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Khách hàng</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Tour</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Ngày đi</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Tổng tiền</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Trạng thái</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-white/35">Không có dữ liệu</td></tr>
              ) : paginated.map((booking) => {
                const status = statusConfig[booking.status];
                return (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-4 text-sm font-mono font-medium text-white/60">{booking.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-white">{booking.userName}</p>
                      <p className="text-xs text-white/35">{booking.userEmail}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-white/60 line-clamp-1 max-w-[160px]">{booking.tourName}</p>
                      <p className="text-xs text-white/35">{booking.guests} người</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-white/60 whitespace-nowrap">
                      {new Date(booking.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-white whitespace-nowrap">
                      {formatPrice(booking.totalPrice)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${status.color}`}>
                        <status.icon className="w-3 h-3" /> {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => setSelectedBooking(booking)} className="p-1.5 rounded-lg text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
            <p className="text-sm text-white/35">Hiển thị {(page - 1) * ITEMS + 1}–{Math.min(page * ITEMS, filtered.length)} / {filtered.length}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-40 transition"><ChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' : 'border border-white/10 text-white/60 hover:bg-white/5'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-40 transition"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* Booking detail modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
          <div className="relative bg-[#0a1628] border border-white/5 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Chi tiết đặt tour</h2>
              <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-xl hover:bg-white/5 transition"><XCircle className="w-5 h-5 text-white/40" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <img src={selectedBooking.tourImage} alt="" className="w-14 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-white text-sm">{selectedBooking.tourName}</p>
                  <p className="text-xs text-white/35">{selectedBooking.destination}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Mã đặt', value: selectedBooking.id },
                  { label: 'Khách hàng', value: selectedBooking.userName },
                  { label: 'Email', value: selectedBooking.userEmail },
                  { label: 'Số khách', value: `${selectedBooking.guests} người` },
                  { label: 'Ngày đi', value: new Date(selectedBooking.date).toLocaleDateString('vi-VN') },
                  { label: 'Tổng tiền', value: formatPrice(selectedBooking.totalPrice) },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-white/35 mb-0.5">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-white/35 mb-2">Cập nhật trạng thái</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['confirmed', 'completed', 'pending', 'cancelled'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedBooking.id, s)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${selectedBooking.status === s ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'border-white/10 text-white/60 hover:bg-white/5'}`}
                    >
                      {statusConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
