// Home page behaviour: active-tab highlighting, theme toggle, publication drawers, news fade.
(function () {
  "use strict";

  // ---- Active tab follows scroll position ----
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var sections = tabs
    .map(function (t) {
      return document.querySelector(t.getAttribute("href"));
    })
    .filter(Boolean);

  function setActive(id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("href") === "#" + id;
      t.classList.toggle("active", on);
      if (on) t.setAttribute("aria-current", "true");
      else t.removeAttribute("aria-current");
    });
  }

  function onScroll() {
    var navH = document.querySelector(".topbar").offsetHeight;
    var y = window.scrollY + navH + window.innerHeight * 0.25;
    var current = sections[0] && sections[0].id;
    sections.forEach(function (s) {
      if (s.offsetTop <= y) current = s.id;
    });
    // At the very bottom, the last section is active even if it is short.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll);
  onScroll();

  // ---- Theme toggle ----
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // ---- Abstract / BibTeX drawers ----
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-toggle]");
    if (!btn) return;
    var pub = btn.closest(".pub");
    pub.querySelectorAll("[data-toggle]").forEach(function (b) {
      var drawer = pub.querySelector('[data-drawer="' + b.getAttribute("data-toggle") + '"]');
      var open = b === btn ? b.getAttribute("aria-expanded") !== "true" : false;
      b.setAttribute("aria-expanded", open ? "true" : "false");
      if (drawer) drawer.hidden = !open;
    });
  });

  // ---- Email links: assemble the address only on click (keeps it out of the HTML for scrapers) ----
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".js-email");
    if (!a) return;
    var rev = function (s) {
      return (s || "").split("").reverse().join("");
    };
    var u = rev(a.getAttribute("data-u"));
    var d = rev(a.getAttribute("data-d"));
    if (!u || !d) return;
    e.preventDefault();
    window.location.href = "mailto:" + u + "@" + d;
  });

  // ---- Respect reduced-motion: keep publication clips paused on their poster ----
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video.pub-media").forEach(function (v) {
      v.removeAttribute("autoplay");
      v.pause();
    });
  }

  // ---- News box: drop the bottom fade once scrolled to the end ----
  var news = document.querySelector(".news-scroll");
  if (news) {
    var updateFade = function () {
      news.classList.toggle("at-end", news.scrollTop + news.clientHeight >= news.scrollHeight - 4);
    };
    news.addEventListener("scroll", updateFade, { passive: true });
    updateFade();
  }
})();
