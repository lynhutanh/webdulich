// ─── Mock Data for Travel Booking Website ───────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  popImage?: string;
  tourCount: number;
  rating: number;
  tag?: string;
  description?: string;
}

export interface Tour {
  id: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: number;
  rating: number;
  reviewCount: number;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  highlights: string[];
  description: string;
  included: string[];
  excluded: string[];
  itinerary: { day: number; title: string; description: string }[];
  badge?: string;
  isWishlisted?: boolean;
  departureDate: string;
  guide: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  tourName: string;
  location: string;
}

export interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  tourImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  guests: number;
  date: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  destination: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  views: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  bookings: number;
  totalSpent: number;
  phone?: string;
  location?: string;
}

// ─── Destinations ────────────────────────────────────────────────────────────
export const destinations: Destination[] = [
  { id: '1', name: 'Hội An', country: 'Việt Nam', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80', popImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', tourCount: 24, rating: 4.9, tag: 'Trending', description: 'Phố cổ nghìn năm tuổi với những ngôi nhà mái ngói rêu phong, đèn lồng lung linh và ẩm thực đường phố độc đáo bên dòng sông Thu Bồn.' },
  { id: '2', name: 'Hạ Long Bay', country: 'Việt Nam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80', popImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80', tourCount: 18, rating: 4.8, tag: 'Popular', description: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi hùng vĩ, hang động kỳ bí và làn nước xanh ngọc bích trải dài.' },
  { id: '3', name: 'Đà Nẵng', country: 'Việt Nam', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80', popImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80', tourCount: 31, rating: 4.7, description: 'Thành phố biển năng động với bãi biển Mỹ Khê tuyệt đẹp, cầu Rồng biểu tượng và cổng trời Bà Nà Hills huyền ảo.' },
  { id: '4', name: 'Sapa', country: 'Việt Nam', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', popImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', tourCount: 15, rating: 4.8, tag: 'Adventure', description: 'Thị trấn mây mù trên đỉnh núi với ruộng bậc thang vàng óng, văn hóa dân tộc thiểu số phong phú và đỉnh Fansipan hùng vĩ.' },
];

// ─── Tours ───────────────────────────────────────────────────────────────────
export const tours: Tour[] = [
  {
    id: '1',
    title: 'Khám Phá Hội An Cổ Kính',
    destination: 'Hội An',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    price: 2500000,
    originalPrice: 3200000,
    duration: '3 ngày 2 đêm',
    groupSize: 12,
    rating: 4.9,
    reviewCount: 128,
    category: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Phố cổ Hội An', 'Làng gốm Thanh Hà', 'Rừng dừa Bảy Mẫu', 'Ẩm thực địa phương'],
    description: 'Khám phá vẻ đẹp cổ kính của Hội An — thành phố được UNESCO công nhận là Di sản Văn hóa Thế giới. Tour bao gồm tham quan phố cổ, trải nghiệm làng nghề truyền thống và thưởng thức ẩm thực đặc sắc.',
    included: ['Xe đưa đón', 'Khách sạn 4 sao', 'Bữa ăn sáng', 'Hướng dẫn viên', 'Vé tham quan'],
    excluded: ['Vé máy bay', 'Chi phí cá nhân', 'Bảo hiểm du lịch'],
    itinerary: [
      { day: 1, title: 'Đến Hội An - Khám phá phố cổ', description: 'Đón tại sân bay, nhận phòng khách sạn, tham quan phố cổ buổi tối.' },
      { day: 2, title: 'Làng nghề & Rừng dừa', description: 'Thăm làng gốm Thanh Hà, trải nghiệm chèo thuyền thúng rừng dừa Bảy Mẫu.' },
      { day: 3, title: 'Tự do & Về nhà', description: 'Buổi sáng tự do mua sắm, trưa trả phòng và đưa ra sân bay.' },
    ],
    badge: 'Best Seller',
    isWishlisted: false,
    departureDate: '2026-06-15',
    guide: 'Nguyễn Văn Minh',
  },
  {
    id: '2',
    title: 'Vịnh Hạ Long 2 Ngày 1 Đêm Trên Du Thuyền',
    destination: 'Hạ Long Bay',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    price: 3800000,
    originalPrice: 4500000,
    duration: '2 ngày 1 đêm',
    groupSize: 20,
    rating: 4.8,
    reviewCount: 256,
    category: 'Cruise',
    difficulty: 'Easy',
    highlights: ['Du thuyền 5 sao', 'Hang Sửng Sốt', 'Chèo kayak', 'Hoàng hôn trên vịnh'],
    description: 'Trải nghiệm vẻ đẹp huyền bí của Vịnh Hạ Long trên du thuyền sang trọng. Khám phá các hang động kỳ vĩ, chèo kayak giữa những hòn đảo đá vôi và ngắm hoàng hôn tuyệt đẹp.',
    included: ['Du thuyền 5 sao', 'Tất cả bữa ăn', 'Kayak', 'Hướng dẫn viên', 'Vé tham quan'],
    excluded: ['Xe từ Hà Nội', 'Đồ uống có cồn', 'Chi phí cá nhân'],
    itinerary: [
      { day: 1, title: 'Lên tàu - Khám phá vịnh', description: 'Lên tàu tại cảng Tuần Châu, ăn trưa trên tàu, thăm hang Sửng Sốt, chèo kayak.' },
      { day: 2, title: 'Bình minh & Về bờ', description: 'Ngắm bình minh, tập Thái Cực Quyền, ăn sáng, về bờ lúc 12h.' },
    ],
    badge: 'Hot Deal',
    isWishlisted: true,
    departureDate: '2026-06-20',
    guide: 'Trần Thị Lan',
  },
  {
    id: '3',
    title: 'Trekking Sapa Chinh Phục Fansipan',
    destination: 'Sapa',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    ],
    price: 4200000,
    duration: '4 ngày 3 đêm',
    groupSize: 8,
    rating: 4.7,
    reviewCount: 89,
    category: 'Adventure',
    difficulty: 'Hard',
    highlights: ['Đỉnh Fansipan', 'Bản làng dân tộc', 'Ruộng bậc thang', 'Cáp treo Fansipan'],
    description: 'Chinh phục nóc nhà Đông Dương — đỉnh Fansipan 3143m. Tour dành cho những người yêu thích thử thách và khám phá thiên nhiên hoang sơ của vùng núi Tây Bắc.',
    included: ['Khách sạn', 'Bữa ăn', 'Hướng dẫn viên trekking', 'Thiết bị leo núi', 'Vé cáp treo'],
    excluded: ['Vé tàu/xe', 'Chi phí cá nhân', 'Bảo hiểm'],
    itinerary: [
      { day: 1, title: 'Đến Sapa', description: 'Nhận phòng, khám phá thị trấn Sapa, thăm chợ đêm.' },
      { day: 2, title: 'Trekking ngày 1', description: 'Bắt đầu hành trình trekking qua các bản làng dân tộc.' },
      { day: 3, title: 'Chinh phục Fansipan', description: 'Leo lên đỉnh Fansipan, ngắm toàn cảnh từ trên cao.' },
      { day: 4, title: 'Về nhà', description: 'Nghỉ ngơi, mua sắm đặc sản và về Hà Nội.' },
    ],
    badge: 'Adventure',
    isWishlisted: false,
    departureDate: '2026-07-01',
    guide: 'Lê Văn Hùng',
  },
  {
    id: '4',
    title: 'Phú Quốc Thiên Đường Biển Đảo',
    destination: 'Phú Quốc',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80',
    ],
    price: 5500000,
    originalPrice: 6800000,
    duration: '4 ngày 3 đêm',
    groupSize: 15,
    rating: 4.9,
    reviewCount: 312,
    category: 'Beach',
    difficulty: 'Easy',
    highlights: ['Bãi Sao', 'Lặn ngắm san hô', 'Vinpearl Safari', 'Chợ đêm Phú Quốc'],
    description: 'Tận hưởng kỳ nghỉ hoàn hảo tại hòn đảo ngọc Phú Quốc với những bãi biển cát trắng, nước biển trong xanh và hải sản tươi ngon.',
    included: ['Resort 5 sao', 'Tất cả bữa ăn', 'Vé máy bay', 'Tour lặn biển', 'Xe đưa đón'],
    excluded: ['Chi phí cá nhân', 'Spa', 'Đồ uống'],
    itinerary: [
      { day: 1, title: 'Bay đến Phú Quốc', description: 'Nhận phòng resort, tắm biển, ăn tối hải sản.' },
      { day: 2, title: 'Khám phá đảo', description: 'Tour 4 đảo, lặn ngắm san hô, câu cá.' },
      { day: 3, title: 'Vinpearl & Chợ đêm', description: 'Thăm Vinpearl Safari, mua sắm chợ đêm.' },
      { day: 4, title: 'Tự do & Bay về', description: 'Buổi sáng tự do, chiều bay về.' },
    ],
    badge: 'New',
    isWishlisted: false,
    departureDate: '2026-06-25',
    guide: 'Phạm Thị Hoa',
  },
  {
    id: '5',
    title: 'Đà Lạt Thành Phố Ngàn Hoa',
    destination: 'Đà Lạt',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    ],
    price: 2800000,
    duration: '3 ngày 2 đêm',
    groupSize: 10,
    rating: 4.8,
    reviewCount: 175,
    category: 'Nature',
    difficulty: 'Easy',
    highlights: ['Vườn hoa Đà Lạt', 'Thác Datanla', 'Làng Cù Lần', 'Cà phê Mê Linh'],
    description: 'Khám phá thành phố ngàn hoa với khí hậu mát mẻ quanh năm, những vườn hoa rực rỡ và cảnh quan thiên nhiên tuyệt đẹp.',
    included: ['Khách sạn boutique', 'Bữa sáng', 'Xe đưa đón', 'Hướng dẫn viên', 'Vé tham quan'],
    excluded: ['Vé máy bay', 'Bữa trưa & tối', 'Chi phí cá nhân'],
    itinerary: [
      { day: 1, title: 'Đến Đà Lạt', description: 'Nhận phòng, thăm chợ Đà Lạt, ăn tối phố ẩm thực.' },
      { day: 2, title: 'Khám phá thiên nhiên', description: 'Thác Datanla, Làng Cù Lần, Vườn hoa thành phố.' },
      { day: 3, title: 'Cà phê & Về nhà', description: 'Thăm các quán cà phê nổi tiếng, mua đặc sản, về nhà.' },
    ],
    badge: 'Romantic',
    isWishlisted: true,
    departureDate: '2026-07-10',
    guide: 'Hoàng Văn Nam',
  },
  {
    id: '6',
    title: 'Ninh Bình Tràng An Bích Động',
    destination: 'Ninh Bình',
    country: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    ],
    price: 1800000,
    duration: '2 ngày 1 đêm',
    groupSize: 20,
    rating: 4.7,
    reviewCount: 143,
    category: 'Cultural',
    difficulty: 'Easy',
    highlights: ['Tràng An', 'Bích Động', 'Cố đô Hoa Lư', 'Đồng Giao'],
    description: 'Khám phá vẻ đẹp hùng vĩ của Ninh Bình — vịnh Hạ Long trên cạn với những dãy núi đá vôi, hang động và di tích lịch sử.',
    included: ['Khách sạn', 'Bữa sáng', 'Thuyền Tràng An', 'Hướng dẫn viên', 'Xe đưa đón'],
    excluded: ['Vé xe từ Hà Nội', 'Bữa trưa & tối', 'Chi phí cá nhân'],
    itinerary: [
      { day: 1, title: 'Tràng An & Bích Động', description: 'Chèo thuyền Tràng An, thăm chùa Bích Động, nhận phòng.' },
      { day: 2, title: 'Hoa Lư & Về nhà', description: 'Thăm cố đô Hoa Lư, mua đặc sản, về Hà Nội.' },
    ],
    isWishlisted: false,
    departureDate: '2026-06-18',
    guide: 'Vũ Thị Mai',
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  { id: '1', user: 'Nguyễn Thị Hương', avatar: 'https://i.pravatar.cc/80?img=1', rating: 5, comment: 'Tour tuyệt vời! Hướng dẫn viên rất nhiệt tình, lịch trình hợp lý. Chắc chắn sẽ quay lại!', date: '2026-05-10', tourName: 'Khám Phá Hội An', location: 'Hà Nội' },
  { id: '2', user: 'Trần Văn Đức', avatar: 'https://i.pravatar.cc/80?img=2', rating: 5, comment: 'Vịnh Hạ Long đẹp hơn tôi tưởng tượng. Du thuyền sang trọng, đồ ăn ngon. Rất đáng tiền!', date: '2026-05-08', tourName: 'Hạ Long Bay Cruise', location: 'TP.HCM' },
  { id: '3', user: 'Lê Thị Phương', avatar: 'https://i.pravatar.cc/80?img=3', rating: 4, comment: 'Phú Quốc đẹp lắm, resort xịn, biển trong. Chỉ tiếc thời tiết hơi nóng nhưng vẫn rất vui.', date: '2026-05-05', tourName: 'Phú Quốc Paradise', location: 'Đà Nẵng' },
  { id: '4', user: 'Phạm Minh Tuấn', avatar: 'https://i.pravatar.cc/80?img=4', rating: 5, comment: 'Trekking Sapa thật sự là trải nghiệm đáng nhớ. Cảnh đẹp, không khí trong lành, hướng dẫn viên chuyên nghiệp.', date: '2026-04-28', tourName: 'Sapa Trekking', location: 'Hải Phòng' },
  { id: '5', user: 'Hoàng Thị Lan', avatar: 'https://i.pravatar.cc/80?img=5', rating: 5, comment: 'Đà Lạt lãng mạn quá! Đi cùng người yêu, không khí mát mẻ, hoa đẹp. Sẽ quay lại vào mùa hoa.', date: '2026-04-20', tourName: 'Đà Lạt Romantic', location: 'Cần Thơ' },
  { id: '6', user: 'Vũ Quang Huy', avatar: 'https://i.pravatar.cc/80?img=6', rating: 4, comment: 'Ninh Bình đẹp như tranh vẽ. Chèo thuyền Tràng An rất thú vị. Dịch vụ tốt, giá hợp lý.', date: '2026-04-15', tourName: 'Ninh Bình Discovery', location: 'Hà Nội' },
];

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const bookings: Booking[] = [
  { id: 'BK001', tourId: '1', tourName: 'Khám Phá Hội An Cổ Kính', tourImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80', userId: 'u1', userName: 'Nguyễn Thị Hương', userEmail: 'huong@email.com', guests: 2, date: '2026-06-15', totalPrice: 5000000, status: 'confirmed', createdAt: '2026-05-01', destination: 'Hội An' },
  { id: 'BK002', tourId: '2', tourName: 'Vịnh Hạ Long Du Thuyền', tourImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&q=80', userId: 'u2', userName: 'Trần Văn Đức', userEmail: 'duc@email.com', guests: 4, date: '2026-06-20', totalPrice: 15200000, status: 'pending', createdAt: '2026-05-03', destination: 'Hạ Long' },
  { id: 'BK003', tourId: '4', tourName: 'Phú Quốc Thiên Đường Biển Đảo', tourImage: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80', userId: 'u3', userName: 'Lê Thị Phương', userEmail: 'phuong@email.com', guests: 2, date: '2026-06-25', totalPrice: 11000000, status: 'completed', createdAt: '2026-04-20', destination: 'Phú Quốc' },
  { id: 'BK004', tourId: '3', tourName: 'Trekking Sapa Fansipan', tourImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', userId: 'u4', userName: 'Phạm Minh Tuấn', userEmail: 'tuan@email.com', guests: 1, date: '2026-07-01', totalPrice: 4200000, status: 'confirmed', createdAt: '2026-05-10', destination: 'Sapa' },
  { id: 'BK005', tourId: '5', tourName: 'Đà Lạt Thành Phố Ngàn Hoa', tourImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', userId: 'u5', userName: 'Hoàng Thị Lan', userEmail: 'lan@email.com', guests: 2, date: '2026-07-10', totalPrice: 5600000, status: 'cancelled', createdAt: '2026-05-12', destination: 'Đà Lạt' },
  { id: 'BK006', tourId: '6', tourName: 'Ninh Bình Tràng An', tourImage: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80', userId: 'u1', userName: 'Nguyễn Thị Hương', userEmail: 'huong@email.com', guests: 3, date: '2026-06-18', totalPrice: 5400000, status: 'confirmed', createdAt: '2026-05-15', destination: 'Ninh Bình' },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: '1', title: 'Top 10 Điểm Đến Không Thể Bỏ Qua Ở Việt Nam 2026', slug: 'top-10-diem-den-viet-nam-2026',
    excerpt: 'Việt Nam sở hữu vô số điểm đến tuyệt đẹp từ Bắc vào Nam. Hãy cùng khám phá 10 địa điểm du lịch hot nhất năm 2026.',
    content: 'Việt Nam — đất nước hình chữ S với chiều dài bờ biển hơn 3000km và vô số danh lam thắng cảnh...',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    author: 'Minh Châu', authorAvatar: 'https://i.pravatar.cc/80?img=10',
    category: 'Điểm Đến', tags: ['Việt Nam', 'Du lịch', 'Top 10'], date: '2026-05-15', readTime: 8, views: 12500,
  },
  {
    id: '2', title: 'Bí Quyết Du Lịch Tiết Kiệm Mà Vẫn Sang Chảnh', slug: 'bi-quyet-du-lich-tiet-kiem',
    excerpt: 'Bạn muốn du lịch sang trọng nhưng ngân sách hạn chế? Đây là những bí quyết giúp bạn tận hưởng kỳ nghỉ tuyệt vời mà không tốn quá nhiều tiền.',
    content: 'Du lịch không nhất thiết phải tốn kém. Với những mẹo nhỏ sau đây, bạn hoàn toàn có thể...',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80',
    author: 'Thanh Tùng', authorAvatar: 'https://i.pravatar.cc/80?img=11',
    category: 'Mẹo Du Lịch', tags: ['Tiết kiệm', 'Mẹo hay', 'Budget travel'], date: '2026-05-10', readTime: 6, views: 8900,
  },
  {
    id: '3', title: 'Hành Trình Khám Phá Ẩm Thực Đường Phố Hà Nội', slug: 'am-thuc-duong-pho-ha-noi',
    excerpt: 'Hà Nội không chỉ nổi tiếng với những di tích lịch sử mà còn là thiên đường ẩm thực đường phố với hàng trăm món ăn đặc sắc.',
    content: 'Bước chân vào Hà Nội, bạn sẽ bị cuốn hút ngay bởi mùi thơm của phở, bún chả, bánh mì...',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    author: 'Hồng Nhung', authorAvatar: 'https://i.pravatar.cc/80?img=12',
    category: 'Ẩm Thực', tags: ['Hà Nội', 'Ẩm thực', 'Đường phố'], date: '2026-05-05', readTime: 5, views: 7200,
  },
  {
    id: '4', title: 'Kinh Nghiệm Đặt Tour Du Lịch Online An Toàn', slug: 'kinh-nghiem-dat-tour-online',
    excerpt: 'Đặt tour online tiện lợi nhưng cũng tiềm ẩn nhiều rủi ro. Hãy trang bị cho mình những kiến thức cần thiết để có chuyến đi an toàn.',
    content: 'Trong thời đại số, việc đặt tour du lịch online ngày càng phổ biến...',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
    author: 'Quang Minh', authorAvatar: 'https://i.pravatar.cc/80?img=13',
    category: 'Hướng Dẫn', tags: ['Đặt tour', 'An toàn', 'Online'], date: '2026-04-28', readTime: 7, views: 5600,
  },
  {
    id: '5', title: 'Mùa Hoa Tam Giác Mạch Hà Giang — Thiên Đường Tím', slug: 'hoa-tam-giac-mach-ha-giang',
    excerpt: 'Tháng 10-11 hàng năm, cao nguyên đá Đồng Văn ngập tràn sắc tím của hoa tam giác mạch — một trong những cảnh đẹp nhất Việt Nam.',
    content: 'Hà Giang — mảnh đất địa đầu Tổ quốc với những cung đường đèo hiểm trở...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    author: 'Minh Châu', authorAvatar: 'https://i.pravatar.cc/80?img=10',
    category: 'Điểm Đến', tags: ['Hà Giang', 'Hoa tam giác mạch', 'Mùa thu'], date: '2026-04-20', readTime: 9, views: 15300,
  },
  {
    id: '6', title: 'Cẩm Nang Du Lịch Đà Nẵng Từ A Đến Z', slug: 'cam-nang-du-lich-da-nang',
    excerpt: 'Đà Nẵng — thành phố đáng sống nhất Việt Nam với những bãi biển đẹp, cầu Rồng ấn tượng và ẩm thực phong phú.',
    content: 'Đà Nẵng những năm gần đây đã trở thành điểm đến yêu thích của du khách trong và ngoài nước...',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    author: 'Thanh Tùng', authorAvatar: 'https://i.pravatar.cc/80?img=11',
    category: 'Hướng Dẫn', tags: ['Đà Nẵng', 'Cẩm nang', 'Biển'], date: '2026-04-15', readTime: 10, views: 9800,
  },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export const users: User[] = [
  { id: 'u1', name: 'Nguyễn Thị Hương', email: 'huong@email.com', avatar: 'https://i.pravatar.cc/80?img=1', role: 'user', status: 'active', joinDate: '2025-01-15', bookings: 8, totalSpent: 24500000, phone: '0901234567', location: 'Hà Nội' },
  { id: 'u2', name: 'Trần Văn Đức', email: 'duc@email.com', avatar: 'https://i.pravatar.cc/80?img=2', role: 'user', status: 'active', joinDate: '2025-02-20', bookings: 5, totalSpent: 18200000, phone: '0912345678', location: 'TP.HCM' },
  { id: 'u3', name: 'Lê Thị Phương', email: 'phuong@email.com', avatar: 'https://i.pravatar.cc/80?img=3', role: 'user', status: 'active', joinDate: '2025-03-10', bookings: 3, totalSpent: 9800000, phone: '0923456789', location: 'Đà Nẵng' },
  { id: 'u4', name: 'Phạm Minh Tuấn', email: 'tuan@email.com', avatar: 'https://i.pravatar.cc/80?img=4', role: 'user', status: 'inactive', joinDate: '2025-04-05', bookings: 2, totalSpent: 7500000, phone: '0934567890', location: 'Hải Phòng' },
  { id: 'u5', name: 'Hoàng Thị Lan', email: 'lan@email.com', avatar: 'https://i.pravatar.cc/80?img=5', role: 'user', status: 'active', joinDate: '2025-05-12', bookings: 6, totalSpent: 21000000, phone: '0945678901', location: 'Cần Thơ' },
  { id: 'u6', name: 'Admin Hệ Thống', email: 'admin@travelgo.vn', avatar: 'https://i.pravatar.cc/80?img=6', role: 'admin', status: 'active', joinDate: '2024-12-01', bookings: 0, totalSpent: 0, phone: '0900000000', location: 'Hà Nội' },
  { id: 'u7', name: 'Vũ Quang Huy', email: 'huy@email.com', avatar: 'https://i.pravatar.cc/80?img=7', role: 'user', status: 'banned', joinDate: '2025-06-01', bookings: 1, totalSpent: 2500000, phone: '0956789012', location: 'Hà Nội' },
];

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = [
  {
    id: '1', name: 'Biển & Đảo', icon: '🏖️', count: 45, color: 'from-cyan-400 to-blue-500',
    // Bãi biển cát trắng nước xanh ngọc nhiệt đới
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
    desc: 'Đắm mình trong làn nước xanh ngọc bích, tận hưởng ánh nắng vàng trên những bãi cát trắng mịn. Từ Phú Quốc đến Côn Đảo, mỗi hòn đảo là một thiên đường riêng đang chờ bạn khám phá.',
    highlights: ['Phú Quốc', 'Côn Đảo', 'Cát Bà', 'Lý Sơn'],
  },
  {
    id: '2', name: 'Núi & Trekking', icon: '🏔️', count: 32, color: 'from-green-400 to-emerald-600',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
    desc: 'Chinh phục những đỉnh núi hùng vĩ, băng qua những cánh rừng nguyên sinh và ruộng bậc thang vàng óng. Mỗi bước chân là một khám phá mới về vẻ đẹp hoang sơ của núi rừng Tây Bắc.',
    highlights: ['Fansipan', 'Sapa', 'Hà Giang', 'Mù Cang Chải'],
  },
  {
    id: '3', name: 'Văn Hóa & Lịch Sử', icon: '🏛️', count: 28, color: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&q=85',
    desc: 'Lạc bước vào những con phố cổ nghìn năm tuổi, khám phá di sản văn hóa thế giới và trải nghiệm nét đẹp truyền thống của người Việt qua từng lễ hội, làng nghề và ẩm thực địa phương.',
    highlights: ['Hội An', 'Huế', 'Hà Nội', 'Ninh Bình'],
  },
  {
    id: '4', name: 'Du Thuyền', icon: '🚢', count: 18, color: 'from-blue-400 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=85',
    desc: 'Lướt sóng trên những du thuyền sang trọng giữa kỳ quan thiên nhiên thế giới. Ngắm hoàng hôn trên vịnh, khám phá hang động huyền bí và thưởng thức hải sản tươi ngon ngay trên boong tàu.',
    highlights: ['Hạ Long Bay', 'Bái Tử Long', 'Lan Hạ', 'Cát Bà'],
  },
  {
    id: '5', name: 'Ẩm Thực', icon: '🍜', count: 22, color: 'from-red-400 to-pink-500',
    // Tô phở bò Việt Nam — món ăn đường phố
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&q=85',
    desc: 'Hành trình khám phá nền ẩm thực phong phú và đa dạng của Việt Nam — từ phở Hà Nội, bún bò Huế đến bánh mì Sài Gòn. Mỗi vùng đất mang một hương vị riêng không thể nhầm lẫn.',
    highlights: ['Hà Nội', 'Hội An', 'TP.HCM', 'Huế'],
  },
  {
    id: '6', name: 'Mạo Hiểm', icon: '🪂', count: 15, color: 'from-purple-400 to-violet-600',
    // Zipline / leo núi mạo hiểm
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=85',
    desc: 'Dành cho những tâm hồn không ngại thử thách — từ nhảy dù, lặn biển sâu đến leo núi đá và khám phá hang động. Mỗi chuyến đi là một câu chuyện anh hùng bạn sẽ kể mãi.',
    highlights: ['Đà Lạt', 'Quảng Bình', 'Nha Trang', 'Đà Nẵng'],
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
