import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { users, formatPrice, User } from 'src/data/mockData';
import { Search, Eye, Ban, CheckCircle, Trash2, ChevronLeft, ChevronRight, Shield, UserCheck, UserX, X } from 'lucide-react';

const statusConfig = {
  active: { label: 'Hoạt động', color: 'text-green-300 bg-green-500/10 border-green-500/30' },
  inactive: { label: 'Không hoạt động', color: 'text-white/60 bg-white/5 border-white/10' },
  banned: { label: 'Bị khóa', color: 'text-red-300 bg-red-500/10 border-red-500/30' },
};

const roleConfig = {
  admin: { label: 'Admin', color: 'text-cyan-300 bg-cyan-500/10' },
  user: { label: 'User', color: 'text-white/60 bg-white/5' },
};

const ITEMS = 5;

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userList, setUserList] = useState(users);

  const filtered = userList.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const updateStatus = (id: string, status: User['status']) => {
    setUserList((prev) => prev.map((u) => u.id === id ? { ...u, status } : u));
    setSelectedUser(null);
  };

  return (
    <AdminLayout title="Quản lý Users">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Tìm kiếm user..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all" className="bg-[#0a1628]">Tất cả</option>
            <option value="admin" className="bg-[#0a1628]">Admin</option>
            <option value="user" className="bg-[#0a1628]">User</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Tổng users', value: userList.length, icon: UserCheck, color: 'text-cyan-300 bg-cyan-500/10' },
          { label: 'Đang hoạt động', value: userList.filter((u) => u.status === 'active').length, icon: CheckCircle, color: 'text-green-300 bg-green-500/10' },
          { label: 'Bị khóa', value: userList.filter((u) => u.status === 'banned').length, icon: UserX, color: 'text-red-300 bg-red-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0a1628]/80 rounded-2xl border border-white/5 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/35">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0a1628]/80 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a1628] border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Người dùng</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Vai trò</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Đặt tour</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Chi tiêu</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Ngày tham gia</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Trạng thái</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-white/35">Không tìm thấy user</td></tr>
              ) : paginated.map((user) => {
                const status = statusConfig[user.status];
                const role = roleConfig[user.role];
                return (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0 opacity-80" />
                        <div>
                          <p className="text-sm font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-white/35">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${role.color}`}>
                        {user.role === 'admin' && <Shield className="w-3 h-3" />} {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-white/60">{user.bookings}</td>
                    <td className="px-5 py-4 text-sm font-medium text-white">{formatPrice(user.totalSpent)}</td>
                    <td className="px-5 py-4 text-sm text-white/35 whitespace-nowrap">{new Date(user.joinDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedUser(user)} className="p-1.5 rounded-lg text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition"><Eye className="w-4 h-4" /></button>
                        <button
                          onClick={() => updateStatus(user.id, user.status === 'banned' ? 'active' : 'banned')}
                          className={`p-1.5 rounded-lg transition ${user.status === 'banned' ? 'text-white/30 hover:text-green-300 hover:bg-green-500/10' : 'text-white/30 hover:text-red-400 hover:bg-red-500/10'}`}
                        >
                          {user.status === 'banned' ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setUserList((prev) => prev.filter((u) => u.id !== user.id))} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
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

      {/* User detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className="relative bg-[#0a1628] border border-white/5 rounded-3xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Chi tiết user</h2>
              <button onClick={() => setSelectedUser(null)} className="p-2 rounded-xl hover:bg-white/5 transition"><X className="w-5 h-5 text-white/40" /></button>
            </div>
            <div className="p-6">
              <div className="text-center mb-5">
                <img src={selectedUser.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3 ring-4 ring-cyan-500/20 opacity-90" />
                <h3 className="font-bold text-white">{selectedUser.name}</h3>
                <p className="text-sm text-white/35">{selectedUser.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                {[
                  { label: 'Vai trò', value: selectedUser.role },
                  { label: 'Trạng thái', value: statusConfig[selectedUser.status].label },
                  { label: 'Điện thoại', value: selectedUser.phone || 'N/A' },
                  { label: 'Địa chỉ', value: selectedUser.location || 'N/A' },
                  { label: 'Đặt tour', value: selectedUser.bookings.toString() },
                  { label: 'Chi tiêu', value: formatPrice(selectedUser.totalSpent) },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/5 rounded-xl p-3">
                    <p className="text-xs text-white/35 mb-0.5">{item.label}</p>
                    <p className="font-semibold text-white text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(selectedUser.id, 'active')} className="flex-1 py-2 border border-green-500/30 bg-green-500/10 text-green-300 font-medium rounded-xl text-sm hover:bg-green-500/20 transition">Kích hoạt</button>
                <button onClick={() => updateStatus(selectedUser.id, 'banned')} className="flex-1 py-2 border border-red-500/30 bg-red-500/10 text-red-400 font-medium rounded-xl text-sm hover:bg-red-500/20 transition">Khóa tài khoản</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
