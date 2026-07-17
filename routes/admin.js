const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const store = require("../db/store");
const { requireAdmin } = require("../middleware/auth");

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "public", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || ".jpg";
      cb(null, `upload-${Date.now()}-${Math.round(Math.random() * 1e5)}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    cb(null, allowed.includes(file.mimetype));
  }
});

// ---- Đăng nhập / đăng xuất ----

router.get("/login", (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect("/admin");
  res.render("admin/login", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (store.verifyAdmin(username, password)) {
    req.session.isAdmin = true;
    req.session.username = username;
    return res.redirect("/admin");
  }
  res.render("admin/login", { error: req.t("admin.invalid_credentials") });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});

// ---- Bảng quản trị (sản phẩm) ----

router.get("/", requireAdmin, (req, res) => {
  const products = store.getAllProducts();
  res.render("admin/dashboard", {
    products,
    categories: store.getCategories(),
    flash: req.query.flash || null,
    username: req.session.username
  });
});

router.get("/products/new", requireAdmin, (req, res) => {
  res.render("admin/product-form", { product: null, categories: store.getCategories(), error: null });
});

router.post("/products/new", requireAdmin, upload.single("image"), (req, res) => {
  const body = req.body;
  const data = {
    categorySlug: body.categorySlug,
    priceMin: Number(body.priceMin) || 0,
    priceMax: Number(body.priceMax) || 0,
    currency: body.currency || "USD",
    unit: body.unit || "piece",
    moq: (body.moq || "").trim(),
    image: req.file ? `/uploads/${req.file.filename}` : null,
    name: (body.name || "").trim(),
    shortDesc: (body.shortDesc || "").trim(),
    description: (body.description || "").trim()
  };
  store.createProduct(data);
  res.redirect("/admin?flash=created");
});

router.get("/products/:id/edit", requireAdmin, (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).send("Không tìm thấy sản phẩm");
  res.render("admin/product-form", { product, categories: store.getCategories(), error: null });
});

router.post("/products/:id/edit", requireAdmin, upload.single("image"), (req, res) => {
  const body = req.body;
  const existing = store.getProductById(req.params.id);
  if (!existing) return res.status(404).send("Không tìm thấy sản phẩm");
  const data = {
    categorySlug: body.categorySlug,
    priceMin: Number(body.priceMin) || 0,
    priceMax: Number(body.priceMax) || 0,
    currency: body.currency || "USD",
    unit: body.unit || "piece",
    moq: (body.moq || "").trim(),
    image: req.file ? `/uploads/${req.file.filename}` : existing.image,
    name: (body.name || "").trim(),
    shortDesc: (body.shortDesc || "").trim(),
    description: (body.description || "").trim()
  };
  store.updateProduct(req.params.id, data);
  res.redirect("/admin?flash=updated");
});

router.post("/products/:id/delete", requireAdmin, (req, res) => {
  store.deleteProduct(req.params.id);
  res.redirect("/admin?flash=deleted");
});

// ---- Quản trị tin tức ----

router.get("/news", requireAdmin, (req, res) => {
  const news = store.getAllNews();
  res.render("admin/news-dashboard", { news, flash: req.query.flash || null, username: req.session.username });
});

router.get("/news/new", requireAdmin, (req, res) => {
  res.render("admin/news-form", { article: null, error: null });
});

router.post("/news/new", requireAdmin, upload.single("image"), (req, res) => {
  const body = req.body;
  const data = {
    publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
    image: req.file ? `/uploads/${req.file.filename}` : null,
    title: (body.title || "").trim(),
    summary: (body.summary || "").trim(),
    content: (body.content || "").trim()
  };
  store.createNews(data);
  res.redirect("/admin/news?flash=created");
});

router.get("/news/:id/edit", requireAdmin, (req, res) => {
  const article = store.getNewsById(req.params.id);
  if (!article) return res.status(404).send("Không tìm thấy tin tức");
  res.render("admin/news-form", { article, error: null });
});

router.post("/news/:id/edit", requireAdmin, upload.single("image"), (req, res) => {
  const body = req.body;
  const existing = store.getNewsById(req.params.id);
  if (!existing) return res.status(404).send("Không tìm thấy tin tức");
  const data = {
    publishedAt: body.publishedAt || existing.publishedAt,
    image: req.file ? `/uploads/${req.file.filename}` : existing.image,
    title: (body.title || "").trim(),
    summary: (body.summary || "").trim(),
    content: (body.content || "").trim()
  };
  store.updateNews(req.params.id, data);
  res.redirect("/admin/news?flash=updated");
});

router.post("/news/:id/delete", requireAdmin, (req, res) => {
  store.deleteNews(req.params.id);
  res.redirect("/admin/news?flash=deleted");
});

module.exports = router;
