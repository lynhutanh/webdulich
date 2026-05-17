import React, { useState } from 'react';
import AdminLayout from '@layouts/AdminLayout';
import { tours, formatPrice, Tour } from 'src/data/mockData';
import { Plus, Search, Edit2, Trash2, Eye, Star, ChevronLeft, ChevronRight, X, MapPin, Clock, Users } from 'lucide-react';

const difficultyColors = {
  Easy: 'text-green-300 bg-green-500/10',
  Moderate: 'text-amber-300 bg-amber-500/10',
  Hard: 'text-red-300 bg-red-500/10',
};

export default function AdminToursPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editTour, setEditTour] = useState<Tour | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [tourList, setTourList] = useState(tours);

  const ITEMS = 5;
  const filtered = tourList.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const handleDelete = (id: string) => {
    setTourList((prev) => prev.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  return (
    <AdminLayout title="Quản lý Tours">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Tìm kiếm tour..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <button
          onClick={() => { setEditTour(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 text-sm font-medium rounded-xl hover:bg-cyan-500/25 transition whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Thêm tour mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0a1628]/80 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a1628] border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Tour</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Điểm đến</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Giá</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Đánh giá</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Độ khó</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 font-mono uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-white/35">Không tìm thấy tour nào</td></tr>
              ) : paginated.map((tour) => (
                <tr key={tour.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={tour.image} alt="" className="w-12 h-10 rounded-xl object-cover flex-shrink-0 opacity-80" />
                      <div>
                        <p className="text-sm font-semibold text-white line-clamp-1 max-w-[200px]">{tour.title}</p>
                        <div className="flex items-center gap-2 text-xs text-white/35 mt-0.5 font-mono">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tour.groupSize}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-white/60"><MapPin className="w-3.5 h-3.5 text-cyan-400/60" />{tour.destination}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-cyan-400">{formatPrice(tour.price)}</p>
                    {tour.originalPrice && <p className="text-xs text-white/25 line-through">{formatPrice(tour.originalPrice)}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-white/70">{tour.rating}</span>
                      <span className="text-xs text-white/35">({tour.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[tour.difficulty]}`}>{tour.difficulty}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <a href={`/tours/${tour.id}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition">
                        <Eye className="w-4 h-4" />
                      </a>
                      <button onClick={() => { setEditTour(tour); setShowModal(true); }} className="p-1.5 rounded-lg text-white/30 hover:text-amber-300 hover:bg-amber-500/10 transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(tour.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
            <p className="text-sm text-white/35">Hiển thị {(page - 1) * ITEMS + 1}–{Math.min(page * ITEMS, filtered.length)} / {filtered.length}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-40 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' : 'border border-white/10 text-white/60 hover:bg-white/5'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-40 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#0a1628] border border-white/5 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">{editTour ? 'Chỉnh sửa tour' : 'Thêm tour mới'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5 transition"><X className="w-5 h-5 text-white/40" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Tên tour', key: 'title', placeholder: 'Nhập tên tour...' },
                { label: 'Điểm đến', key: 'destination', placeholder: 'Hội An, Hạ Long...' },
                { label: 'Giá (VND)', key: 'price', placeholder: '2500000', type: 'number' },
                { label: 'Thời gian', key: 'duration', placeholder: '3 ngày 2 đêm' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    defaultValue={editTour ? String(editTour[field.key as keyof Tour] || '') : ''}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Mô tả</label>
                <textarea
                  rows={3}
                  defaultValue={editTour?.description || ''}
                  className="w-full px-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-white/10 text-white/60 font-medium rounded-xl hover:bg-white/5 transition text-sm">Hủy</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 font-medium rounded-xl hover:bg-cyan-500/25 transition text-sm">
                  {editTour ? 'Lưu thay đổi' : 'Thêm tour'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0a1628] border border-white/5 rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Xóa tour này?</h3>
            <p className="text-white/35 text-sm mb-6">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/10 text-white/60 font-medium rounded-xl hover:bg-white/5 transition text-sm">Hủy</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 border border-red-500/30 bg-red-500/10 text-red-400 font-medium rounded-xl hover:bg-red-500/20 transition text-sm">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
