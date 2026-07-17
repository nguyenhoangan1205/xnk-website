const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const store = require("../db/store");
const { requireAdmin } = require("../middleware/auth");
const { SUPPORTED_LANGS } = require("../middleware/i18n");

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "public", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || ".jpg";
      cb(null, `product-${Date.now()}-${Math.round(Math.random() * 1e5)}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    cb(null, allowed.includes(file.mimetype));
  }
});

function buildTranslationsFromBody(body) {
  const translations = {};
  SUPPORTED_LANGS.forEach((lang) => {
    translations[lang] = {
      name: (body[`name_${lang}`] || "").trim(),
      shortDesc: (body[`shortDesc_${lang}`] || "").trim(),
      description: (body[`description_${lang}`] || "").trim()
    };
  });
  return translations;
}

router.get("/login", (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect(`/admin?lang=${req.lang}`);
  res.render("admin/login", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (store.verifyAdmin(username, password)) {
    req.session.isAdmin = true;
    req.session.username = username;
    return res.redirect(`/admin?lang=${req.lang}`);
  }
  res.render("admin/login", { error: req.t("admin.invalid_credentials") });
});

router.post("/logout", (req, res) => {
  const lang = req.lang;
  req.session.destroy(() => {
    res.redirect(`/admin/login?lang=${lang}`);
  });
});

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
  res.render("admin/product-form", {
    product: null,
    categories: store.getCategories(),
    langs: SUPPORTED_LANGS,
    error: null
  });
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
    translations: buildTranslationsFromBody(body)
  };
  store.createProduct(data);
  res.redirect(`/admin?lang=${req.lang}&flash=created`);
});

router.get("/products/:id/edit", requireAdmin, (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.render("admin/product-form", {
    product,
    categories: store.getCategories(),
    langs: SUPPORTED_LANGS,
    error: null
  });
});

router.post("/products/:id/edit", requireAdmin, upload.single("image"), (req, res) => {
  const body = req.body;
  const existing = store.getProductById(req.params.id);
  if (!existing) return res.status(404).send("Product not found");
  const data = {
    categorySlug: body.categorySlug,
    priceMin: Number(body.priceMin) || 0,
    priceMax: Number(body.priceMax) || 0,
    currency: body.currency || "USD",
    unit: body.unit || "piece",
    moq: (body.moq || "").trim(),
    image: req.file ? `/uploads/${req.file.filename}` : existing.image,
    translations: buildTranslationsFromBody(body)
  };
  store.updateProduct(req.params.id, data);
  res.redirect(`/admin?lang=${req.lang}&flash=updated`);
});

router.post("/products/:id/delete", requireAdmin, (req, res) => {
  store.deleteProduct(req.params.id);
  res.redirect(`/admin?lang=${req.lang}&flash=deleted`);
});

module.exports = router;
