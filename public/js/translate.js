// Điều khiển Google Translate Website Widget bằng nút bấm tự thiết kế (VI / EN / ZH / JA / KO),
// thay vì dùng giao diện mặc định xấu của Google. Widget dịch nội dung trang ngay trên trình
// duyệt của khách, không cần server xử lý, không tốn phí.

function xnkSetLanguage(langCode) {
  if (langCode === "vi") {
    // Quay về tiếng Việt gốc: xóa cookie googtrans rồi tải lại trang.
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname + ";";
    localStorage.setItem("xnkLang", "vi");
    location.reload();
    return;
  }

  var combo = document.querySelector(".goog-te-combo");
  if (!combo) {
    // Widget Google Translate có thể chưa load xong (mạng chậm) — thử lại sau 400ms.
    setTimeout(function () {
      xnkSetLanguage(langCode);
    }, 400);
    return;
  }
  localStorage.setItem("xnkLang", langCode);
  combo.value = langCode;
  combo.dispatchEvent(new Event("change"));
}

document.addEventListener("DOMContentLoaded", function () {
  var wrap = document.getElementById("translateSwitch");
  if (!wrap) return;
  var buttons = wrap.querySelectorAll("button");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      xnkSetLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Nếu trang trước đó khách đã chọn ngôn ngữ khác, tự động dịch lại khi chuyển trang.
  var saved = localStorage.getItem("xnkLang");
  if (saved && saved !== "vi") {
    buttons.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === saved);
    });
    xnkSetLanguage(saved);
  }
});
