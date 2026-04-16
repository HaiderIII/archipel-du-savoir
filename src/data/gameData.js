// ═══════════════════════════════════════════════════════
// CASE TYPES
// ═══════════════════════════════════════════════════════
export const CT = {
  coins:    { l: "?₽", c: "#D4A017", e: "🪙", d: "Pièces aléatoires (±)" },
  question: { l: "?",  c: "#2980B9", e: "❓", d: "Question" },
  duel:     { l: "⚔",  c: "#D35400", e: "⚔️", d: "Duel" },
  chaos:    { l: "✦",  c: "#8E44AD", e: "🌀", d: "Chaos" },
  shop:     { l: "$",  c: "#27AE60", e: "🛒", d: "Boutique" },
  bridge:   { l: "→",  c: "#8B6914", e: "🌉", d: "Pont (2₽)" },
  teleport: { l: "◎",  c: "#00BCD4", e: "⚡", d: "Téléporteur (5₽)" },
};

// ═══════════════════════════════════════════════════════
// DIFFICULTY LEVELS
// ═══════════════════════════════════════════════════════
export const LC = {
  college: { label: "Collège", emoji: "🟢", color: "#2ECC71", coins: "+3₽", val: 3, penalty: 0 },
  lycee:   { label: "Lycée",   emoji: "🟡", color: "#F1C40F", coins: "+3₽", val: 3, penalty: 0 },
  expert:  { label: "Expert",  emoji: "🔴", color: "#E74C3C", coins: "+5₽ / −2₽", val: 5, penalty: -2 },
};

// ═══════════════════════════════════════════════════════
// TEAM COLORS & EMOJIS
// ═══════════════════════════════════════════════════════
export const TC = ["#E74C3C", "#3498DB", "#2ECC71", "#F39C12"];
export const TE = ["🔴", "🔵", "🟢", "🟡"];

// ═══════════════════════════════════════════════════════
// CARTES CHAOS  (14 effets perturbateurs)
// ═══════════════════════════════════════════════════════
// count = nombre d'exemplaires dans le paquet (varie selon la puissance)
export const CC = [
  // ── Cartes fréquentes (count:3) ── légères, reversibles
  {
    e: "🫳", n: "Vol de pièces", count: 3,
    d: "Désignez une équipe adverse : volez-lui 3₽ immédiatement.",
    tip: "L'équipe active choisit la victime.",
    apply: "steal3",
  },
  {
    e: "🌩️", n: "Tempête", count: 3,
    d: "Toutes les équipes perdent 2₽.",
    tip: "Personne n'est épargné.",
    apply: "all_lose2",
  },
  {
    e: "🤝", n: "Solidarité", count: 3,
    d: "Toutes les équipes reçoivent 2₽.",
    tip: "L'inverse de la Tempête.",
    apply: "all_gain2",
  },
  {
    e: "🏓", n: "Ricochet", count: 3,
    d: "Chaque équipe donne 1₽ à l'équipe suivante dans l'ordre du tour (1→2→3→4→1).",
    tip: "Opération simultanée. Le total de pièces dans le jeu reste identique.",
    apply: "ricochet",
  },
  {
    e: "💰", n: "Aubaine", count: 3,
    d: "L'équipe active (celle qui a tiré la carte) gagne 5₽ immédiatement.",
    tip: "Avantage direct pour l'équipe dont c'est le tour.",
    apply: "active_gain5",
  },
  // ── Cartes moyennes (count:2) ── impact modéré
  {
    e: "🌟", n: "Bénédiction", count: 2,
    d: "L'équipe qui a le moins de pièces reçoit 5₽ bonus.",
    tip: "En cas d'égalité au bas, chaque équipe concernée reçoit 5₽.",
    apply: "poorest_gain5",
  },
  {
    e: "😱", n: "Peur du vide", count: 2,
    d: "L'équipe en tête (plus de pièces) perd 4₽.",
    tip: "En cas d'égalité au sommet, chaque équipe concernée perd 4₽.",
    apply: "richest_lose4",
  },
  {
    e: "🎁", n: "Don empoisonné", count: 2,
    d: "L'équipe active doit donner 4₽ à une équipe adverse de son choix. Si elle n'a pas assez, elle donne tout ce qu'elle a.",
    tip: "L'équipe active choisit à qui elle donne.",
    apply: "give4",
  },
  {
    e: "💀", n: "Malédiction", count: 2,
    d: "Désignez une équipe : elle perd 1 bouclier. Si elle n'a aucun bouclier, elle perd 3₽ à la place.",
    tip: "L'équipe active choisit la cible.",
    apply: "curse",
  },
  {
    e: "🧠", n: "Amnésie", count: 2,
    d: "La prochaine question tirée (quel que soit le niveau) ne rapporte AUCUNE pièce à personne ce tour.",
    tip: "Annonce-le avant de tirer la question.",
    apply: "amnesia",
  },
  {
    e: "🌊", n: "Tsunami", count: 2,
    d: "L'équipe qui a le plus de pièces perd 5₽. En cas d'égalité au sommet, toutes les équipes concernées perdent 5₽.",
    tip: "Les riches trinquent !",
    apply: "richest_lose5",
  },
  {
    e: "🌈", n: "Arc-en-ciel", count: 2,
    d: "Chaque équipe reçoit autant de pièces que le nombre d'étoiles qu'elle possède.",
    tip: "0 étoile = 0₽. Une carte qui récompense les leaders.",
    apply: "stars_to_coins",
  },
  {
    e: "🚧", n: "Péage", count: 2,
    d: "Les ponts coûtent 4₽ au lieu de 2₽ pendant 2 tours d'équipe. L'effet s'annule automatiquement.",
    tip: "Chaque fois qu'une équipe passe son tour, le compteur descend d'un. À 0 : retour au tarif normal.",
    apply: "bridge_tax",
  },
  {
    e: "🎲", n: "Double ou rien", count: 2,
    d: "L'équipe active peut parier jusqu'à 6₽ sur la prochaine question tirée. Bonne réponse = mise doublée. Faux = mise perdue.",
    tip: "Le pari est optionnel ; s'annonce avant de tirer la question.",
    apply: "manual",
  },
  // ── Cartes rares (count:1) ── puissantes ou structurantes
  {
    e: "🔄", n: "Échange royal", count: 1,
    d: "Échangez TOUTES les pièces entre les équipes 1 & 3, puis entre les équipes 2 & 4.",
    tip: "Seules les pièces changent, pas les étoiles.",
    apply: "royal_swap",
  },
  {
    e: "🧲", n: "Aimant", count: 1,
    d: "L'équipe active choisit 2 équipes adverses. Ces 2 équipes s'échangent TOUTES leurs pièces.",
    tip: "Stratégique : force deux adversaires à se déstabiliser mutuellement.",
    apply: "magnet",
  },
  {
    e: "⭐", n: "Vol d'étoile", count: 1,
    d: "Désignez une équipe adverse possédant au moins 1 étoile : volez-lui 1 étoile immédiatement.",
    tip: "Si aucune équipe adverse n'a d'étoile, la carte n'a aucun effet.",
    apply: "steal_star",
  },
  {
    e: "🃏", n: "Retournement", count: 4,
    d: "Retournez IMMÉDIATEMENT le plateau (Recto ↔ Verso), sans attendre le prochain résultat de dé de mini-jeu.",
    tip: "N'oubliez pas d'inverser aussi le sens de tous les raccourcis !",
    apply: "flip_board",
  },
  {
    e: "📚", n: "Question bonus", count: 1,
    d: "Tirez une question Expert maintenant. Si l'équipe active répond juste, elle gagne 8₽ au lieu de 5₽. Si elle répond faux, elle perd 2₽.",
    tip: "La question est tirée et résolue immédiatement, en bonus du tour normal.",
    apply: "manual",
  },
  {
    e: "⏳", n: "Sablier", count: 1,
    d: "La prochaine question est chronométrée : 15 secondes max. Si le temps est dépassé, aucune pièce n'est accordée.",
    tip: "L'hôte démarre le chrono dès la lecture de la question.",
    apply: "manual",
  },
  {
    e: "🎭", n: "Troc", count: 1,
    d: "L'équipe active propose un échange à une équipe adverse : X₽ contre Y₽. Si l'adversaire accepte, l'échange est fait.",
    tip: "L'équipe adverse peut refuser. L'offre doit être décidée avant de voir les montants.",
    apply: "manual",
  },
];

// ═══════════════════════════════════════════════════════
// BOUTIQUE  (5 objets)
// ═══════════════════════════════════════════════════════
export const SI = [
  {
    e: "🎲", n: "Double dé", c: 5,
    d: "Ce tour, relancez votre dé et cumulez les deux résultats pour déterminer votre déplacement.",
  },
  {
    e: "🛡️", n: "Bouclier", c: 3,
    d: "Annule le prochain effet négatif sur votre équipe (case 💀, −₽, Duel, Chaos). Passif, joué automatiquement.",
  },
  {
    e: "🍄", n: "Poison", c: 8,
    d: "Une équipe adverse de votre choix perd 4₽ au début de son prochain tour (avant tout déplacement).",
  },
  {
    e: "🫳", n: "Voleur", c: 7,
    d: "Volez 5₽ à une équipe adverse de votre choix. Peut être bloqué par un Bouclier.",
  },
  {
    e: "🔄", n: "Échangeur", c: 12,
    d: "Échangez VOTRE position sur le plateau avec celle d'une équipe adverse. Ni les pièces ni les étoiles ne changent.",
  },
];

// ═══════════════════════════════════════════════════════
// AWARDS  (3 récompenses de fin de partie)
// ═══════════════════════════════════════════════════════
export const AW = [
  {
    e: "🧠", n: "Le Savant",
    d: "L'équipe avec le plus de bonnes réponses aux questions gagne +1⭐.",
    stat: "qOk",
    label: "bonnes réponses",
  },
  {
    e: "🏆", n: "Le Bagarreur",
    d: "L'équipe avec le plus de mini-jeux gagnés remporte +1⭐.",
    stat: "mgWon",
    label: "mini-jeux gagnés",
  },
  {
    e: "🧭", n: "L'Explorateur",
    d: "L'équipe ayant visité le plus de cases uniques sur le plateau remporte +1⭐.",
    stat: "visitedCases",
    label: "cases visitées",
  },
];
