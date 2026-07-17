const express = require("express");
const router = express.Router();
const store = require("../db/store");

router.get("/", (req, res) => {
  const categories = store.getCategories();
  const allProducts = store.getAllProducts();
  const featured = allProducts.slice(0, 4);
  const latestNews = store.getAllNews().slice(0, 3);
  res.render("index", { categories, featured, latestNews });
});

router.get("/products/:category", (req, res) => {
  const { category } = req.params;
  if (!store.getCategories().includes(category)) {
    return res.status(404).send("Không tìm thấy danh mục");
  }
  const products = store.getProductsByCategory(category);
  res.render("category", { categorySlug: category, products, categories: store.getCategories() });
});

router.get("/product/:slug", (req, res) => {
  const product = store.getProductBySlug(req.params.slug);
  if (!product) return res.status(404).send("Không tìm thấy sản phẩm");
  const related = store
    .getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
  res.render("product", { product, related, categories: store.getCategories() });
});

router.get("/news", (req, res) => {
  const news = store.getAllNews();
  res.render("news-list", { news, categories: store.getCategories() });
});

router.get("/news/:slug", (req, res) => {
  const article = store.getNewsBySlug(req.params.slug);
  if (!article) return res.status(404).send("Không tìm thấy tin tức");
  const related = store
    .getAllNews()
    .filter((n) => n.id !== article.id)
    .slice(0, 3);
  res.render("news-detail", { article, related, categories: store.getCategories() });
});

module.exports = router;
