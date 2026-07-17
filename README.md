# Website Xuất Nhập Khẩu

Website đăng sản phẩm xuất nhập khẩu (tiếng Việt), chia theo 4 nhóm: **Nông sản**, **Đồ gia dụng**, **Gỗ**, **Thiết bị công nghiệp**, kèm mục **Tin tức xuất nhập khẩu**. Có trang quản trị (`/admin`) để tự thêm/sửa/xóa sản phẩm và tin tức, không cần biết code. Khách quốc tế có thể tự dịch trang sang ngôn ngữ khác bằng nút dịch ở góc phải header (dùng Google Translate).

## Chạy thử trên máy tính

Cần cài [Node.js](https://nodejs.org) bản 18 trở lên.

```bash
cd xnk-website
npm install
npm start
```

Mở trình duyệt tại **http://localhost:3000**.

Trang quản trị: **http://localhost:3000/admin/login**
- Tài khoản mặc định: `admin`
- Mật khẩu mặc định: `admin123`

⚠️ **Đổi mật khẩu mặc định trước khi đưa lên internet.** Chạy lệnh sau (thay `mat-khau-moi-cua-ban`):

```bash
node -e "require('./db/store').changeAdminPassword('admin', 'mat-khau-moi-cua-ban')"
```

## Cấu trúc dữ liệu

- Toàn bộ sản phẩm, tin tức và tài khoản quản trị lưu trong `db/data.json` (tự động tạo khi chạy lần đầu, kèm 8 sản phẩm mẫu và 10 tin tức mẫu).
- Ảnh tải lên qua `/admin` được lưu trong `public/uploads/`.
- Không cần cài đặt database ngoài (MySQL/Postgres...) — phù hợp để chạy nhanh, dữ liệu vừa và nhỏ.
- Nếu lượng sản phẩm/tin tức lớn hoặc nhiều người chỉnh sửa cùng lúc, nên nâng cấp sang database thật khi triển khai chính thức.

## Thêm/sửa sản phẩm và tin tức

1. Đăng nhập `/admin`.
2. Trang quản trị có 2 mục: **Quản lý sản phẩm** và **Quản lý tin tức** (chuyển qua lại bằng thanh tab phía trên).
3. Bấm **+ Thêm sản phẩm** / **+ Thêm tin tức**, điền thông tin (tiếng Việt), tải ảnh nếu có, bấm **Lưu**.

Danh mục sản phẩm là cố định (4 nhóm nêu trên) — không thêm/xóa danh mục qua giao diện. Nếu cần đổi tên hiển thị hoặc thêm danh mục mới, sửa trong `locales/vi.json` (mục `categories` và `category_desc`) và mảng `CATEGORIES` trong `db/store.js`.

## Dịch trang sang ngôn ngữ khác

Website chỉ soạn nội dung bằng tiếng Việt. Khách nước ngoài bấm nút **EN / ZH / JA / KO** ở góc phải header để trình duyệt tự dịch toàn bộ trang bằng Google Translate (miễn phí, không cần cấu hình gì thêm). Bấm **VI** để quay lại bản gốc.

Lưu ý: đây là dịch máy tự động ngay trên trình duyệt, chất lượng tương đương Google Translate thông thường — không sửa được câu chữ bản dịch. Nếu sau này cần chất lượng dịch tốt hơn (ví dụ DeepL) hoặc muốn nội dung dịch sẵn có trong mã nguồn để tốt cho SEO, đó là một hướng nâng cấp riêng, tốn thêm chi phí dịch vụ dịch thuật.

## Đưa lên internet (deploy)

Đây là ứng dụng Node.js/Express thông thường, có thể triển khai trên bất kỳ nền tảng hỗ trợ Node: Render, Railway, một VPS (dùng PM2 để giữ tiến trình chạy), v.v.

Các bước chung:
1. Đẩy code lên server / kết nối repo với nền tảng deploy.
2. Cài đặt: `npm install`.
3. Đặt biến môi trường `SESSION_SECRET` (một chuỗi bí mật ngẫu nhiên) và `PORT` nếu nền tảng yêu cầu.
4. Khởi chạy: `npm start`.
5. Đảm bảo thư mục `db/` và `public/uploads/` được ghi được (persistent storage) để dữ liệu và ảnh không mất khi server khởi động lại.

## Cấu trúc thư mục

```
xnk-website/
  server.js                 # điểm khởi chạy
  db/
    store.js                 # đọc/ghi dữ liệu (JSON file), CRUD sản phẩm + tin tức
    seedProducts.js           # 8 sản phẩm mẫu ban đầu
    seedNews.js                # 10 tin tức mẫu ban đầu
    data.json                   # dữ liệu thật (tự tạo khi chạy lần đầu)
  routes/
    public.js                 # route trang công khai (trang chủ, danh mục, sản phẩm, tin tức)
    admin.js                   # route trang quản trị + upload ảnh
  middleware/
    i18n.js                    # nạp chuỗi giao diện tiếng Việt (locales/vi.json)
    auth.js                     # bảo vệ trang quản trị
  views/                        # giao diện EJS (trang chủ, danh mục, chi tiết SP, tin tức, admin)
  locales/
    vi.json                      # toàn bộ chuỗi giao diện tiếng Việt
  public/
    css/style.css
    js/translate.js             # điều khiển nút dịch Google Translate
    uploads/                     # ảnh sản phẩm / tin tức tải lên
```
