# duy-portfolio

Portfolio cá nhân của **Nguyen Khac Duy — Backend Engineer**, lấy cảm hứng từ `../references/Home.png`: nền vàng pastel, typography navy và bố cục thoáng. Website gồm giới thiệu, timeline nghề nghiệp theo tiến trình cuộn, kỹ năng, bốn dự án, học vấn/chứng chỉ và liên hệ.

Nội dung có đầy đủ tiếng Việt và tiếng Anh. Lần truy cập đầu dùng tiếng Việt; lựa chọn ngôn ngữ được lưu ở trình duyệt. Website chạy hoàn toàn phía client, build ra static files và không cần backend, database hoặc Node.js runtime trên hosting.

## Phát triển tại máy

Yêu cầu Node.js 22.12 trở lên và npm. Mở terminal tại thư mục `duy-portfolio`:

```sh
npm install
npm run dev
```

Mở URL Local do Vite in trong terminal. Các lệnh kiểm tra và build:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run build` tạo thư mục `dist/`. `npm run preview` phục vụ bản build để kiểm tra tại máy, không phải máy chủ production.

## Công nghệ và tổ chức mã nguồn

React, Vite, TypeScript strict mode, Tailwind CSS, Motion for React và Lucide React. Font Be Vietnam Pro được phục vụ từ bundle của dự án qua `@fontsource/be-vietnam-pro`, gồm Latin và tiếng Việt ở các độ đậm 400/500/600/700/800. Người dùng không cần tải font từ Google Fonts.

- `src/content/portfolio.ts`: dữ liệu cá nhân, timeline, kỹ năng, dự án và cấu hình liên kết.
- `src/i18n/`: nội dung giao diện và provider chuyển ngôn ngữ.
- `src/components/`: các thành phần giao diện và timeline.
- `src/styles/`: design tokens và responsive styling.
- `public/`: ảnh chân dung đã tối ưu, favicon và tài nguyên public.
- `docs/content-checklist.md`: trạng thái nội dung đã xác nhận và các thông tin còn có thể bổ sung.

CV `../references/CV_BackendDeveloper_NguyenKhacDuy.pdf` đã được chủ sở hữu xác nhận là bản cập nhật và được ưu tiên khi khác với prompt ban đầu. Thư mục `references/` không được đưa vào `dist/`; bản CV dùng để tải xuống được sao chép riêng vào `public/cv/CV_BackendDeveloper_NguyenKhacDuy.pdf`.

## Cập nhật nội dung

Sửa các trường `vi` và `en` trong `src/content/portfolio.ts` để giữ hai ngôn ngữ đồng bộ. Không cần tạo hai bộ component. Tên công nghệ và tên dự án được giữ nguyên khi phù hợp.

Các cấu hình cần chú ý:

| Trường | Giá trị hiện tại | Ý nghĩa |
| --- | --- | --- |
| `siteConfig.dhEndDate` | `08/2026` | Ngày kết thúc công việc DH theo CV đã cập nhật. |
| `siteConfig.resumePath` | `cv/CV_BackendDeveloper_NguyenKhacDuy.pdf` | PDF hiện tại trong `public/`, được cung cấp qua nút tải CV. Chỉ bật nút khi file hợp lệ tồn tại. |
| `siteConfig.siteUrl` | URL Sites đã cấp | URL triển khai thật, dùng cho SEO. Có thể ghi đè qua `VITE_SITE_URL` khi chuyển hosting hoặc dùng domain riêng. |
| `siteConfig.portraitPath` | `images/portrait.webp` | Ảnh tối ưu từ `../references/Avatar.jpg`, hiển thị trên nền trắng và giữ màu ảnh tự nhiên. |
| `projects[].github`, `projects[].demo` | URL thật hoặc `null` | Repository Wandermap đã xác minh từ CV: `https://github.com/duynk02/wandermap`. Demo chưa được xác nhận nên được ẩn. |

Không đưa API key hoặc secret vào mã frontend hay biến môi trường có tiền tố `VITE_`; những giá trị đó có thể được xem trong bundle công khai.

Khi thay CV, ghi đè PDF trong `public/cv/` cùng đường dẫn hoặc cập nhật `siteConfig.resumePath`, rồi build lại. Nội dung Wandermap phản ánh các chức năng đã triển khai trong CV; toàn bộ dự án vẫn đang được phát triển và chưa có demo production được xác nhận.

## Domain, SEO và đường dẫn con

Website có metadata tiếng Việt mặc định; khi chuyển ngôn ngữ, title, description và thuộc tính `lang` được cập nhật. Favicon, Open Graph graphic và `robots.txt` nằm trong `public/`.

Canonical, OG URL và sitemap sử dụng URL triển khai thật. Site đã được cấp URL `https://nguyen-khac-duy-backend-portfolio.abuzztune16384.chatgpt.site`; khi chuyển hosting hoặc dùng domain riêng, cập nhật `siteConfig.siteUrl` hoặc tạo `.env.local` với `VITE_SITE_URL` bằng URL đầy đủ của website. Không cần đặt biến môi trường này để chạy local.

`VITE_BASE_PATH` mặc định là `/`. Khi deploy GitHub Pages dưới repository, đặt giá trị thành `/<ten-repository>/`. Nếu cấu hình `VITE_SITE_URL` cho trường hợp này, URL phải bao gồm cả đường dẫn repository. Build lại sau mỗi thay đổi cấu hình SEO hoặc base path.

Ví dụ PowerShell khi đã biết tên repository thực:

```powershell
$env:VITE_BASE_PATH = '/<ten-repository>/'
npm run build
```

Thay `<ten-repository>` bằng tên thật trước khi chạy. Không cần SPA rewrite vì website chỉ dùng anchor trong một trang và không có client-side route.

## Deploy static

### Cloudflare Pages

Kết nối repository với Cloudflare Pages. Chọn root directory là thư mục chứa `package.json` (`duy-portfolio` nếu repository có cấu trúc như workspace hiện tại), build command `npm run build`, output directory `dist`. Dùng Node.js 22.12 trở lên. Cấu hình `VITE_SITE_URL` khi đã biết domain. Với domain ở root, giữ `VITE_BASE_PATH=/`.

### Vercel Static

Import repository, chọn thư mục chứa `package.json` làm Root Directory và framework preset Vite. Build command `npm run build`, output directory `dist`, install command `npm install`. Cấu hình `VITE_SITE_URL` bằng URL thật nếu cần canonical/sitemap, sau đó redeploy.

### GitHub Pages

Build với `VITE_BASE_PATH=/<ten-repository>/` nếu website chạy dưới repository subpath. Với repository dành cho domain gốc hoặc custom domain ở root, dùng `/`. Đặt `VITE_SITE_URL` bằng URL hoàn chỉnh tương ứng. Có thể dùng GitHub Actions với quy trình: checkout, setup Node, `npm ci`, `npm run build`, upload artifact `dist` bằng `actions/upload-pages-artifact`, rồi deploy bằng `actions/deploy-pages`. Chọn nguồn Pages là GitHub Actions trong Settings của repository.

Không upload `node_modules` hoặc thư mục `references` lên static host. Artifact cần phục vụ chỉ là nội dung của `dist/`, bao gồm bản CV hiện tại đã được cấu hình để tải xuống.

## Kiểm tra trước khi phát hành

Chạy lint, typecheck và production build; kiểm tra bản preview ở các chiều rộng 375, 430, 768, 1024 và 1440 px. Kiểm tra chuyển ngôn ngữ và lưu lựa chọn sau reload; menu mobile; điều hướng bàn phím; timeline khi cuộn xuống/lên; chế độ giảm chuyển động; các liên kết email/GitHub và console trình duyệt.

Kiểm tra tự động bằng Playwright trên Chrome/Chromium đã cài tại máy:

```sh
npm run build
npm run test:browser
```

Script tự mở và dừng Vite preview ở `127.0.0.1:4173`. Mặc định dùng Chrome tại `C:/Program Files/Google/Chrome/Application/chrome.exe`; không tải thêm browser. Nếu Chrome/Chromium nằm ở nơi khác, cấu hình đường dẫn executable qua `CHROME_PATH` trước khi chạy. Ví dụ PowerShell:

```powershell
$env:CHROME_PATH = 'D:\Apps\Chromium\chrome.exe'
npm run test:browser
```

Bộ kiểm tra xác nhận responsive, chuyển/lưu ngôn ngữ, menu mobile, skip link bằng bàn phím, chi tiết bốn dự án, tiến trình timeline khi cuộn hai chiều, chế độ giảm chuyển động và lỗi trình duyệt/tài nguyên. Ảnh kiểm tra được lưu trong `.qa/desktop.png`, `.qa/mobile.png` và `.qa/full-page.png`; đây là tài liệu QA local, không thuộc nội dung public.

Trạng thái nội dung và các dữ liệu còn có thể bổ sung được ghi tại [docs/content-checklist.md](docs/content-checklist.md). Liên kết demo chưa được xác nhận được ẩn để tránh nút dẫn đến trang không tồn tại.
