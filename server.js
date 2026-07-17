const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { i18nMiddleware } = require("./middleware/i18n");
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "xnk-website-dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 }
  })
);

app.use(i18nMiddleware);

app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).send("404 - Không tìm thấy trang / Page not found");
});

app.listen(PORT, () => {
  console.log(`Website xuất nhập khẩu đang chạy tại http://localhost:${PORT}`);
  console.log(`Trang quản trị: http://localhost:${PORT}/admin/login (tài khoản mặc định: admin / admin123)`);
});
