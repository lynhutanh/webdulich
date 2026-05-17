import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import SearchBar from '@components/travel/SearchBar';
import TourCard from '@components/travel/TourCard';
import DestinationCard from '@components/travel/DestinationCard';
import ReviewCard from '@components/travel/ReviewCard';
import TourCarousel3D from '@components/travel/TourCarousel3D';
import { useScrollReveal, useCountUp } from 'src/hooks/useScrollReveal';
import { tours, destinations, reviews, categories, blogPosts } from 'src/data/mockData';
import { Shield, Clock, Headphones, Award, ArrowRight, Star, TrendingUp, ChevronLeft, ChevronRight, Zap, Globe2 } from 'lucide-react';

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80', title: 'Khám Phá Vẻ Đẹp', subtitle: 'Việt Nam', desc: 'Hàng trăm tour du lịch hấp dẫn đang chờ bạn khám phá' },
  { image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&q=80', title: 'Trải Nghiệm', subtitle: 'Đáng Nhớ', desc: 'Mỗi chuyến đi là một câu chuyện mới đầy cảm xúc' },
  { image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1600&q=80', title: 'Thiên Đường', subtitle: 'Biển Đảo', desc: 'Tận hưởng kỳ nghỉ hoàn hảo tại những bãi biển tuyệt đẹp' },
];

const whyUs = [
  { icon: Shield,     title: 'An toàn & Uy tín',             desc: 'Hơn 10 năm kinh nghiệm, được hàng nghìn khách hàng tin tưởng',        color: 'from-blue-500 to-cyan-400' },
  { icon: Clock,      title: 'Hỗ trợ 24/7',                  desc: 'Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn',         color: 'from-cyan-500 to-teal-400' },
  { icon: Award,      title: 'Giá tốt nhất',                 desc: 'Cam kết giá tốt nhất thị trường, hoàn tiền nếu tìm được giá rẻ hơn',  color: 'from-amber-500 to-orange-400' },
  { icon: Headphones, title: 'Hướng dẫn viên chuyên nghiệp', desc: 'Đội ngũ HDV giàu kinh nghiệm, am hiểu văn hóa địa phương',           color: 'from-violet-500 to-purple-400' },
];

const statsData = [
  { numeric: 500,   suffix: '+', label: 'Tours',           icon: Globe2 },
  { numeric: 50000, suffix: '+', label: 'Khách hàng',      icon: TrendingUp, display: '50K' },
  { numeric: 49,    suffix: '★', label: 'Đánh giá',        icon: Star,       display: '4.9' },
  { numeric: 10,    suffix: '+', label: 'Năm kinh nghiệm', icon: Zap },
];

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, className = '', variant = 'up', delay = 0, style }: {
  children: React.ReactNode; className?: string;
  variant?: 'up'|'left'|'right'|'blur'|'scale'; delay?: number; style?: React.CSSProperties;
}) {
  const { ref, inView } = useScrollReveal(0.12);
  const cls = { up:'reveal', left:'reveal-left', right:'reveal-right', blur:'reveal-blur', scale:'reveal-scale' }[variant];
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      className={`${cls} ${inView ? 'in-view' : ''} ${className}`}
      style={{ ...(delay ? { transitionDelay: `${delay}s` } : {}), ...style }}>
      {children}
    </div>
  );
}

// ── Stat item ─────────────────────────────────────────────────────────────────
function StatItem({ numeric, suffix, label, display, active }: {
  numeric: number; suffix: string; label: string; display?: string; active: boolean;
}) {
  const count = useCountUp(numeric, active, 1800);
  const shown = display ? (active ? display : '0') : (active ? count.toLocaleString() : '0');
  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-black text-white font-heading" style={{ textShadow: '0 0 20px rgba(34,211,238,0.4)' }}>
        {shown}{suffix}
      </p>
      <p className="text-white/40 text-xs font-mono tracking-widest mt-1">{label}</p>
    </div>
  );
}

// ── Cloud intro overlay — chỉ chạy 1 lần khi vào trang ───────────────────────
function CloudIntro() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Bắt đầu fade out sau 1.6s
    const t = setTimeout(() => setFadeOut(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      onAnimationEnd={() => {
        // Unmount ngay khi animation fade-out kết thúc — không còn khựng
        if (fadeOut) setVisible(false);
      }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        pointerEvents: 'none',
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? 'opacity 0.9s ease-in' : 'none',
      }}
    >
      {[
        { size: 900,  top: '10%', delay: '0s',    dur: '1.5s', op: 0.92 },
        { size: 700,  top: '35%', delay: '0.08s', dur: '1.4s', op: 0.88 },
        { size: 1100, top: '55%', delay: '0s',    dur: '1.6s', op: 0.95 },
        { size: 600,  top: '70%', delay: '0.12s', dur: '1.3s', op: 0.82 },
        { size: 800,  top: '-5%', delay: '0.04s', dur: '1.5s', op: 0.90 },
        { size: 500,  top: '80%', delay: '0.16s', dur: '1.2s', op: 0.78 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: '50%', top: c.top,
          width: c.size, height: c.size * 0.55,
          opacity: c.op,
          animation: `cloudIntroExpand ${c.dur} cubic-bezier(0.15,0,0.85,1) ${c.delay} both`,
          pointerEvents: 'none',
          willChange: 'transform',
        }}>
          <CloudSVG />
        </div>
      ))}
    </div>
  );
}

function CloudSVG() {
  return (
    <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="cf"><feGaussianBlur stdDeviation="4" /></filter>
        <radialGradient id="cg" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.98)" />
          <stop offset="50%"  stopColor="rgba(220,235,255,0.85)" />
          <stop offset="100%" stopColor="rgba(180,210,255,0)" />
        </radialGradient>
      </defs>
      <g filter="url(#cf)">
        <ellipse cx="250" cy="200" rx="220" ry="70" fill="url(#cg)" />
        <circle cx="140" cy="160" r="85"  fill="url(#cg)" />
        <circle cx="250" cy="130" r="100" fill="url(#cg)" />
        <circle cx="360" cy="150" r="85"  fill="url(#cg)" />
        <circle cx="430" cy="175" r="65"  fill="url(#cg)" />
        <circle cx="70"  cy="185" r="60"  fill="url(#cg)" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isLoaded, setIsLoaded]   = useState(false);
  const [activeDestination, setActiveDestination] = useState<string>('1');
  const { ref: statsRef, inView: statsInView } = useScrollReveal(0.3);

  useEffect(() => {
    setIsLoaded(true);
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featuredTours        = tours.slice(0, 4);
  const featuredDestinations = destinations.slice(0, 4);
  const featuredReviews      = reviews.slice(0, 3);
  const recentBlogs          = blogPosts.slice(0, 3);

  return (
    <TravelLayout>
      {/* ── Cloud intro — chỉ section đầu tiên ── */}
      <CloudIntro />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[640px] max-h-[960px] overflow-hidden bg-[#020817]">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt="" className="w-full h-full object-cover opacity-40" />
          </div>
        ))}
        <div className="absolute inset-0 holo-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/60 via-transparent to-[#020817]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/50 via-transparent to-[#020817]/50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent holo-scanline pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-sm text-cyan-300 text-xs font-mono px-4 py-2 rounded-full mb-8 tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              HƠN 50,000 KHÁCH HÀNG HÀI LÒNG
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-none font-heading tracking-tight">
              {heroSlides[heroIndex].title}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                style={{ filter: 'drop-shadow(0 0 30px rgba(34,211,238,0.5))' }}>
                {heroSlides[heroIndex].subtitle}
              </span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl mb-12 max-w-xl mx-auto font-body font-light tracking-wide">
              {heroSlides[heroIndex].desc}
            </p>
          </div>
          <div className={`w-full max-w-3xl transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SearchBar variant="hero" />
          </div>
          <div ref={statsRef as React.RefObject<HTMLDivElement>}
            className={`flex items-center gap-6 md:gap-12 mt-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {statsData.map(stat => <StatItem key={stat.label} {...stat} active={statsInView} />)}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === heroIndex ? 'w-8 h-1.5 bg-cyan-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>
        <button onClick={() => setHeroIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/20 bg-white/5 backdrop-blur rounded-full flex items-center justify-center text-white hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setHeroIndex(i => (i + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-white/20 bg-white/5 backdrop-blur rounded-full flex items-center justify-center text-white hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-24 bg-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal variant="up" className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-cyan-400" />
                <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.25em]">// ĐIỂM ĐẾN NỔI BẬT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight">
                <span className="text-white">Khám Phá </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Việt Nam</span>
              </h2>
            </div>
            <Link href="/tours" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:border-cyan-400 hover:bg-cyan-400/10 transition-all tracking-wider">
              XEM TẤT CẢ <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal variant="blur" delay={0.1} className="flex gap-3 h-[520px]" style={{ contain: 'layout' }}>
            {featuredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest}
                isActive={activeDestination === dest.id}
                onHover={() => setActiveDestination(dest.id)}
                onLeave={() => {}} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED TOURS ── */}
      <section className="py-24 bg-[#030d1f] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal variant="up" className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-violet-400" />
                <span className="text-violet-400 font-mono text-[11px] uppercase tracking-[0.25em]">// TOURS NỔI BẬT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight">
                <span className="text-white">Được </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Yêu Thích Nhất</span>
              </h2>
            </div>
            <Link href="/tours" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/40 text-violet-300 font-mono text-xs hover:border-violet-400 hover:bg-violet-400/10 transition-all tracking-wider">
              XEM TẤT CẢ <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-14">
            {featuredTours.map((tour, i) => (
              <Reveal key={tour.id} variant="scale" delay={i * 0.1}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES zigzag ── */}
      <section className="bg-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-4 relative z-10">
          <Reveal variant="blur" className="text-center">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.3em] font-semibold">// LOẠI HÌNH DU LỊCH</span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-heading leading-tight mb-4">
              <span className="text-white">Hành Trình </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.4))' }}>Của Bạn</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto font-body text-base leading-relaxed">
              Mỗi chuyến đi là một câu chuyện. Chọn hành trình phù hợp và để chúng tôi biến giấc mơ du lịch của bạn thành hiện thực.
            </p>
          </Reveal>
        </div>
        <div className="relative z-10">
          {categories.map((cat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={cat.id} className="relative overflow-hidden">
                {idx > 0 && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />}
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
                  <Reveal variant={isEven ? 'left' : 'right'} className="relative group">
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3]" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className={`absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-bold font-heading shadow-lg`}>
                        <span className="text-lg">{cat.icon}</span>{cat.name}
                      </div>
                      <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2 text-center">
                        <p className="text-2xl font-black text-white font-heading">{cat.count}</p>
                        <p className="text-[10px] text-white/50 font-mono tracking-widest">TOURS</p>
                      </div>
                    </div>
                    <div className={`absolute -inset-4 bg-gradient-to-br ${cat.color} opacity-10 blur-3xl rounded-3xl -z-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  </Reveal>
                  <Reveal variant={isEven ? 'right' : 'left'} delay={0.15} className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 mb-5">
                      <span className={`w-8 h-px bg-gradient-to-r ${cat.color}`} />
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">{String(idx+1).padStart(2,'0')} / {String(categories.length).padStart(2,'0')}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black font-heading text-white leading-tight mb-5">{cat.name}</h3>
                    <p className="text-white/55 text-base leading-relaxed font-body mb-8">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {cat.highlights.map(h => (
                        <span key={h} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-mono hover:border-white/25 hover:text-white/80 transition-all cursor-default">📍 {h}</span>
                      ))}
                    </div>
                    <Link href={`/tours?category=${encodeURIComponent(cat.name)}`}
                      className={`self-start inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r ${cat.color} text-white font-bold text-sm font-heading hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn`}
                      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                      Khám phá ngay <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
        <Reveal variant="up" className="text-center pb-24 relative z-10">
          <Link href="/tours" className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-sm font-semibold text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 tracking-wider" style={{ boxShadow: '0 0 20px rgba(34,211,238,0.1)' }}>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            XEM TẤT CẢ {categories.reduce((s,c) => s+c.count, 0)}+ TOURS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-[#030d1f] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-amber-400" />
                <span className="text-amber-400 font-mono text-[11px] uppercase tracking-[0.25em]">// TẠI SAO CHỌN CHÚNG TÔI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-6">
                <span className="text-white">Trải Nghiệm Du Lịch</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Đẳng Cấp Thế Giới</span>
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed font-body font-light">
                Với hơn 10 năm kinh nghiệm trong ngành du lịch, chúng tôi tự hào mang đến những trải nghiệm du lịch tuyệt vời nhất cho hàng chục nghìn khách hàng mỗi năm.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {whyUs.map((item, i) => (
                  <Reveal key={item.title} variant="scale" delay={0.1 + i * 0.1}>
                    <div className="group relative p-5 rounded-2xl border border-white/5 bg-white/3 hover:border-white/15 hover:bg-white/5 transition-all duration-300 overflow-hidden h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5 font-heading">{item.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15} className="relative">
              <div className="grid grid-cols-2 gap-3">
                {['https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80','https://images.unsplash.com/photo-1528127269322-539801943592?w=400&q=80','https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'].map((src, i) => (
                  <img key={i} src={src} alt="" className={`rounded-2xl w-full h-44 object-cover opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105 ${i===1?'mt-6':i===2?'-mt-3':i===3?'mt-3':''}`} />
                ))}
              </div>
              <div className="absolute -bottom-4 -left-4 border border-amber-500/30 bg-[#0a1628]/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3" style={{ boxShadow: '0 0 30px rgba(245,158,11,0.15)' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white font-heading">4.9/5</p>
                  <p className="text-xs text-white/40 font-mono">50,000+ ĐÁNH GIÁ</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-24 bg-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-pink-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal variant="blur" className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-pink-400" />
              <span className="text-pink-400 font-mono text-[11px] uppercase tracking-[0.3em]">// ĐÁNH GIÁ</span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-pink-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-heading">
              <span className="text-white">Khách Hàng </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Nói Gì</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredReviews.map((review, i) => (
              <Reveal key={review.id} variant="up" delay={i * 0.12}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D CAROUSEL ── */}
      <section className="py-20 bg-[#030d1f] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-15 pointer-events-none" />
        <Reveal variant="blur" className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <TourCarousel3D tours={tours} title="Tours Nổi Bật 3D" />
        </Reveal>
      </section>

      {/* ── BLOG ── */}
      <section className="py-24 bg-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 holo-grid opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-teal-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal variant="up" className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-teal-400" />
                <span className="text-teal-400 font-mono text-[11px] uppercase tracking-[0.25em]">// BLOG DU LỊCH</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight">
                <span className="text-white">Cẩm Nang </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Du Lịch</span>
              </h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-500/40 text-teal-300 font-mono text-xs hover:border-teal-400 hover:bg-teal-400/10 transition-all tracking-wider">
              XEM TẤT CẢ <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentBlogs.map((post, i) => (
              <Reveal key={post.id} variant="up" delay={i * 0.12}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a1628]/60 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden h-48">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-teal-500/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg font-mono">{post.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white/90 mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors font-heading">{post.title}</h3>
                      <p className="text-sm text-white/35 line-clamp-2 mb-4 font-body">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-white/30 font-mono">
                        <div className="flex items-center gap-2">
                          <img src={post.authorAvatar} alt="" className="w-5 h-5 rounded-full opacity-70" />
                          <span>{post.author}</span>
                        </div>
                        <span>{post.readTime} PHÚT ĐỌC</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </TravelLayout>
  );
}
