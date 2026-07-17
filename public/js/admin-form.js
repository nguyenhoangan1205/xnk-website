document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".lang-tab-btn");
  var panels = document.querySelectorAll(".lang-panel");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tab = btn.getAttribute("data-tab");
      buttons.forEach(function (b) { b.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      var panel = document.querySelector('.lang-panel[data-panel="' + tab + '"]');
      if (panel) panel.classList.add("active");
    });
  });
});
