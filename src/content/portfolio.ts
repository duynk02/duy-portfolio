/**
 * Editable portfolio content. The owner confirmed the supplied CV is the latest version.
 * Use it for current experience and project details; retain compatible details from the brief.
 * Unknown dates and unverified URLs stay null; never turn them into fabricated claims.
 */
export type Language = 'vi' | 'en'
export type Localized = Record<Language, string>

interface SiteConfig {
  name: string
  email: string
  github: string
  portraitPath: string
  resumePath: string | null
  siteUrl: string | null
  /** Employment end date confirmed by the latest supplied CV. */
  dhEndDate: string | null
}

export const siteConfig: SiteConfig = {
  name: 'Nguyen Khac Duy',
  email: 'nkduy02contact@gmail.com',
  github: 'https://github.com/duynk02',
  portraitPath: 'images/portrait.webp',
  // The owner confirmed this is the current CV; the CTA requires this public file to exist.
  resumePath: 'cv/CV_BackendDeveloper_NguyenKhacDuy.pdf',
  // Configure the actual production URL to enable canonical and sitemap metadata.
  siteUrl: 'https://nguyen-khac-duy-backend-portfolio.abuzztune16384.chatgpt.site',
  dhEndDate: '08/2026',
}

export const profile: {
  greeting: Localized
  headline: Localized
  description: Localized
  about: Localized[]
  focus: Localized[]
} = {
  greeting: { vi: 'Xin chào, mình là Duy.', en: "Hi, I'm Duy." },
  headline: { vi: 'Backend Engineer', en: 'Backend Engineer' },
  description: {
    vi: 'Xây dựng hệ thống backend đáng tin cậy, tối ưu dữ liệu và kết nối những giải pháp công nghệ.',
    en: 'Building reliable backend systems, optimizing data workflows, and connecting technology solutions.',
  },
  about: [
    {
      vi: 'Mình là một Backend Engineer với hơn 1,5 năm kinh nghiệm trong lĩnh vực Healthcare IT, phát triển backend và tích hợp hệ thống. Mình làm việc với Node.js, PostgreSQL và các hệ thống phần mềm y tế.',
      en: "I'm a Backend Engineer with 1.5+ years of experience across healthcare IT, backend development, and system integration, working with Node.js, PostgreSQL, and healthcare software systems.",
    },
    {
      vi: 'Mình tập trung vào thiết kế API, xử lý dữ liệu, tối ưu truy vấn database, xây dựng hệ thống hướng sự kiện và nâng cao độ tin cậy của các dịch vụ backend.',
      en: 'My focus includes API design, data processing, database optimization, event-driven systems, and backend reliability.',
    },
    {
      vi: 'Bên cạnh kinh nghiệm tích hợp HIS–EMR, mình phát triển các dự án cá nhân như Wandermap để tiếp tục hoàn thiện kỹ năng thiết kế kiến trúc backend và xây dựng sản phẩm end-to-end.',
      en: 'Alongside my experience with HIS–EMR integrations, I build personal projects such as Wandermap to strengthen my backend architecture skills and end-to-end product development capabilities.',
    },
  ],
  focus: [
    { vi: 'Backend & thiết kế API', en: 'Backend & API design' },
    { vi: 'Dữ liệu & độ tin cậy', en: 'Data & reliability' },
    { vi: 'Tích hợp hệ thống', en: 'System integration' },
  ],
}

export interface TimelineEntry {
  id: string
  start: string
  period: Localized
  kind: Localized
  title: Localized
  organization: Localized
  description: Localized[]
  technologies: string[]
}

export const timeline: TimelineEntry[] = [
  {
    id: 'university',
    start: '2020',
    period: { vi: '2020 — 2025', en: '2020 — 2025' },
    kind: { vi: 'Học vấn', en: 'Education' },
    title: { vi: 'Khoa học máy tính', en: 'Computer Science' },
    organization: { vi: 'Đại học Cần Thơ', en: 'Can Tho University' },
    description: [
      {
        vi: 'Xây dựng nền tảng khoa học máy tính, phát triển phần mềm và thiết kế cơ sở dữ liệu.',
        en: 'Built a foundation in computer science, software development, and database design.',
      },
      {
        vi: 'Vận dụng kiến thức lập trình và phát triển hệ thống vào các bài tập và dự án học tập.',
        en: 'Applied programming and system development fundamentals through coursework and academic projects.',
      },
    ],
    technologies: ['Computer Science', 'Software Development', 'Databases'],
  },
  {
    id: 'technical-support',
    start: '2025-01',
    period: { vi: '01/2025 — 07/2025', en: '01/2025 — 07/2025' },
    kind: { vi: 'Kinh nghiệm làm việc', en: 'Employment' },
    title: {
      vi: 'Triển khai & hỗ trợ kỹ thuật',
      en: 'Technical Implementation & Support',
    },
    organization: { vi: 'DH Digital Solutions', en: 'DH Digital Solutions' },
    description: [
      {
        vi: 'Xử lý sự cố ứng dụng HIS, tái hiện và khoanh vùng lỗi; phối hợp với đội phát triển để tìm hướng giải quyết.',
        en: 'Troubleshot HIS application issues, reproduced and isolated bugs, and coordinated resolutions with development teams.',
      },
      {
        vi: 'Kiểm tra bản vá, hỗ trợ kiểm thử nghiệm thu và triển khai ứng dụng tại môi trường thực tế.',
        en: 'Validated patches and supported acceptance testing and application deployment.',
      },
    ],
    technologies: ['HIS', 'Troubleshooting', 'Integration Testing'],
  },
  {
    id: 'backend-integration',
    start: '2025-07',
    period: {
      vi: `07/2025 — ${siteConfig.dhEndDate ?? 'Cần xác nhận ngày kết thúc'}`,
      en: `07/2025 — ${siteConfig.dhEndDate ?? 'End date to confirm'}`,
    },
    kind: { vi: 'Kinh nghiệm làm việc', en: 'Employment' },
    title: {
      vi: 'Backend Engineer / Lập trình & tích hợp',
      en: 'Backend Engineer / Programming & Integration',
    },
    organization: { vi: 'DH Digital Solutions', en: 'DH Digital Solutions' },
    description: [
      {
        vi: 'Phát triển module backend Node.js cho đồng bộ HIS–EMR hai chiều; phối hợp với đối tác về hợp đồng API và chuyển đổi dữ liệu.',
        en: 'Developed Node.js backend modules for bidirectional HIS–EMR synchronization, coordinating API contracts and data transformations with integration partners.',
      },
      {
        vi: 'Tối ưu truy vấn và hàm lấy dữ liệu PostgreSQL bằng composite index, EXPLAIN ANALYZE và PL/pgSQL, giảm 15% độ trễ truy vấn.',
        en: 'Optimized PostgreSQL queries and data-fetching functions using composite indexes, EXPLAIN ANALYZE, and PL/pgSQL, reducing query latency by 15%.',
      },
      {
        vi: 'Chẩn đoán và xử lý tình trạng cạn connection pool do kết nối chưa được giải phóng, cải thiện độ tin cậy khi hệ thống chịu tải cao.',
        en: 'Diagnosed and resolved production connection pool exhaustion caused by unreleased connections, improving reliability during peak workloads.',
      },
      {
        vi: 'Phát triển ứng dụng desktop C#/.NET kết nối thiết bị ký với HIS qua HTTP API cục bộ và SDK của nhà cung cấp.',
        en: 'Developed a C#/.NET desktop bridge connecting signature hardware to HIS through a local HTTP API and the vendor SDK.',
      },
      {
        vi: 'Xây dựng dịch vụ API Node.js cho tích hợp chữ ký số và kiểm thử với Softdreams EasyCA; hỗ trợ phân tích log, khoanh vùng lỗi và kiểm thử nghiệm thu.',
        en: 'Built Node.js API services for digital-signature integration and testing with Softdreams EasyCA; supported log analysis, bug isolation, and acceptance testing.',
      },
    ],
    technologies: ['Node.js', 'PostgreSQL', 'REST API', 'C# / .NET'],
  },
  {
    id: 'independent-development',
    start: '2026',
    period: { vi: '2026 — Hiện tại', en: '2026 — Present' },
    kind: { vi: 'Dự án cá nhân', en: 'Personal project' },
    title: {
      vi: 'Phát triển phần mềm độc lập',
      en: 'Independent Software Development',
    },
    organization: { vi: 'Wandermap', en: 'Wandermap' },
    description: [
      {
        vi: 'Phát triển dự án cá nhân về du lịch và mạng xã hội; đã xây dựng REST API NestJS theo module với PostgreSQL/PostGIS và giao diện Next.js kết hợp bản đồ Mapbox.',
        en: 'Developing a personal travel and social platform, with a modular NestJS REST API backed by PostgreSQL/PostGIS and a Next.js interface with Mapbox maps.',
      },
      {
        vi: 'Đã triển khai JWT với refresh token luân phiên, cookie HttpOnly và thông báo Socket.IO theo người dùng; cấu hình Docker Compose và GitHub Actions để kiểm tra, build và test.',
        en: 'Implemented JWT authentication with rotating refresh tokens and HttpOnly cookies, user-isolated Socket.IO notifications, and Docker Compose and GitHub Actions for validation, builds, and testing.',
      },
    ],
    technologies: ['NestJS', 'PostgreSQL / PostGIS', 'Socket.IO', 'Next.js'],
  },
]

export const skills: {
  id: string
  title: Localized
  technologies: string[]
}[] = [
  {
    id: 'backend',
    title: { vi: 'Phát triển backend', en: 'Backend development' },
    technologies: ['Node.js', 'NestJS', 'Express.js', 'TypeScript', 'C#', 'ASP.NET Core'],
  },
  {
    id: 'frontend',
    title: { vi: 'Phát triển frontend', en: 'Frontend development' },
    technologies: ['TypeScript', 'React', 'Next.js', 'Mapbox GL', 'HTML / CSS'],
  },
  {
    id: 'database',
    title: { vi: 'Cơ sở dữ liệu', en: 'Databases' },
    technologies: ['PostgreSQL', 'PostGIS', 'PL/pgSQL', 'MongoDB', 'SQL Optimization'],
  },
  {
    id: 'architecture',
    title: { vi: 'Kiến trúc & tích hợp', en: 'Architecture & integration' },
    technologies: [
      'RESTful APIs',
      'JWT Authentication',
      'Refresh Token Rotation',
      'Authentication Middleware',
      'Socket.IO / WebSockets',
      'Event-Driven Architecture',
      'PostgreSQL LISTEN/NOTIFY',
      'Outbox & Retry Patterns',
      'System Integration',
    ],
  },
  {
    id: 'devops',
    title: { vi: 'DevOps & công cụ', en: 'DevOps & tools' },
    technologies: ['Git / GitHub', 'Docker', 'Docker Compose', 'GitHub Actions / CI', 'Swagger / OpenAPI', 'Render', 'Postman'],
  },
]

export interface Project {
  id: string
  number: string
  title: string
  subtitle: Localized
  category: Localized
  status: Localized
  description: Localized
  highlights: Localized[]
  technologies: string[]
  github: string | null
  demo: string | null
  graphic: 'map' | 'sync' | 'hospital' | 'signature'
}

export const projects: Project[] = [
  {
    id: 'wandermap',
    number: '01',
    title: 'Wandermap',
    subtitle: { vi: 'Nền tảng mạng xã hội du lịch', en: 'Travel Social Platform' },
    category: { vi: 'Nổi bật · Dự án cá nhân', en: 'Featured · Personal project' },
    status: { vi: 'Đang phát triển', en: 'In development' },
    description: {
      vi: 'Nền tảng du lịch và mạng xã hội với bản đồ tương tác, dữ liệu địa lý PostGIS và backend NestJS. Dự án cá nhân đang tiếp tục được phát triển.',
      en: 'A travel and social platform with interactive maps, PostGIS geospatial services, and a NestJS backend. An independently developed project that continues to evolve.',
    },
    highlights: [
      {
        vi: 'Thiết kế và xây dựng REST API NestJS theo module với PostgreSQL 16/PostGIS, database migration, kiểm tra dữ liệu đầu vào và xử lý lỗi có cấu trúc.',
        en: 'Designed and developed a modular NestJS REST API with PostgreSQL 16/PostGIS persistence, database migrations, request validation, and structured error handling.',
      },
      {
        vi: 'Xây dựng giao diện Next.js 15/React cho bảng tin, hồ sơ người dùng và bản đồ du lịch Mapbox, tích hợp REST API và thông báo thời gian thực.',
        en: 'Built Next.js 15/React interfaces for social feeds, user profiles, and Mapbox travel maps, integrating REST APIs and realtime notifications.',
      },
      {
        vi: 'Triển khai dịch vụ dữ liệu theo vị trí với PostGIS cùng bài đăng du lịch, bình luận, tương tác, dấu trang và quan hệ theo dõi.',
        en: 'Implemented location-based PostGIS data services and social features including travel posts, comments, reactions, bookmarks, and follow relationships.',
      },
      {
        vi: 'Triển khai xác thực JWT với refresh token luân phiên, cookie HttpOnly và bảo vệ truy cập API.',
        en: 'Implemented JWT authentication with rotating refresh tokens, HttpOnly cookies, and authenticated API access.',
      },
      {
        vi: 'Xây dựng thông báo Socket.IO có kết nối xác thực bằng JWT, room riêng theo người dùng, lưu sự kiện, bộ đếm chưa đọc và đồng bộ khi kết nối lại.',
        en: 'Built Socket.IO notifications with JWT-authenticated connections, user-isolated rooms, persisted events, unread counters, and reconnection synchronization.',
      },
      {
        vi: 'Cấu hình Docker Compose cho PostgreSQL/PostGIS và workflow GitHub Actions để tự động kiểm tra mã nguồn, build và test.',
        en: 'Configured Docker Compose for PostgreSQL/PostGIS and GitHub Actions workflows for automated code validation, builds, and testing.',
      },
    ],
    technologies: ['Next.js 15', 'React', 'TypeScript', 'NestJS', 'Node.js', 'PostgreSQL 16', 'PostGIS', 'Socket.IO', 'JWT', 'Docker Compose', 'GitHub Actions', 'Mapbox'],
    github: 'https://github.com/duynk02/wandermap',
    demo: 'https://wandermap-ashy.vercel.app/',
    graphic: 'map',
  },
  {
    id: 'dh-emr-sync',
    number: '02',
    title: 'DH-EMR-Sync',
    subtitle: {
      vi: 'Hệ thống đồng bộ dữ liệu HIS–EMR thời gian thực',
      en: 'HIS–EMR Real-Time Data Synchronization Engine',
    },
    category: { vi: 'Tích hợp hệ thống', en: 'System integration' },
    status: { vi: 'Dự án kỹ thuật', en: 'Engineering project' },
    description: {
      vi: 'Đồng bộ dữ liệu hai chiều giữa HIS và EMR theo sự kiện, kết hợp xử lý dữ liệu tại database và cơ chế khôi phục sự kiện chưa gửi.',
      en: 'Event-driven, bidirectional HIS–EMR synchronization combining database-side transformations with recovery of undelivered events.',
    },
    highlights: [
      {
        vi: 'Đồng bộ hai chiều bằng PostgreSQL LISTEN/NOTIFY thay cho cơ chế polling.',
        en: 'Built bidirectional synchronization using PostgreSQL LISTEN/NOTIFY instead of polling.',
      },
      {
        vi: 'Dùng stored procedure PL/pgSQL để chuyển đổi dữ liệu và tạo payload JSON trực tiếp từ database.',
        en: 'Used PL/pgSQL stored procedures for schema transformations and database-generated JSON payloads.',
      },
      {
        vi: 'Lưu sự kiện trong outbox, theo dõi trạng thái xử lý và số lần retry để khôi phục sau khi dịch vụ khởi động lại.',
        en: 'Persisted events in an outbox with processing status and retry counts for recovery after service restarts.',
      },
      {
        vi: 'Hỗ trợ đồng bộ hơn 16 loại thực thể và cải thiện độ tin cậy của luồng tích hợp.',
        en: 'Supported synchronization of 16+ entity types and improved integration workflow reliability.',
      },
    ],
    technologies: ['Node.js', 'PostgreSQL', 'PL/pgSQL', 'REST API', 'JWT'],
    github: 'https://github.com/duynk02/DH-EMR-Sync',
    demo: null,
    graphic: 'sync',
  },
  {
    id: 'evolis-signature',
    number: '03',
    title: 'Evolis Signature Bridge',
    subtitle: {
      vi: 'Cầu nối tích hợp thiết bị ký số',
      en: 'Digital Signature Hardware Bridge',
    },
    category: { vi: 'Tích hợp phần cứng', en: 'Hardware integration' },
    status: { vi: 'Dự án kỹ thuật', en: 'Engineering project' },
    description: {
      vi: 'Ứng dụng desktop kết nối thiết bị ký với HIS qua HTTP API nội bộ, hỗ trợ thu thập, xem trước và xác nhận chữ ký.',
      en: 'A desktop bridge connecting signature hardware to HIS through a local HTTP API, with capture, preview, and confirmation workflows.',
    },
    highlights: [
      {
        vi: 'Phát triển ứng dụng cầu nối C#/.NET Framework để tích hợp với HIS.',
        en: 'Developed a C#/.NET Framework desktop bridge for HIS integration.',
      },
      {
        vi: 'Giao tiếp với thiết bị ký bằng SDK và DLL của nhà cung cấp.',
        en: 'Communicated with signature hardware through the vendor SDK and DLLs.',
      },
      {
        vi: 'Cung cấp localhost HTTP API để lấy chữ ký cùng luồng xem trước và xác nhận.',
        en: 'Exposed a localhost HTTP API for signature capture with a preview and confirmation workflow.',
      },
    ],
    technologies: ['C#', '.NET Framework', 'Vendor SDK / DLL', 'HTTP API'],
    github: 'https://github.com/duynk02/EvolisSignApp',
    demo: null,
    graphic: 'signature',
  },
]

export const education: {
  school: Localized
  degree: Localized
  period: string
  gpa: string
} = {
  school: { vi: 'Đại học Cần Thơ', en: 'Can Tho University' },
  degree: { vi: 'Khoa học máy tính', en: 'Computer Science' },
  period: '2020 — 2025',
  gpa: '3.12/4',
}

export const certifications: {
  title: Localized
  issuer: string
  date: Localized
}[] = [
  {
    title: { vi: 'TOEIC 615', en: 'TOEIC 615' },
    issuer: 'TOEIC',
    date: { vi: 'Tháng 02/2023', en: 'February 2023' },
  },
  {
    title: {
      vi: 'Kiểm thử thông minh với AI trong quy trình CI/CD',
      en: 'Smart Testing with AI in the CI/CD Pipeline',
    },
    issuer: 'CUSC',
    // No date was supplied for this certificate.
    date: { vi: '', en: '' },
  },
]
