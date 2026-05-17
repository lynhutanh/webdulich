import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import TourCard from '@components/travel/TourCard';
import ReviewCard from '@components/travel/ReviewCard';
import TourCarousel3D from '@components/travel/TourCarousel3D';
import DragGallery from '@components/travel/DragGallery';
import { tours, reviews, formatPrice } from 'src/data/mockData';
import {
  Star, Clock, Users, MapPin, Heart, Share2, CheckCircle, XCircle,
  ChevronRight, Calendar, User, Shield, ArrowRight, ChevronLeft, ChevronDown, ChevronUp
} from 'lucide-react';

export default function TourDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const tour = tours.find((t) => t.id === id) || tours[0];
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(tour.isWishlisted ?? false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'reviews'>('overview');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState(tour.departureDate);

  const relatedTours = tours.filter((t) => t.id !== tour.id && t.category === tour.category).slice(0, 3);
  const tourReviews = reviews.slice(0, 4);

  const difficultyColor = {
    Easy: 'text-green-300 bg-green-500/10',
    Moderate: 'text-amber-300 bg-amber-500/10',
    Hard: 'text-red-300 bg-red-500/10',
  };

  return (
    <TravelLayout>
      {/* Breadcrumb */}
      <div className="pt-20 bg-[#020817] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-white/35">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tours" className="hover:text-cyan-400 transition-colors">Tours</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/60 font-medium line-clamp-1">{tour.title}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#020817] min-h-screen">
        {/* holo-grid overlay */}
        <div className="fixed inset-0 holo-grid opacity-15 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Drag Gallery */}
              <DragGallery
                images={tour.images}
                title={tour.title}
                wishlisted={wishlisted}
                onWishlistToggle={() => setWishlisted(!wishlisted)}
              />

              {/* Title & meta */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {tour.badge && <span className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold px-2.5 py-1 rounded-lg">{tour.badge}</span>}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${difficultyColor[tour.difficulty]}`}>{tour.difficulty}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60">{tour.category}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-3 font-heading">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/35">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-cyan-400/60" />{tour.destination}, {tour.country}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-cyan-400/60" />{tour.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-cyan-400/60" />Tối đa {tour.groupSize} người</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4 text-cyan-400/60" />HDV: {tour.guide}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-white">{tour.rating}</span>
                  <span className="text-white/35 text-sm">({tour.reviewCount} đánh giá)</span>
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-white/5 mb-6">
                  {(['overview', 'itinerary', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-white/35 hover:text-white/60'}`}
                    >
                      {tab === 'overview' ? 'Tổng quan' : tab === 'itinerary' ? 'Lịch trình' : 'Đánh giá'}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white mb-3">Mô tả tour</h3>
                      <p className="text-white/60 leading-relaxed">{tour.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-3">Điểm nổi bật</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tour.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-sm text-white/60">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {h}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" />Đã bao gồm</h3>
                        <ul className="space-y-2">
                          {tour.included.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-400" />Không bao gồm</h3>
                        <ul className="space-y-2">
                          {tour.excluded.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-3">
                    {tour.itinerary.map((day) => (
                      <div key={day.day} className="border border-white/5 bg-[#0a1628]/60 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          className="w-full flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">{day.day}</div>
                            <span className="font-semibold text-white">{day.title}</span>
                          </div>
                          {expandedDay === day.day ? <ChevronUp className="w-5 h-5 text-white/30" /> : <ChevronDown className="w-5 h-5 text-white/30" />}
                        </button>
                        {expandedDay === day.day && (
                          <div className="px-4 pb-4 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                            {day.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl mb-6">
                      <div className="text-center">
                        <p className="text-5xl font-black text-cyan-400">{tour.rating}</p>
                        <div className="flex items-center gap-0.5 justify-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-xs text-white/35 mt-1">{tour.reviewCount} đánh giá</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-white/35 w-3">{star}</span>
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {tourReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Booking card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#0a1628]/80 border border-white/5 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5">
                  <p className="text-cyan-100 text-sm mb-1">Giá từ</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-body">{formatPrice(tour.price)}</span>
                    {tour.originalPrice && <span className="text-cyan-200 line-through text-sm">{formatPrice(tour.originalPrice)}</span>}
                  </div>
                  <p className="text-cyan-100 text-xs mt-1">/ người</p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/30 font-mono uppercase tracking-wider mb-1.5">Ngày khởi hành</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-white/10 bg-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/30 font-mono uppercase tracking-wider mb-1.5">Số khách</label>
                    <div className="flex items-center gap-3 border border-white/10 bg-white/5 rounded-xl px-4 py-2.5">
                      <Users className="w-4 h-4 text-white/30" />
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-white/60 transition">-</button>
                      <span className="flex-1 text-center text-sm font-semibold text-white">{guests} người</span>
                      <button onClick={() => setGuests(Math.min(tour.groupSize, guests + 1))} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-white/60 transition">+</button>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/35">{formatPrice(tour.price)} × {guests} người</span>
                      <span className="font-medium text-white">{formatPrice(tour.price * guests)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/35">Phí dịch vụ</span>
                      <span className="font-medium text-green-400">Miễn phí</span>
                    </div>
                    <div className="border-t border-white/5 pt-2 flex justify-between font-bold">
                      <span className="text-white">Tổng cộng</span>
                      <span className="text-cyan-400">{formatPrice(tour.price * guests)}</span>
                    </div>
                  </div>

                  <Link
                    href={`/booking/${tour.id}?guests=${guests}&date=${selectedDate}`}
                    className="block w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-center rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    Đặt tour ngay
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-xs text-white/35">
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                    Đặt cọc an toàn · Hoàn tiền 100%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related tours */}
          {relatedTours.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Tours Tương Tự</h2>
                <Link href="/tours" className="flex items-center gap-1 text-cyan-400 text-sm font-medium hover:gap-2 transition-all">
                  Xem thêm <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTours.map((t) => <TourCard key={t.id} tour={t} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 3D Carousel Section ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#020817]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <TourCarousel3D
            tours={tours}
            title="Khám Phá Thêm Tours"
          />
        </div>
      </section>
    </TravelLayout>
  );
}
