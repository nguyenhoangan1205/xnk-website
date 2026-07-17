// Lớp lưu trữ dữ liệu dạng file JSON (không cần cài đặt database ngoài).
// Toàn bộ sản phẩm và tài khoản quản trị được lưu trong db/data.json.
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DATA_FILE = path.join(__dirname, "data.json");
const seedProducts = require("./seedProducts");

const CATEGORIES = ["nong-san", "do-gia-dung", "go", "thiet-bi-cong-nghiep"];
const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "admin123";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nextId(items) {
  return items.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

function buildInitialData() {
  const products = seedProducts.map((p, idx) => {
    const id = idx + 1;
    const baseName = p.translations.en.name;
    return Object.assign({ id, slug: `${slugify(baseName)}-${id}`, createdAt: new Date().toISOString() }, p);
  });
  return {
    admin: {
      username: DEFAULT_ADMIN_USER,
      passwordHash: bcrypt.hashSync(DEFAULT_ADMIN_PASS, 10)
    },
    products
  };
}

function readDB() {
  if (!fs.existsSync(DATA_FILE)) {
    const initial = buildInitialData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
}

module.exports = {
  CATEGORIES,

  getCategories() {
    return CATEGORIES;
  },

  getAllProducts() {
    return readDB().products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getProductsByCategory(categorySlug) {
    return this.getAllProducts().filter((p) => p.categorySlug === categorySlug);
  },

  getProductBySlug(slug) {
    return readDB().products.find((p) => p.slug === slug);
  },

  getProductById(id) {
    return readDB().products.find((p) => p.id === Number(id));
  },

  createProduct(data) {
    const db = readDB();
    const id = nextId(db.products);
    const slug = `${slugify(data.translations.en.name || data.translations.vi.name || "san-pham")}-${id}`;
    const product = Object.assign({ id, slug, createdAt: new Date().toISOString() }, data);
    db.products.push(product);
    writeDB(db);
    return product;
  },

  updateProduct(id, data) {
    const db = readDB();
    const idx = db.products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return null;
    db.products[idx] = Object.assign({}, db.products[idx], data, { id: Number(id) });
    writeDB(db);
    return db.products[idx];
  },

  deleteProduct(id) {
    const db = readDB();
    const before = db.products.length;
    db.products = db.products.filter((p) => p.id !== Number(id));
    writeDB(db);
    return db.products.length < before;
  },

  verifyAdmin(username, password) {
    const db = readDB();
    if (db.admin.username !== username) return false;
    return bcrypt.compareSync(password, db.admin.passwordHash);
  },

  changeAdminPassword(username, newPassword) {
    const db = readDB();
    if (db.admin.username !== username) return false;
    db.admin.passwordHash = bcrypt.hashSync(newPassword, 10);
    writeDB(db);
    return true;
  }
};
