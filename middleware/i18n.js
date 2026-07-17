// Website chỉ dùng tiếng Việt. Middleware này chỉ còn nhiệm vụ nạp chuỗi giao diện
// từ locales/vi.json và cung cấp hàm t() để dùng trong view (ví dụ: t('nav.home')).
// Khách quốc tế dùng nút "Dịch trang" (Google Translate) ở header để tự dịch nội dung.
const fs = require("fs");
const path = require("path");

const LANG = "vi";
const strings = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "locales", "vi.json"), "utf-8"));

function getByPath(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function i18nMiddleware(req, res, next) {
  req.lang = LANG;
  req.t = function (keyPath) {
    const value = getByPath(strings, keyPath);
    return value !== undefined ? value : keyPath;
  };

  res.locals.lang = LANG;
  res.locals.t = req.t;
  res.locals.currentPath = req.path;
  next();
}

module.exports = { i18nMiddleware };
