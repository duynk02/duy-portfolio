/**
 * Editable portfolio content. The supplied brief takes precedence over the older CV.
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
  /** Confirm the end date before setting it. The supplied PDF says 08/2026. */
  dhEndDate: string | null
}

export const siteConfig: SiteConfig = {
  name: 'Nguyen Khac Duy',
  email: 'nkduy02contact@gmail.com',
  github: 'https://github.com/duynk02',
  portraitPath: 'images/portrait.webp',
  // Add an updated PDF to public/cv/ and configure its relative path here.
  // The reference CV is deliberately not published.
  resumePath: null,
  // Configure the actual production URL to enable canonical and sitemap metadata.
  siteUrl: 'https://nguyen-khac-duy-backend-portfolio.abuzztune16384.chatgpt.site',
  dhEndDate: null,
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
      vi: 'Mình là một Backend Engineer có kinh nghiệm phát triển dịch vụ Node.js, làm việc với PostgreSQL và tích hợp hệ thống phần mềm, đặc biệt trong lĩnh vực Healthcare IT.',
      en: "I'm a Backend Engineer experienced in developing Node.js services, working with PostgreSQL, and integrating enterprise software systems, particularly in Healthcare IT.",
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
    period: { vi: '01/2025 — 08/2025', en: '01/2025 — 08/2025' },
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
    start: '2025-08',
    period: {
      vi: `08/2025 — ${siteConfig.dhEndDate ?? 'Cần xác nhận ngày kết thúc'}`,
      en: `08/2025 — ${siteConfig.dhEndDate ?? 'End date to confirm'}`,
    },
    kind: { vi: 'Kinh nghiệm làm việc', en: 'Employment' },
    title: {
      vi: 'Backend Engineer / Lập trình & tích hợp',
      en: 'Backend Engineer / Programming & Integration',
    },
    organization: { vi: 'DH Digital Solutions', en: 'DH Digital Solutions' },
    description: [
      {
        vi: 'Phát triển dịch vụ Node.js và tích hợp REST API để đồng bộ dữ liệu giữa HIS và EMR.',
        en: 'Developed Node.js backend services and REST API integrations for HIS–EMR data synchronization.',
      },
      {
        vi: 'Tối ưu truy vấn và thao tác PostgreSQL; chẩn đoán tình trạng cạn connection pool trên môi trường production.',
        en: 'Optimized PostgreSQL queries and database operations; diagnosed production connection pool exhaustion.',
      },
      {
        vi: 'Phát triển middleware C#/.NET tích hợp thiết bị ký số; hỗ trợ kiểm thử tích hợp và xử lý sự cố production.',
        en: 'Developed C#/.NET middleware for digital signature hardware and supported integration testing and production troubleshooting.',
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
        vi: 'Phát triển nền tảng mạng xã hội du lịch; chuyển dần từ kiến trúc tập trung vào Supabase sang backend NestJS + PostgreSQL riêng biệt.',
        en: 'Developing a travel-focused social platform and migrating from a Supabase-centered architecture to a dedicated NestJS + PostgreSQL backend.',
      },
      {
        vi: 'Xây dựng xác thực backend và thông báo thời gian thực; tiếp tục cải thiện kiến trúc API, quy trình triển khai và độ tin cậy của ứng dụng.',
        en: 'Implementing backend authentication and realtime notifications while improving API architecture, deployment workflows, and application reliability.',
      },
    ],
    technologies: ['NestJS', 'PostgreSQL', 'Socket.IO', 'Next.js'],
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
    technologies: ['Node.js', 'NestJS', 'Express.js', 'C#', 'ASP.NET Core', 'Python', 'FastAPI'],
  },
  {
    id: 'frontend',
    title: { vi: 'Phát triển frontend', en: 'Frontend development' },
    technologies: ['TypeScript', 'React', 'Next.js', 'HTML / CSS'],
  },
  {
    id: 'database',
    title: { vi: 'Cơ sở dữ liệu', en: 'Databases' },
    technologies: ['PostgreSQL', 'PostGIS', 'PL/pgSQL', 'MongoDB'],
  },
  {
    id: 'architecture',
    title: { vi: 'Kiến trúc & tích hợp', en: 'Architecture & integration' },
    technologies: [
      'RESTful APIs',
      'JWT Authentication',
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
    technologies: ['Git / GitHub', 'Docker', 'GitHub Actions / CI/CD', 'Render', 'Postman'],
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
      vi: 'Một không gian kết nối trải nghiệm du lịch trên bản đồ. Dự án cá nhân đang được phát triển với kiến trúc frontend và backend riêng biệt.',
      en: 'A space that connects travel experiences through maps. An evolving personal project with a separated frontend and backend architecture.',
    },
    highlights: [
      {
        vi: 'Chuyển dần kiến trúc Next.js + Supabase sang frontend riêng và backend NestJS + PostgreSQL theo module.',
        en: 'Migrating from Next.js + Supabase to a separate frontend and modular NestJS + PostgreSQL backend.',
      },
      {
        vi: 'Xây dựng kết nối thông báo Socket.IO có bảo vệ bằng JWT và room riêng theo người dùng.',
        en: 'Implementing JWT-protected Socket.IO notification connections with user-isolated rooms.',
      },
      {
        vi: 'Phát triển luồng tạo thông báo, đếm chưa đọc, trạng thái đã đọc và đồng bộ khi kết nối lại.',
        en: 'Developing notification creation, unread counts, read state, and reconnection synchronization.',
      },
      {
        vi: 'Phát triển trải nghiệm du lịch trên bản đồ với Mapbox và dữ liệu địa lý PostgreSQL/PostGIS.',
        en: 'Working on map-based travel experiences with Mapbox and PostgreSQL/PostGIS geospatial data.',
      },
      {
        vi: 'Tiếp tục cải thiện quy trình phát triển, kiểm tra mã nguồn và triển khai với Docker và GitHub Actions.',
        en: 'Continuing to improve development, code validation, and deployment workflows with Docker and GitHub Actions.',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'NestJS', 'Node.js', 'PostgreSQL', 'Socket.IO', 'JWT', 'Docker', 'Mapbox'],
    github: 'https://github.com/duynk02/wandermap',
    demo: null,
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
    id: 'hospital-briefing',
    number: '03',
    title: 'Hospital Briefing',
    subtitle: {
      vi: 'Hệ thống quản lý giao ban bệnh viện',
      en: 'Hospital Briefing Management System',
    },
    category: { vi: 'Phần mềm y tế', en: 'Healthcare software' },
    status: { vi: 'Dự án kỹ thuật', en: 'Engineering project' },
    description: {
      vi: 'Hệ thống hỗ trợ giao ban và báo cáo bệnh viện, với dịch vụ backend, cổng quản trị và chatbot tích hợp qua REST API.',
      en: 'A hospital briefing and reporting system with backend services, an administrative portal, and a REST-integrated chatbot.',
    },
    highlights: [
      {
        vi: 'Phát triển dịch vụ backend cho nghiệp vụ giao ban và báo cáo bệnh viện.',
        en: 'Developed backend services for hospital briefing and reporting workflows.',
      },
      {
        vi: 'Thiết kế schema PostgreSQL và xử lý tổng hợp dữ liệu cho báo cáo quản trị.',
        en: 'Designed PostgreSQL schemas and data aggregation for administrative reporting.',
      },
      {
        vi: 'Xây dựng cổng báo cáo và tích hợp dịch vụ chatbot Rasa thông qua REST API.',
        en: 'Built an administrative reporting portal and integrated a Rasa chatbot service through REST APIs.',
      },
    ],
    technologies: ['ASP.NET Core', 'Next.js', 'PostgreSQL', 'Rasa', 'Python'],
    github: 'https://github.com/DuyNoob02/HISMeeting',
    demo: null,
    graphic: 'hospital',
  },
  {
    id: 'evolis-signature',
    number: '04',
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
