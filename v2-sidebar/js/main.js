/* =========================================================================
   Colin Philippe — V2 (rail latéral) · rendu depuis window.SITE + navigation ZÉRO-scroll
   (bascule de vues, pas de défilement) + menu mobile (drawer).
   Chaque vue active expose UN <h1> (accueil = hero ; autres = titre de vue).
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
    for (var k = 1; k <= 5; k++) s += (k <= n) ? '★' : '<span style="color:var(--color-border-subtle)">★</span>';
    return s + '</span>';
  }
  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }
  function countUp(el, target, reduce) {
    if (reduce || !window.requestAnimationFrame) { el.textContent = target.toFixed(1).replace(".", ","); return; }
    var t0 = null, dur = 1000;
    function step(ts) { if (t0 === null) t0 = ts; var p = Math.min((ts - t0) / dur, 1); el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(1).replace(".", ","); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* ---------- NAV ---------- */
  var navItems = [{ slug: "home", label: "Accueil" }, { slug: "atelier", label: "Atelier" }]
    .concat(S.categories.map(function (c) { return { slug: c.slug, label: c.label }; }))
    .concat([{ slug: "avis", label: "Avis" }, { slug: "contact", label: "Contact" }]);
  document.getElementById("site-nav").innerHTML = navItems.map(function (n) {
    return '<a class="nav-link" href="#' + n.slug + '" data-view="' + n.slug + '">' + n.label + '</a>';
  }).join("");

  var featEl = document.getElementById("sidebar-feature");
  if (featEl) featEl.innerHTML =
    '<img src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&h=420&fit=crop&q=80" alt="Créations Colin Philippe" loading="lazy">' +
    '<p>Créations faites main.</p>';
  var footEl = document.getElementById("sidebar-foot");
  if (footEl) footEl.innerHTML =
    '<span class="foot-label">Nous appeler</span>' +
    '<a class="foot-phone" href="tel:' + i.phoneIntl + '">' + i.phone + '</a>' +
    '<span class="foot-hours">Chêne-Bourg · depuis 1990</span>';

  /* ---------- ACCUEIL (hero) ---------- */
  document.getElementById("view-home").innerHTML =
    '<div class="hero">' +
      '<div class="hero__bg"><img src="https://images.pexels.com/photos/29043373/pexels-photo-29043373.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop" alt="Bijou en or — Colin Philippe" fetchpriority="high"></div>' +
      '<p class="hero__eyebrow">Depuis ' + i.since + ' · Chêne-Bourg</p>' +
      '<h1 class="hero__title">' + i.name + '</h1>' +
      '<p class="hero__baseline">' + i.baseline + '</p>' +
      '<ul class="hero__services">' + i.services.map(function (s) { return '<li>' + s.t + '</li>'; }).join("") + '</ul>' +
      '<div class="hero__cta"><a class="btn btn--gold" href="#contact">Prendre rendez-vous</a><a class="btn btn--on-dark" href="tel:' + i.phoneIntl + '">Appeler</a></div>' +
      '<ul class="hero__trust">' + (i.trust || []).map(function (t) { return '<li>' + t + '</li>'; }).join("") + '</ul>' +
    '</div>';

  /* ---------- ATELIER (savoir-faire, split photo + texte, no-scroll) ---------- */
  var at = i.atelier;
  document.getElementById("view-atelier").innerHTML =
    '<div class="atelier-split">' +
      '<figure class="atelier-media"><img src="' + at.img + '" alt="Philippe Colin à l\'atelier — création de bijoux à la main" loading="lazy" width="1200" height="800"></figure>' +
      '<div class="atelier-body">' +
        '<p class="eyebrow">' + at.kicker + '</p>' +
        '<h1 class="atelier-title">' + at.title + '</h1>' +
        '<p class="atelier-lead">' + at.body + '</p>' +
        '<ul class="atelier-points">' + at.points.map(function (p) { return '<li>' + p + '</li>'; }).join("") + '</ul>' +
        '<div class="atelier-cta"><a class="btn btn--gold" href="#contact">Prendre rendez-vous</a></div>' +
      '</div>' +
    '</div>';

  /* ---------- CATÉGORIES (5 produits/vue, no-scroll) ---------- */
  document.getElementById("category-views").innerHTML = S.categories.map(function (c) {
    var cards = c.items.map(function (p) {
      return '<a class="product-card" href="#' + c.slug + '/' + p.slug + '">' +
        '<div class="product-card__media"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.spec + '" loading="lazy" width="800" height="1000"></div>' +
        '<div class="product-card__body">' +
          '<h2 class="product-card__name">' + p.name + '</h2>' +
          '<p class="product-card__spec">' + p.spec + '</p>' +
          '<p class="product-card__price">' + p.price + '</p>' +
        '</div></a>';
    }).join("");
    return '<section class="view view--pad view--category" id="view-' + c.slug + '" aria-label="' + c.title + '">' +
      '<div class="view-head"><p class="eyebrow">Collection</p><h1>' + c.title + '</h1><p class="intro">' + c.intro + '</p><div class="rule"></div></div>' +
      '<div class="product-row">' + cards + '</div>' +
    '</section>';
  }).join("");

  /* ---------- AVIS (exemples, honnêtement signalés) ---------- */
  var r = S.reviews;
  function avisCard(a) {
    return '<article class="avis-card">' +
      (a.recent ? '<span class="avis-card__badge">Récent</span>' : '') +
      '<div class="avis-card__stars" role="img" aria-label="Noté ' + a.stars + ' sur 5">' + stars(a.stars) + '</div>' +
      '<p class="avis-card__text">' + a.text + '</p>' +
      '<div class="avis-card__foot"><span class="avis-avatar" aria-hidden="true">' + initials(a.author) + '</span><span class="avis-card__author">' + a.author + '</span><span>· ' + a.ago + '</span></div>' +
    '</article>';
  }
  document.getElementById("view-avis").innerHTML =
    '<div class="view-head"><p class="eyebrow">Avis Google</p><h1>Ils nous font confiance</h1><div class="rule"></div></div>' +
    '<div class="avis-wrap">' +
      '<div class="avis-agg">' +
        '<div class="avis-agg__score">' + r.rating + '</div>' +
        '<div class="avis-agg__stars" role="img" aria-label="Note ' + r.rating + ' sur 5">★★★★★</div>' +
        '<a class="avis-agg__meta" href="' + r.googleUrl + '" target="_blank" rel="noopener">Note moyenne Google · basé sur ' + r.count + ' avis</a>' +
      '</div>' +
      '<div class="avis-carousel">' +
        '<button class="avis-nav" data-dir="-1" aria-label="Avis précédents">‹</button>' +
        '<div class="avis-grid" id="avis-grid" aria-live="polite"></div>' +
        '<button class="avis-nav" data-dir="1" aria-label="Avis suivants">›</button>' +
      '</div>' +
      '<div class="avis-dots" id="avis-dots"></div>' +
    '</div>';
  (function () {
    var grid = document.getElementById("avis-grid"), dotsW = document.getElementById("avis-dots"), list = r.items, start = 0, timer = null;
    function pp() { return window.matchMedia("(max-width:767px)").matches ? 1 : (window.matchMedia("(max-width:1024px)").matches ? 2 : 3); }
    function win() { var n = pp(), o = []; for (var k = 0; k < n; k++) o.push(list[(start + k) % list.length]); return o; }
    function dots() { var h = ""; for (var d = 0; d < list.length; d++) h += '<button class="avis-dot' + (d === start ? " is-on" : "") + '" data-i="' + d + '" aria-label="Avis ' + (d + 1) + '"></button>'; dotsW.innerHTML = h; }
    function paint(fade) { if (fade) { grid.style.opacity = "0"; setTimeout(function () { grid.innerHTML = win().map(avisCard).join(""); grid.style.opacity = "1"; dots(); }, 200); } else { grid.innerHTML = win().map(avisCard).join(""); dots(); } }
    function go(dir) { start = (start + dir + list.length) % list.length; paint(true); }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function auto() { stop(); if (reduce) return; timer = setInterval(function () { go(1); }, 5000); }
    document.querySelectorAll(".avis-nav").forEach(function (b) { b.addEventListener("click", function () { go(+b.dataset.dir); auto(); }); });
    dotsW.addEventListener("click", function (e) { var b = e.target.closest(".avis-dot"); if (b) { start = +b.dataset.i; paint(true); auto(); } });
    var car = document.querySelector(".avis-carousel");
    car.addEventListener("mouseenter", stop); car.addEventListener("mouseleave", auto);
    car.addEventListener("focusin", stop); car.addEventListener("focusout", auto); /* a11y : pause au clavier (WCAG 2.2.2) */
    window.addEventListener("resize", function () { paint(false); });
    paint(false); auto();
  })();

  /* ---------- CONTACT (panneau infos + formulaire mailto · sans iframe/tracking RGPD) ---------- */
  var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(i.mapsQuery);
  document.getElementById("view-contact").innerHTML =
    '<div class="view-head"><p class="eyebrow">Nous trouver</p><h1>Contact</h1><div class="rule"></div></div>' +
    '<div class="contact-grid">' +
      '<div class="contact-info">' +
        '<a class="phone" href="tel:' + i.phoneIntl + '">' + i.phone + '</a>' +
        '<div class="contact-line"><span class="k">Adresse</span><span>' + i.address + '<br>' + i.city + '</span></div>' +
        '<div class="contact-line"><span class="k">Email</span><a href="mailto:' + i.email + '">' + i.email + '</a></div>' +
        '<div class="contact-line"><span class="k">Horaires</span><table class="hours"><tbody>' +
          i.hours.map(function (h) { return '<tr><td>' + h[0] + '</td><td>' + h[1] + '</td></tr>'; }).join("") +
        '</tbody></table></div>' +
        '<p class="contact-note">' + i.hoursNote + '</p>' +
        '<div class="contact-actions">' +
          '<a class="btn btn--gold" href="tel:' + i.phoneIntl + '">Appeler</a>' +
          '<a class="btn btn--ghost" href="' + mapsLink + '" target="_blank" rel="noopener">Itinéraire</a>' +
        '</div>' +
      '</div>' +
      '<form class="contact-form" id="contact-form">' +
        '<p class="contact-form__title">Nous écrire</p>' +
        '<div class="field"><label for="cf-nom">Nom</label><input id="cf-nom" name="nom" type="text" autocomplete="name" required></div>' +
        '<div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>' +
        '<div class="field"><label for="cf-tel">Téléphone</label><input id="cf-tel" name="tel" type="tel" autocomplete="tel"></div>' +
        '<div class="field field--msg"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" rows="3" required></textarea></div>' +
        '<button class="btn btn--gold contact-form__send" type="submit">Envoyer</button>' +
      '</form>' +
    '</div>' +
    '<div class="contact-legal">' +
      '<a href="../mentions-legales.html">Mentions légales</a>' +
      '<span class="contact-legal__sep" aria-hidden="true">·</span>' +
      '<a href="../confidentialite.html">Confidentialité</a>' +
    '</div>';

  /* Formulaire → mailto (zéro backend, zéro tracking). Validation native (required), puis compose l'email. */
  (function () {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = form.nom.value.trim(), email = form.email.value.trim(), tel = form.tel.value.trim(), msg = form.message.value.trim();
      var subject = "Contact site — " + (nom || "message");
      var body = "Nom : " + nom + "\nEmail : " + email + "\nTéléphone : " + tel + "\n\n" + msg;
      window.location.href = "mailto:" + i.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  })();

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
    if (slug === "avis") { var sc = document.querySelector(".avis-agg__score"); if (sc) countUp(sc, parseFloat(r.rating.replace(",", ".")), window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    closeMenu();
  }
  /* ---------- VUE PRODUIT (fiche + « dans le même esprit », zéro scroll) ---------- */
  var productEl = document.getElementById("view-product");
  function showProduct(cat, slug) {
    var p = S.getProduct(cat, slug);
    if (!p) { showView(currentSlug()); return; }
    var rel = S.related(cat, slug, 5).map(function (x) {
      return '<a class="mini-card" href="#' + x.cat + '/' + x.slug + '">' +
        '<span class="mini-card__media"><img src="' + x.img + '" alt="' + x.name + '" loading="lazy" width="800" height="1000"></span>' +
        '<span class="mini-card__body"><span class="mini-card__name">' + x.name + '</span><span class="mini-card__price">' + x.price + '</span></span>' +
      '</a>';
    }).join("");
    productEl.innerHTML =
      '<a class="product-back" href="#' + p.cat + '"><span aria-hidden="true">‹</span>' + p.catLabel + '</a>' +
      '<div class="product-detail">' +
        '<figure class="product-detail__media"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.spec + '" width="800" height="1000"></figure>' +
        '<div class="product-detail__info">' +
          '<p class="eyebrow">' + p.catTitle + '</p>' +
          '<h1 class="product-detail__name">' + p.name + '</h1>' +
          '<p class="product-detail__spec">' + p.spec + '</p>' +
          '<p class="product-detail__price">' + p.price + '</p>' +
          '<div class="product-detail__cta">' +
            '<a class="btn btn--gold" href="#contact">Prendre rendez-vous</a>' +
            '<a class="btn btn--ghost" href="tel:' + i.phoneIntl + '">Appeler</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<section class="product-related" aria-label="Suggestions du même type">' +
        '<p class="product-related__label">Dans le même esprit</p>' +
        '<div class="mini-row">' + rel + '</div>' +
      '</section>';
    productEl.setAttribute("aria-label", p.name + " — " + p.catTitle);
    views.forEach(function (v) { v.classList.toggle("is-active", v.id === "view-product"); });
    links.forEach(function (a) { if (a.getAttribute("data-view") === cat) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = p.name + " · Colin Philippe";
    closeMenu();
  }

  /* ---------- ROUTEUR : #<cat> = catégorie · #<cat>/<slug> = fiche produit ---------- */
  function route() {
    var h = (location.hash || "").replace(/^#/, "");
    var seg = h.split("/");
    if (seg.length === 2 && seg[0] && seg[1]) {
      if (S.getProduct(seg[0], seg[1])) { showProduct(seg[0], seg[1]); return; }
      if (validSlugs.indexOf(seg[0]) >= 0) { showView(seg[0]); return; }
    }
    showView(currentSlug());
  }
  window.addEventListener("hashchange", route);

  /* ---------- MENU MOBILE (drawer) ---------- */
  var nav = document.getElementById("sidebar");
  var toggle = document.getElementById("nav-toggle");
  var backdrop = document.getElementById("nav-backdrop");
  function openMenu() { nav.classList.add("is-open"); backdrop.hidden = false; backdrop.classList.add("is-open"); document.body.classList.add("nav-open"); toggle.setAttribute("aria-expanded", "true"); toggle.setAttribute("aria-label", "Fermer le menu"); }
  function closeMenu() { nav.classList.remove("is-open"); backdrop.classList.remove("is-open"); backdrop.hidden = true; document.body.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Ouvrir le menu"); }
  toggle.addEventListener("click", function () { nav.classList.contains("is-open") ? closeMenu() : openMenu(); });
  backdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  nav.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".nav-link")) closeMenu(); });

  /* ---- thème clair / sombre (toggle flottant, persistant) ---- */
  var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.5 13.2A8.2 8.2 0 1 1 10.8 3.5a6.4 6.4 0 0 0 9.7 9.7z"/></svg>';
  var tbtn = document.getElementById("theme-toggle");
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); if (tbtn) { tbtn.innerHTML = (t === "dark") ? SUN : MOON; tbtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false"); } }
  var saved; try { saved = localStorage.getItem("cp-theme-v2"); } catch (e) {}
  setTheme(saved || "light"); // défaut = identité du site (clair) ; toggle + localStorage pour l'autre
  if (tbtn) tbtn.addEventListener("click", function () { var nt = (document.documentElement.getAttribute("data-theme") === "dark") ? "light" : "dark"; var el = document.documentElement; el.classList.add("theme-anim"); setTheme(nt); try { localStorage.setItem("cp-theme-v2", nt); } catch (e) {} window.setTimeout(function () { el.classList.remove("theme-anim"); }, 500); });

  /* init */
  route();
})();
