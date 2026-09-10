(function () {
  "use strict";

  /* ---- Inject icon sprite so <use href="#icon-x"> resolves ---- */
  var spriteRoot = document.getElementById("iconSpriteRoot");
  if (spriteRoot) {
    fetch("assets/icons.svg?v=3")
      .then(function (res) { return res.ok ? res.text() : ""; })
      .then(function (svg) {
        if (svg) {
          spriteRoot.innerHTML = svg;
          spriteRoot.removeAttribute("hidden");
          spriteRoot.style.position = "absolute";
          spriteRoot.style.width = "0";
          spriteRoot.style.height = "0";
          spriteRoot.style.overflow = "hidden";
        }
      })
      .catch(function () { /* icons simply won't render; rest of site still works */ });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header state ----
     Pages with a dark hero (index.html) want the header transparent until
     the visitor scrolls past it. Pages without one (services.html, legal
     pages) mark the header "header--solid" to keep it permanently dark —
     skip the dynamic toggle there so it never gets reset to transparent. */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header || header.classList.contains("header--solid")) return;
    if (window.scrollY > 12) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav drawer ---- */
  var navToggle = document.getElementById("navToggle");
  var navClose = document.getElementById("navClose");
  var navDrawer = document.getElementById("navDrawer");
  var navBackdrop = document.getElementById("navBackdrop");

  function openDrawer() {
    navDrawer.classList.add("is-open");
    navBackdrop.classList.add("is-open");
    navDrawer.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    navDrawer.classList.remove("is-open");
    navBackdrop.classList.remove("is-open");
    navDrawer.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openDrawer);
  if (navClose) navClose.addEventListener("click", closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener("click", closeDrawer);
  if (navDrawer) {
    navDrawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Floating WhatsApp button + tooltip: hidden while the hero's own
     WhatsApp CTA is on screen (avoids the buttons overlapping/competing on
     first paint), shown once the visitor scrolls past it. The tooltip can
     also be dismissed by the user, independent of scroll position. ---- */
  var waFloat = document.querySelector(".whatsapp-float");
  var waTip = document.getElementById("waTip");
  var waTipClose = document.getElementById("waTipClose");
  var waTipDismissed = false;

  if (waTipClose) {
    waTipClose.addEventListener("click", function () {
      waTipDismissed = true;
      if (waTip) waTip.classList.remove("is-shown");
    });
  }

  var heroCtas = document.querySelector(".hero-cinematic__ctas");
  if (waFloat && heroCtas && "IntersectionObserver" in window) {
    var waIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var show = !entry.isIntersecting;
          waFloat.classList.toggle("is-shown", show);
          if (waTip && !waTipDismissed) waTip.classList.toggle("is-shown", show);
        });
      },
      { threshold: 0 }
    );
    waIo.observe(heroCtas);
  } else {
    if (waFloat) waFloat.classList.add("is-shown");
    if (waTip && !waTipDismissed) waTip.classList.add("is-shown");
  }

  /* ---- Respect prefers-reduced-motion: freeze the hero video on its
     first frame instead of autoplaying/looping it. ---- */
  var heroVideo = document.querySelector(".hero-cinematic__video");
  if (heroVideo && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  /* ---- How It Works: clickable step indicator (active/completed/inactive
     states). All step content stays visible at all times — this only
     drives the indicator styling, it never hides anything, so it degrades
     to a purely static display if JS fails. ---- */
  var stepButtons = document.querySelectorAll(".steps__num");
  if (stepButtons.length) {
    var stepItems = document.querySelectorAll(".steps__item");
    var stepButtonList = Array.prototype.slice.call(stepButtons);

    var setActiveStep = function (stepNum) {
      stepButtonList.forEach(function (btn) {
        var n = parseInt(btn.getAttribute("data-step"), 10);
        btn.setAttribute("data-state", n < stepNum ? "completed" : n === stepNum ? "active" : "inactive");
      });
      stepItems.forEach(function (item) {
        var n = parseInt(item.getAttribute("data-step-item"), 10);
        item.setAttribute("data-state", n < stepNum ? "completed" : n === stepNum ? "active" : "inactive");
      });
    };

    stepButtonList.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        setActiveStep(parseInt(btn.getAttribute("data-step"), 10));
      });
      btn.addEventListener("keydown", function (e) {
        var target = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          target = stepButtonList[(idx + 1) % stepButtonList.length];
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          target = stepButtonList[(idx - 1 + stepButtonList.length) % stepButtonList.length];
        } else if (e.key === "Home") {
          target = stepButtonList[0];
        } else if (e.key === "End") {
          target = stepButtonList[stepButtonList.length - 1];
        }
        if (target) {
          e.preventDefault();
          target.focus();
          setActiveStep(parseInt(target.getAttribute("data-step"), 10));
        }
      });
    });

    setActiveStep(1);
  }

  /* ---- Services page: category quick-nav active state ---- */
  var categoryNav = document.querySelector(".category-nav");
  if (categoryNav) {
    var categoryLinks = Array.prototype.slice.call(categoryNav.querySelectorAll("a"));
    var categorySections = categoryLinks
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    var setActiveCategory = function (id) {
      categoryLinks.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
      });
    };

    if ("IntersectionObserver" in window && categorySections.length) {
      var catIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActiveCategory(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      categorySections.forEach(function (section) { catIo.observe(section); });
    }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var btn = item.querySelector(".faq__q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq__item").forEach(function (other) {
        other.classList.remove("is-open");
        var ob = other.querySelector(".faq__q");
        if (ob) ob.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
