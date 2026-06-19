/* ورد الشوق — Flowers Longing · main.js (vanilla, guarded) */
(function () {
  "use strict";

  var WA = "966561112769";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Full-screen mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var mmClose = document.getElementById("mmClose");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (mmClose) mmClose.focus();
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", openMenu);
  if (mmClose) mmClose.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("[data-mm]").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); closeLightbox(); }
  });

  /* ---------- Drifting petals ---------- */
  var petalsWrap = document.getElementById("petals");
  if (petalsWrap && !reduce) {
    var count = window.innerWidth < 600 ? 8 : 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      var size = 10 + Math.random() * 14;
      p.style.left = Math.random() * 100 + "%";
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.animationDuration = (9 + Math.random() * 9) + "s";
      p.style.animationDelay = (Math.random() * 8) + "s";
      p.style.opacity = (0.45 + Math.random() * 0.45).toFixed(2);
      petalsWrap.appendChild(p);
    }
  }

  /* ---------- Scroll reveal (IntersectionObserver + fallback) ---------- */
  var revealEls = document.querySelectorAll(".reveal, .bloom");
  function showAll() { revealEls.forEach(function (el) { el.classList.add("in"); }); }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var groups = {};
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var parent = el.parentElement;
          var sibs = parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
          el.style.transitionDelay = (Math.min(sibs, 6) * 40) + "ms";
          el.classList.add("in");
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    /* Safety fallback: if anything is still hidden after 1.6s, reveal it */
    setTimeout(showAll, 1600);
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lastFocused = null;

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lastFocused = document.activeElement;
    lbImg.src = src; lbImg.alt = alt || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    if (lbClose) lbClose.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  document.querySelectorAll(".gallery-grid figure").forEach(function (fig) {
    var img = fig.querySelector("img");
    if (!img) return;
    function trigger() { openLightbox(img.getAttribute("src"), img.getAttribute("alt")); }
    fig.addEventListener("click", trigger);
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger(); }
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Order form → wa.me + localStorage + toast ---------- */
  var form = document.getElementById("orderForm");
  var toast = document.getElementById("toast");

  function setInvalid(id, bad) {
    var field = document.getElementById(id);
    if (!field) return;
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.toggle("invalid", !!bad);
  }

  function showToast() {
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 4000);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name");
      var phone = document.getElementById("phone");
      var type = document.getElementById("type");
      var date = document.getElementById("date");
      var notes = document.getElementById("notes");

      var ok = true;
      var firstBad = null;
      if (!name.value.trim()) { setInvalid("name", true); ok = false; firstBad = firstBad || name; }
      else setInvalid("name", false);

      var phoneDigits = (phone.value || "").replace(/\D/g, "");
      if (phoneDigits.length < 9 || phoneDigits.length > 12) { setInvalid("phone", true); ok = false; firstBad = firstBad || phone; }
      else setInvalid("phone", false);

      if (!type.value) { setInvalid("type", true); ok = false; firstBad = firstBad || type; }
      else setInvalid("type", false);

      if (!ok) { if (firstBad) firstBad.focus(); return; }

      var order = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        type: type.value,
        date: date.value || "",
        notes: notes.value.trim(),
        ts: new Date().toISOString()
      };

      /* localStorage demo persistence */
      try {
        var store = JSON.parse(localStorage.getItem("ward_alshouq_orders") || "[]");
        store.push(order);
        localStorage.setItem("ward_alshouq_orders", JSON.stringify(store));
      } catch (err) { /* storage unavailable — ignore */ }

      /* Build WhatsApp message */
      var lines = [
        "السلام عليكم، أرغب بطلب من ورد الشوق:",
        "الاسم: " + order.name,
        "الجوال: " + order.phone,
        "نوع الطلب: " + order.type
      ];
      if (order.date) lines.push("تاريخ التسليم: " + order.date);
      if (order.notes) lines.push("ملاحظات: " + order.notes);
      var msg = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WA + "?text=" + msg;

      showToast();
      setTimeout(function () { window.open(url, "_blank", "noopener"); }, 700);
      form.reset();
    });
  }

  /* ---------- Footer year safety (already 2026 static, keep dynamic if needed) ---------- */
})();
