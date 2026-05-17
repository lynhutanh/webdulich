import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Review } from 'src/data/mockData';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group relative rounded-2xl p-6 border border-white/5 bg-[#0a1628]/60 hover:border-pink-500/20 hover:bg-[#0d1628]/80 transition-all duration-300">
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/10 group-hover:border-pink-400/40 transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/10 group-hover:border-pink-400/40 transition-colors" />

      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover:text-pink-400/10 transition-colors" />

      {/* User */}
      <div className="flex items-center gap-3 mb-4">
        <img src={review.avatar} alt={review.user}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-pink-500/30 transition-all" />
        <div>
          <p className="font-semibold text-white/85 text-sm font-heading">{review.user}</p>
          <p className="text-xs text-white/30 font-mono">{review.location}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
        ))}
      </div>

      <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-3 font-body">{review.comment}</p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-pink-400/70 font-mono bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full">
          {review.tourName}
        </span>
        <span className="text-xs text-white/25 font-mono">
          {new Date(review.date).toLocaleDateString('vi-VN')}
        </span>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
