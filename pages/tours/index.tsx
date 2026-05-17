import React, { useState, useMemo } from 'react';
import TravelLayout from '@layouts/TravelLayout';
import TourCard from '@components/travel/TourCard';
import FilterSidebar, { FilterState } from '@components/travel/FilterSidebar';
import SearchBar from '@components/travel/SearchBar';
import { TourCardSkeleton } from '@components/travel/LoadingSkeleton';
import { tours } from 'src/data/mockData';
import { Grid3X3, List, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;
const sortOptions = [
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
];

export default function ToursPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({ categories: [], priceRange: [0, 10000000], duration: [], difficulty: [], rating: 0 });
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let result = [...tours];
    if (filters.categories.length > 0) result = result.filter((t) => filters.categories.includes(t.category));
    if (filters.difficulty.length > 0) result = result.filter((t) => filters.difficulty.includes(t.difficulty));
    if (filters.rating > 0) result = result.filter((t) => t.rating >= filters.rating);
    result = result.filter((t) => t.price <= filters.priceRange[1]);
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <TravelLayout>
      {/* Header */}
      <div className="bg-[#020817] pt-24 pb-12 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 holo-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-cyan-400" />
            <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.25em]">// KHÁM PHÁ</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 font-heading">Tất Cả Tours</h1>
          <p className="text-white/35 mb-8 font-mono text-sm">{tours.length}+ TOUR DU LỊCH HẤP DẪN</p>
          <SearchBar variant="inline" />
        </div>
      </div>

      <div className="bg-[#020817] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex gap-8">
            {/* Sidebar desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar onFilterChange={(f) => { setFilters(f); setPage(1); }} />
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl text-sm font-mono text-white/50 hover:border-white/20 hover:text-white/70 transition">
                    <SlidersHorizontal className="w-4 h-4" /> Bộ lọc
                  </button>
                  <p className="text-sm text-white/35 font-mono">
                    TÌM THẤY <span className="font-semibold text-cyan-400">{filtered.length}</span> TOURS
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select value={sort} onChange={(e) => setSort(e.target.value)}
                    className="text-sm border border-white/10 bg-[#0a1628] text-white/60 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500/50 font-mono [color-scheme:dark]">
                    {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                    <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/30 hover:bg-white/5'}`}>
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-white/30 hover:bg-white/5'}`}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {Array.from({ length: 6 }).map((_, i) => <TourCardSkeleton key={i} />)}
                </div>
              ) : paginated.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border border-white/5 bg-[#0a1628]/40">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">Không tìm thấy tour</h3>
                  <p className="text-white/35 mb-6 font-body">Thử thay đổi bộ lọc để tìm tour phù hợp hơn</p>
                  <button onClick={() => setFilters({ categories: [], priceRange: [0, 10000000], duration: [], difficulty: [], rating: 0 })}
                    className="px-6 py-2.5 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 rounded-xl font-medium hover:bg-cyan-500/20 transition font-heading">
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} ${viewMode === 'grid' ? 'pt-14' : ''}`}>
                  {paginated.map((tour) => <TourCard key={tour.id} tour={tour} variant={viewMode === 'list' ? 'horizontal' : 'default'} />)}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                    className="p-2 rounded-xl border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-30 transition">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-mono transition ${page === i + 1 ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' : 'border border-white/10 text-white/40 hover:bg-white/5'}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="p-2 rounded-xl border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-30 transition">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0a1628] border-l border-white/5 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white font-heading">Bộ lọc</h3>
              <button onClick={() => setShowMobileFilter(false)} className="p-2 rounded-lg text-white/40 hover:bg-white/5 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar onFilterChange={(f) => { setFilters(f); setPage(1); }} />
          </div>
        </div>
      )}
    </TravelLayout>
  );
}
