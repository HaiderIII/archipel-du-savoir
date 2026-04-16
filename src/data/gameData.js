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
  // ── Cartes fréquentes (count:3) ── légères, impactantes
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
    e: "💰", n: "Aubaine", count: 3,
    d: "L'équipe active (celle qui a tiré la carte) gagne 5₽ immédiatement.",
    tip: "Avantage direct pour l'équipe dont c'est le tour.",
    apply: "active_gain5",
  },
  {
    e: "💸", n: "Taxe", count: 3,
    d: "L'équipe active perçoit 2₽ sur chaque équipe adverse (soit jusqu'à +6₽). Les équipes sans pièces ne paient rien.",
    tip: "L'effet est asymétrique : l'active gagne ce que les autres perdent.",
    apply: "tax",
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
    e: "👑", n: "Coup d'état", count: 2,
    d: "L'équipe qui a le plus d'étoiles perd 1⭐. L'équipe qui en a le moins en gagne 1⭐. Si toutes sont à égalité, aucun effet.",
    tip: "En cas d'ex-æquo au sommet ou en bas, toutes les équipes concernées sont affectées.",
    apply: "coup",
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
    d: "L'équipe active parie jusqu'à 6₽. Une question est tirée immédiatement : bonne réponse = mise doublée, faux = mise perdue.",
    tip: "Fixez votre mise AVANT de voir la question.",
    apply: "double_ou_rien",
  },
  {
    e: "⚖️", n: "Balance", count: 2,
    d: "Toutes les pièces sont mises en commun et redistribuées équitablement (arrondi vers le bas). Le reste disparaît.",
    tip: "Dévastateur si les écarts sont grands. Calculez la moyenne avant d'appliquer.",
    apply: "balance",
  },
  // ── Cartes rares (count:1) ── puissantes ou structurantes
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
    d: "Tirez une question Expert maintenant. Bonne réponse = +8₽. Faux = −2₽.",
    tip: "La question est résolue immédiatement, en bonus du tour normal.",
    apply: "bonus_question",
  },
  {
    e: "⏳", n: "Sablier", count: 1,
    d: "Une question est tirée immédiatement avec un chrono de 15 secondes. Hors délai = 0 pièce pour tout le monde.",
    tip: "Le chrono démarre dès la lecture de la question à voix haute.",
    apply: "sablier",
  },
  {
    e: "💣", n: "Héritage", count: 1,
    d: "L'équipe la plus riche en pièces en donne la moitié aux autres équipes (à parts égales, arrondi vers le bas).",
    tip: "Le reste éventuel disparaît. Effet nul si le plus riche a 0 ou 1₽.",
    apply: "inheritance",
  },
  {
    e: "🎰", n: "Jackpot", count: 1,
    d: "Une équipe est tirée au sort et reçoit 8₽ immédiatement.",
    tip: "Complètement aléatoire — même l'équipe active peut perdre !",
    apply: "jackpot",
  },
  {
    e: "🌀", n: "Échange de positions", count: 1,
    d: "L'équipe active désigne un adversaire : les deux équipes échangent IMMÉDIATEMENT leurs cases sur le plateau.",
    tip: "Les pièces et étoiles ne changent pas. Peut forcer un adversaire sur une mauvaise case.",
    apply: "swap_pos",
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
