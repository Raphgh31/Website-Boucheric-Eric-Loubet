/* Boucherie Charcuterie Eric Loubet — scripts de la maquette (aucune dépendance) */
(function () {
  "use strict";

  var NB = " ";

  /* ---------- Horaires : une seule source pour tout le site ---------- */
  // 0 = dimanche … 6 = samedi. À confirmer avec le gérant (voir README).
  var HORAIRES = {
    1: [],
    2: [["08:30", "12:30"], ["15:00", "19:00"]],
    3: [["08:30", "12:30"]],
    4: [["08:30", "12:30"], ["15:30", "19:00"]],
    5: [["08:30", "12:30"], ["15:00", "19:00"]],
    6: [["08:30", "12:30"], ["15:00", "19:00"]],
    0: [["08:30", "12:00"]]
  };
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var ORDRE = [1, 2, 3, 4, 5, 6, 0];

  function h(t) { // "08:30" -> "8h30", "12:00" -> "12h"
    var p = t.split(":"), hh = parseInt(p[0], 10);
    return hh + "h" + (p[1] === "00" ? "" : p[1]);
  }
  function minutes(t) { var p = t.split(":"); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function plages(j) {
    var l = HORAIRES[j];
    if (!l.length) return "Fermé";
    return l.map(function (x) { return h(x[0]) + NB + "–" + NB + h(x[1]); }).join("  ·  ");
  }
  function maintenant() {
    var jour = 0, mins = 0;
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      jour = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[map.weekday];
      mins = (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10);
    } catch (e) {
      var d = new Date(); jour = d.getDay(); mins = d.getHours() * 60 + d.getMinutes();
    }
    return { jour: jour, mins: mins };
  }
  function etat() {
    var n = maintenant(), cr = HORAIRES[n.jour] || [], i;
    for (i = 0; i < cr.length; i++) {
      if (n.mins >= minutes(cr[i][0]) && n.mins < minutes(cr[i][1])) {
        return { ouvert: true, court: "Ouvert", long: "Ouvert jusqu'à" + NB + h(cr[i][1]) };
      }
    }
    for (i = 0; i < cr.length; i++) {
      if (n.mins < minutes(cr[i][0])) return { ouvert: false, court: "Fermé", long: "Fermé · ouvre à" + NB + h(cr[i][0]) };
    }
    for (var k = 1; k <= 7; k++) {
      var j = (n.jour + k) % 7;
      if (HORAIRES[j].length) {
        return { ouvert: false, court: "Fermé", long: "Fermé · ouvre " + (k === 1 ? "demain" : JOURS[j]) + " à" + NB + h(HORAIRES[j][0][0]) };
      }
    }
    return { ouvert: false, court: "Fermé", long: "Fermé" };
  }

  function rendreHoraires() {
    var e = etat(), n = maintenant();
    document.querySelectorAll("[data-etat-court]").forEach(function (el) {
      el.setAttribute("data-etat", e.ouvert ? "ouvert" : "ferme");
      el.textContent = e.long;
    });
    document.querySelectorAll("[data-ticket]").forEach(function (el) {
      var j = JOURS[n.jour];
      el.innerHTML = '<span class="ticket__etat" data-etat="' + (e.ouvert ? "ouvert" : "ferme") + '">' + e.long + "</span>" +
        "Aujourd'hui, " + j + " :<br><b>" + plages(n.jour) + "</b>";
    });
    document.querySelectorAll("[data-table-horaires]").forEach(function (t) {
      t.innerHTML = ORDRE.map(function (j) {
        var ferme = !HORAIRES[j].length;
        return '<tr' + (j === n.jour ? ' class="auj"' : "") + "><th scope=\"row\">" + JOURS[j] + "</th><td" + (ferme ? ' class="ferme"' : "") + ">" + plages(j) + "</td></tr>";
      }).join("");
    });
    document.querySelectorAll("[data-mini-horaires]").forEach(function (u) {
      u.innerHTML = ORDRE.map(function (j) {
        return "<li><span>" + JOURS[j].slice(0, 3) + ".</span><span>" + plages(j).replace("  ·  ", " / ") + "</span></li>";
      }).join("");
    });
  }

  /* ---------- Navigation : glissement gauche / droite entre pages ---------- */
  var PAGES = ["index", "la-maison", "viandes", "traiteur", "fin-gras", "infos"];
  function rang(url) {
    try {
      var s = new URL(url).pathname.split("/").pop().replace(/\.html$/, "");
      var i = PAGES.indexOf(s || "index");
      return i < 0 ? 0 : i;
    } catch (e) { return 0; }
  }
  window.addEventListener("pageswap", function (ev) {
    try {
      if (!ev.viewTransition || !ev.activation || !ev.activation.entry) return;
      var de = rang(ev.activation.from.url), vers = rang(ev.activation.entry.url);
      ev.viewTransition.types.add(vers >= de ? "avance" : "recule");
    } catch (e) { /* navigateur sans types de transition */ }
  });
  window.addEventListener("pagereveal", function (ev) {
    try {
      if (!ev.viewTransition || !window.navigation || !navigation.activation || !navigation.activation.from) return;
      var de = rang(navigation.activation.from.url), vers = rang(navigation.activation.entry.url);
      ev.viewTransition.types.add(vers >= de ? "avance" : "recule");
    } catch (e) { /* idem */ }
  });

  function ajusterNav() {
    var cur = document.querySelector('.nav a[aria-current="page"]');
    if (cur && cur.scrollIntoView && cur.parentElement.scrollWidth > cur.parentElement.clientWidth) {
      cur.parentElement.scrollLeft = cur.offsetLeft - 24;
    }
    var en = document.querySelector(".entete");
    if (en) document.documentElement.style.setProperty("--haut-entete", en.offsetHeight + "px");
  }

  /* ---------- Onglets (viandes, traiteur) ---------- */
  function onglets() {
    document.querySelectorAll("[data-onglets]").forEach(function (zone) {
      var boutons = Array.prototype.slice.call(zone.querySelectorAll('[role="tab"]'));
      var panneaux = Array.prototype.slice.call(document.querySelectorAll("[data-panneau]"));
      function ouvrir(id, maj) {
        var trouve = boutons.some(function (b) { return b.getAttribute("data-onglet") === id; });
        if (!trouve) id = boutons[0].getAttribute("data-onglet");
        boutons.forEach(function (b) { b.setAttribute("aria-selected", String(b.getAttribute("data-onglet") === id)); });
        panneaux.forEach(function (p) { p.hidden = p.getAttribute("data-panneau") !== id; });
        if (maj) { try { history.replaceState(null, "", "#" + id); } catch (e) { /* ignoré */ } }
      }
      boutons.forEach(function (b, i) {
        b.addEventListener("click", function () { ouvrir(b.getAttribute("data-onglet"), true); });
        b.addEventListener("keydown", function (ev) {
          var d = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
          if (!d) return;
          var s = boutons[(i + d + boutons.length) % boutons.length];
          s.focus(); ouvrir(s.getAttribute("data-onglet"), true);
        });
      });
      window.addEventListener("hashchange", function () { ouvrir(location.hash.slice(1), false); });
      ouvrir(location.hash.slice(1), false);
    });
  }

  /* ---------- Morceaux du bœuf ---------- */
  var MORCEAUX = {
    collier: { nom: "Collier", morceaux: "Collier, gros bout de poitrine, joue", cuisson: "Cuisson longue et douce : bourguignon, pot-au-feu, daube.", conseil: "Un morceau riche en collagène. Après deux à trois heures de mijotage, il devient fondant." },
    paleron: { nom: "Épaule · Paleron", morceaux: "Paleron, macreuse à bifteck, jumeau", cuisson: "Paleron en braisé ou en bourguignon. Macreuse et jumeau à la poêle ou au grill.", conseil: "Le paleron est l'un des morceaux préférés pour le plat mijoté du dimanche." },
    cotes: { nom: "Côtes", morceaux: "Entrecôte, côte de bœuf, basses côtes", cuisson: "Grill, barbecue ou poêle, saignant à point. Les basses côtes se braisent.", conseil: "Sortez la viande une demi-heure avant de la cuire, et laissez-la reposer autant de temps qu'elle a cuit." },
    reins: { nom: "Faux-filet · Filet", morceaux: "Faux-filet, filet, tournedos, chateaubriand", cuisson: "Poêle ou four vif. Le filet se rôtit entier pour les repas de fête.", conseil: "Le filet est le morceau le plus tendre. Il demande peu de cuisson et peu d'assaisonnement." },
    croupe: { nom: "Croupe · Rumsteck", morceaux: "Rumsteck, aiguillette baronne, culotte", cuisson: "Grill, poêle, brochettes. L'aiguillette se fait aussi en rôti.", conseil: "Un steak de caractère, au goût franc. Coupez-le toujours en travers des fibres." },
    cuisse: { nom: "Cuisse", morceaux: "Tende de tranche, rond de gîte, gîte noix, noix, tranche grasse", cuisson: "En rôti au four, en steak, en carpaccio pour la tende de tranche.", conseil: "Demandez-nous de ficeler le rôti, il gardera sa forme et son jus." },
    poitrine: { nom: "Poitrine · Plat de côtes", morceaux: "Plat de côtes, tendron, flanchet, bavette", cuisson: "Plat de côtes et tendron au pot-au-feu. Bavette et flanchet à la poêle, très vite.", conseil: "La bavette se cuit vive et se sert tranchée fin, avec une échalote." },
    "jarret-av": { nom: "Jarret avant", morceaux: "Jarret avec son os à moelle", cuisson: "Pot-au-feu, bouillon, osso buco de bœuf.", conseil: "L'os à moelle donne tout son goût au bouillon. Gardez-le." },
    "jarret-ar": { nom: "Jarret arrière", morceaux: "Jarret, gîte", cuisson: "Mijotés, pot-au-feu, daube.", conseil: "Prévoyez du temps : c'est la cuisson longue qui fait le plaisir." }
  };

  function schema() {
    var fiche = document.querySelector("[data-fiche]");
    if (!fiche) return;
    var zones = Array.prototype.slice.call(document.querySelectorAll("[data-zone]"));
    var liste = document.querySelector("[data-zone-liste]");
    var boutons = [];
    function afficher(id) {
      var m = MORCEAUX[id]; if (!m) return;
      zones.forEach(function (z) { z.setAttribute("aria-pressed", String(z.getAttribute("data-zone") === id)); });
      boutons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
      fiche.innerHTML = "<h3>" + m.nom + "</h3><dl>" +
        "<div><dt>Au comptoir</dt><dd>" + m.morceaux + "</dd></div>" +
        "<div><dt>Cuisson</dt><dd>" + m.cuisson + "</dd></div>" +
        "<div><dt>À savoir</dt><dd>" + m.conseil + "</dd></div></dl>";
    }
    zones.forEach(function (z) {
      var id = z.getAttribute("data-zone");
      z.addEventListener("click", function () { afficher(id); });
      z.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); afficher(id); } });
    });
    if (liste) {
      Object.keys(MORCEAUX).forEach(function (id) {
        var b = document.createElement("button");
        b.type = "button"; b.setAttribute("data-id", id); b.setAttribute("aria-pressed", "false"); b.textContent = MORCEAUX[id].nom;
        b.addEventListener("click", function () { afficher(id); });
        liste.appendChild(b); boutons.push(b);
      });
    }
    afficher("cotes");
  }

  /* ---------- Préparer sa commande ---------- */
  // Tarifs relevés sur la carte de Noël 2024. À remplacer par la carte en cours.
  var CARTE = [
    ["Entrées froides", [
      ["Foie gras de canard", 120, "kg"], ["Médaillon de saumon", 30.9, "kg"], ["Saumon fumé (Craponne-sur-Arzon)", 74.9, "kg"]]],
    ["Entrées chaudes", [
      ["Bouchée aux ris de veau", 5.9, "pièce"], ["Boudin blanc nature", 16.9, "kg"], ["Boudin blanc aux morilles", 21.9, "kg"],
      ["Boudin blanc truffé", 28.9, "kg"], ["Cassolette aux ris de veau et aux morilles", 7.9, "pièce"], ["Coquille Saint-Jacques", 6.5, "pièce"], ["Feuilleté aux morilles", 4.5, "pièce"]]],
    ["Volailles", [
      ["Chapon fermier Label Rouge", 17.9, "kg"], ["Suprême de chapon", 25.9, "kg"], ["Pintade chaponnée", 21.9, "kg"],
      ["Cuisse de chapon", 19.9, "kg"], ["Dinde fermière Label Rouge", 18.9, "kg"], ["Poularde fermière", 17.9, "kg"]]],
    ["Rôtis farcis", [
      ["Rôti de chapon, farce forestière", 29.9, "kg"], ["Rôti de pintade, farce aux marrons", 24.9, "kg"]]],
    ["Plats cuisinés", [
      ["Carbonade de sanglier à la bière", 8.9, "part"], ["Filet de poularde sauce morilles", 9.9, "part"],
      ["Filet de veau sauce forestière", 10.9, "part"], ["Corolle de limande au beurre d'ail des ours", 9.9, "part"]]],
    ["Accompagnements", [
      ["Gratin de courge aux châtaignes", 16.9, "kg"], ["Gratin dauphinois aux cèpes", 3.9, "part"], ["Pomme dauphine", 18.9, "kg"],
      ["Purée à la truffe noire", 19.9, "kg"], ["Risotto aux cèpes", 3.5, "part"]]]
  ];

  function eur(x) { return x.toFixed(2).replace(".", ",") + NB + "€"; }
  function qte(x, u) { return String(x).replace(".", ",") + NB + u; }

  function commande() {
    var zone = document.querySelector("[data-lignes]");
    if (!zone) return;
    var items = [], html = "";
    CARTE.forEach(function (g) {
      html += '<div class="groupe-titre">' + g[0] + "</div>";
      g[1].forEach(function (it) {
        var i = items.length; items.push(it);
        html += '<div class="ligne" data-i="' + i + '"><label for="q' + i + '">' + it[0] + "<small>" + eur(it[1]) + " / " + it[2] + "</small></label>" +
          '<input id="q' + i + '" type="number" min="0" step="' + (it[2] === "kg" ? "0.1" : "1") + '" inputmode="decimal" value="0" aria-label="Quantité : ' + it[0] + '">' +
          '<span class="unite">' + it[2] + "</span></div>";
      });
    });
    zone.innerHTML = html;
    var sortie = document.querySelector("[data-recap]"), totalEl = document.querySelector("[data-total]");
    var nom = document.getElementById("c-nom"), date = document.getElementById("c-date"), note = document.getElementById("c-note");
    var ok = document.querySelector("[data-ok]");

    function texte() {
      var lignes = [], total = 0;
      items.forEach(function (it, i) {
        var v = parseFloat(String(document.getElementById("q" + i).value).replace(",", "."));
        var row = zone.querySelector('[data-i="' + i + '"]');
        if (v > 0) {
          var p = v * it[1]; total += p;
          lignes.push("• " + qte(v, it[2]) + "  " + it[0] + "  (≈" + NB + eur(p) + ")");
          row.classList.add("actif");
        } else { row.classList.remove("actif"); }
      });
      var t = "Bonjour, je souhaite passer commande";
      if (nom.value.trim()) t += "\nNom : " + nom.value.trim();
      if (date.value) {
        var d = new Date(date.value + "T12:00:00");
        t += "\nRetrait souhaité : " + d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      }
      t += "\n\n" + (lignes.length ? lignes.join("\n") : "(aucun produit choisi)");
      if (lignes.length) t += "\n\nTotal estimé : " + eur(total);
      if (note.value.trim()) t += "\n\nRemarque : " + note.value.trim();
      sortie.textContent = t;
      totalEl.textContent = eur(total);
      return t;
    }
    ["input", "change"].forEach(function (ev) { document.querySelector("[data-commande]").addEventListener(ev, function () { texte(); ok.textContent = ""; }); });
    document.querySelector("[data-copier]").addEventListener("click", function () {
      var t = texte();
      function fait() { ok.textContent = "Récapitulatif copié."; }
      function secours() {
        var r = document.createRange(); r.selectNodeContents(sortie);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        ok.textContent = "Texte sélectionné : copiez-le avec Ctrl+C.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(fait, secours); else secours();
    });
    var f = document.querySelector("[data-commande]");
    f.addEventListener("submit", function (ev) { ev.preventDefault(); });
    var demain = new Date(); demain.setDate(demain.getDate() + 1);
    date.min = demain.toISOString().slice(0, 10);
    texte();
  }

  document.addEventListener("DOMContentLoaded", function () {
    rendreHoraires(); onglets(); schema(); commande(); ajusterNav();
    window.addEventListener("resize", ajusterNav);
    setInterval(rendreHoraires, 60000);
  });
})();
