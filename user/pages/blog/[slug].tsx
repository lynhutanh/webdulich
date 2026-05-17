import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TravelLayout from '@layouts/TravelLayout';
import { blogPosts } from 'src/data/mockData';
import { Clock, Eye, Tag, ChevronRight, Heart, Share2, Bookmark, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = blogPosts[currentIndex - 1];
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <TravelLayout>
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 holo-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-white/30 text-sm mb-3 font-mono">
              <Link href="/" className="hover:text-cyan-400 transition-colors">Trang chủ</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-teal-400">{post.category}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight font-heading">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="bg-[#020817] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <img src={post.authorAvatar} alt="" className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 opacity-80" />
              <div>
                <p className="font-semibold text-white/80 font-heading">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-white/30 font-mono">
                  <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} PHÚT ĐỌC</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${liked ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-white/8 bg-white/3 text-white/40 hover:border-white/15'}`}>
                <Heart className={`w-4 h-4 ${liked ? 'fill-red-400' : ''}`} /> {liked ? 'Đã thích' : 'Thích'}
              </button>
              <button onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-xl transition-all border ${bookmarked ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-white/8 bg-white/3 text-white/40 hover:border-white/15'}`}>
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-cyan-400' : ''}`} />
              </button>
              <button className="p-2 rounded-xl border border-white/8 bg-white/3 text-white/40 hover:border-white/15 transition">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-10">
            <p className="text-lg text-white/60 leading-relaxed mb-6 font-medium font-body">{post.excerpt}</p>
            <p className="text-white/45 leading-relaxed mb-6 font-body">{post.content}</p>
            <p className="text-white/45 leading-relaxed mb-6 font-body">
              Việt Nam — đất nước hình chữ S với chiều dài bờ biển hơn 3000km và vô số danh lam thắng cảnh từ Bắc vào Nam. Mỗi vùng đất đều mang một vẻ đẹp riêng, từ những ruộng bậc thang xanh mướt ở Sapa, những bãi biển cát trắng ở Phú Quốc, đến phố cổ Hội An lung linh ánh đèn lồng.
            </p>
            <h2 className="text-2xl font-bold text-white mb-4 font-heading">Những điểm đến không thể bỏ qua</h2>
            <p className="text-white/45 leading-relaxed mb-6 font-body">
              Hội An — thành phố cổ được UNESCO công nhận là Di sản Văn hóa Thế giới, nổi tiếng với những ngôi nhà cổ, đèn lồng rực rỡ và ẩm thực đặc sắc.
            </p>
            <p className="text-white/45 leading-relaxed mb-6 font-body">
              Vịnh Hạ Long — kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi nhô lên từ mặt biển xanh ngọc.
            </p>
            <blockquote className="border-l-4 border-cyan-500/50 pl-6 py-2 bg-cyan-500/5 rounded-r-xl my-6">
              <p className="text-cyan-300/80 font-medium italic font-body">"Du lịch không chỉ là đến một nơi mới, mà là trải nghiệm một cuộc sống mới, gặp gỡ những con người mới và tạo ra những kỷ niệm đáng nhớ."</p>
            </blockquote>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-white/5">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-sm text-teal-400/70 border border-teal-500/20 bg-teal-500/8 px-3 py-1.5 rounded-full hover:border-teal-500/40 cursor-pointer transition font-mono">
                <Tag className="w-3.5 h-3.5" />{tag}
              </span>
            ))}
          </div>

          {/* Comments */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-heading">
              <MessageCircle className="w-5 h-5 text-cyan-400" /> Bình luận (3)
            </h3>
            <div className="space-y-4 mb-6">
              {[
                { name: 'Nguyễn Hương', avatar: 'https://i.pravatar.cc/40?img=1', text: 'Bài viết rất hay và hữu ích! Tôi đã đến Hội An và đúng là đẹp như mô tả.', time: '2 giờ trước' },
                { name: 'Trần Đức', avatar: 'https://i.pravatar.cc/40?img=2', text: 'Cảm ơn tác giả đã chia sẻ. Tôi đang lên kế hoạch đi Hạ Long vào tháng tới.', time: '5 giờ trước' },
              ].map((c, i) => (
                <div key={i} className="flex gap-3 p-4 border border-white/5 bg-white/3 rounded-2xl">
                  <img src={c.avatar} alt="" className="w-9 h-9 rounded-full flex-shrink-0 opacity-70" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white/80 text-sm font-heading">{c.name}</span>
                      <span className="text-xs text-white/25 font-mono">{c.time}</span>
                    </div>
                    <p className="text-sm text-white/45 font-body">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-9 h-9 rounded-full flex-shrink-0 opacity-70" />
              <div className="flex-1">
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full px-4 py-3 border border-white/10 bg-white/5 rounded-2xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 resize-none transition" />
                <button className="mt-2 px-5 py-2 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-xl hover:bg-cyan-500/20 transition font-heading">
                  Gửi bình luận
                </button>
              </div>
            </div>
          </div>

          {/* Prev/Next */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-3 p-4 border border-white/5 bg-white/3 rounded-2xl hover:border-teal-500/20 hover:bg-white/5 transition">
                <ArrowLeft className="w-5 h-5 text-white/25 group-hover:text-teal-400 transition flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-white/25 mb-0.5 font-mono">BÀI TRƯỚC</p>
                  <p className="text-sm font-semibold text-white/70 line-clamp-1 group-hover:text-teal-300 transition font-heading">{prevPost.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-3 p-4 border border-white/5 bg-white/3 rounded-2xl hover:border-teal-500/20 hover:bg-white/5 transition text-right">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/25 mb-0.5 font-mono">BÀI TIẾP</p>
                  <p className="text-sm font-semibold text-white/70 line-clamp-1 group-hover:text-teal-300 transition font-heading">{nextPost.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/25 group-hover:text-teal-400 transition flex-shrink-0" />
              </Link>
            ) : <div />}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-heading">Bài viết liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`}>
                    <div className="group rounded-2xl border border-white/5 bg-[#0a1628]/60 overflow-hidden hover:border-teal-500/20 transition">
                      <div className="h-36 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-white/75 text-sm line-clamp-2 group-hover:text-teal-300 transition font-heading">{p.title}</h4>
                        <p className="text-xs text-white/25 mt-2 flex items-center gap-1 font-mono"><Clock className="w-3 h-3" />{p.readTime} PHÚT ĐỌC</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </TravelLayout>
  );
}
