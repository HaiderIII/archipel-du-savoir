// ═══════════════════════════════════════════════════════
// CASE TYPES
// ═══════════════════════════════════════════════════════
export const CT = {
  coins_plus: { l: "+2", c: "#D4A017", e: "🪙", d: "Pièces +2" },
  coins_minus: { l: "−3", c: "#C0392B", e: "💀", d: "Pièces −3" },
  question:    { l: "?",  c: "#2980B9", e: "❓", d: "Question" },
  duel:        { l: "⚔",  c: "#D35400", e: "⚔️", d: "Duel" },
  chaos:       { l: "✦",  c: "#8E44AD", e: "🌀", d: "Chaos" },
  shop:        { l: "$",  c: "#27AE60", e: "🛒", d: "Boutique" },
  bridge:      { l: "→",  c: "#8B6914", e: "🌉", d: "Pont (3₽)" },
  teleport:    { l: "◎",  c: "#00BCD4", e: "⚡", d: "Téléporteur (5₽)" },
  bonus:       { l: "+5", c: "#1ABC9C", e: "💎", d: "Bonus +5" },
  steal:       { l: "↗",  c: "#E91E63", e: "🫳", d: "Vol 3₽" },
  double:      { l: "×2", c: "#FF9800", e: "🎰", d: "Dé ×2" },
  shield:      { l: "🛡", c: "#607D8B", e: "🛡️", d: "Bouclier" },
};

// ═══════════════════════════════════════════════════════
// DIFFICULTY LEVELS
// ═══════════════════════════════════════════════════════
export const LC = {
  college: { label: "Collège", emoji: "🟢", color: "#2ECC71", coins: "+1₽", val: 1, penalty: 0 },
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
export const CC = [
  {
    e: "🫳", n: "Vol de pièces",
    d: "Désignez une équipe adverse : volez-lui 3₽ immédiatement.",
    tip: "L'équipe active choisit la victime.",
  },
  {
    e: "🌩️", n: "Tempête",
    d: "Toutes les équipes perdent 2₽.",
    tip: "Personne n'est épargné.",
  },
  {
    e: "🌟", n: "Bénédiction",
    d: "L'équipe qui a le moins de pièces reçoit 5₽ bonus.",
    tip: "En cas d'égalité au bas, chaque équipe concernée reçoit 5₽.",
  },
  {
    e: "😱", n: "Peur du vide",
    d: "L'équipe en tête (plus de pièces) perd 4₽.",
    tip: "En cas d'égalité au sommet, chaque équipe concernée perd 4₽.",
  },
  {
    e: "💰", n: "Aubaine",
    d: "L'équipe active (celle qui a tiré la carte) gagne 5₽ immédiatement.",
    tip: "Avantage direct pour l'équipe dont c'est le tour.",
  },
  {
    e: "🔄", n: "Échange royal",
    d: "Échangez TOUTES les pièces entre les équipes 1 & 3, puis entre les équipes 2 & 4.",
    tip: "Seules les pièces changent, pas les étoiles.",
  },
  {
    e: "🎁", n: "Don empoisonné",
    d: "L'équipe active doit donner 4₽ à une équipe adverse de son choix. Si elle n'a pas assez, elle donne tout ce qu'elle a.",
    tip: "L'équipe active choisit à qui elle donne.",
  },
  {
    e: "🎲", n: "Double ou rien",
    d: "L'équipe active peut parier jusqu'à 6₽ sur la prochaine question tirée. Bonne réponse = mise doublée. Faux = mise perdue.",
    tip: "Le pari est optionnel ; s'annonce avant de tirer la question.",
  },
  {
    e: "🧠", n: "Amnésie",
    d: "La prochaine question tirée (quel que soit le niveau) ne rapporte AUCUNE pièce à personne ce tour.",
    tip: "Annonce-le avant de tirer la question.",
  },
  {
    e: "🏓", n: "Ricochet",
    d: "Chaque équipe donne 1₽ à l'équipe suivante dans l'ordre du tour (1→2→3→4→1).",
    tip: "Opération simultanée. Le total de pièces dans le jeu reste identique.",
  },
  {
    e: "💀", n: "Malédiction",
    d: "Désignez une équipe : elle perd 1 bouclier. Si elle n'a aucun bouclier, elle perd 3₽ à la place.",
    tip: "L'équipe active choisit la cible.",
  },
  {
    e: "🤝", n: "Solidarité",
    d: "Toutes les équipes reçoivent 2₽.",
    tip: "L'inverse de la Tempête.",
  },
  {
    e: "🃏", n: "Retournement",
    d: "Retournez IMMÉDIATEMENT le plateau (Recto ↔ Verso), sans attendre le prochain résultat de dé de mini-jeu.",
    tip: "N'oubliez pas d'inverser aussi le sens de tous les raccourcis !",
  },
  {
    e: "📚", n: "Question bonus",
    d: "Tirez une question Expert maintenant. Si l'équipe active répond juste, elle gagne 8₽ au lieu de 5₽. Si elle répond faux, elle perd 2₽.",
    tip: "La question est tirée et résolue immédiatement, en bonus du tour normal.",
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
