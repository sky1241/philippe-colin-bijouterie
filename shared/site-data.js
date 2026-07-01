/* =========================================================================
   Colin Philippe — Bijouterie·Horlogerie · DONNÉES PARTAGÉES (V1/V2/V3)
   Source unique de contenu. Chargée en <script> classique (file:// OK).
   Avis = VRAIS avis Google (récupérés manuellement — note 5,0 · 11 avis).
      Photos = illustrations, à remplacer par les vraies. Infos = vérifiées.
   ========================================================================= */
window.SITE = {
  info: {
    name: "Colin Philippe",
    sub: "Bijouterie · Horlogerie",
    baseline: "Créateur de bijoux à la main — et l'horloger de votre quotidien.",
    since: 1990,
    owner: "Philippe Colin",
    address: "Rue de Genève 71",
    city: "1225 Chêne-Bourg · Genève",
    phone: "022 348 75 80",
    phoneIntl: "+41223487580",
    email: "bijouteriecolin@hotmail.fr",
    hours: [
      ["Lundi – Vendredi", "10h00 – 19h00"],
      ["Samedi", "9h00 – 18h00"],
      ["Dimanche", "Fermé"]
    ],
    hoursNote: "Horaires à confirmer avec la boutique.",
    atelier: {
      kicker: "Le savoir-faire",
      title: "Créateur, depuis 1990",
      body: "Philippe Colin exerce la bijouterie-horlogerie à Chêne-Bourg, aux portes de Genève, depuis 1990. Son activité — déclarée « fabrication et vente » — dit l'essentiel : ici, les bijoux sont créés à la main dans l'atelier, pièces uniques et sur-mesure. Et parce qu'une montre fait partie du quotidien, on s'occupe aussi du reste.",
      points: ["Création & sur-mesure", "Changement de pile", "Bracelets de montre", "Réparation & entretien", "Transformation de bijoux", "Expertise & estimation"],
      img: "https://images.pexels.com/photos/7167002/pexels-photo-7167002.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
    },
    mapsQuery: "Colin Philippe Rue de Genève 71 1225 Chêne-Bourg",
    trust: ["Fait main en atelier", "Or 18 ct · argent 925", "Depuis 1990", "Devis gratuit"],
    services: [
      { t: "Création à la main", d: "Pièces uniques façonnées dans l'atelier, sur-mesure." },
      { t: "Changement de pile", d: "Remplacement rapide, en boutique, toutes marques." },
      { t: "Bracelets & réparation", d: "Bracelets de montre, mise à taille, entretien." }
    ]
  },

  /* 5 catégories × 5 produits. img = URL CDN vérifiée. Ordre = images.json. */
  categories: [
    { slug: "colliers", label: "Colliers", title: "Colliers", intro: "Rivières, pendentifs, sautoirs — l'éclat près du cœur.", items: [
      { name: "Rivière de diamants", slug: "riviere-de-diamants", sub: "chaine", spec: "Or blanc 18 ct · diamants", price: "Sur devis", img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&h=1000&fit=crop&q=80" },
      { name: "Pendentif Goutte d'or", slug: "pendentif-goutte-or", sub: "pendentif", spec: "Or jaune 18 ct", price: "dès CHF 690", img: "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?w=800&h=1000&fit=crop&q=80" },
      { name: "Sautoir Perles de Tahiti", slug: "sautoir-perles-tahiti", sub: "perles", spec: "Perles · or gris", price: "Sur devis", img: "https://images.pexels.com/photos/20838859/pexels-photo-20838859.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Chaîne maille figaro", slug: "chaine-maille-figaro", sub: "chaine", spec: "Or jaune 18 ct", price: "dès CHF 590", img: "https://images.pexels.com/photos/7514818/pexels-photo-7514818.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Ras-de-cou diamanté", slug: "ras-de-cou-diamante", sub: "chaine", spec: "Or blanc 18 ct", price: "Sur devis", img: "https://images.pexels.com/photos/13924051/pexels-photo-13924051.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ], more: [
      { name: "Pendentif Cœur diamant", slug: "pendentif-coeur-diamant", sub: "pendentif", spec: "Or blanc 18 ct · diamant", price: "dès CHF 850", img: "https://images.pexels.com/photos/5370705/pexels-photo-5370705.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Pendentif Solitaire", slug: "pendentif-solitaire", sub: "pendentif", spec: "Or blanc 18 ct · brillant", price: "Sur devis", img: "https://images.pexels.com/photos/29245558/pexels-photo-29245558.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Collier de perles Akoya", slug: "collier-perles-akoya", sub: "perles", spec: "Perles Akoya · fermoir or", price: "dès CHF 980", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop&q=80" }
    ]},
    { slug: "bracelets", label: "Bracelets", title: "Bracelets", intro: "Joncs, manchettes, gourmettes — au poignet, un signe.", items: [
      { name: "Jonc martelé", slug: "jonc-martele", sub: "jonc", spec: "Or rose 18 ct", price: "Sur devis", img: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=800&h=1000&fit=crop&q=80" },
      { name: "Bracelet Tennis", slug: "bracelet-tennis", sub: "chaine", spec: "Or blanc · diamants", price: "Sur devis", img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=1000&fit=crop&q=80" },
      { name: "Manchette gravée", slug: "manchette-gravee", sub: "jonc", spec: "Argent massif", price: "dès CHF 480", img: "https://images.pexels.com/photos/32874211/pexels-photo-32874211.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Gourmette personnalisable", slug: "gourmette-perso", sub: "chaine", spec: "Or jaune 18 ct · gravure", price: "dès CHF 720", img: "https://images.pexels.com/photos/37485307/pexels-photo-37485307.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Bracelet perles & or", slug: "bracelet-perles-or", sub: "perles", spec: "Perles d'eau douce", price: "dès CHF 340", img: "https://images.pexels.com/photos/14509640/pexels-photo-14509640.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ], more: [
      { name: "Jonc diamant or rose", slug: "jonc-diamant-or-rose", sub: "jonc", spec: "Or rose 18 ct · diamants", price: "Sur devis", img: "https://images.pexels.com/photos/25283502/pexels-photo-25283502.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Bracelet maille royale", slug: "bracelet-maille-royale", sub: "chaine", spec: "Or jaune 18 ct", price: "dès CHF 690", img: "https://images.pexels.com/photos/12155925/pexels-photo-12155925.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Bracelet perles Akoya", slug: "bracelet-perles-akoya", sub: "perles", spec: "Perles Akoya · or blanc", price: "dès CHF 420", img: "https://images.pexels.com/photos/36823003/pexels-photo-36823003.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ]},
    { slug: "bagues", label: "Bagues", title: "Bagues", intro: "Solitaires, alliances, chevalières — un serment qui dure.", items: [
      { name: "Solitaire Éternité", slug: "solitaire-eternite", sub: "solitaire", spec: "Platine · diamant brillant", price: "Sur devis", img: "https://images.pexels.com/photos/31087451/pexels-photo-31087451.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Alliance tressée", slug: "alliance-tressee", sub: "alliance", spec: "Trois ors 18 ct", price: "dès CHF 1 290", img: "https://images.pexels.com/photos/32988751/pexels-photo-32988751.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Chevalière armoriée", slug: "chevaliere-armoriee", sub: "chevaliere", spec: "Or jaune · gravure main", price: "Sur devis", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop&q=80" },
      { name: "Bague Toi & Moi", slug: "bague-toi-et-moi", sub: "solitaire", spec: "Or blanc · deux pierres", price: "Sur devis", img: "https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Jonc diamant", slug: "jonc-diamant-bague", sub: "alliance", spec: "Or rose 18 ct", price: "dès CHF 980", img: "https://images.pexels.com/photos/15351782/pexels-photo-15351782.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ], more: [
      { name: "Solitaire coussin", slug: "solitaire-coussin", sub: "solitaire", spec: "Platine · diamant coussin", price: "Sur devis", img: "https://images.pexels.com/photos/8398937/pexels-photo-8398937.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Alliance diamants", slug: "alliance-diamants", sub: "alliance", spec: "Or blanc 18 ct · demi-tour", price: "dès CHF 1 490", img: "https://images.pexels.com/photos/3091638/pexels-photo-3091638.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Chevalière ovale", slug: "chevaliere-ovale", sub: "chevaliere", spec: "Or jaune · gravure main", price: "Sur devis", img: "https://images.pexels.com/photos/15176501/pexels-photo-15176501.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ]},
    { slug: "boucles", label: "Boucles", title: "Boucles d'oreilles", intro: "Puces, créoles, pendantes — la lumière au visage.", items: [
      { name: "Puces Diamant", slug: "puces-diamant", sub: "puce", spec: "Or blanc 18 ct", price: "dès CHF 690", img: "https://images.pexels.com/photos/10976654/pexels-photo-10976654.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Créoles", slug: "creoles", sub: "creole", spec: "Or jaune 18 ct", price: "Sur devis", img: "https://images.pexels.com/photos/32989030/pexels-photo-32989030.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Pendantes Saphir", slug: "pendantes-saphir", sub: "pendante", spec: "Or blanc · saphirs", price: "Sur devis", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop&q=80" },
      { name: "Dormeuses anciennes", slug: "dormeuses-anciennes", sub: "pendante", spec: "Or jaune 18 ct", price: "Sur devis", img: "https://images.pexels.com/photos/8396318/pexels-photo-8396318.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Puces perle", slug: "puces-perle", sub: "puce", spec: "Or blanc · perle de culture", price: "dès CHF 290", img: "https://images.pexels.com/photos/36772547/pexels-photo-36772547.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ], more: [
      { name: "Puces saphir", slug: "puces-saphir", sub: "puce", spec: "Or blanc · saphirs", price: "dès CHF 520", img: "https://images.pexels.com/photos/5370643/pexels-photo-5370643.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Créoles pavées", slug: "creoles-pavees", sub: "creole", spec: "Or blanc · diamants", price: "Sur devis", img: "https://images.pexels.com/photos/20943476/pexels-photo-20943476.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Pendantes perle", slug: "pendantes-perle", sub: "pendante", spec: "Or blanc · perles", price: "dès CHF 380", img: "https://images.pexels.com/photos/29609188/pexels-photo-29609188.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ]},
    { slug: "montres", label: "Montres", title: "Montres", intro: "Le métier d'horloger : vente, pile, bracelet, réparation.", items: [
      { name: "Squelette automatique", slug: "squelette-automatique", sub: "acier", spec: "Acier · mouvement apparent", price: "Sur devis", img: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&h=1000&fit=crop&q=80" },
      { name: "Classique cuir", slug: "classique-cuir", sub: "cuir", spec: "Boîtier acier · bracelet cuir", price: "dès CHF 1 950", img: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&h=1000&fit=crop&q=80" },
      { name: "Serti neige", slug: "serti-neige", sub: "acier", spec: "Lunette pavée diamants", price: "Sur devis", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Chronographe acier", slug: "chronographe-acier", sub: "acier", spec: "Quartz suisse", price: "dès CHF 890", img: "https://images.pexels.com/photos/5058216/pexels-photo-5058216.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Montre habillée or", slug: "montre-habillee-or", sub: "cuir", spec: "Bracelet cuir", price: "Sur devis", img: "https://images.pexels.com/photos/3419331/pexels-photo-3419331.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ], more: [
      { name: "Montre femme cuir", slug: "montre-femme-cuir", sub: "cuir", spec: "Nacre · bracelet cuir", price: "dès CHF 1 290", img: "https://images.pexels.com/photos/8160609/pexels-photo-8160609.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Changement de pile", slug: "changement-pile", sub: "service", spec: "Toutes marques · en boutique", price: "dès CHF 15", img: "https://images.pexels.com/photos/8327872/pexels-photo-8327872.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Bracelet de montre", slug: "bracelet-de-montre", sub: "service", spec: "Cuir, acier, milanais", price: "dès CHF 45", img: "https://images.pexels.com/photos/30094119/pexels-photo-30094119.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ]}
  ],

  /* ⚠️ EXEMPLES — remplacer par les vrais avis Google (non scrapables). */
  reviews: {
    rating: "5,0",
    count: 11,
    placeholder: false,     // VRAIS avis Google (récupérés manuellement par Sky)
    // Lien « voir sur Google » — remplacer par l'URL exacte de la fiche (onglet avis) quand dispo.
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Colin+Philippe+bijouterie+Rue+de+Gen%C3%A8ve+71+1225+Ch%C3%AAne-Bourg",
    items: [  // triés du plus récent au plus ancien (mise en avant des récents)
      { author: "Nils Engelberts", stars: 5, text: "Horloger bijoutier très aimable, très chaleureux. Très professionnel. Joli intérieur du magasin. Je recommande à 100% 🤗", ago: "il y a 7 mois", recent: true },
      { author: "Benjamin Huerta", stars: 5, text: "Accueillant, à l'écoute et très professionnel ! Une perle qui fait vivre l'art de la bijouterie avec finesse et passion. Je recommande vivement.", ago: "il y a 1 an", recent: true },
      { author: "Michèle Perroud", stars: 5, text: "Monsieur Colin est un magicien ! Il trouve toujours une solution pour satisfaire sa clientèle. Il aime son métier et ça se voit dans ses très belles créations. Je lui fais confiance à 200%.", ago: "il y a 2 ans" },
      { author: "hervé Stussi", stars: 5, text: "Très bien ! Bijoutier qui œuvre avec compétence et passion.", ago: "il y a 2 ans" },
      { author: "Dario D'Orlando", stars: 5, text: "Tout simplement top ! Je recommande !", ago: "il y a 2 ans" },
      { author: "William Weil", stars: 5, text: "Un véritable artiste bijoutier, création et travail d'exception. Rare de nos jours.", ago: "il y a 7 ans" },
      { author: "Antoine Chevalier", stars: 5, text: "Jolie petite bijouterie habitée par un super créateur.", ago: "il y a 9 ans" }
    ]
  },

  heroImg: "https://images.pexels.com/photos/7167035/pexels-photo-7167035.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
};

/* ---- Index produits + suggestions « du même type » (partagé par V1/V2/V3, logique identique) ----
   Chaque catégorie = 5 items affichés (items) + 3 pièces de fond (more), taguées par sous-type.
   related() = même sous-type d'abord, puis même catégorie → toujours n résultats. */
(function (S) {
  function pool(c) { return (c.items || []).concat(c.more || []); }
  S.categories.forEach(function (c) { pool(c).forEach(function (p) { p.cat = c.slug; }); });
  S.getProduct = function (catSlug, slug) {
    var c = S.categories.filter(function (x) { return x.slug === catSlug; })[0]; if (!c) return null;
    var p = pool(c).filter(function (x) { return x.slug === slug; })[0]; if (!p) return null;
    return { cat: c.slug, catLabel: c.label, catTitle: c.title, name: p.name, slug: p.slug, sub: p.sub, spec: p.spec, price: p.price, img: p.img };
  };
  S.related = function (catSlug, slug, n) {
    n = n || 5;
    var c = S.categories.filter(function (x) { return x.slug === catSlug; })[0]; if (!c) return [];
    var all = pool(c), self = all.filter(function (x) { return x.slug === slug; })[0], sub = self ? self.sub : null;
    var others = all.filter(function (x) { return x.slug !== slug; });
    var same = others.filter(function (x) { return x.sub === sub; });
    var diff = others.filter(function (x) { return x.sub !== sub; });
    return same.concat(diff).slice(0, n).map(function (p) {
      return { cat: c.slug, name: p.name, slug: p.slug, spec: p.spec, price: p.price, img: p.img };
    });
  };
})(window.SITE);
