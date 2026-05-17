import React, { useState } from 'react';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import { blogPosts } from 'src/data/mockData';
import { Search, Clock, Eye, Tag, ArrowRight, TrendingUp } from 'lucide-react';

const allCategories = ['Tất cả', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filtered = blogPosts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tất cả' || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.id !== featured.id);

  return (
    <TravelLayout>
      {/* Header */}
      <div className="bg-[#020817] pt-24 pb-16 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 holo-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-teal-400" />
            <span className="text-teal-400 font-mono text-[11px] uppercase tracking-[0.3em]">// BLOG DU LỊCH</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-teal-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 font-heading">Blog Du Lịch</h1>
          <p className="text-white/35 text-lg mb-8 font-body font-light">Cẩm nang, kinh nghiệm và câu chuyện du lịch</p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input type="text" placeholder="Tìm kiếm bài viết..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50 shadow-lg text-sm backdrop-blur-sm" />
          </div>
        </div>
      </div>

      <div className="bg-[#020817] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-10 pb-2">
            {allCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-mono whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
                    : 'border border-white/8 bg-white/3 text-white/40 hover:border-white/15 hover:text-white/60'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {activeCategory === 'Tất cả' && !search && (
            <Link href={`/blog/${featured.slug}`} className="block mb-12">
              <div className="group relative rounded-3xl overflow-hidden h-80 md:h-96 border border-white/5 hover:border-teal-500/20 transition-all duration-300">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="border border-teal-500/50 bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 font-mono backdrop-blur-sm">
                    <TrendingUp className="w-3 h-3" /> NỔI BẬT
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="text-teal-400 text-sm font-mono mb-2 block">{featured.category}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight font-heading">{featured.title}</h2>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-white/30 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <img src={featured.authorAvatar} alt="" className="w-6 h-6 rounded-full opacity-70" />
                      <span>{featured.author}</span>
                    </div>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} PHÚT ĐỌC</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.views.toLocaleString()}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          )}

          {/* Blog grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-white/5 bg-[#0a1628]/40">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-white mb-2 font-heading">Không tìm thấy bài viết</h3>
              <p className="text-white/35">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(activeCategory === 'Tất cả' && !search ? rest : filtered).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="group relative rounded-2xl border border-white/5 bg-[#0a1628]/60 overflow-hidden hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative overflow-hidden h-48">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 border border-teal-500/40 bg-teal-500/15 text-teal-300 text-xs font-bold px-2.5 py-1 rounded-lg font-mono backdrop-blur-sm">{post.category}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-white/85 mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors leading-snug font-heading">{post.title}</h3>
                      <p className="text-sm text-white/35 line-clamp-2 mb-4 flex-1 font-body">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs text-teal-400/60 border border-teal-500/15 bg-teal-500/8 px-2 py-0.5 rounded-full font-mono">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/25 pt-3 border-t border-white/5 font-mono">
                        <div className="flex items-center gap-2">
                          <img src={post.authorAvatar} alt="" className="w-5 h-5 rounded-full opacity-60" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} PHÚT</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </TravelLayout>
  );
}
