# Website Xuất Nhập Khẩu (VI / EN / ZH / JA)

Website đăng sản phẩm xuất nhập khẩu, chia theo 4 nhóm: **Nông sản**, **Đồ gia dụng**, **Gỗ**, **Thiết bị công nghiệp**. Hỗ trợ 4 ngôn ngữ: Tiếng Việt, English, 中文, 日本語. Có trang quản trị (`/admin`) để tự thêm/sửa/xóa sản phẩm, không cần biết code.

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

⚠️ **Đổi mật khẩu mặc định trước khi đưa lên internet.** Cách đổi: mở file `db/data.json` sau lần chạy đầu tiên, hoặc chạy lệnh:

```bash
node -e "require('./db/store').changeAdminPassword('admin', 'mat-khau-moi-cua-ban')"
```

## Cấu trúc dữ liệu

- Toàn bộ sản phẩm và tài khoản quản trị lưu trong `db/data.json` (tự động tạo khi chạy lần đầu, kèm 8 sản phẩm mẫu).
- Ảnh sản phẩm tải lên qua `/admin` được lưu trong `public/uploads/`.
- Không cần cài đặt database ngoài (MySQL/Postgres...) — phù hợp để chạy nhanh, dữ liệu vừa và nhỏ.
- Nếu lượng sản phẩm lớn hoặc nhiều người chỉnh sửa cùng lúc, nên nâng cấp sang database thật (ví dụ SQLite/Postgres) khi triển khai chính thức.

## Thêm/sửa sản phẩm

1. Đăng nhập `/admin`.
2. Bấm **+ Thêm sản phẩm**.
3. Chọn danh mục, nhập giá, đơn vị, số lượng đặt tối thiểu (MOQ), tải ảnh.
4. Điền tên + mô tả cho từng ngôn ngữ (tab VI / EN / ZH / JA ở dưới form). Ít nhất nên điền đủ VI và EN.
5. Bấm **Lưu**.

Danh mục sản phẩm là cố định (4 nhóm nêu trên) — không thêm/xóa danh mục qua giao diện. Nếu cần đổi tên hiển thị hoặc thêm danh mục mới, sửa trong 4 file `locales/*.json` (mục `categories` và `category_desc`) và mảng `CATEGORIES` trong `db/store.js`.

## Đổi ngôn ngữ hiển thị

Người dùng chọn ngôn ngữ ở góc phải header (VI / EN / ZH / JA). Toàn bộ giao diện, tên và mô tả sản phẩm sẽ đổi theo. Chuỗi giao diện (nút, nhãn...) nằm trong `locales/vi.json`, `en.json`, `zh.json`, `ja.json` — sửa trực tiếp các file này để chỉnh câu chữ.

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
  server.js              # điểm khởi chạy
  db/
    store.js              # đọc/ghi dữ liệu (JSON file)
    seedProducts.js        # 8 sản phẩm mẫu ban đầu
    data.json               # dữ liệu thật (tự tạo khi chạy lần đầu)
  routes/
    public.js              # route trang công khai
    admin.js                # route trang quản trị + upload ảnh
  middleware/
    i18n.js                 # xử lý đa ngôn ngữ
    auth.js                  # bảo vệ trang quản trị
  views/                    # giao diện EJS (trang chủ, danh mục, chi tiết SP, admin)
  locales/                  # bản dịch giao diện: vi.json / en.json / zh.json / ja.json
  public/
    css/style.css
    js/admin-form.js
    uploads/                # ảnh sản phẩm tải lên
```
