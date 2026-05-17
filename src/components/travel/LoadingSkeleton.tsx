import React from 'react';

export function TourCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 overflow-hidden animate-pulse">
      <div className="h-52 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/5 rounded w-1/3" />
        <div className="h-4 bg-white/5 rounded w-4/5" />
        <div className="h-4 bg-white/5 rounded w-3/5" />
        <div className="flex gap-2">
          <div className="h-6 bg-white/5 rounded-lg w-20" />
          <div className="h-6 bg-white/5 rounded-lg w-20" />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <div className="h-5 bg-white/5 rounded w-24" />
          <div className="h-4 bg-white/5 rounded w-16" />
        </div>
        <div className="h-9 bg-white/5 rounded-xl" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0a1628]/80 overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-white/5 rounded w-1/4" />
        <div className="h-5 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-4/5" />
        <div className="h-4 bg-white/5 rounded w-3/5" />
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-white/5 rounded w-20" />
          <div className="h-3 bg-white/5 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-white/5 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#020817] animate-pulse">
      <div className="h-16 bg-white/3 border-b border-white/5" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 bg-white/5 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
