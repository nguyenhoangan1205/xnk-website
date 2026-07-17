// Middleware đa ngôn ngữ: xác định ngôn ngữ hiện tại và cung cấp hàm t() để dịch chuỗi trong view.
const fs = require("fs");
const path = require("path");

const SUPPORTED_LANGS = ["vi", "en", "zh", "ja"];
const DEFAULT_LANG = "vi";

const locales = {};
SUPPORTED_LANGS.forEach((lang) => {
  const file = path.join(__dirname, "..", "locales", `${lang}.json`);
  locales[lang] = JSON.parse(fs.readFileSync(file, "utf-8"));
});

function getByPath(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function i18nMiddleware(req, res, next) {
  let lang = req.query.lang || req.cookies_lang;
  if (!lang && req.cookies && req.cookies.lang) lang = req.cookies.lang;
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;

  if (req.query.lang && SUPPORTED_LANGS.includes(req.query.lang)) {
    res.cookie && res.cookie("lang", lang, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  }

  req.lang = lang;
  req.t = function (keyPath) {
    const value = getByPath(locales[lang], keyPath);
    if (value !== undefined) return value;
    const fallback = getByPath(locales[DEFAULT_LANG], keyPath);
    return fallback !== undefined ? fallback : keyPath;
  };

  res.locals.lang = lang;
  res.locals.t = req.t;
  res.locals.supportedLangs = SUPPORTED_LANGS.map((l) => ({ code: l, name: locales[l].lang_name }));
  res.locals.currentPath = req.path;
  next();
}

module.exports = { i18nMiddleware, SUPPORTED_LANGS, DEFAULT_LANG, locales };
