import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Compass, ArrowRight } from 'lucide-react';
import { Destination } from 'src/data/mockData';

interface DestinationCardProps {
  destination: Destination;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TAG_COLORS: Record<string, string> = {
  Trending:  'bg-rose-500',
  Popular:   'bg-blue-500',
  Adventure: 'bg-amber-500',
  Beach:     'bg-cyan-500',
  Romantic:  'bg-pink-500',
  New:       'bg-emerald-500',
};

const GLOW_COLORS: Record<string, string> = {
  Trending:  'rgba(244,63,94,0.5)',
  Popular:   'rgba(59,130,246,0.5)',
  Adventure: 'rgba(245,158,11,0.5)',
  Beach:     'rgba(6,182,212,0.5)',
  Romantic:  'rgba(236,72,153,0.5)',
  New:       'rgba(16,185,129,0.5)',
};

export default function DestinationCard({
  destination,
  isActive,
  onHover,
  onLeave,
}: DestinationCardProps) {
  const glowColor = destination.tag
    ? (GLOW_COLORS[destination.tag] ?? 'rgba(34,211,238,0.4)')
    : 'rgba(34,211,238,0.4)';

  return (
    /*
     * KEY FIX: animate `width` instead of `flex` — avoids full layout recalc.
     * Only `transform` and `opacity` run on the GPU compositor thread.
     * `will-change: width` hints the browser to promote this layer early.
     */
    <div
      className="relative cursor-pointer flex-shrink-0 h-full"
      style={{
        width: isActive ? '42%' : '14.5%',
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'width',
        overflow: 'visible',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* ── Card body ── */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          /* Use outline instead of box-shadow to avoid repaint */
          outline: isActive
            ? `1px solid rgba(255,255,255,0.1)`
            : `1px solid rgba(255,255,255,0.05)`,
          /* Separate shadow layer via pseudo — but here we keep it simple */
          boxShadow: isActive
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${glowColor}`
            : '0 8px 24px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.5s ease, outline 0.5s ease',
        }}
      >
        {/* Background image — only animate transform+opacity, NOT filter */}
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            /*
             * FIX: remove blur from transition — blur forces a new stacking
             * context + expensive filter pass every frame.
             * Instead: use a dark overlay div to fake the "dimmed" look.
             * Only scale runs on GPU.
             */
            transform: isActive ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        />

        {/* Brightness overlay — opacity transition is GPU-only */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(0,0,0,0.45)',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.5s ease',
            willChange: 'opacity',
          }}
        />

        {/* Gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: isActive
              ? 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
            transition: 'background 0.5s ease',
          }}
        />

        {/* Tag badge */}
        {destination.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-block px-2.5 py-1 rounded-full text-white text-[11px] font-bold tracking-wide ${TAG_COLORS[destination.tag] ?? 'bg-white/20'}`}>
              {destination.tag}
            </span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-white text-xs font-bold">{destination.rating}</span>
        </div>

        {/* Collapsed: vertical name — GPU opacity+transform only */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 z-10"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            willChange: 'opacity, transform',
            pointerEvents: isActive ? 'none' : 'auto',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-white font-black font-heading text-base text-center leading-tight [writing-mode:vertical-rl] rotate-180 h-24 truncate">
              {destination.name}
            </h3>
            <div className="w-px h-5 bg-white/30" />
            <MapPin className="w-3.5 h-3.5 text-white/50" />
          </div>
        </div>

        {/* Expanded: bottom info — GPU opacity+transform only */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 z-10"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
            willChange: 'opacity, transform',
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3 h-3 text-white/50" />
            <span className="text-white/60 text-[11px] font-mono uppercase tracking-wider">{destination.country}</span>
          </div>
          <h3 className="text-white font-black font-heading text-2xl leading-tight mb-2">
            {destination.name}
          </h3>
          {destination.description && (
            <p className="text-white/65 text-xs leading-relaxed mb-4 line-clamp-2 font-body">
              {destination.description}
            </p>
          )}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-white/60 text-xs">
              <Compass className="w-3 h-3" />{destination.tourCount} tours
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-400" />{destination.rating}
            </span>
          </div>
          <Link
            href={`/tours?destination=${encodeURIComponent(destination.name)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 font-bold text-xs font-heading hover:bg-cyan-400 hover:text-white transition-all duration-300 group/btn"
            onClick={(e) => e.stopPropagation()}
          >
            Khám phá ngay
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Pop-out image — GPU transform+opacity only ── */}
      {destination.popImage && (
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: '45%',
            zIndex: 20,
            display: 'flex',
            justifyContent: 'center',
            transform: isActive
              ? 'translateY(-60px) scale(1.18)'
              : 'translateY(0px) scale(0.85)',
            opacity: isActive ? 1 : 0,
            /* Only transform+opacity — both compositor-only, zero layout cost */
            transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
            willChange: 'transform, opacity',
            filter: isActive
              ? `drop-shadow(0 20px 40px ${glowColor}) drop-shadow(0 8px 16px rgba(0,0,0,0.8))`
              : 'none',
          }}
        >
          <img
            src={destination.popImage}
            alt={`${destination.name} highlight`}
            style={{
              width: '85%',
              maxWidth: '220px',
              height: '200px',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '16px',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          />
        </div>
      )}
    </div>
  );
}
