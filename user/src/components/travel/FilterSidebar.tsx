import React, { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  duration: string[];
  difficulty: string[];
  rating: number;
}

const categories = ['Cultural', 'Beach', 'Adventure', 'Cruise', 'Nature', 'City'];
const durations = ['1-2 ngày', '3-4 ngày', '5-7 ngày', '8+ ngày'];
const difficulties = ['Easy', 'Moderate', 'Hard'];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3 group">
        <span className="text-xs font-mono text-white/50 uppercase tracking-[0.15em]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-white/25" /> : <ChevronDown className="w-4 h-4 text-white/25" />}
      </button>
      {open && children}
    </div>
  );
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({ categories: [], priceRange: [0, 10000000], duration: [], difficulty: [], rating: 0 });

  const toggleArray = (key: 'categories' | 'duration' | 'difficulty', value: string) => {
    const arr = filters[key];
    const updated = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    const newFilters = { ...filters, [key]: updated };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const reset: FilterState = { categories: [], priceRange: [0, 10000000], duration: [], difficulty: [], rating: 0 };
    setFilters(reset);
    onFilterChange?.(reset);
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.duration.length > 0 || filters.difficulty.length > 0 || filters.rating > 0;

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-white/80 text-sm font-heading">Bộ lọc</h3>
        </div>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-mono transition">
            <X className="w-3 h-3" /> Xóa tất cả
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Loại tour">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <div onClick={() => toggleArray('categories', cat)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                  filters.categories.includes(cat) ? 'bg-cyan-500 border-cyan-500' : 'border-white/15 group-hover:border-cyan-500/50'
                }`}>
                {filters.categories.includes(cat) && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-sm text-white/45 group-hover:text-white/70 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price range */}
      <FilterSection title="Khoảng giá">
        <div className="space-y-3">
          <input type="range" min={0} max={10000000} step={500000} value={filters.priceRange[1]}
            onChange={(e) => {
              const newFilters = { ...filters, priceRange: [0, Number(e.target.value)] as [number, number] };
              setFilters(newFilters); onFilterChange?.(newFilters);
            }}
            className="w-full accent-cyan-500" />
          <div className="flex items-center justify-between text-xs text-white/30 font-mono">
            <span>0đ</span>
            <span className="text-cyan-400">{new Intl.NumberFormat('vi-VN').format(filters.priceRange[1])}đ</span>
          </div>
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Thời gian">
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => (
            <button key={d} onClick={() => toggleArray('duration', d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filters.duration.includes(d) ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' : 'border border-white/8 bg-white/3 text-white/40 hover:border-white/15 hover:text-white/60'
              }`}>
              {d}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Difficulty */}
      <FilterSection title="Độ khó">
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => {
            const colors = { Easy: 'border-green-500/30 text-green-400/60', Moderate: 'border-amber-500/30 text-amber-400/60', Hard: 'border-red-500/30 text-red-400/60' };
            const activeColors = { Easy: 'bg-green-500/20 border-green-500/50 text-green-300', Moderate: 'bg-amber-500/20 border-amber-500/50 text-amber-300', Hard: 'bg-red-500/20 border-red-500/50 text-red-300' };
            return (
              <button key={d} onClick={() => toggleArray('difficulty', d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  filters.difficulty.includes(d) ? activeColors[d as keyof typeof activeColors] : `bg-white/3 ${colors[d as keyof typeof colors]} hover:bg-white/5`
                }`}>
                {d}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Đánh giá tối thiểu" defaultOpen={false}>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5, 3.0].map((r) => (
            <button key={r} onClick={() => {
              const newFilters = { ...filters, rating: filters.rating === r ? 0 : r };
              setFilters(newFilters); onFilterChange?.(newFilters);
            }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                filters.rating === r ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300' : 'text-white/40 hover:bg-white/3 hover:text-white/60'
              }`}>
              <span className="text-amber-400">{'★'.repeat(Math.floor(r))}</span>
              <span className="font-mono text-xs">{r}+ sao</span>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
