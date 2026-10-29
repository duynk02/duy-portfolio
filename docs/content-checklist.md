# Thông tin cần chủ sở hữu xác nhận

Các dữ liệu dưới đây được để trống hoặc đánh dấu rõ để tránh công bố thông tin chưa được xác nhận. Sau khi sửa nội dung, kiểm tra cả tiếng Việt và tiếng Anh rồi chạy lại build.

| Thông tin | Trạng thái hiện tại | Cách cập nhật |
| --- | --- | --- |
| Ngày kết thúc công việc tại DH Digital Solutions | Chưa xác nhận. Công việc bắt đầu 08/2025 và đã kết thúc; không hiển thị “Hiện tại / Present”. | Điền `siteConfig.dhEndDate` trong `src/content/portfolio.ts` theo định dạng tháng/năm đã xác nhận. |
| Ảnh chân dung chính thức | Đã sử dụng ảnh `../references/Avatar.jpg`, tối ưu thành `public/images/portrait.webp`. | Xác nhận đây là ảnh muốn công bố, hoặc thay ảnh cùng đường dẫn. Cập nhật kích thước hiển thị nếu thay đổi tỷ lệ ảnh. |
| Repository Wandermap | Đã tìm thấy trong CV và kiểm tra truy cập thành công: `https://github.com/duynk02/wandermap`. Liên kết repository được hiển thị. | Xác nhận đây là repository muốn giới thiệu; cập nhật trường `github` của dự án nếu có repository thay thế. |
| Live demo Wandermap | Chưa có URL được xác minh. Liên kết demo được ẩn. | Chỉ điền trường `demo` khi bản demo thực sự truy cập được và phù hợp để công bố. |
| CV mới | CV trong `../references/` là bản cũ và không được sao chép vào website public. | Đặt bản PDF đã cập nhật vào `public/cv/`, sau đó cấu hình `siteConfig.resumePath`. Nút tải CV chỉ xuất hiện khi có file hợp lệ. |
| LinkedIn (nếu có) | Chưa được cung cấp; không tự tạo tài khoản hay liên kết. | Bổ sung URL thực và nội dung/nhãn tương ứng ở cả hai ngôn ngữ nếu muốn hiển thị. |
| Domain portfolio | Đã được cấp URL Sites thực: `https://nguyen-khac-duy-backend-portfolio.abuzztune16384.chatgpt.site`. Domain riêng chưa được cung cấp. | Nếu chuyển domain/hosting, cập nhật URL đầy đủ qua `VITE_SITE_URL` hoặc `siteConfig.siteUrl`, rồi build lại. Với GitHub Pages dưới repository, cấu hình thêm `VITE_BASE_PATH`. |

## Rà soát trước khi công bố

- Đọc lại mô tả Wandermap: đây là dự án cá nhân đang phát triển; các hạng mục đang triển khai không được viết thành tính năng đã vận hành production.
- Kiểm tra quyền truy cập các repository được liên kết. Liên kết riêng tư hoặc đã chuyển địa chỉ cần được cập nhật hoặc ẩn.
- Không đưa dữ liệu bệnh nhân, thông tin nội bộ của bệnh viện hay tài liệu triển khai nhạy cảm vào ảnh dự án hoặc nội dung case study.
- Không thêm số năm kinh nghiệm, benchmark, lượng người dùng hay chứng chỉ khi chưa có căn cứ.
