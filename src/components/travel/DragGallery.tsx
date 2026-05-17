'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Heart, Share2, ZoomIn, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

interface DragGalleryProps {
  images: string[];
  title: string;
  wishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export default function DragGallery({
  images,
  title,
  wishlisted = false,
  onWishlistToggle,
}: DragGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ── Main image drag state ─────────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastX = useRef(0);
  const lastTime = useRef(Date.now());
  const animFrameRef = useRef<number | null>(null);

  // ── Thumbnail strip drag ──────────────────────────────────────────────────
  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbDragging, setThumbDragging] = useState(false);
  const [thumbStartX, setThumbStartX] = useState(0);
  const [thumbScrollLeft, setThumbScrollLeft] = useState(0);

  const DRAG_THRESHOLD = 50; // px to trigger slide

  // ── Main image drag handlers ──────────────────────────────────────────────
  const onDragStart = (clientX: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffsetX(0);
    lastX.current = clientX;
    lastTime.current = Date.now();
    setVelocity(0);
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStartX;
    setDragOffsetX(offset);

    // Track velocity
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      setVelocity((clientX - lastX.current) / dt);
    }
    lastX.current = clientX;
    lastTime.current = Date.now();
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const shouldSwipe = Math.abs(dragOffsetX) > DRAG_THRESHOLD || Math.abs(velocity) > 0.5;

    if (shouldSwipe) {
      if (dragOffsetX < 0 || velocity < -0.5) {
        // swipe left → next
        setActiveIndex((i) => (i + 1) % images.length);
      } else {
        // swipe right → prev
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
    }

    // Animate offset back to 0
    setDragOffsetX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + images.length) % images.length);
        if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % images.length);
        if (e.key === 'Escape') setLightboxOpen(false);
      } else {
        if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length);
        if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, images.length]);

  // Auto-scroll thumbnail into view
  useEffect(() => {
    if (!thumbRef.current) return;
    const thumb = thumbRef.current.children[activeIndex] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // ── Thumbnail strip drag ──────────────────────────────────────────────────
  const onThumbDragStart = (clientX: number) => {
    if (!thumbRef.current) return;
    setThumbDragging(true);
    setThumbStartX(clientX - thumbRef.current.offsetLeft);
    setThumbScrollLeft(thumbRef.current.scrollLeft);
  };

  const onThumbDragMove = (clientX: number) => {
    if (!thumbDragging || !thumbRef.current) return;
    const x = clientX - thumbRef.current.offsetLeft;
    const walk = (x - thumbStartX) * 1.5;
    thumbRef.current.scrollLeft = thumbScrollLeft - walk;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Compute transform for main image (drag + slide)
  const mainTransform = isDragging
    ? `translateX(${dragOffsetX}px) scale(${1 - Math.abs(dragOffsetX) * 0.0002})`
    : 'translateX(0px) scale(1)';

  return (
    <>
      <div className="space-y-3 select-none">
        {/* ── Main image ─────────────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#0a1628]"
          style={{ height: '420px' }}
        >
          {/* Images stack */}
          <div className="relative w-full h-full overflow-hidden">
            {images.map((img, i) => {
              const offset = i - activeIndex;
              const isActive = i === activeIndex;
              const isPrev = i === (activeIndex - 1 + images.length) % images.length;
              const isNext = i === (activeIndex + 1) % images.length;

              let baseTranslate = 0;
              if (isPrev) baseTranslate = -100;
              else if (isNext) baseTranslate = 100;
              else if (!isActive) baseTranslate = offset > 0 ? 200 : -200;

              const dragPercent = isDragging ? (dragOffsetX / window.innerWidth) * 100 : 0;
              const translateX = isActive
                ? dragPercent
                : isPrev
                ? -100 + dragPercent
                : isNext
                ? 100 + dragPercent
                : baseTranslate;

              const visible = isActive || isPrev || isNext;

              return (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: `translateX(${translateX}%)`,
                    transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    opacity: visible ? 1 : 0,
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <img
                    src={img}
                    alt={`${title} - ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    style={{
                      transform: isActive && isDragging
                        ? `scale(${1 + Math.abs(dragOffsetX) * 0.00005})`
                        : 'scale(1)',
                      transition: isDragging ? 'none' : 'transform 0.45s ease',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              );
            })}

            {/* Drag capture layer */}
            <div
              className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
              onTouchEnd={onDragEnd}
            />
          </div>

          {/* Drag hint — shows briefly */}
          <DragHint />

          {/* Counter badge */}
          <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={onWishlistToggle}
              className="w-9 h-9 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-red-400 text-red-400' : 'text-white/50'}`} />
            </button>
            <button className="w-9 h-9 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <Share2 className="w-4 h-4 text-white/50" />
            </button>
            <button
              onClick={() => openLightbox(activeIndex)}
              className="w-9 h-9 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <Expand className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Arrow buttons */}
          <button
            onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center justify-center shadow-md hover:border-cyan-500/40 hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </button>
          <button
            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur border border-white/10 rounded-full flex items-center justify-center shadow-md hover:border-cyan-500/40 hover:scale-110 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-1 px-4 pb-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex-1 h-1 rounded-full overflow-hidden bg-white/30 transition-all"
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: i === activeIndex ? '100%' : '0%' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Thumbnail strip (draggable) ─────────────────────────────────── */}
        <div
          ref={thumbRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-1"
          style={{ scrollBehavior: 'smooth' }}
          onMouseDown={(e) => onThumbDragStart(e.clientX)}
          onMouseMove={(e) => onThumbDragMove(e.clientX)}
          onMouseUp={() => setThumbDragging(false)}
          onMouseLeave={() => setThumbDragging(false)}
          onTouchStart={(e) => onThumbDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onThumbDragMove(e.touches[0].clientX)}
          onTouchEnd={() => setThumbDragging(false)}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? 'ring-2 ring-cyan-500 ring-offset-1 ring-offset-[#020817] scale-105 shadow-lg shadow-cyan-500/20'
                  : 'opacity-50 hover:opacity-80 hover:scale-102'
              }`}
              style={{ width: '80px', height: '60px' }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
              {i === activeIndex && (
                <div className="absolute inset-0 bg-cyan-500/10" />
              )}
            </button>
          ))}

          {/* "View all" button */}
          <button
            onClick={() => openLightbox(0)}
            className="flex-shrink-0 w-20 h-[60px] rounded-xl bg-white/5 border border-white/8 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">Tất cả</span>
          </button>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          title={title}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % images.length)}
          onSelect={setLightboxIndex}
        />
      )}
    </>
  );
}

// ── Drag hint overlay ─────────────────────────────────────────────────────────
function DragHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div
        className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full"
        style={{ animation: 'fadeOut 2.5s ease forwards' }}
      >
        <span>←</span>
        <span>Kéo để xem ảnh</span>
        <span>→</span>
      </div>
    </div>
  );
}

// ── Lightbox component ────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}

function Lightbox({ images, index, title, onClose, onPrev, onNext, onSelect }: LightboxProps) {
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (x: number) => { setDragging(true); setDragStart(x); setDragOffset(0); };
  const handleDragMove = (x: number) => { if (dragging) setDragOffset(x - dragStart); };
  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 60) {
      dragOffset < 0 ? onNext() : onPrev();
    }
    setDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020817]/98 backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <div>
          <p className="text-white font-semibold text-sm line-clamp-1">{title}</p>
          <p className="text-white/50 text-xs">{index + 1} / {images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); handleDragMove(e.touches[0].clientX); }}
        onTouchEnd={handleDragEnd}
      >
        {images.map((img, i) => {
          const offset = i - index;
          const isPrev = i === (index - 1 + images.length) % images.length;
          const isNext = i === (index + 1) % images.length;
          const isActive = i === index;

          let baseX = 0;
          if (isPrev) baseX = -100;
          else if (isNext) baseX = 100;
          else if (!isActive) baseX = offset > 0 ? 200 : -200;

          const dragPct = dragging ? (dragOffset / window.innerWidth) * 100 : 0;
          const translateX = isActive ? dragPct : isPrev ? -100 + dragPct : isNext ? 100 + dragPct : baseX;
          const visible = isActive || isPrev || isNext;

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center p-4"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                opacity: visible ? 1 : 0,
              }}
            >
              <img
                src={img}
                alt={`${title} ${i + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                draggable={false}
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              />
            </div>
          );
        })}

        {/* Arrow buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex-shrink-0 px-4 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                i === index
                  ? 'ring-2 ring-cyan-400 scale-110 opacity-100'
                  : 'opacity-35 hover:opacity-60'
              }`}
              style={{ width: '64px', height: '48px' }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
