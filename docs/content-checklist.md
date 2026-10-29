# Trạng thái nội dung và thông tin cần bổ sung

CV đính kèm đã được chủ sở hữu xác nhận là bản cập nhật, được ưu tiên so với prompt ban đầu. Bảng dưới đây ghi rõ dữ liệu đã xác nhận và các mục còn có thể bổ sung. Sau khi sửa nội dung, kiểm tra cả tiếng Việt và tiếng Anh rồi chạy lại build.

| Thông tin | Trạng thái hiện tại | Cách cập nhật |
| --- | --- | --- |
| Ngày kết thúc công việc tại DH Digital Solutions | Đã xác nhận **08/2026** theo CV cập nhật; `siteConfig.dhEndDate` đã được điền. | Chỉ sửa khi có thay đổi thông tin thực tế; không hiển thị “Hiện tại / Present” cho công việc đã kết thúc. |
| Ảnh chân dung chính thức | Đã sử dụng ảnh `../references/Avatar.jpg`, tối ưu thành `public/images/portrait.webp`; nền trắng, giữ màu ảnh tự nhiên theo yêu cầu. | Khi thay ảnh, dùng cùng đường dẫn hoặc cập nhật `siteConfig.portraitPath`. Cập nhật kích thước hiển thị nếu thay đổi tỷ lệ ảnh. |
| Repository Wandermap | Đã tìm thấy trong CV và kiểm tra truy cập thành công: `https://github.com/duynk02/wandermap`. Liên kết repository được hiển thị. | Xác nhận đây là repository muốn giới thiệu; cập nhật trường `github` của dự án nếu có repository thay thế. |
| Live demo Wandermap | Chưa có URL được xác minh. Liên kết demo được ẩn. | Chỉ điền trường `demo` khi bản demo thực sự truy cập được và phù hợp để công bố. |
| CV hiện tại | Đã xác nhận bản `../references/CV_BackendDeveloper_NguyenKhacDuy.pdf` là CV cập nhật. Nút tải CV dùng bản sao tại `public/cv/CV_BackendDeveloper_NguyenKhacDuy.pdf`. | Khi cập nhật tiếp, thay PDF cùng đường dẫn hoặc sửa `siteConfig.resumePath`, rồi build lại. Nút tải CV chỉ xuất hiện khi có file hợp lệ. |
| LinkedIn (nếu có) | Chưa được cung cấp; không tự tạo tài khoản hay liên kết. | Bổ sung URL thực và nội dung/nhãn tương ứng ở cả hai ngôn ngữ nếu muốn hiển thị. |
| Domain portfolio | Đã được cấp URL Sites thực: `https://nguyen-khac-duy-backend-portfolio.abuzztune16384.chatgpt.site`. Domain riêng chưa được cung cấp. | Nếu chuyển domain/hosting, cập nhật URL đầy đủ qua `VITE_SITE_URL` hoặc `siteConfig.siteUrl`, rồi build lại. Với GitHub Pages dưới repository, cấu hình thêm `VITE_BASE_PATH`. |

## Rà soát trước khi công bố

- Mô tả Wandermap đã đối chiếu các chức năng được triển khai theo CV mới. Đây vẫn là dự án cá nhân đang phát triển; không suy ra đã vận hành production hoặc có người dùng thực từ các chức năng đã xây dựng.
- Kiểm tra quyền truy cập các repository được liên kết. Liên kết riêng tư hoặc đã chuyển địa chỉ cần được cập nhật hoặc ẩn.
- Không đưa dữ liệu bệnh nhân, thông tin nội bộ của bệnh viện hay tài liệu triển khai nhạy cảm vào ảnh dự án hoặc nội dung case study.
- Không thêm số năm kinh nghiệm, benchmark, lượng người dùng hay chứng chỉ khi chưa có căn cứ.
