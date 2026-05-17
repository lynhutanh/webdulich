'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Pause, Play } from 'lucide-react';
import { Tour, formatPrice } from 'src/data/mockData';

interface TourCarousel3DProps {
  tours: Tour[];
  title?: string;
}

const SPEED      = 20;   // degrees per second
const CARD_W     = 240;
const CARD_H     = 360;
const RADIUS     = 320;  // tighter radius so cards are closer together

export default function TourCarousel3D({ tours, title = 'Tours Nổi Bật' }: TourCarousel3DProps) {
  const total                     = tours.length;
  const [angle, setAngle]         = useState(0);
  const [paused, setPaused]       = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const angleRef  = useRef(0);
  const pausedRef = useRef(false);
  const lastRef   = useRef(0);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // RAF loop — smooth continuous rotation
  useEffect(() => {
    const tick = (ts: number) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05); // cap dt to avoid jump on tab switch
      lastRef.current = ts;
      if (!pausedRef.current) {
        angleRef.current = (angleRef.current + SPEED * dt) % 360;
        setAngle(angleRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Which card is closest to front (angle 0 = front)
  const anglePerCard = 360 / total;
  // Use angleRef for instant calculation, no lag
  const activeIndex  = Math.round(((360 - (angleRef.current % 360)) % 360) / anglePerCard) % total;

  // Compute 2D projected position for each card using sin/cos
  const getCardProps = (i: number) => {
    const cardAngle = ((360 / total) * i - angleRef.current) * (Math.PI / 180);
    const x   = Math.sin(cardAngle) * RADIUS;
    const z   = Math.cos(cardAngle);             // -1 (back) → +1 (front)
    const zNorm = (z + 1) / 2;                   // 0..1

    const scale   = 0.60 + zNorm * 0.40;         // 0.60 → 1.0
    const opacity = 0.20 + zNorm * 0.80;         // 0.20 → 1.0
    const zIndex  = Math.round(zNorm * 100);
    const blur    = z < 0 ? (1 - zNorm) * 4 : 0;

    return { x, scale, opacity, zIndex, blur, isFront: z > 0.85, zNorm };
  };

  return (
    <div className={`relative w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.3em]">// 3D SHOWCASE</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white font-heading">{title}</h2>
        <p className="text-white/30 mt-2 text-sm font-mono">Hover để dừng · Click card để xem</p>
      </div>

      {/* Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: CARD_H + 60, perspective: 1000 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Cards — positioned absolutely relative to center */}
        <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
          {tours.map((tour, i) => {
            const { x, scale, opacity, zIndex, blur, isFront, zNorm } = getCardProps(i);
            const isActive = i === activeIndex;

            return (
              <div
                key={tour.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translateX(${x}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  transition: 'filter 0.2s ease',
                  cursor: 'pointer',
                  willChange: 'transform, opacity',
                }}
                onClick={() => {
                  if (!isActive) {
                    const targetAngle = (360 / total) * i;
                    angleRef.current  = targetAngle % 360;
                    setAngle(angleRef.current);
                  }
                }}
              >
                <CarouselCard tour={tour} isActive={isActive} isFront={isFront} zNorm={zNorm} />
              </div>
            );
          })}
        </div>

        {/* Ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 340, height: 60, background: 'radial-gradient(ellipse at center,rgba(59,130,246,0.18) 0%,transparent 70%)', filter: 'blur(10px)' }} />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          {tours.map((_, i) => (
            <div key={i}
              className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2.5 bg-cyan-400' : 'w-2.5 h-2.5 bg-white/15'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setPaused(p => !p)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            paused ? 'border-white/10 bg-white/5 text-white/40' : 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
          }`}
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
      </div>

      <ActiveCardStrip tour={tours[activeIndex]} />
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CarouselCard({ tour, isActive, isFront, zNorm }: {
  tour: Tour; isActive: boolean; isFront: boolean; zNorm: number;
}) {
  // Interpolate background: dark slate (back) → vivid blue gradient (front)
  // zNorm: 0 = back, 1 = front
  const t = Math.pow(zNorm, 1.5); // ease-in so color kicks in near front

  // Interpolate each channel: dark (#1e293b → #1e3a8a) to bright (#0891b2)
  const bgStyle = t > 0.7
    ? `linear-gradient(135deg,
        hsl(${220 + t * 10}deg, ${40 + t * 60}%, ${12 + t * 18}%) 0%,
        hsl(${220 + t * 5}deg,  ${50 + t * 50}%, ${20 + t * 20}%) 50%,
        hsl(${190 + t * 10}deg, ${60 + t * 40}%, ${25 + t * 15}%) 100%)`
    : `linear-gradient(135deg,
        hsl(215deg, ${15 + t * 30}%, ${12 + t * 8}%) 0%,
        hsl(215deg, ${20 + t * 30}%, ${18 + t * 8}%) 100%)`;

  // Glow ring intensity based on zNorm
  const ringOpacity = Math.max(0, (zNorm - 0.6) / 0.4); // only shows near front

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative"
      style={{
        background: bgStyle,
        boxShadow: ringOpacity > 0
          ? `0 0 0 ${ringOpacity * 2}px rgba(59,130,246,${ringOpacity * 0.8}), 0 20px 60px rgba(0,0,0,0.5)`
          : '0 8px 30px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {tour.badge && (
          <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/30">
            {tour.badge}
          </span>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-white text-xs font-bold">{tour.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-blue-300 text-xs mb-1.5">
          <MapPin className="w-3 h-3" /><span>{tour.destination}</span>
        </div>
        <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2">{tour.title}</h3>
        <div className="flex items-center gap-2 text-xs text-blue-200 mb-3">
          <Clock className="w-3 h-3" /><span>{tour.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-xs">Từ</p>
            <p className="text-white font-black text-base">{formatPrice(tour.price)}</p>
          </div>
          {isActive && (
            <Link href={`/tours/${tour.id}`} onClick={e => e.stopPropagation()}
              className="px-3 py-1.5 bg-white text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Xem ngay
            </Link>
          )}
        </div>
      </div>

      {/* Shine overlay — only on front card */}
      {zNorm > 0.8 && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%,rgba(255,255,255,0.04) 100%)',
            opacity: (zNorm - 0.8) / 0.2,
          }} />
      )}
    </div>
  );
}

// ─── Strip ────────────────────────────────────────────────────────────────────
function ActiveCardStrip({ tour }: { tour: Tour }) {
  return (
    <div className="mt-8 mx-auto max-w-md">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100 text-center">
        <h3 className="font-black text-gray-900 text-lg mb-1">{tour.title}</h3>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-500" />{tour.destination}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-500" />{tour.duration}</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{tour.rating}</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-black text-blue-600">{formatPrice(tour.price)}</span>
          <Link href={`/tours/${tour.id}`}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            Đặt tour ngay →
          </Link>
        </div>
      </div>
    </div>
  );
}
