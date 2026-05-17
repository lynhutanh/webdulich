import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  variant?: 'hero' | 'inline';
}

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    if (guests) params.set('guests', String(guests));
    router.push(`/tours?${params.toString()}`);
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Điểm đến..." value={destination} onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition" />
        </div>
        <button type="submit" className="px-5 py-2.5 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-xl hover:bg-cyan-500/20 transition flex items-center gap-2 font-heading">
          <Search className="w-4 h-4" /> Tìm kiếm
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch}
      className="bg-[#0a1628]/90 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2"
      style={{ boxShadow: '0 0 40px rgba(34,211,238,0.08)' }}>

      {/* Destination */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/3 transition-colors cursor-pointer">
        <div className="w-9 h-9 bg-cyan-500/15 border border-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-0.5">ĐIỂM ĐẾN</p>
          <input type="text" placeholder="Bạn muốn đi đâu?" value={destination} onChange={(e) => setDestination(e.target.value)}
            className="w-full text-sm text-white placeholder-white/25 bg-transparent outline-none font-medium" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-white/5 my-2" />

      {/* Date */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/3 transition-colors cursor-pointer">
        <div className="w-9 h-9 bg-blue-500/15 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-0.5">NGÀY KHỞI HÀNH</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm text-white bg-transparent outline-none font-medium [color-scheme:dark]" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-white/5 my-2" />

      {/* Guests */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/3 transition-colors">
        <div className="w-9 h-9 bg-violet-500/15 border border-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-0.5">SỐ KHÁCH</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-6 h-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 font-bold text-sm transition">-</button>
            <span className="text-sm font-semibold text-white w-4 text-center">{guests}</span>
            <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))}
              className="w-6 h-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 font-bold text-sm transition">+</button>
          </div>
        </div>
      </div>

      {/* Search button */}
      <button type="submit"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 whitespace-nowrap font-heading">
        <Search className="w-5 h-5" />
        <span>Tìm kiếm</span>
      </button>
    </form>
  );
}
