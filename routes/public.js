const express = require("express");
const router = express.Router();
const store = require("../db/store");

router.get("/", (req, res) => {
  const categories = store.getCategories();
  const allProducts = store.getAllProducts();
  const featured = allProducts.slice(0, 4);
  res.render("index", { categories, featured });
});

router.get("/products/:category", (req, res) => {
  const { category } = req.params;
  if (!store.getCategories().includes(category)) {
    return res.status(404).send("Category not found");
  }
  const products = store.getProductsByCategory(category);
  res.render("category", { categorySlug: category, products, categories: store.getCategories() });
});

router.get("/product/:slug", (req, res) => {
  const product = store.getProductBySlug(req.params.slug);
  if (!product) return res.status(404).send("Product not found");
  const related = store
    .getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
  res.render("product", { product, related, categories: store.getCategories() });
});

module.exports = router;
