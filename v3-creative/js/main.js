/* =========================================================================
   Colin Philippe — V3 « Créative » · rendu + menu plein écran + no-scroll
   ========================================================================= */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { document.getElementById("main").innerHTML = '<p style="padding:2rem">Erreur : ../shared/site-data.js non chargé.</p>'; return; }
  var i = S.info;
  var pad2 = function (n) { return ("0" + n).slice(-2); };
  function stars(n) { var s = '<span aria-hidden="true">'; for (var k = 1; k <= 5; k++) s += (k <= n) ? '★' : '<span style="color:#4a4030">★</span>'; return s + '</span>'; }
  function initials(name) { return name.split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase(); }
  function countUp(el, target, reduce) {
    if (reduce || !window.requestAnimationFrame) { el.textContent = target.toFixed(1).replace(".", ","); return; }
    var t0 = null, dur = 1000;
    function step(ts) { if (t0 === null) t0 = ts; var p = Math.min((ts - t0) / dur, 1); el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(1).replace(".", ","); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* nav items (avec numéro pour les catégories) */
  var navItems = [{ slug: "home", label: "Accueil", num: "" }, { slug: "atelier", label: "Atelier", num: "" }]
    .concat(S.categories.map(function (c, ci) { return { slug: c.slug, label: c.label, num: pad2(ci + 1) }; }))
    .concat([{ slug: "avis", label: "Avis", num: "" }, { slug: "contact", label: "Contact", num: "" }]);

  /* ---- menu overlay ---- */
  document.getElementById("ov-nav").innerHTML = navItems.map(function (n) {
    return '<a class="ov-link" href="#' + n.slug + '" data-view="' + n.slug + '"><span class="num">' + n.num + '</span>' + n.label + '</a>';
  }).join("");
  document.getElementById("ov-foot").innerHTML =
    '<span>' + i.address + ', ' + i.city + '</span>' +
    '<a href="tel:' + i.phoneIntl + '">' + i.phone + '</a>' +
    '<span>' + i.hours[0][0] + ' · ' + i.hours[0][1] + '</span>';

  /* ---- accueil (hero immersif) ---- */
  document.getElementById("view-home").innerHTML =
    '<div class="hero">' +
      '<div class="hero__bg"><img src="' + S.heroImg + '" alt="Atelier de bijouterie — Colin Philippe" fetchpriority="high"></div>' +
      '<p class="hero__eyebrow">Depuis ' + i.since + ' · Chêne-Bourg · Genève</p>' +
      '<h1 class="hero__title">' + i.name + '</h1>' +
      '<p class="hero__baseline">' + i.baseline + '</p>' +
      '<ul class="hero__services">' + i.services.map(function (s) { return '<li>' + s.t + '</li>'; }).join("") + '</ul>' +
      '<div class="hero__cta"><a class="btn btn--gold" href="#contact">Prendre rendez-vous</a><a class="btn btn--outline" href="tel:' + i.phoneIntl + '">Appeler</a></div>' +
      '<ul class="hero__trust">' + (i.trust || []).map(function (t) { return '<li>' + t + '</li>'; }).join("") + '</ul>' +
    '</div>';

  /* ---- catégories (asymétrique : 1 grande + 4) ---- */
  function piece(p, featured) {
    return '<a class="piece' + (featured ? ' piece--featured' : '') + '" href="#' + p.cat + '/' + p.slug + '">' +
      '<div class="piece__media"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.spec + '" loading="lazy" width="800" height="1000"></div>' +
      '<div class="piece__cap"><h3 class="piece__name">' + p.name + '</h3><p class="piece__spec">' + p.spec + '</p><p class="piece__price">' + p.price + '</p></div>' +
    '</a>';
  }
  document.getElementById("category-views").innerHTML = S.categories.map(function (c, ci) {
    var rest = c.items.slice(1, 5);
    return '<section class="view view--pad view--category" id="view-' + c.slug + '" aria-label="' + c.title + '">' +
      '<div class="cat-head view-head"><p class="kicker"><span class="n">' + pad2(ci + 1) + '</span> Collection</p><h2>' + c.title + '</h2><p class="intro">' + c.intro + '</p></div>' +
      '<div class="cat-stage">' +
        piece(c.items[0], true) +
        '<div class="cat-grid">' + rest.map(function (p) { return piece(p, false); }).join("") + '</div>' +
      '</div>' +
    '</section>';
  }).join("");

  /* ---- atelier (savoir-faire : split photo + texte éditorial) ---- */
  var at = i.atelier;
  document.getElementById("view-atelier").innerHTML =
    '<div class="atelier-grid">' +
      '<figure class="atelier-media"><img src="' + at.img + '" alt="Philippe Colin, bijoutier-créateur, dans son atelier" loading="lazy" width="1200" height="800"></figure>' +
      '<div class="atelier-body">' +
        '<p class="atelier-kicker"><span class="n serif">&#10022;</span>' + at.kicker + '</p>' +
        '<h2 class="atelier-title">' + at.title + '</h2>' +
        '<p class="atelier-text">' + at.body + '</p>' +
        '<ul class="atelier-points">' + at.points.map(function (p) { return '<li>' + p + '</li>'; }).join("") + '</ul>' +
      '</div>' +
    '</div>';

  /* ---- avis (carousel : rotation, récents en tête) ---- */
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
    '<div class="avis-wrap">' +
      '<div style="text-align:center">' +
        '<p class="kicker" style="justify-content:center">Avis Google</p>' +
        '<h2 style="font-family:var(--font-display);font-size:var(--fs-h1);margin-top:8px">Ils nous font confiance</h2>' +
      '</div>' +
      '<div class="avis-agg">' +
        '<div class="avis-agg__score">' + r.rating + '</div>' +
        '<div class="avis-agg__stars" role="img" aria-label="Note ' + r.rating + ' sur 5">★★★★★</div>' +
        '<div class="avis-agg__meta">Note moyenne Google</div>' +
        '<a class="avis-agg__link" href="' + r.googleUrl + '" target="_blank" rel="noopener">Basé sur ' + r.count + ' avis Google</a>' +
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

  /* ---- contact ---- */
  var mapsEmbed = "https://maps.google.com/maps?q=" + encodeURIComponent(i.mapsQuery) + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
  var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(i.mapsQuery);
  document.getElementById("view-contact").innerHTML =
    '<div class="contact-grid">' +
      '<div class="contact-info">' +
        '<p class="kicker">Nous trouver</p>' +
        '<a class="phone" href="tel:' + i.phoneIntl + '">' + i.phone + '</a>' +
        '<div class="contact-line"><span class="k">Adresse</span><span>' + i.address + '<br>' + i.city + '</span></div>' +
        '<div class="contact-line"><span class="k">Email</span><a href="mailto:' + i.email + '">' + i.email + '</a></div>' +
        '<div class="contact-line"><span class="k">Horaires</span><table class="hours"><tbody>' +
          i.hours.map(function (h) { return '<tr><td>' + h[0] + '</td><td>' + h[1] + '</td></tr>'; }).join("") +
        '</tbody></table></div>' +
        '<p class="contact-note">' + i.hoursNote + '</p>' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn--gold" href="tel:' + i.phoneIntl + '">Appeler</a><a class="btn btn--outline" href="' + mapsLink + '" target="_blank" rel="noopener">Itinéraire</a></div>' +
      '</div>' +
      '<div class="contact-map"><iframe title="Carte — ' + i.address + '" src="' + mapsEmbed + '" loading="lazy"></iframe></div>' +
    '</div>';

  /* ---- navigation de vues (no-scroll) : 1 segment = vue · 2 segments = fiche produit ---- */
  var validSlugs = navItems.map(function (n) { return n.slug; });
  function labelFor(slug) { for (var k = 0; k < navItems.length; k++) if (navItems[k].slug === slug) return navItems[k].label; return ""; }
  var views = Array.prototype.slice.call(document.querySelectorAll(".view"));
  var links = Array.prototype.slice.call(document.querySelectorAll(".ov-link"));
  var productHost = document.getElementById("view-product");
  function setActive(id) { views.forEach(function (v) { v.classList.toggle("is-active", v.id === id); }); }
  function markNav(slug) { links.forEach(function (a) { if (a.getAttribute("data-view") === slug) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }); }
  function showView(slug) {
    setActive("view-" + slug);
    markNav(slug);
    document.title = (slug === "home") ? "Colin Philippe — Bijouterie-Horlogerie · Chêne-Bourg" : (labelFor(slug) + " · Colin Philippe");
    if (slug === "avis") { var sc = document.querySelector(".avis-agg__score"); if (sc) countUp(sc, parseFloat(r.rating.replace(",", ".")), window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    closeMenu();
  }
  /* ---- fiche produit (vue dédiée : pièce en grand + 5 suggestions même type) ---- */
  function relTile(p) {
    return '<a class="rel" href="#' + p.cat + '/' + p.slug + '">' +
      '<span class="rel__media"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy" width="800" height="1000"></span>' +
      '<span class="rel__cap"><span class="rel__name">' + p.name + '</span><span class="rel__price">' + p.price + '</span></span>' +
    '</a>';
  }
  function renderProduct(p) {
    productHost.innerHTML =
      '<div class="product">' +
        '<a class="product__back" href="#' + p.cat + '"><span class="product__back-ic" aria-hidden="true">&lsaquo;</span>' + p.catLabel + '</a>' +
        '<div class="product__stage">' +
          '<figure class="product__media"><img src="' + p.img + '" alt="' + p.name + ' — ' + p.spec + '" width="800" height="1000" fetchpriority="high"></figure>' +
          '<div class="product__info">' +
            '<p class="product__eyebrow">' + p.catTitle + '</p>' +
            '<h1 class="product__name">' + p.name + '</h1>' +
            '<p class="product__spec">' + p.spec + '</p>' +
            '<p class="product__price">' + p.price + '</p>' +
            '<div class="product__cta">' +
              '<a class="btn btn--gold" href="#contact">Prendre rendez-vous</a>' +
              '<a class="btn btn--outline" href="tel:' + i.phoneIntl + '">Appeler</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="product__related">' +
          '<h2 class="product__related-title">Dans le même esprit</h2>' +
          '<div class="product__related-row">' + S.related(p.cat, p.slug, 5).map(relTile).join("") + '</div>' +
        '</div>' +
      '</div>';
  }
  function showProduct(p) {
    renderProduct(p);              /* rendu AVANT l'activation → l'anim d'entrée se rejoue */
    setActive("view-product");
    markNav(p.cat);                /* la catégorie du produit reste « courante » dans le menu */
    document.title = p.name + " · " + p.catLabel + " · Colin Philippe";
    closeMenu();                   /* ferme l'overlay si une nav produit survient menu ouvert */
  }
  function route() {
    var parts = (location.hash || "").replace(/^#/, "").split("/").filter(Boolean);
    if (parts.length >= 2) {
      var prod = S.getProduct(parts[0], parts[1]);
      if (prod) { showProduct(prod); return; }                                /* produit valide → fiche */
      if (validSlugs.indexOf(parts[0]) >= 0) { showView(parts[0]); return; }  /* slug produit inconnu → sa catégorie */
      showView("home"); return;
    }
    showView(validSlugs.indexOf(parts[0]) >= 0 ? parts[0] : "home");
  }
  window.addEventListener("hashchange", route);

  /* ---- menu plein écran ---- */
  var overlay = document.getElementById("overlay");
  var openBtn = document.getElementById("menu-open");
  var closeBtn = document.getElementById("menu-close");
  /* fond mis en `inert` + aria-hidden quand l'overlay est ouvert → Tab n'atteint pas les CTA du hero derrière (§100) */
  var bgEls = [document.querySelector(".topbar"), document.getElementById("main"), document.getElementById("theme-toggle")];
  function setBgInert(on) {
    bgEls.forEach(function (el) {
      if (!el) return;
      if (on) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); }
      else { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); }
    });
  }
  function overlayFocusables() {
    return Array.prototype.slice.call(overlay.querySelectorAll('a[href], button:not([disabled])'))
      .filter(function (el) { return el === closeBtn || el.offsetWidth > 0 || el.offsetHeight > 0; });
  }
  function trap(e) {
    if (e.key === "Escape") { e.preventDefault(); closeMenu(); return; }
    if (e.key !== "Tab") return;
    var f = overlayFocusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openMenu() {
    overlay.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    setBgInert(true);
    overlay.addEventListener("keydown", trap);
    requestAnimationFrame(function () { closeBtn.focus(); });   /* focus initial = bouton Fermer (§100) */
  }
  function closeMenu() {
    var wasOpen = overlay.classList.contains("is-open");
    overlay.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    overlay.removeEventListener("keydown", trap);
    setBgInert(false);
    if (wasOpen) openBtn.focus();                               /* focus rendu au déclencheur (§100) */
  }
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".ov-link")) closeMenu(); });

  /* ---- thème clair / sombre (toggle flottant, persistant) — V3 = SOMBRE par défaut ---- */
  var SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.5 13.2A8.2 8.2 0 1 1 10.8 3.5a6.4 6.4 0 0 0 9.7 9.7z"/></svg>';
  var tbtn = document.getElementById("theme-toggle");
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); if (tbtn) { tbtn.innerHTML = (t === "dark") ? SUN : MOON; tbtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false"); } }
  var saved; try { saved = localStorage.getItem("cp-theme"); } catch (e) {}
  setTheme(saved || "dark");   /* V3 = SOMBRE par défaut (brief) — on n'écoute pas prefers-color-scheme au 1er chargement */
  if (tbtn) tbtn.addEventListener("click", function () { var nt = (document.documentElement.getAttribute("data-theme") === "dark") ? "light" : "dark"; var el = document.documentElement; el.classList.add("theme-anim"); setTheme(nt); try { localStorage.setItem("cp-theme", nt); } catch (e) {} window.setTimeout(function () { el.classList.remove("theme-anim"); }, 500); });

  route();
})();
