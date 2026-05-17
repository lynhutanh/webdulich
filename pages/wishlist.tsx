import React, { useState } from 'react';
import TravelLayout from '@layouts/TravelLayout';
import TourCard from '@components/travel/TourCard';
import { tours } from 'src/data/mockData';
import { Heart, Trash2, Share2, Compass } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(tours.filter((t) => t.isWishlisted));
  const removeFromWishlist = (id: string) => setWishlist((prev) => prev.filter((t) => t.id !== id));

  return (
    <TravelLayout>
      <div className="min-h-screen bg-[#020817] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-red-400" />
                <span className="text-red-400 font-mono text-[11px] uppercase tracking-[0.25em]">// YÊU THÍCH</span>
              </div>
              <h1 className="text-3xl font-black text-white font-heading flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-400 fill-red-400" />
                Danh Sách Yêu Thích
              </h1>
              <p className="text-white/35 mt-1 font-mono text-sm">{wishlist.length} TOURS ĐÃ LƯU</p>
            </div>
            {wishlist.length > 0 && (
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/50 rounded-xl text-sm font-medium hover:border-white/20 hover:text-white/70 transition">
                  <Share2 className="w-4 h-4" /> Chia sẻ
                </button>
                <button onClick={() => setWishlist([])} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/10 transition">
                  <Trash2 className="w-4 h-4" /> Xóa tất cả
                </button>
              </div>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-white/5 bg-[#0a1628]/60">
              <div className="w-24 h-24 border border-red-500/20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-red-400/50" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 font-heading">Danh sách trống</h2>
              <p className="text-white/35 mb-8 max-w-sm mx-auto font-body">Bạn chưa lưu tour nào. Hãy khám phá và lưu những tour yêu thích!</p>
              <Link href="/tours" className="inline-flex items-center gap-2 px-8 py-3 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold rounded-xl hover:border-cyan-400 hover:bg-cyan-500/20 transition font-heading">
                <Compass className="w-5 h-5" /> Khám phá tours
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlist.map((tour) => (
                <div key={tour.id} className="relative group">
                  <TourCard tour={tour} />
                  <button onClick={() => removeFromWishlist(tour.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500/80 backdrop-blur text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 shadow-lg z-10"
                    title="Xóa khỏi yêu thích">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TravelLayout>
  );
}
