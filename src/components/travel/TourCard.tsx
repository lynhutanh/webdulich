import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { Tour, formatPrice } from 'src/data/mockData';

interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'horizontal';
}

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-amber-500',
  'Hot Deal': 'bg-red-500',
  'Adventure': 'bg-green-500',
  'New': 'bg-blue-500',
  'Romantic': 'bg-pink-500',
};

export default function TourCard({ tour, variant = 'default' }: TourCardProps) {
  const [wishlisted, setWishlisted] = useState(tour.isWishlisted ?? false);
  const [hovered, setHovered] = useState(false);

  if (variant === 'horizontal') {
    return (
      <div className="group bg-[#0a1628]/80 rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300 flex">
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-transform duration-500" />
          {tour.badge && (
            <span className={`absolute top-3 left-3 text-xs font-bold text-white px-2 py-1 rounded-lg ${badgeColors[tour.badge] || 'bg-blue-500'}`}>
              {tour.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-white/35 mb-1 font-mono">
              <MapPin className="w-3 h-3" /> {tour.destination}
            </div>
            <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{tour.title}</h3>
            <div className="flex items-center gap-3 text-xs text-white/35 font-mono">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tour.duration}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {tour.groupSize} người</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-lg font-bold text-cyan-400">{formatPrice(tour.price)}</span>
              {tour.originalPrice && <span className="text-xs text-white/25 line-through ml-1">{formatPrice(tour.originalPrice)}</span>}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-white/70">{tour.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /*
     * Outer wrapper: overflow-visible so the image can escape upward.
     * We add top padding (pt-10) to reserve space for the image popping out.
     */
    <div
      className="group relative pt-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Floating image that pops out on hover ── */}
      <div
        className="absolute left-1/2 z-20 w-[85%] pointer-events-none"
        style={{
          top: hovered ? '-48px' : '0px',
          transform: hovered
            ? 'translateX(-50%) scale(1.08) translateY(0px)'
            : 'translateX(-50%) scale(1) translateY(0px)',
          transition: 'top 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          filter: hovered
            ? 'drop-shadow(0 24px 32px rgba(0,0,0,0.7)) drop-shadow(0 0 16px rgba(6,182,212,0.25))'
            : 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
        }}
      >
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-44 object-cover rounded-xl"
          style={{
            borderRadius: '12px',
          }}
        />
        {/* Gradient fade at bottom of floating image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 rounded-b-xl"
          style={{
            background: 'linear-gradient(to top, #0a1628 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Card body (overflow-hidden, sits below the floating image) ── */}
      <div
        className="relative rounded-2xl border bg-[#0a1628]/90 will-change-transform"
        style={{
          borderColor: hovered ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.05)',
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(6,182,212,0.12)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Corner brackets */}
        <div
          className="absolute top-2 left-2 w-3 h-3 border-t border-l transition-colors z-10"
          style={{ borderColor: hovered ? 'rgba(6,182,212,0.7)' : 'rgba(6,182,212,0.3)' }}
        />
        <div
          className="absolute top-2 right-2 w-3 h-3 border-t border-r transition-colors z-10"
          style={{ borderColor: hovered ? 'rgba(6,182,212,0.7)' : 'rgba(6,182,212,0.3)' }}
        />

        {/* Placeholder space where image sits (not visible, just reserves height) */}
        <div className="h-44 rounded-t-2xl overflow-hidden relative">
          {/* Blurred background version of image (stays inside card) */}
          <img
            src={tour.image}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-30 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />

          {/* Badge */}
          {tour.badge && (
            <span className={`absolute top-3 left-3 text-xs font-bold text-white px-2.5 py-1 rounded-lg font-mono z-10 ${badgeColors[tour.badge] || 'bg-blue-500'}`}>
              {tour.badge}
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur border border-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
          >
            <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-red-400 text-red-400' : 'text-white/40'}`} />
          </button>

          {/* Discount badge */}
          {tour.originalPrice && (
            <div className="absolute bottom-3 left-3 bg-red-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg font-mono z-10">
              -{Math.round((1 - tour.price / tour.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 text-xs text-white/35 mb-1.5 font-mono">
            <MapPin className="w-3 h-3 text-cyan-400/60" />
            <span>{tour.destination}, {tour.country}</span>
          </div>

          <h3
            className="font-semibold mb-3 line-clamp-2 transition-colors leading-snug font-heading"
            style={{ color: hovered ? 'rgb(103,232,249)' : 'rgba(255,255,255,0.85)' }}
          >
            {tour.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-white/30 mb-4 font-mono">
            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
              <Clock className="w-3 h-3" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
              <Users className="w-3 h-3" /> {tour.groupSize}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <p className="text-[10px] text-white/25 mb-0.5 font-mono">TỪ</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-cyan-400 font-heading">{formatPrice(tour.price)}</span>
                {tour.originalPrice && <span className="text-xs text-white/25 line-through">{formatPrice(tour.originalPrice)}</span>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-white/70">{tour.rating}</span>
              <span className="text-xs text-white/25">({tour.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/tours/${tour.id}`}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/15 transition-all group/btn font-heading"
          >
            Xem chi tiết
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
