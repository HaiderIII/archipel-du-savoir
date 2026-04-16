# Archipel — Jeu de plateau interactif

Archipel est un jeu de société numérique pour **4 équipes**, conçu pour être projeté en classe ou en soirée. L'animateur pilote l'application depuis un écran, les équipes jouent autour de lui.

---

## Démarrage rapide

```bash
npm install
npm run dev      # serveur de développement (localhost:5173)
npm run build    # génère dist/index.html (fichier unique autonome)
```

Ouvrez `dist/index.html` directement dans un navigateur — aucun serveur requis.

---

## Règles du jeu

### But du jeu
Collecter le plus d'**étoiles ⭐** avant la fin du dernier tour. En cas d'égalité sur les étoiles, les **pièces** font office de départage.

---

### Mise en place

1. Saisissez le nom des 4 équipes dans l'onglet **🏠 Tableau**.
2. Choisissez le nombre de tours (8 recommandés pour ~60 min).
3. Chaque équipe démarre sur la case `1a` avec **0 pièce** et **0 étoile**.

---

### Déroulement d'un tour

Chaque **tour** se compose de **4 demi-tours** (un par équipe, dans l'ordre 1 → 2 → 3 → 4). À la fin du 4e demi-tour, un **mini-jeu** est déclenché pour toutes les équipes, puis le tour suivant commence.

**Pendant son demi-tour, une équipe :**

1. Lance le dé (1 à 6) depuis l'onglet **🎯 Plateau**.
2. Les cases accessibles s'affichent — l'équipe choisit sa destination.
3. L'effet de la case d'arrivée se déclenche automatiquement.
4. Le tour passe à l'équipe suivante.

> **Étoile sur le chemin** : si le pion traverse une étoile ⭐ pendant son déplacement, une fenêtre propose d'acheter l'étoile (12₽). L'achat est optionnel ; l'effet de la case de destination se déclenche ensuite normalement.

---

### Types de cases

| Symbole | Nom | Effet |
|---------|-----|-------|
| **?₽** | Pièces | Lance la roulette → gain ou perte de pièces aléatoire |
| **?** | Question | L'équipe choisit une difficulté et répond à une question |
| **⚔** | Duel | Deux équipes s'affrontent sur une question ou un mini-jeu |
| **✦** | Chaos | Tirez une carte Chaos (effets variés) |
| **$** | Boutique | Achetez un objet avec vos pièces |
| **→** | Pont | Raccourci payant (2₽, ou 4₽ si Péage actif) |
| **◎** | Téléporteur | Saut vers n'importe quel autre téléporteur (3₽) |

---

### Questions

Trois niveaux de difficulté :

| Niveau | Récompense en cas de bonne réponse | Pénalité en cas d'erreur |
|--------|------------------------------------|--------------------------|
| 🟢 Collège | +3₽ | 0 |
| 🟡 Lycée | +3₽ | 0 |
| 🔴 Expert | +5₽ | −2₽ |

Les catégories couvrent : **Sciences, Histoire-Géo, Littérature, Arts, Culture générale, Pop culture**.

---

### Roulette ?₽

Quand une équipe arrive sur une case **?₽**, une roulette s'anime :
- Accélération rapide → vitesse de croisière → décélération progressive.
- La valeur finale peut être **positive** (gain) ou **négative** (perte).
- Distribution centrée sur +2₽ à +4₽, avec de rares −1₽ à −10₽.

---

### Boutique

Objets disponibles (achetés avec des pièces, utilisables à tout moment sauf indication contraire) :

| Objet | Coût | Effet |
|-------|------|-------|
| 🎲 Double dé | 5₽ | Ce tour : lancez le dé deux fois, cumulez les résultats |
| 🛡️ Bouclier | 3₽ | Annule le prochain effet négatif (automatique) |
| 🍄 Poison | 8₽ | Une équipe adverse perd 4₽ au début de son prochain tour |
| 🫳 Voleur | 7₽ | Volez 5₽ à une équipe adverse (bloquable par Bouclier) |
| 🔄 Échangeur | 12₽ | Échangez votre position sur le plateau avec un adversaire |

---

### Cartes Chaos

Tirées automatiquement en atterrissant sur une case **✦**. Le paquet contient 43 cartes (14 effets différents, comptages variés).

Effets notables :

- **Retournement 🃏** *(×4)* — Retourne le plateau (Recto ↔ Verso) immédiatement.
- **Vol de pièces 🫳** *(×3)* — Volez 3₽ à une équipe de votre choix.
- **Tempête 🌩️** *(×3)* — Toutes les équipes perdent 2₽.
- **Aubaine 💰** *(×3)* — L'équipe active gagne 5₽.
- **Double ou rien 🎲** *(×2)* — Pariez jusqu'à 6₽ sur une question tirée à l'instant.
- **Question bonus 📚** *(×1)* — Question Expert : +8₽ si correct, −2₽ si faux.
- **Sablier ⏳** *(×1)* — Question avec chrono 15 secondes ; temps dépassé = 0 pièce.

> Les cartes **Double ou rien**, **Question bonus** et **Sablier** ouvrent une question directement dans la fenêtre de la carte Chaos.

---

### Mini-jeux

Un mini-jeu est déclenché à la fin de chaque tour (après le 4e demi-tour). L'animateur lit les règles, les équipes jouent, puis enregistre le résultat.

Types de mini-jeux : **Tous contre tous** / **Équipes**

Exemples : Blind test, Mimes, Je suis… (Post-it), Rapidité, Devinettes, etc.

---

### Fin de partie

Quand le dernier tour se termine, trois **récompenses de fin de partie** sont attribuées :

| Récompense | Critère | Bonus |
|------------|---------|-------|
| 🧠 Le Savant | Plus de bonnes réponses aux questions | +1⭐ |
| 🏆 Le Bagarreur | Plus de mini-jeux gagnés | +1⭐ |
| 🧭 L'Explorateur | Plus de cases uniques visitées | +1⭐ |

En cas d'égalité, toutes les équipes concernées reçoivent le bonus.

Le **classement final** est affiché : ⭐ en critère principal, pièces en départage.

---

## Architecture technique

```
src/
  App.jsx          — Composant racine + toute la logique de jeu (~4700 lignes)
  data/
    gameData.js    — Cases, niveaux, équipes, cartes Chaos, boutique, récompenses
    questions.js   — Banque de questions (Collège / Lycée / Expert)
    miniGames.js   — Catalogue de mini-jeux
```

- **React 19** + **Vite** + **vite-plugin-singlefile** (sortie : un seul `index.html`)
- Persistance via `localStorage` (reprise de partie possible)
- Aucune dépendance réseau à l'exécution

---

## Contribuer

1. Ajoutez des questions dans `src/data/questions.js` (respectez le format `{ q, r, cat, level }`).
2. Ajoutez des mini-jeux dans `src/data/miniGames.js` (respectez le format `{ id, n, e, d, fmt, format, clues? }`).
3. `npm run build` → distribuez `dist/index.html`.
