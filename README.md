# Boucherie Charcuterie Eric Loubet — maquette de site web

Maquette de présentation (première ébauche) du futur site de la **Boucherie Charcuterie Eric Loubet**, 9 rue du Marché, 43130 Retournac (Haute-Loire).
L'objectif est de montrer au commerçant ce que pourrait donner son site, avant tout démarchage commercial.

> Ce site n'est **pas** le site officiel de la boutique. Un bandeau « Maquette de présentation » en haut de chaque page et une mention en pied de page le disent clairement. Pour les retirer dans la version finale : supprimer `.bandeau__maquette` (en-tête) et la phrase finale du `<small>` du pied de page dans chaque fichier HTML.

## Ce que contient le site

Six vraies pages, reliées par une barre de navigation horizontale en haut. Le passage d'une page à l'autre glisse de gauche à droite (ou inversement selon le sens dans le menu) dans les navigateurs qui gèrent les transitions de page (Chrome, Edge). Les autres navigateurs affichent un changement de page classique.

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Photo du comptoir, horaires du jour avec état ouvert/fermé en direct, 4 « ardoises » vers les rubriques, repères, apprentis, appel aux commandes de fêtes |
| La maison | `la-maison.html` | Le comptoir, l'équipe, la formation des apprentis, engagements, repères chronologiques |
| Nos viandes | `viandes.html` | Onglets Bœuf, Veau, Porc, Agneau, Volailles, Charcuterie. **Schéma interactif du bœuf** : on clique sur un morceau pour voir ce qu'on y découpe et comment le cuire |
| Traiteur & fêtes | `traiteur.html` | Traiteur au quotidien, **carte des fêtes** (tarifs de Noël 2024), **préparation de commande** avec total estimé et récapitulatif à copier |
| Fin Gras du Mézenc | `fin-gras.html` | Présentation de l'appellation, l'affiche « J'adhère » de la vitrine |
| Infos & accès | `infos.html` | Horaires (jour en cours surligné), adresse, téléphone, e-mail, lien itinéraire |

Choix de design : identité reprise de la boutique (chêne clair du comptoir, noir ardoise des suspensions, rouge du logo), typographies condensées en capitales comme sur l'enseigne, étiquettes d'ardoise comme celles de la vitrine, ticket de caisse pour les horaires. Pas de page unique qui défile : chaque rubrique a sa page.

## Structure technique

Site statique, sans outil de build ni dépendance.

```
index.html, la-maison.html, viandes.html, traiteur.html, fin-gras.html, infos.html
assets/site.css        styles
assets/site.js         horaires, onglets, schéma du bœuf, formulaire de commande, transitions de page
assets/img/            photos fournies et logo
```

- Les polices viennent de Google Fonts (Barlow Condensed, Source Serif 4, Caveat, Courier Prime).
- Les **horaires** sont définis à un seul endroit : l'objet `HORAIRES` en haut de `assets/site.js`.
- Les **tarifs de la commande** sont dans le tableau `CARTE` de `assets/site.js` ; la carte imprimée de la page traiteur est dans `traiteur.html`. Les deux sont à mettre à jour ensemble.
- Pour tester en local : `python3 -m http.server` à la racine, puis ouvrir `http://localhost:8000`.
- Hébergement possible sur n'importe quel hébergeur statique (GitHub Pages, Netlify, OVH…).

## D'où viennent les informations

Je n'ai pas pu ouvrir plusieurs sites (annuaires, presse locale, Facebook) depuis l'environnement de travail. Les informations ci-dessous viennent des extraits de résultats de recherche et des photos fournies.

**Trouvé sur Internet (recoupé sur plusieurs annuaires)**
- Adresse : 9 rue du Marché, 43130 Retournac. Téléphone : 04 71 59 40 28. E-mail : boucherie.loubet@orange.fr.
- Société « Boucherie Loubet Eric » (SARL boucherie traiteur Loubet Eric), SIRET 494 053 713 00017, début d'activité en 2007.
- Offre : charcuterie artisanale, veau élevé sous la mère, volailles, bœuf du Limousin ou de l'Aubrac, rôtisserie, plats cuisinés et service traiteur avec accompagnements.
- Note moyenne de 4,9/5 sur 42 avis Google (annuaires ; à revérifier).
- Eric Loubet est président du syndicat des bouchers, charcutiers, traiteurs de Haute-Loire (presse locale).
- Un de ses apprentis, Lucas Peyret (Saint-Vincent), a reçu le Prix Médicis du meilleur projet professionnel à la finale nationale « Un des Meilleurs Apprentis Bouchers de France », à Ajaccio.
- Boutique référencée sur « Mon boucher et moi » (fédération des artisans bouchers d'Auvergne-Rhône-Alpes).
- Retournac : aux portes des gorges de la Loire, à 35 km du Puy-en-Velay.

**Déduit des photos**
- Affiche « Le Fin Gras du Mézenc, J'adhère » sur la vitrine, bannière et affiches « Tous avec l'Équipe de France de boucherie » (Coupe du monde de boucherie, Paris, 30 et 31 mars 2025), autocollants CFBCT sur la porte, photo « Arras 2024 » avec l'équipe.
- Carte de Noël 2024 (prix et plats), lue sur les affiches. Quelques prix étaient coupés sur la photo (caille, fondue bourguignonne, gigot, terrines) : le site indique « en boutique ».

**Sources consultées**
- [Pages Jaunes](https://www.pagesjaunes.fr/pros/50232199), [Tripadvisor](https://www.tripadvisor.com/Restaurant_Review-g3946379-d27904703-Reviews-Boucherie_Loubet_Eric-Retournac_Haute_Loire_Auvergne_Rhone_Alpes.html), [Cœur des Sucs](https://www.coeur-des-sucs.fr/societes/boucherie-charcuterie-eric-loubet/), [Boucherie-Charcuterie.fr](https://www.boucherie-charcuterie.fr/boucherie-loubet-eric-retournac.html)
- [Mon boucher et moi](https://www.monboucheretmoi.org/bouchers/boucherie-loubet-3216/), [Société.com](https://www.societe.com/societe/boucherie-loubet-eric-494053713.html)
- [La Commère 43 : Meilleur Apprenti de France boucher](https://www.lacommere43.fr/actualites/item/44676-meilleur-apprenti-de-france-boucherie-deux-jeunes-de-hauet-loire-qualifies-en-finale-nationale.html)
- [CFBCT : Coupe du monde de boucherie en France](https://www.boucherie-france.org/la-france-va-accueillir-la-prochaine-coupe-du-monde-de-boucherie-wbc/)
- Page Facebook de la boutique : https://www.facebook.com/loubetboucherie/

## À vérifier et à demander au gérant

Les textes évitent d'inventer, mais plusieurs éléments sont à confirmer. Voici la liste à poser à Eric Loubet.

### 1. Horaires (les annuaires se contredisent)
- Heure d'ouverture le matin : 8h, 8h15 ou 8h30 ? Réouverture l'après-midi : 15h, 15h30 ou 16h selon les jours ?
- Dimanche : fermeture à 12h ou 12h30 ? Lundi fermé ?
- Fermetures annuelles, horaires d'été, horaires des fêtes (24 et 31 décembre) ?

### 2. Histoire et équipe
- Date et histoire de la reprise ou de la création de la boutique. Parcours d'Eric Loubet (formation, anciennes maisons, depuis quand il est boucher).
- Qui compose l'équipe : prénoms, postes, nombre d'apprentis. Accord de chacun pour figurer sur le site avec sa photo.
- Depuis quand préside-t-il le syndicat des bouchers, charcutiers, traiteurs de Haute-Loire ? Autres engagements ou distinctions.
- Lucas Peyret : année exacte du Prix Médicis et accord pour être cité. D'autres apprentis ou salariés primés ?
- Photo d'Arras 2024 : quel événement exactement (finale du concours des apprentis ?) et qui sont les personnes sur la photo ?
- Participation à la Coupe du monde de boucherie (mars 2025) : simple soutien à l'Équipe de France ou rôle plus actif ?

### 3. Produits et approvisionnement
- Origine du bœuf (Aubrac, Limousin ?), du veau, de l'agneau, du porc, des volailles. Noms des éleveurs et fournisseurs locaux qu'il souhaite citer.
- La charcuterie est-elle fabriquée sur place ? Quelles spécialités maison (pâtés, saucisses, boudins, jambons, saucissons) ?
- Viandes maturées ? Durée de maturation ?
- Spécialités qu'il veut mettre en avant (rôtis farcis, tartare d'agneau, brochettes, merguez…).
- Fin Gras du Mézenc : dates exactes de la saison, morceaux disponibles, préparation à l'avance, éleveurs partenaires.
- Les conseils de cuisson de la page « Nos viandes » sont des conseils génériques : à relire et à adapter à sa façon de faire.

### 4. Traiteur et fêtes
- Carte des fêtes de l'année en cours (Noël, Nouvel An, Pâques, Fête des mères, etc.), avec les tarifs à jour.
- Plats du jour et rôtisserie : quels jours, quels plats ? Un menu de la semaine à publier ?
- Prestations pour événements (mariages, repas d'association, buffets, plateaux) : oui ou non, minimum de personnes, délais, zone de livraison.
- Date limite de commande pour les fêtes (19 décembre en 2024).
- Souhaite-t-il recevoir les commandes par e-mail, par téléphone ou par message ?

### 5. Services et pratique
- Paiements acceptés (carte, espèces, chèques, titres-restaurant, paiement sans contact).
- Livraison, drive, retrait en boutique, commande en ligne.
- Parking, accessibilité pour les personnes à mobilité réduite.
- Réseaux sociaux (Facebook, Instagram) et fréquence des publications.
- Avis clients : accord pour afficher de vrais extraits d'avis Google.

### 6. Éléments d'identité
- Logo en haute définition ou vectoriel (le logo utilisé ici est une petite image).
- Photos en haute résolution : vitrine, produits, équipe, laboratoire, devanture. Photos de qualité professionnelle possibles.
- Nom de domaine déjà possédé ou souhaité, adresse e-mail professionnelle.
- Raison sociale exacte, SIRET, hébergeur, responsable de la publication pour les mentions légales.
- Droit d'utiliser les photos (les photos fournies viennent de réseaux sociaux ou de l'équipe).

## Pour passer de la maquette au site final

- Brancher le formulaire de commande sur un envoi réel (e-mail ou service de formulaire). Aujourd'hui il compose un récapitulatif à copier.
- Remplacer les tarifs de la carte des fêtes 2024 par ceux de l'année.
- Ajouter une page mentions légales, une politique de confidentialité et la gestion des cookies si un outil de mesure est ajouté.
- Ajouter une vraie carte Google Maps ou OpenStreetMap, selon le choix de l'hébergeur et du gérant.
- Compléter les images (les vignettes tirées de la planche de photos sont petites : à remplacer par les originaux).
- Renseigner un nom de domaine, le référencement local (fiche Google, balises de données structurées `LocalBusiness`) et vérifier l'accessibilité.
