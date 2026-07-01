/* =========================================================================
   Colin Philippe — V1 · rendu depuis window.SITE + navigation ZÉRO-scroll
   (bascule de vues, pas de défilement) + menu mobile (drawer).
   ========================================================================= */
(function () {
  "use strict";
  var S = window.SITE;
  var mainEl = document.getElementById("main");
  if (!S) {
    mainEl.innerHTML = '<p style="padding:2rem;font-family:sans-serif">Erreur : <code>../shared/site-data.js</code> non chargé.</p>';
    return;
  }
  var i = S.info;

  function stars(n) {
    var s = '<span aria-hidden="true">';
    for (var k = 1; k <= 5; k++) s += (k <= n) ? '★' : '<span style="color:#E7DECC">★</span>';
    return s + '</span>';
  }
  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  /* ---------- NAV ---------- */
  var navItems = [{ slug: "home", label: "Accueil" }]
    .concat(S.categories.map(function (c) { return { slug: c.slug, label: c.label }; }))
    .concat([{ slug: "avis", label: "Avis" }, { slug: "contact", label: "Contact" }]);
  document.getElementById("site-nav").innerHTML = navItems.map(function (n) {
    return '<a class="nav-link" href="#' + n.slug + '" data-view="' + n.slug + '">' + n.label + '</a>';
  }).join("");

  /* ---------- ACCUEIL (hero) ---------- */
  document.getElementById("view-home").innerHTML =
    '<div class="hero">' +
      '<div class="hero__bg"><img src="' + S.heroImg + '" alt="Atelier de bijouterie — Colin Philippe" fetchpriority="high"></div>' +
      '<p class="hero__eyebrow">Depuis ' + i.since + ' · Chêne-Bourg</p>' +
      '<h1 class="hero__title">' + i.name + '</h1>' +
      '<p class="hero__baseline">' + i.baseline + '</p>' +
      '<ul class="hero__services">' + i.services.map(function (s) { return '<li>' + s.t + '</li>'; }).join("") + '</ul>' +
      '<div class="hero__cta"><a class="btn btn--gold" href="#contact">Prendre rendez-vous</a><a class="btn btn--on-dark" href="tel:' + i.phoneIntl + '">Appeler</a></div>' +
    '</div>';

  /* ---------- CATÉGORIES (5 produits/vue, no-scroll) ---------- */
  document.getElementById("category-views").innerHTML = S.categories.map(function (c) {
    var cards = c.items.map(function (p) {
      return '<article class="product-card">' +
        '<div class="product-card__media"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.spec + '" loading="lazy" width="800" height="1000"></div>' +
        '<div class="product-card__body">' +
          '<h3 class="product-card__name">' + p.name + '</h3>' +
          '<p class="product-card__spec">' + p.spec + '</p>' +
          '<p class="product-card__price">' + p.price + '</p>' +
        '</div></article>';
    }).join("");
    return '<section class="view view--pad view--category" id="view-' + c.slug + '" aria-label="' + c.title + '">' +
      '<div class="view-head"><p class="eyebrow">Collection</p><h2>' + c.title + '</h2><p class="intro">' + c.intro + '</p><div class="rule"></div></div>' +
      '<div class="product-row">' + cards + '</div>' +
    '</section>';
  }).join("");

  /* ---------- AVIS (exemples, honnêtement signalés) ---------- */
  var r = S.reviews;
  document.getElementById("view-avis").innerHTML =
    '<div class="view-head"><p class="eyebrow">Avis Google</p><h2>Ils nous font confiance</h2><div class="rule"></div></div>' +
    '<div class="avis-wrap">' +
      '<div class="avis-agg">' +
        '<div class="avis-agg__score">' + r.rating + '</div>' +
        '<div class="avis-agg__stars" role="img" aria-label="Note ' + r.rating + ' sur 5">★★★★★</div>' +
        '<div class="avis-agg__meta">Note moyenne · Avis Google</div>' +
        '<div class="avis-agg__meta" style="font-style:italic">Exemples de présentation — vos vrais avis Google s’afficheront ici.</div>' +
      '</div>' +
      '<div class="avis-grid">' + r.items.map(function (a) {
        return '<article class="avis-card">' +
          '<div class="avis-card__stars" role="img" aria-label="Noté ' + a.stars + ' sur 5">' + stars(a.stars) + '</div>' +
          '<p class="avis-card__text">' + a.text + '</p>' +
          '<div class="avis-card__foot"><span class="avis-avatar" aria-hidden="true">' + initials(a.author) + '</span><span class="avis-card__author">' + a.author + '</span><span>· ' + a.ago + '</span></div>' +
        '</article>';
      }).join("") + '</div>' +
    '</div>';

  /* ---------- CONTACT ---------- */
  var mapsEmbed = "https://maps.google.com/maps?q=" + encodeURIComponent(i.mapsQuery) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
  var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(i.mapsQuery);
  document.getElementById("view-contact").innerHTML =
    '<div class="view-head"><p class="eyebrow">Nous trouver</p><h2>Contact</h2><div class="rule"></div></div>' +
    '<div class="contact-grid">' +
      '<div class="contact-info">' +
        '<a class="phone" href="tel:' + i.phoneIntl + '">' + i.phone + '</a>' +
        '<div class="contact-line"><span class="k">Adresse</span><span>' + i.address + '<br>' + i.city + '</span></div>' +
        '<div class="contact-line"><span class="k">Horaires</span><table class="hours"><tbody>' +
          i.hours.map(function (h) { return '<tr><td>' + h[0] + '</td><td>' + h[1] + '</td></tr>'; }).join("") +
        '</tbody></table></div>' +
        '<p class="contact-note">' + i.hoursNote + '</p>' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">' +
          '<a class="btn btn--gold" href="tel:' + i.phoneIntl + '">Appeler</a>' +
          '<a class="btn btn--ghost" href="' + mapsLink + '" target="_blank" rel="noopener">Itinéraire</a>' +
        '</div>' +
      '</div>' +
      '<div class="contact-map"><iframe title="Carte — ' + i.address + ', ' + i.city + '" src="' + mapsEmbed + '" loading="lazy"></iframe></div>' +
    '</div>';

  /* ---------- NAVIGATION DE VUES (zéro scroll) ---------- */
  var validSlugs = navItems.map(function (n) { return n.slug; });
  function currentSlug() { var h = (location.hash || "").replace(/^#/, ""); return validSlugs.indexOf(h) >= 0 ? h : "home"; }
  function labelFor(slug) { for (var k = 0; k < navItems.length; k++) if (navItems[k].slug === slug) return navItems[k].label; return ""; }
  var views = Array.prototype.slice.call(document.querySelectorAll(".view"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  function showView(slug) {
    views.forEach(function (v) { v.classList.toggle("is-active", v.id === "view-" + slug); });
    links.forEach(function (a) { if (a.getAttribute("data-view") === slug) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = (slug === "home") ? "Colin Philippe — Bijouterie-Horlogerie · Chêne-Bourg" : (labelFor(slug) + " · Colin Philippe");
    closeMenu();
  }
  window.addEventListener("hashchange", function () { showView(currentSlug()); });

  /* ---------- MENU MOBILE (drawer) ---------- */
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");
  var backdrop = document.getElementById("nav-backdrop");
  function openMenu() { nav.classList.add("is-open"); backdrop.hidden = false; backdrop.classList.add("is-open"); document.body.classList.add("nav-open"); toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Fermer le menu"); }
  function closeMenu() { nav.classList.remove("is-open"); backdrop.classList.remove("is-open"); backdrop.hidden = true; document.body.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Ouvrir le menu"); }
  toggle.addEventListener("click", function () { nav.classList.contains("is-open") ? closeMenu() : openMenu(); });
  backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  nav.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".nav-link")) closeMenu(); });

  /* init */
  showView(currentSlug());
})();
