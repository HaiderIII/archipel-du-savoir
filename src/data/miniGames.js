// ═══════════════════════════════════════════════════════════════════
// MINI-JEUX  —  30 jeux, 5 formats
// ✏️  Pour modifier un jeu : trouver son id et changer les champs.
//    Pour ajouter un jeu : copier un bloc existant et incrémenter l'id.
//    Pour supprimer : retirer l'objet du tableau.
//
// RÉCOMPENSES : tous les mini-jeux utilisent le classement par score.
//   Le MJ attribue les rangs 🥇🥈🥉4e en fin de jeu.
//   RANK_COINS = [8, 4, 2, 0] — voir MiniGameRanking dans App.jsx
//
// Types de contenu :
//   "questions"  → { q, r, cat }        questions avec réponses cachées
//   "themes"     → { label, cat }        thèmes à citer en cadence
//   "words"      → string[]              mots/concepts à deviner
//   "pairs"      → { a, b }             paires Undercover / Memory
//   "statements" → { text, answer, cat } Vrai/Faux ou Menteur
//   "debate"     → { topic, cat }        sujets de débat
//   "definitions"→ { word, def }         mots rares
//   "clues"      → { name, answer, clues }  indices progressifs
//   "series"     → { title, cat, items }    Timeline
//   "taboo"      → { word, forbidden[] }    Tabou
//   "top5"       → { q, answers[], cat }    classement
// ═══════════════════════════════════════════════════════════════════

export const FORMAT = {
  tous:     { label: "Tous contre tous", color: "#E74C3C", emoji: "🔴", short: "TOUS" },
  teams:    { label: "2 vs 2",           color: "#00BCD4", emoji: "🔵", short: "2v2"  },
  solo:     { label: "1 vs 3",           color: "#2ECC71", emoji: "🟢", short: "1v3"  },
  tournoi:  { label: "Tournoi 1v1",      color: "#8E44AD", emoji: "🟣", short: "1v1"  },
  coop:     { label: "Coopératif",       color: "#D35400", emoji: "🟤", short: "COOP" },
};

// Récompenses par rang (utilisées par le système de classement en fin de mini-jeu)
export const RANK_COINS = [8, 4, 2, 0];

export const MG = [

  // ═══════════════════════════════════════════
  // FORMAT : TOUS CONTRE TOUS  (10 jeux)
  // ═══════════════════════════════════════════

  {
    id: 1, emoji: "🔔", name: "Buzzer Culture",
    format: "tous", duration: "~5 min",
    desc: "Question posée à voix haute. Première équipe à taper sur la table et donner la bonne réponse gagne le point. Mauvaise réponse = éliminée pour cette question.",
    rules: [
      "Le MJ lit la question lentement.",
      "Première équipe qui tape la table a 5 secondes pour répondre.",
      "Bonne réponse → +1 point. Mauvaise réponse → éliminée pour cette question.",
      "Les autres équipes peuvent répondre si la première est éliminée.",
      "10 questions par manche.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "12 questions buzzer",
      items: [
        { q: "Quel philosophe grec a fondé l'Académie à Athènes ?", r: "Platon", cat: "PHILO" },
        { q: "Quel traité de 1648 a mis fin à la guerre de Trente Ans ?", r: "Les traités de Westphalie", cat: "HIST" },
        { q: "Quel est l'élément chimique de symbole Fe ?", r: "Le fer", cat: "SCIENCE" },
        { q: "Qui a écrit « Du contrat social » en 1762 ?", r: "Jean-Jacques Rousseau", cat: "PHILO" },
        { q: "Quel peintre a réalisé « La Liberté guidant le peuple » ?", r: "Eugène Delacroix", cat: "ART" },
        { q: "Quel détroit sépare l'Europe de l'Asie au niveau d'Istanbul ?", r: "Le Bosphore", cat: "GÉO" },
        { q: "Quel scientifique a co-découvert la structure de l'ADN avec Watson ?", r: "Francis Crick (et Rosalind Franklin)", cat: "SCIENCE" },
        { q: "Quelle dynastie a bâti la Cité interdite de Pékin ?", r: "La dynastie Ming", cat: "HIST" },
        { q: "Quelle est la capitale de l'Australie ?", r: "Canberra", cat: "GÉO" },
        { q: "Dans quel film Simba est-il le personnage principal ?", r: "Le Roi Lion", cat: "POP" },
        { q: "Quel savant a découvert la structure hélicoïdale de l'ADN avec Watson et Crick ?", r: "Rosalind Franklin", cat: "SCIENCE" },
        { q: "Quel savant arabe du XIe s. a écrit le Canon de la médecine ?", r: "Ibn Sina (Avicenne)", cat: "SCIENCE" },
      ],
    },
  },

  {
    id: 2, emoji: "📝", name: "Chrono-Liste",
    format: "tous", duration: "~5 min",
    desc: "Thème annoncé. Chaque équipe à tour de rôle a 5 secondes pour donner une réponse valide. Répétition ou temps dépassé = éliminé. Dernière équipe debout gagne.",
    rules: [
      "Le MJ annonce le thème.",
      "Les équipes répondent en rotation (sens des aiguilles).",
      "5 secondes max par réponse.",
      "Réponse répétée, hors thème ou délai dépassé → équipe éliminée.",
      "Dernière équipe restante = gagnante.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "themes", title: "14 thèmes (12 légitimes / 2 pop)",
      items: [
        { label: "Auteurs français de littérature", cat: "LIT", emoji: "📚" },
        { label: "Empereurs romains", cat: "HIST", emoji: "🏛️" },
        { label: "Pays d'Afrique", cat: "GÉO", emoji: "🌍" },
        { label: "Éléments du tableau périodique", cat: "SCIENCE", emoji: "🔬" },
        { label: "Capitales européennes", cat: "GÉO", emoji: "🗺️" },
        { label: "Peintres et artistes célèbres", cat: "ART", emoji: "🎨" },
        { label: "Dieux de la mythologie grecque", cat: "MYTH", emoji: "📖" },
        { label: "Organes du corps humain", cat: "SCIENCE", emoji: "🧪" },
        { label: "Fleuves du monde", cat: "GÉO", emoji: "🌊" },
        { label: "Compositeurs de musique classique", cat: "ART", emoji: "🎵" },
        { label: "Présidents de la Ve République française", cat: "POLITIQUE", emoji: "⚖️" },
        { label: "Guerres et conflits célèbres de l'histoire", cat: "HIST", emoji: "📜" },
        { label: "Films d'animation Disney/Pixar", cat: "POP", emoji: "🎬" },
        { label: "Jeux vidéo célèbres (toute époque)", cat: "POP", emoji: "🎮" },
      ],
    },
  },

  {
    id: 3, emoji: "♟️", name: "Quoridor — 4 Joueurs",
    format: "tous", duration: "~10 min",
    desc: "Plateau 7×7. Chaque équipe contrôle un pion et doit atteindre le bord opposé. À chaque tour : avancer d'une case OU poser un mur (2 cases de long).",
    rules: [
      "Plateau : grille 7×7 (peut se dessiner sur papier).",
      "Placement : 🔴 milieu nord · 🔵 milieu sud · 🟢 milieu ouest · 🟡 milieu est.",
      "4 murs par équipe.",
      "Tour : avancer d'1 case (H/B/G/D) OU poser un mur.",
      "Sauter si pion adverse adjacent et case libre derrière.",
      "Règle d'or : JAMAIS bloquer totalement le chemin d'un joueur.",
      "Premier à atteindre son bord opposé gagne.",
      "Temps max : 10 min. Sinon : joueur le plus avancé gagne.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: "📦 Plateau 7×7 (carton), 4 pions, 16 barrières (bâtonnets de glace / allumettes)",
    content: {
      type: "themes", title: "Disposition de départ",
      items: [
        { label: "🔴 au milieu du bord nord", cat: "POS", emoji: "⬆️" },
        { label: "🔵 au milieu du bord sud", cat: "POS", emoji: "⬇️" },
        { label: "🟢 au milieu du bord ouest", cat: "POS", emoji: "⬅️" },
        { label: "🟡 au milieu du bord est", cat: "POS", emoji: "➡️" },
      ],
    },
  },

  {
    id: 4, emoji: "🕵️", name: "Undercover",
    format: "tous", duration: "~10 min",
    desc: "Chaque joueur reçoit un mot secret. Tous ont le même mot SAUF 1 Undercover qui a un mot légèrement différent. Chaque joueur donne 1 indice en 1 mot, puis vote pour éliminer l'Undercover.",
    rules: [
      "Le MJ distribue les cartes en secret (1 carte par joueur).",
      "3 joueurs ont le mot A, 1 joueur a le mot B (proche mais différent).",
      "Chacun donne 1 indice en UN seul mot — pas trop évident !",
      "Puis vote : qui est l'Undercover ?",
      "Si l'Undercover est éliminé → les équipes qui l'ont démasqué gagnent (+3 pts chacune).",
      "Si l'Undercover survit → il gagne seul (+6 pts).",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "pairs", title: "20 paires de mots (15 légitimes / 5 pop)",
      items: [
        { a: "Monarchie", b: "Dictature" },
        { a: "Révolution", b: "Réforme" },
        { a: "Symphonie", b: "Concerto" },
        { a: "Volcan", b: "Geyser" },
        { a: "Pyramide", b: "Temple" },
        { a: "Atome", b: "Molécule" },
        { a: "Renaissance", b: "Lumières" },
        { a: "Océan", b: "Mer" },
        { a: "Tragédie", b: "Comédie" },
        { a: "Démocratie", b: "République" },
        { a: "Fossile", b: "Minéral" },
        { a: "Continent", b: "Archipel" },
        { a: "Philosophe", b: "Théologien" },
        { a: "Fresque", b: "Mosaïque" },
        { a: "Soleil", b: "Étoile" },
        { a: "Fortnite", b: "Minecraft" },
        { a: "Netflix", b: "YouTube" },
        { a: "Kebab", b: "Tacos" },
        { a: "iPhone", b: "Android" },
        { a: "Ramen", b: "Pho" },
      ],
    },
  },

  {
    id: 5, emoji: "✍️", name: "Le Petit Bac Savant",
    format: "tous", duration: "~7 min",
    desc: "Lettre tirée au sort + 8 catégories (6 légitimes, 2 pop). 2 minutes chrono. +1 pt par réponse valide, +2 pts si réponse unique dans la catégorie.",
    rules: [
      "Tirer une lettre au sort (éviter X, W, K, Y).",
      "8 catégories à remplir en 2 minutes.",
      "Réponse valide = réel, accepté par le groupe.",
      "+1 pt par réponse valide. +2 pts si personne d'autre n'a la même.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "themes", title: "8 catégories",
      items: [
        { label: "Pays du monde", cat: "GÉO", emoji: "🗺️" },
        { label: "Auteur, penseur ou philosophe", cat: "LIT", emoji: "📚" },
        { label: "Personnage ou événement historique", cat: "HIST", emoji: "🏛️" },
        { label: "Terme scientifique ou naturel", cat: "SCIENCE", emoji: "🔬" },
        { label: "Œuvre d'art ou monument", cat: "ART", emoji: "🎨" },
        { label: "Fleuve, montagne ou relief", cat: "GÉO", emoji: "⛰️" },
        { label: "Film ou série connue", cat: "POP", emoji: "🎬" },
        { label: "Aliment ou plat du monde", cat: "FOOD", emoji: "🍽️" },
      ],
    },
  },

  {
    id: 6, emoji: "🔢", name: "Le Juste Prix Culturel",
    format: "tous", duration: "~6 min",
    desc: "Question chiffrée posée à voix haute. Chaque équipe écrit sa réponse sur papier. La plus proche gagne (sans dépasser ou avec tolérance définie par le MJ).",
    rules: [
      "Le MJ lit la question chiffrée.",
      "Chaque équipe écrit sa réponse sur papier, SANS regarder les autres.",
      "Révélation simultanée.",
      "La plus proche de la vraie valeur gagne.",
      "En cas d'égalité : point partagé.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "12 questions chiffrées (9 légitimes / 3 pop)",
      items: [
        { q: "En quelle année Gutenberg a-t-il imprimé sa Bible ?", r: "1455", cat: "HIST" },
        { q: "Combien d'os dans le corps humain adulte ?", r: "206", cat: "SCIENCE" },
        { q: "Combien de pays sur le continent africain ?", r: "54", cat: "GÉO" },
        { q: "En quelle année a été signée la Déclaration des droits de l'Homme en France ?", r: "1789", cat: "HIST" },
        { q: "Combien de symphonies Beethoven a-t-il composées ?", r: "9", cat: "ART" },
        { q: "À quelle vitesse (km/s) la lumière se déplace-t-elle ?", r: "~300 000 km/s", cat: "SCIENCE" },
        { q: "Combien de sourates dans le Coran ?", r: "114", cat: "CULTURE" },
        { q: "En quelle année l'Homme a-t-il marché sur la Lune pour la première fois ?", r: "1969", cat: "SCIENCE" },
        { q: "Combien de langues officielles à l'ONU ?", r: "6", cat: "GÉO" },
        { q: "Quelle est la hauteur de la Tour Eiffel (avec antenne) ?", r: "330 m", cat: "HIST" },
        { q: "Combien de joueurs dans une équipe de basketball ?", r: "5", cat: "SPORT" },
        { q: "En quelle année YouTube a-t-il été fondé ?", r: "2005", cat: "TECH" },
      ],
    },
  },

  {
    id: 7, emoji: "✅", name: "Vrai ou Faux Express",
    format: "tous", duration: "~5 min",
    desc: "Affirmations lues rapidement. Chaque équipe lève VRAI ou FAUX (pouces haut/bas) simultanément. Pas de changement d'avis.",
    rules: [
      "Le MJ lit l'affirmation. Chaque équipe répond simultanément.",
      "VRAI = pouces en l'air. FAUX = pouces en bas.",
      "Bonne réponse → +1 point.",
      "Tolérance zéro : la première gestuelle compte.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "statements", title: "16 affirmations (12 légitimes / 4 pop)",
      items: [
        { text: "Socrate n'a jamais rien écrit lui-même.", answer: "VRAI", cat: "PHILO" },
        { text: "Cléopâtre a vécu plus près de nous que de la construction des pyramides.", answer: "VRAI", cat: "HIST" },
        { text: "Le cœur humain est situé entièrement à gauche de la poitrine.", answer: "FAUX", cat: "SCIENCE", note: "Il est centré, légèrement incliné à gauche" },
        { text: "L'Empire ottoman a duré plus de 600 ans.", answer: "VRAI", cat: "HIST" },
        { text: "Napoléon mesurait moins d'1 m 60.", answer: "FAUX", cat: "HIST", note: "Il mesurait ~1,68 m — légende due à la confusion des mesures françaises et anglaises" },
        { text: "Les bananes sont botaniquement des baies.", answer: "VRAI", cat: "SCIENCE" },
        { text: "Voltaire et Rousseau sont morts la même année (1778).", answer: "VRAI", cat: "HIST" },
        { text: "L'Éthiopie utilise un calendrier différent du grégorien.", answer: "VRAI", cat: "CULTURE", note: "Elle a ~7 ans de retard sur le calendrier grégorien" },
        { text: "L'Antarctique est le plus grand désert du monde.", answer: "VRAI", cat: "GÉO" },
        { text: "Marie-Antoinette a dit « Qu'ils mangent de la brioche ».", answer: "FAUX", cat: "HIST", note: "Cette phrase ne lui est jamais confirmée — probablement une légende" },
        { text: "Il y a plus d'étoiles dans l'univers que de grains de sable sur Terre.", answer: "VRAI", cat: "SCIENCE" },
        { text: "Mozart est mort à l'âge de 35 ans.", answer: "VRAI", cat: "ART" },
        { text: "La Grande Muraille de Chine est visible depuis la Lune à l'œil nu.", answer: "FAUX", cat: "GÉO" },
        { text: "Les araignées ne dorment jamais.", answer: "FAUX", cat: "NATURE", note: "Elles ont des phases de sommeil" },
        { text: "Le Japon possède plus de distributeurs automatiques par habitant que tout autre pays.", answer: "VRAI", cat: "POP" },
        { text: "Le mot « algèbre » vient de l'arabe.", answer: "VRAI", cat: "SCIENCE", note: "De Al-jabr (Al-Khwarizmi)" },
      ],
    },
  },

  {
    id: 8, emoji: "🔗", name: "Chaîne de Mots",
    format: "tous", duration: "~5 min",
    desc: "Un mot de départ est annoncé. Chaque équipe à tour de rôle dit un mot LIÉ et justifie le lien en 5 secondes. Mauvaise justification ou délai dépassé → éliminé.",
    rules: [
      "Le MJ annonce le mot de départ.",
      "Chaque équipe dit un mot lié et justifie le lien en 5 secondes.",
      "Le lien doit être logique et expliqué clairement.",
      "Mauvaise justification ou temps dépassé → éliminé.",
      "Dernière équipe restante = gagnante.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "words", title: "12 mots de départ (9 légitimes / 3 pop)",
      items: ["Athènes", "Gravité", "Révolution", "Renaissance", "Empire", "Mythologie", "Évolution", "Justice", "Colonisation", "Intelligence artificielle", "Architecture", "Calendrier"],
    },
  },

  {
    id: 9, emoji: "🚫", name: "Le Mot Interdit (Tabou)",
    format: "tous", duration: "~7 min",
    desc: "Faire deviner un mot SANS utiliser les 3 mots interdits. 45 secondes par équipe. Interdit aussi : même famille de mots, gestes.",
    rules: [
      "Le MJ montre la carte à l'équipe qui joue (sans que les autres voient).",
      "L'équipe a 45s pour faire deviner le mot en évitant les 3 interdits.",
      "Mots de même famille = interdit. Gestes = interdit.",
      "Si l'équipe utilise un interdit → passage à la carte suivante, 0 point.",
      "+1 point par mot deviné.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "taboo", title: "20 cartes Tabou (17 légitimes / 3 pop)",
      items: [
        { word: "DÉMOCRATIE", forbidden: ["vote", "peuple", "politique"] },
        { word: "PHOTOSYNTHÈSE", forbidden: ["plante", "soleil", "oxygène"] },
        { word: "RENAISSANCE", forbidden: ["Italie", "art", "époque"] },
        { word: "COLISÉE", forbidden: ["Rome", "gladiateur", "arène"] },
        { word: "CONSTITUTION", forbidden: ["loi", "droits", "État"] },
        { word: "DARWINISME", forbidden: ["évolution", "espèce", "singe"] },
        { word: "SPHINX", forbidden: ["Égypte", "lion", "pyramide"] },
        { word: "PHILOSOPHIE", forbidden: ["penser", "sagesse", "Socrate"] },
        { word: "RÉVOLUTION", forbidden: ["France", "1789", "révolte"] },
        { word: "GRAVITATION", forbidden: ["Newton", "pomme", "tomber"] },
        { word: "MANUSCRIT", forbidden: ["écrire", "livre", "ancien"] },
        { word: "COLONIALISME", forbidden: ["empire", "Afrique", "territoire"] },
        { word: "BOUSSOLE", forbidden: ["nord", "direction", "aiguille"] },
        { word: "OLYMPE", forbidden: ["dieu", "Grèce", "montagne"] },
        { word: "PARLEMENT", forbidden: ["loi", "député", "assemblée"] },
        { word: "MARATHON", forbidden: ["courir", "course", "42 km"] },
        { word: "OPÉRA", forbidden: ["chanter", "théâtre", "musique"] },
        { word: "BITCOIN", forbidden: ["argent", "crypto", "monnaie"] },
        { word: "SUSHI", forbidden: ["Japon", "riz", "poisson"] },
        { word: "SELFIE", forbidden: ["photo", "téléphone", "visage"] },
      ],
    },
  },

  {
    id: 10, emoji: "🏆", name: "Top 5",
    format: "tous", duration: "~6 min",
    desc: "Question de classement posée. 60s pour écrire ses 5 réponses dans l'ordre. +1 pt par bonne réponse, +2 pts si n°1 exact.",
    rules: [
      "Le MJ lit la question de classement.",
      "Chaque équipe écrit ses 5 réponses classées en 60 secondes.",
      "Comparaison : +1 pt par réponse dans la liste officielle. +2 pts si n°1 exact.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "top5", title: "8 questions Top 5",
      items: [
        { q: "Les 5 plus grands empires de l'histoire (superficie)", answers: ["Empire britannique", "Empire mongol", "Empire russe", "Empire espagnol", "Omeyyades (Empire arabe)"], cat: "HIST" },
        { q: "Les 5 pays les plus peuplés du monde (2024)", answers: ["Inde", "Chine", "États-Unis", "Indonésie", "Pakistan"], cat: "GÉO" },
        { q: "Les 5 livres les plus traduits au monde", answers: ["La Bible", "Le Petit Prince", "Pinocchio", "Alice au pays des merveilles", "Don Quichotte"], cat: "LIT" },
        { q: "Les 5 éléments les plus abondants dans la croûte terrestre", answers: ["Oxygène", "Silicium", "Aluminium", "Fer", "Calcium"], cat: "SCIENCE" },
        { q: "Les 5 plus grands pays du monde (superficie)", answers: ["Russie", "Canada", "États-Unis", "Chine", "Brésil"], cat: "GÉO" },
        { q: "Les 5 langues les plus parlées dans le monde", answers: ["Mandarin", "Espagnol", "Anglais", "Hindi", "Arabe"], cat: "LIT" },
        { q: "Les 5 monuments les plus visités au monde", answers: ["Grande Muraille de Chine", "Machu Picchu", "Colisée", "Tour Eiffel", "Taj Mahal"], cat: "ART" },
        { q: "Les 5 scientifiques les plus influents de l'histoire (au choix)", answers: ["Newton", "Einstein", "Darwin", "Marie Curie", "Pasteur"], cat: "SCIENCE" },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FORMAT : 2 VS 2  (9 jeux)
  // ═══════════════════════════════════════════

  {
    id: 11, emoji: "🎭", name: "Qui suis-je — Relais",
    format: "teams", duration: "~7 min",
    desc: "5 indices du plus vague au plus précis. Une équipe peut buzzer à tout moment. Plus tôt = plus de points. 4 manches.",
    rules: [
      "Le MJ lit les indices dans l'ordre, du plus vague au plus précis.",
      "Les équipes peuvent buzzer à tout moment entre deux indices.",
      "Bonne réponse au 1er indice : +5 pts. 2e : +4 pts. 3e : +3 pts. 4e : +2 pts. 5e : +1 pt.",
      "Mauvaise réponse : interdit de répondre pour cette manche.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "clues", title: "6 sujets (5 légitimes / 1 pop)",
      items: [
        { answer: "Napoléon Bonaparte", clues: ["Je suis né sur une île méditerranéenne en 1769.", "J'ai réformé le système juridique de mon pays.", "J'ai couronné moi-même comme symbole de ma puissance.", "On me représente souvent la main dans le manteau.", "Ma défaite à Waterloo a mis fin à mon règne."] },
        { answer: "Marie Curie", clues: ["Je suis née en Pologne au XIXe siècle.", "Je me suis installée à Paris pour étudier.", "J'ai été la première femme à recevoir un Prix Nobel.", "Je l'ai reçu deux fois dans deux disciplines différentes.", "Mes recherches sur la radioactivité ont révolutionné la physique."] },
        { answer: "Leonardo da Vinci", clues: ["Je suis né en Toscane en 1452.", "J'étais à la fois artiste, scientifique et ingénieur.", "Mes carnets contenaient des plans d'inventions futuristes.", "J'ai peint une femme au sourire énigmatique.", "Mon plus grand tableau est exposé au Louvre."] },
        { answer: "Cléopâtre VII", clues: ["Je suis la dernière souveraine de ma dynastie.", "J'ai régné sur un empire qui longe un grand fleuve.", "J'ai eu des liaisons avec deux grands généraux romains.", "Je parlais plusieurs langues, dont le grec et l'égyptien.", "Ma mort est associée à un serpent venimeux."] },
        { answer: "Albert Einstein", clues: ["Je suis né en Allemagne en 1879.", "J'ai fui le nazisme et me suis exilé aux États-Unis.", "J'ai publié ma théorie de la relativité restreinte à 26 ans.", "Ma formule la plus célèbre est une équation sur 5 symboles.", "J'ai reçu le Prix Nobel de Physique en 1921."] },
        { answer: "Hermione Granger", clues: ["Je suis un personnage de fiction.", "Je suis connue pour mon intelligence et mes bonnes notes.", "Je vis des aventures dans une école de magie.", "Mon meilleur ami s'appelle Harry.", "J'ai été jouée par Emma Watson au cinéma."] },
      ],
    },
  },

  {
    id: 12, emoji: "✏️", name: "Dessin-Devinette",
    format: "teams", duration: "~6 min",
    desc: "Un dessinateur reçoit un mot, l'alliance devine en 60 secondes. Interdit d'écrire des lettres ou des chiffres.",
    rules: [
      "Les 4 équipes jouent en 2v2 : 1 dessinateur + 1 devineur (ou 2) par alliance.",
      "60 secondes par carte.",
      "Interdit d'écrire, de parler, de mimer.",
      "+2 pts par mot trouvé.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: "📦 Feuilles et stylos",
    content: {
      type: "words", title: "20 mots à dessiner (15 légitimes / 5 pop)",
      items: [
        "Le Parthénon", "Microscope", "Pyramides de Gizeh", "La Joconde", "Philosophe grec",
        "Globe terrestre", "Éruption volcanique", "Chevalier en armure", "Système solaire",
        "Statue de la Liberté", "ADN (double hélice)", "Pharaon", "Anneaux olympiques",
        "Iceberg", "Big Bang", "Astronaute", "Robot", "Surf", "Parachute", "Locomotive à vapeur",
      ],
    },
  },

  {
    id: 13, emoji: "🎤", name: "Blind Test Fredonné",
    format: "teams", duration: "~7 min",
    desc: "Fredonner ou taper le rythme d'un morceau sans paroles ni titre. L'alliance adverse doit deviner le titre ET l'artiste.",
    rules: [
      "1 joueur par alliance fredonne / tapeà le rythme du morceau.",
      "L'alliance adverse a 20 secondes pour deviner titre + artiste.",
      "+2 pts pour le titre seul. +1 pt bonus pour l'artiste.",
      "Si personne ne trouve en 20s : l'alliance qui fredonnait peut voler le point.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "16 morceaux (12 légitimes / 4 pop)",
      items: [
        { q: "Fredonner : Ode à la Joie", r: "Beethoven — 9e Symphonie", cat: "ART" },
        { q: "Fredonner : La Marseillaise (incipit)", r: "Hymne national français", cat: "HIST" },
        { q: "Fredonner : Les Quatre Saisons — Le Printemps", r: "Vivaldi", cat: "ART" },
        { q: "Fredonner : Für Elise", r: "Beethoven", cat: "ART" },
        { q: "Fredonner : Boléro de Ravel", r: "Maurice Ravel — Boléro", cat: "ART" },
        { q: "Fredonner : La Petite Musique de Nuit", r: "Mozart — Eine kleine Nachtmusik", cat: "ART" },
        { q: "Fredonner : Clair de Lune", r: "Claude Debussy", cat: "ART" },
        { q: "Fredonner : Hymne de la Ligue des Champions", r: "UEFA Champions League Anthem (Handel/Handel)", cat: "ART" },
        { q: "Fredonner : Bella Ciao", r: "Chant partisan italien — Bella Ciao", cat: "HIST" },
        { q: "Fredonner : L'Internationale", r: "L'Internationale (hymne socialiste)", cat: "HIST" },
        { q: "Fredonner : Le Lac des Cygnes", r: "Tchaïkovski — Le Lac des Cygnes", cat: "ART" },
        { q: "Fredonner : God Save the King", r: "Hymne national britannique", cat: "HIST" },
        { q: "Fredonner : Thème de Star Wars", r: "John Williams — Star Wars", cat: "POP" },
        { q: "Fredonner : Pirates des Caraïbes (thème principal)", r: "Hans Zimmer — He's a Pirate", cat: "POP" },
        { q: "Fredonner : Bohemian Rhapsody", r: "Queen — Bohemian Rhapsody", cat: "POP" },
        { q: "Fredonner : Alors on danse", r: "Stromae — Alors on danse", cat: "POP" },
      ],
    },
  },

  {
    id: 14, emoji: "🤐", name: "Mime en Chaîne",
    format: "teams", duration: "~6 min",
    desc: "Un concept est mimé de joueur en joueur. Le dernier de la chaîne doit deviner. Aucun mot, aucun son. 3 manches.",
    rules: [
      "Le MJ montre le mot uniquement au premier joueur de chaque alliance.",
      "Chaque joueur mime à son partenaire (2 joueurs par alliance).",
      "Le deuxième joueur devine le concept mimé.",
      "Interdit : parler, souffler, écrire, montrer du doigt un objet réel.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "words", title: "12 concepts à mimer (10 légitimes / 2 pop)",
      items: [
        "Napoléon se couronnant", "Archimède criant eurêka dans son bain", "Volcan en éruption",
        "Pharaon sur son trône", "Christophe Colomb découvrant l'Amérique", "Galilée observant avec un télescope",
        "Gladiateur dans l'arène", "Marche sur la Lune", "Chute du mur de Berlin",
        "Archimède dans son bain", "Sculpteur au travail (Rodin)", "Pilote d'avion dans un cockpit",
      ],
    },
  },

  {
    id: 15, emoji: "🗺️", name: "La Carte Muette",
    format: "teams", duration: "~6 min",
    desc: "Le MJ pointe un pays sur une carte muette (sans noms). L'alliance doit l'identifier. La première à donner la bonne réponse marque.",
    rules: [
      "Utiliser une carte muette (monde ou continent, imprimée ou projetée).",
      "Le MJ pointe successivement des pays.",
      "Première alliance à nommer correctement = +2 pts.",
      "Mauvaise réponse = silencieux, pas de pénalité.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: "📦 Carte muette du monde imprimée (ou projetée)",
    content: {
      type: "words", title: "15 pays à pointer (100% géographie)",
      items: [
        "Éthiopie", "Turquie", "Iran", "Pérou", "Norvège",
        "Madagascar", "Pakistan", "Colombie", "Mongolie", "Grèce",
        "Nigeria", "Afghanistan", "Chili", "Thaïlande", "Pologne",
      ],
    },
  },

  {
    id: 16, emoji: "🔑", name: "Mot de Passe",
    format: "teams", duration: "~6 min",
    desc: "UN seul mot comme indice pour faire deviner un mot secret à son partenaire. Si raté, l'alliance adverse peut voler avec son propre indice.",
    rules: [
      "Chaque alliance reçoit le même mot secret (le MJ le montre en secret).",
      "Un joueur donne UN seul mot comme indice à son partenaire.",
      "Si le partenaire trouve : +3 pts.",
      "Si raté : l'alliance adverse peut tenter avec SON propre indice. Réussite = vol +2 pts.",
      "Mots de la même famille interdits.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "words", title: "20 mots secrets (15 légitimes / 5 pop)",
      items: [
        "MONARCHIE", "HIÉROGLYPHE", "GRAVITATION", "ÉPIDÉMIE", "RENAISSANCE",
        "ODYSSÉE", "CONSTITUTION", "TSUNAMI", "ARISTOCRATIE", "CONSTELLATION",
        "HÉRÉSIE", "DIALECTIQUE", "CARTOGRAPHIE", "SÉDIMENT", "CALLIGRAPHIE",
        "PODCAST", "MARATHON", "RÉALITÉ VIRTUELLE", "HASHTAG", "STREAMING",
      ],
    },
  },

  {
    id: 17, emoji: "⏳", name: "Timeline",
    format: "teams", duration: "~5 min",
    desc: "5 événements à classer dans l'ordre chronologique. 60 secondes de concertation en équipe. Parfait = +6 pts, sinon +1 pt par bonne position.",
    rules: [
      "Le MJ annonce les 5 événements dans le désordre.",
      "60 secondes de concertation interne.",
      "Chaque équipe écrit son classement de 1 (le plus ancien) à 5 (le plus récent).",
      "Parfait (ordre exact) : +6 pts. Sinon : +1 pt par événement bien positionné.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "series", title: "4 séries de 5 événements",
      items: [
        { title: "Série A — Histoire mondiale", cat: "HIST", items: ["Hégire de Mahomet (622)", "Fondation de Rome (-753)", "Pyramides de Gizeh (-2560)", "Sacre de Charlemagne (800)", "Chute de Constantinople (1453)"] },
        { title: "Série B — Sciences", cat: "SCIENCE", items: ["Copernic et l'héliocentrisme (1543)", "Jenner invente le vaccin (1796)", "Darwin publie De l'origine des espèces (1859)", "Fleming découvre la pénicilline (1928)", "Première greffe du cœur (1967)"] },
        { title: "Série C — Histoire politique et sociale", cat: "HIST", items: ["Déclaration des droits de l'Homme (1789)", "Abolition de l'esclavage en France (1848)", "Suffrage universel féminin en France (1944)", "Indépendance de l'Algérie (1962)", "Chute du mur de Berlin (1989)"] },
        { title: "Série D — Technologie et culture pop", cat: "POP", items: ["Lancement de Facebook (2004)", "Création de YouTube (2005)", "Sortie du premier iPhone (2007)", "Lancement de Fortnite (2017)", "TikTok devient la 1ère app mondiale (2020)"] },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FORMAT : 1 VS 3  (8 jeux)
  // ═══════════════════════════════════════════

  {
    id: 20, emoji: "🤥", name: "Le Menteur",
    format: "solo", duration: "~5 min",
    desc: "L'équipe solo énonce 3 faits : 2 vrais, 1 inventé. Les 3 autres équipes débattent et votent sur lequel est faux.",
    rules: [
      "L'équipe solo dispose de 1 minute de préparation (peut inventer son faux fait).",
      "Elle énonce ses 3 faits calmement.",
      "Les 3 autres équipes débattent entre elles (1 min).",
      "Vote simultané : quelle affirmation est fausse ?",
      "Si le faux n'est pas trouvé → solo +7 pts. Si trouvé → chaque équipe qui a voté juste +3 pts.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "statements", title: "6 séries prêtes (2 vrais + 1 faux)",
      items: [
        { text: "Les pieuvres ont 3 cœurs.", answer: "VRAI", cat: "NATURE" },
        { text: "Un os humain est à poids égal plus résistant que le béton.", answer: "VRAI", cat: "SCIENCE" },
        { text: "Le cerveau humain consomme 50 % de l'énergie corporelle.", answer: "FAUX", cat: "SCIENCE", note: "Il en consomme ~20 %" },
        { text: "L'Empire ottoman a duré plus de 600 ans.", answer: "VRAI", cat: "HIST" },
        { text: "Cléopâtre était d'origine grecque, pas égyptienne.", answer: "VRAI", cat: "HIST" },
        { text: "Jules César fut le premier empereur romain.", answer: "FAUX", cat: "HIST", note: "Le premier fut Auguste" },
        { text: "Le Sahara était une zone verdoyante il y a ~6 000 ans.", answer: "VRAI", cat: "GÉO" },
        { text: "La Russie s'étend sur 11 fuseaux horaires.", answer: "VRAI", cat: "GÉO" },
        { text: "L'Amazonie s'étend principalement en Argentine.", answer: "FAUX", cat: "GÉO", note: "Elle est surtout au Brésil (~60 %)" },
        { text: "Shakespeare aurait inventé plus de 1 700 mots anglais.", answer: "VRAI", cat: "LIT" },
        { text: "Voltaire et Rousseau sont morts la même année.", answer: "VRAI", cat: "HIST" },
        { text: "Victor Hugo a écrit Les Fleurs du mal.", answer: "FAUX", cat: "LIT", note: "C'est Baudelaire" },
      ],
    },
  },

  {
    id: 21, emoji: "🔥", name: "Hot Seat",
    format: "solo", duration: "~5 min",
    desc: "L'équipe solo est sur le « siège chaud ». Bombardée de questions pendant 90 secondes par les 3 autres équipes. Chaque équipe pose 2 questions.",
    rules: [
      "L'équipe solo s'installe face aux 3 autres.",
      "Chaque autre équipe prépare 2 questions (toutes catégories).",
      "Minuteur 90 secondes. Les équipes posent leurs questions dans l'ordre.",
      "Solo : +2 pts par bonne réponse. Chaque adverse : +1 pt par question ratée.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "themes", title: "Catégories suggérées pour les questions",
      items: [
        { label: "Auteurs et leurs œuvres principales", cat: "LIT", emoji: "📚" },
        { label: "Dates et événements historiques", cat: "HIST", emoji: "🏛️" },
        { label: "Capitales du monde", cat: "GÉO", emoji: "🗺️" },
        { label: "Formules et lois scientifiques", cat: "SCIENCE", emoji: "🔬" },
        { label: "Peintres, sculpteurs et compositeurs", cat: "ART", emoji: "🎨" },
        { label: "Régimes politiques et institutions", cat: "POL", emoji: "⚖️" },
        { label: "Personnages de fiction et mythologie", cat: "CULTURE", emoji: "📖" },
      ],
    },
  },

  {
    id: 22, emoji: "🎭", name: "L'Imposteur Culturel",
    format: "solo", duration: "~6 min",
    desc: "L'équipe solo parle pendant 60 secondes d'un sujet qu'elle ne connaît PAS forcément. Elle invente avec confiance. Les 3 autres votent : vrai expert ou imposteur ?",
    rules: [
      "Le MJ annonce le sujet à l'équipe solo.",
      "1 minute de préparation (peut bluffer librement).",
      "L'équipe solo parle 60 secondes sur le sujet.",
      "Les 3 autres discutent 30s puis votent : expert ou imposteur ?",
      "Si jugé crédible (2+ votes expert) : +7 pts. Si démasqué : +2 pts à chaque équipe adverse.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "themes", title: "12 sujets (11 légitimes / 1 pop)",
      items: [
        { label: "Le fonctionnement du Parlement européen", cat: "POL", emoji: "⚖️" },
        { label: "La Route de la Soie", cat: "HIST", emoji: "🗺️" },
        { label: "La théorie de la relativité d'Einstein", cat: "SCIENCE", emoji: "🔬" },
        { label: "L'histoire du canal de Suez", cat: "HIST", emoji: "🏛️" },
        { label: "La philosophie de Nietzsche", cat: "PHILO", emoji: "📖" },
        { label: "Le système de castes en Inde", cat: "HIST", emoji: "🌏" },
        { label: "Les trous noirs", cat: "SCIENCE", emoji: "🌑" },
        { label: "L'architecture gothique", cat: "ART", emoji: "🏰" },
        { label: "La géopolitique du pétrole", cat: "POL", emoji: "🛢️" },
        { label: "Le fonctionnement de la Bourse", cat: "TECH", emoji: "💹" },
        { label: "Les règles du cricket", cat: "SPORT", emoji: "🏏" },
        { label: "Le fonctionnement des algorithmes", cat: "TECH", emoji: "💻" },
      ],
    },
  },

  {
    id: 23, emoji: "🔢", name: "Le Bluff des Chiffres",
    format: "solo", duration: "~5 min",
    desc: "L'équipe solo présente 3 statistiques : 2 vraies, 1 fausse. Les 3 autres discutent et votent sur laquelle est fausse.",
    rules: [
      "L'équipe solo reçoit une série de 3 statistiques et identifie laquelle est fausse (ou invente une variante).",
      "Elle les énonce à voix haute avec assurance.",
      "Les 3 équipes adverses débattent 1 minute puis votent.",
      "Si le faux n'est pas trouvé → solo +6 pts. Si trouvé → +3 pts à chaque équipe gagnante.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "statements", title: "4 séries prêtes (2 vraies + 1 fausse par série)",
      items: [
        { text: "Le sang représente environ 5 litres chez un adulte.", answer: "VRAI", cat: "SCIENCE" },
        { text: "La lumière se déplace à environ 300 000 km/s.", answer: "VRAI", cat: "SCIENCE" },
        { text: "La Terre effectue son tour en 400 jours.", answer: "FAUX", cat: "SCIENCE", note: "365,25 jours" },
        { text: "La Révolution française a commencé en 1789.", answer: "VRAI", cat: "HIST" },
        { text: "Rome a été fondée selon la légende en 753 av. J.-C.", answer: "VRAI", cat: "HIST" },
        { text: "Gutenberg a inventé l'imprimerie vers 1520.", answer: "FAUX", cat: "HIST", note: "C'était vers 1455" },
        { text: "La Terre compte environ 8 milliards d'habitants en 2024.", answer: "VRAI", cat: "GÉO" },
        { text: "L'océan Pacifique est plus grand que tous les continents réunis.", answer: "VRAI", cat: "GÉO" },
        { text: "Le Sahara est le plus grand désert de sable du monde.", answer: "FAUX", cat: "GÉO", note: "C'est le plus grand désert chaud, mais l'Antarctique est plus grand" },
        { text: "La Tour Eiffel mesure 330 m avec antenne.", answer: "VRAI", cat: "ART" },
        { text: "L'Everest mesure 8 849 m.", answer: "VRAI", cat: "GÉO" },
        { text: "Le Nil mesure 8 000 km.", answer: "FAUX", cat: "GÉO", note: "Il mesure ~6 650 km" },
      ],
    },
  },

  {
    id: 24, emoji: "📖", name: "La Définition",
    format: "solo", duration: "~5 min",
    desc: "Un mot rare est annoncé. L'équipe solo invente une fausse définition convaincante. Le MJ lit la vraie ET la fausse (dans n'importe quel ordre). Les 3 autres votent.",
    rules: [
      "Le MJ annonce le mot rare à l'équipe solo.",
      "L'équipe solo a 1 minute pour inventer une définition plausible.",
      "Le MJ lit les deux définitions (vraie + fausse) dans un ordre aléatoire.",
      "Les 3 équipes votent : laquelle est la vraie ?",
      "Si 2 équipes ou plus se trompent : solo +6 pts. Sinon : +2 pts à chaque équipe qui a trouvé.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "definitions", title: "12 mots rares (100% légitimes)",
      items: [
        { word: "Pétrichor", def: "Odeur caractéristique de la pluie sur la terre sèche." },
        { word: "Sérendipité", def: "Faculté de faire des découvertes heureuses par hasard." },
        { word: "Callipyge", def: "Qui a de belles fesses (du grec kalos = beau, pugê = fesse)." },
        { word: "Borborygme", def: "Bruit produit par les gaz qui circulent dans les intestins." },
        { word: "Épistémologie", def: "Étude critique des sciences, de leur méthode et de leurs fondements." },
        { word: "Ergastule", def: "Prison souterraine où travaillaient les esclaves dans la Rome antique." },
        { word: "Tergiverser", def: "Chercher à éviter une décision par des détours, temporiser." },
        { word: "Idiosyncrasie", def: "Manière d'être propre à chaque individu, réaction particulière à une chose." },
        { word: "Apocryphe", def: "Dont l'authenticité est douteuse, non reconnu comme canonique." },
        { word: "Syncrétisme", def: "Fusion de doctrines, de croyances ou de cultures différentes." },
        { word: "Hubris", def: "Démesure orgueilleuse, excès de confiance qui précipite la chute (concept grec)." },
        { word: "Panacée", def: "Remède universel censé guérir toutes les maladies." },
      ],
    },
  },

  {
    id: 25, emoji: "⏱️", name: "30 Secondes Chrono",
    format: "solo", duration: "~5 min",
    desc: "L'équipe solo doit répondre à autant de questions que possible en 30 secondes. Les 3 autres équipes comptent les points ratés.",
    rules: [
      "Le MJ lit les questions rapidement, l'une après l'autre.",
      "L'équipe solo répond immédiatement.",
      "30 secondes au total.",
      "Solo : +1 pt par bonne réponse. Les adversaires : +1 pt par question ratée.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "20 questions rapides (15 légitimes / 5 pop)",
      items: [
        { q: "Qui a écrit « Le Prince » ?", r: "Machiavel", cat: "PHILO" },
        { q: "Capitale du Canada ?", r: "Ottawa", cat: "GÉO" },
        { q: "Formule chimique du sel de table ?", r: "NaCl", cat: "SCIENCE" },
        { q: "Qui a peint la chapelle Sixtine ?", r: "Michel-Ange", cat: "ART" },
        { q: "Plus grand animal de la planète ?", r: "La baleine bleue", cat: "NATURE" },
        { q: "Fleuve qui traverse Paris ?", r: "La Seine", cat: "GÉO" },
        { q: "Qui a fondé la psychanalyse ?", r: "Sigmund Freud", cat: "SCIENCE" },
        { q: "Combien de côtés a un hexagone ?", r: "6", cat: "MATH" },
        { q: "Pays en forme de botte ?", r: "L'Italie", cat: "GÉO" },
        { q: "Quelle planète est la plus proche du Soleil ?", r: "Mercure", cat: "SCIENCE" },
        { q: "Monnaie du Royaume-Uni ?", r: "La livre sterling", cat: "GÉO" },
        { q: "En quelle année Christophe Colomb a-t-il atteint les Amériques ?", r: "1492", cat: "HIST" },
        { q: "Que signifie « diurne » ?", r: "Qui se passe le jour / actif le jour", cat: "LIT" },
        { q: "Capitale de l'Allemagne ?", r: "Berlin", cat: "GÉO" },
        { q: "Combien d'États aux USA ?", r: "50", cat: "GÉO" },
        { q: "Personnage principal de la saga Harry Potter ?", r: "Harry Potter", cat: "POP" },
        { q: "Combien de cordes a une guitare classique ?", r: "6", cat: "ART" },
        { q: "Qui a créé Mickey Mouse ?", r: "Walt Disney", cat: "POP" },
        { q: "Combien de joueurs par équipe au basket ?", r: "5", cat: "SPORT" },
        { q: "Couleur de l'émeraude ?", r: "Vert", cat: "SCIENCE" },
      ],
    },
  },

  {
    id: 26, emoji: "🎭", name: "Hot Take Culturel",
    format: "solo", duration: "~5 min",
    desc: "L'équipe solo défend une affirmation culturelle controversée (mais défendable). Les 3 autres tentent de la contredire. Le MJ juge si la défense tient.",
    rules: [
      "Le MJ annonce l'affirmation controversée.",
      "L'équipe solo dispose de 30s pour préparer ses arguments.",
      "Elle défend l'affirmation pendant 60s.",
      "Chaque équipe adverse peut contra-argumenter pendant 20s.",
      "Le MJ juge : défense convaincante → solo +5 pts. Sinon +2 pts à la meilleure contradiction.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "debate", title: "10 hot takes culturels",
      items: [
        { topic: "Napoléon a fait plus de bien que de mal pour la France et l'Europe.", cat: "HIST" },
        { topic: "Les Jeux Olympiques modernes n'ont plus de lien avec l'idéal olympique antique.", cat: "HIST" },
        { topic: "L'imprimerie de Gutenberg est la plus grande révolution technologique de l'humanité.", cat: "HIST" },
        { topic: "Sans l'Islam, la civilisation occidentale n'aurait pas pu vivre sa Renaissance.", cat: "HIST" },
        { topic: "Toutes les grandes religions ont contribué positivement à la civilisation humaine.", cat: "CULTURE" },
        { topic: "La philosophie grecque est surévaluée par rapport aux autres traditions philosophiques.", cat: "PHILO" },
        { topic: "L'intelligence artificielle représente une menace plus grande que toutes les guerres passées.", cat: "TECH" },
        { topic: "Les musées occidentaux doivent rendre toutes les œuvres d'art coloniales.", cat: "ART" },
        { topic: "La science ne peut pas répondre à toutes les questions importantes de l'humanité.", cat: "PHILO" },
        { topic: "Le roman est la forme d'art la plus puissante pour changer les mentalités.", cat: "LIT" },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FORMAT : TOURNOI 1V1  (5 jeux)
  // ═══════════════════════════════════════════

  {
    id: 27, emoji: "⚡", name: "Tournoi Éclair",
    format: "tournoi", duration: "~7 min",
    desc: "Demi-finales puis finale. Best of 3 : première équipe à répondre correctement 2 fois gagne la manche. Format haiku : questions ultra-courtes.",
    rules: [
      "Demi-finales : 1v2 et 3v4. Finale : les deux gagnants.",
      "Best of 3 : deux bonnes réponses avant l'adversaire = gagner la manche.",
      "Le MJ pose la question ; buzzer = main levée. Bonne réponse → point.",
      "Mauvaise réponse → l'adversaire répond librement.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "12 questions (9 légitimes / 3 pop)",
      items: [
        { q: "Kant a écrit la Critique de la raison… ?", r: "Pure (et Pratique)", cat: "PHILO" },
        { q: "Quel fleuve traverse Londres ?", r: "La Tamise", cat: "GÉO" },
        { q: "Qui a découvert la pénicilline ?", r: "Alexander Fleming", cat: "SCIENCE" },
        { q: "Capitale de la Turquie ?", r: "Ankara", cat: "GÉO" },
        { q: "Quel est le plus grand lac d'Afrique ?", r: "Le lac Victoria", cat: "GÉO" },
        { q: "Qui a fondé l'Empire mongol ?", r: "Gengis Khan", cat: "HIST" },
        { q: "Descartes a dit « Je pense, donc… » ?", r: "Je suis", cat: "PHILO" },
        { q: "L'euro est la monnaie de combien de pays (2024) ?", r: "20 pays (zone euro)", cat: "POL" },
        { q: "Quel pays a inventé le judo ?", r: "Le Japon", cat: "HIST" },
        { q: "Quel manga met en scène des titans géants et un mur protecteur ?", r: "L'Attaque des Titans (Attack on Titan)", cat: "POP" },
        { q: "Quel héros de Nintendo part à la recherche de la princesse Zelda ?", r: "Link", cat: "POP" },
        { q: "Quel groupe britannique a sorti « Bohemian Rhapsody » en 1975 ?", r: "Queen", cat: "POP" },
      ],
    },
  },

  {
    id: 28, emoji: "✊", name: "Pierre-Feuille-Culture",
    format: "tournoi", duration: "~7 min",
    desc: "Demi-finales + finale. Pierre-Feuille-Ciseaux pour déterminer qui répond à la question. Le gagnant du PFC répond : bonne réponse = point, mauvaise = l'adversaire marque.",
    rules: [
      "Demi-finales (1v2, 3v4) puis finale.",
      "1 représentant par équipe s'affronte.",
      "PFC simultané. Le gagnant du PFC a le droit de répondre à la question posée.",
      "Bonne réponse → marque 1 point. Mauvaise → l'adversaire marque.",
      "Premier à 5 points gagne.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "10 questions (8 légitimes / 2 pop)",
      items: [
        { q: "Plus haut sommet d'Afrique ?", r: "Le Kilimandjaro", cat: "GÉO" },
        { q: "Fondateur de la médecine moderne (Antiquité grecque) ?", r: "Hippocrate", cat: "SCIENCE" },
        { q: "Quel est l'unique continent sans pays ?", r: "L'Antarctique", cat: "GÉO" },
        { q: "Auteur des « Fleurs du mal » ?", r: "Charles Baudelaire", cat: "LIT" },
        { q: "Quelle planète est la plus grande du système solaire ?", r: "Jupiter", cat: "SCIENCE" },
        { q: "Quel pays est le premier producteur mondial de café ?", r: "Le Brésil", cat: "GÉO" },
        { q: "Combien de vertèbres dans la colonne vertébrale humaine ?", r: "33 (ou 26 os chez l'adulte après fusion)", cat: "SCIENCE" },
        { q: "Quel gaz représente ~21 % de l'air ?", r: "L'oxygène", cat: "SCIENCE" },
        { q: "Dans quel anime un garçon nommé Naruto veut devenir Hokage ?", r: "Naruto", cat: "POP" },
        { q: "Spécialité culinaire italienne avec pâte et sauce tomate ?", r: "La pizza (ou les pâtes — plusieurs réponses acceptées)", cat: "FOOD" },
      ],
    },
  },

  {
    id: 29, emoji: "🧠", name: "Memory Culture",
    format: "tournoi", duration: "~8 min",
    desc: "8 paires de cartes face cachée. À tour de rôle : retourner 2 cartes. Paire trouvée = gardée et rejoue. Plus de paires = gagnant.",
    rules: [
      "Préparer 16 cartes (8 paires : personnage + concept associé).",
      "Mélanger et poser face cachée.",
      "À tour de rôle : retourner 2 cartes.",
      "Paire trouvée → garder les cartes et rejouer.",
      "Sinon : remettre face cachée, tour adverse.",
      "Plus de paires au total = gagnant.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: "📦 16 cartes imprimées ou écrites à la main",
    content: {
      type: "pairs", title: "8 paires (100% légitimes)",
      items: [
        { a: "Socrate", b: "Philosophie grecque antique" },
        { a: "Charles Darwin", b: "Théorie de l'évolution" },
        { a: "Gutenberg", b: "Invention de l'imprimerie" },
        { a: "Cléopâtre VII", b: "Dernière pharaone d'Égypte" },
        { a: "Mozart", b: "Symphonie n°40 en sol mineur" },
        { a: "Ibn Khaldoun", b: "Muqaddima (philosophie de l'histoire)" },
        { a: "Marie Curie", b: "Découverte de la radioactivité" },
        { a: "Galilée", b: "Défense de l'héliocentrisme" },
      ],
    },
  },

  {
    id: 30, emoji: "🏃", name: "Relais des Savoirs",
    format: "tournoi", duration: "~6 min",
    desc: "Chaque membre d'une équipe répond à une question à tour de rôle, sans aide. L'équipe qui accumule le plus de points en 3 rounds gagne.",
    rules: [
      "Demi-finales + finale (1 représentant par round par équipe).",
      "3 rounds : 4 questions chacun.",
      "Chaque joueur répond seul, sans aide de son équipe.",
      "Bonne réponse → +1 point à l'équipe.",
      "L'équipe avec le plus de points gagne.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "12 questions relais (9 légitimes / 3 pop)",
      items: [
        { q: "Défaite de Napoléon en 1815 ?", r: "La bataille de Waterloo", cat: "HIST" },
        { q: "Plus grand désert du monde ?", r: "L'Antarctique (ou le Sahara si désert chaud)", cat: "GÉO" },
        { q: "Qui a écrit « Candide » ?", r: "Voltaire", cat: "LIT" },
        { q: "Organe qui filtre le sang dans le corps ?", r: "Le rein", cat: "SCIENCE" },
        { q: "Quel peuple a construit le Machu Picchu ?", r: "Les Incas", cat: "HIST" },
        { q: "Métal le plus abondant dans la croûte terrestre ?", r: "L'aluminium", cat: "SCIENCE" },
        { q: "Capitale de la Thaïlande ?", r: "Bangkok (officiellement : Krung Thep)", cat: "GÉO" },
        { q: "Quel instrument de musique à cordes frottées n'est pas le violon ?", r: "Le violoncelle / l'alto / la contrebasse", cat: "ART" },
        { q: "Quelle langue a le plus de locuteurs natifs ?", r: "Le mandarin", cat: "GÉO" },
        { q: "Quel est le personnage fictif au chapeau haut-de-forme dans Alice au pays des merveilles ?", r: "Le Chapelier fou", cat: "POP" },
        { q: "Héros d'Alice au pays des merveilles qui disparaît en ne laissant que son sourire ?", r: "Le Chat du Cheshire", cat: "POP" },
        { q: "Combien font 15 % de 200 ?", r: "30", cat: "MATH" },
      ],
    },
  },

  {
    id: 31, emoji: "🎰", name: "Culture Roulette",
    format: "tournoi", duration: "~7 min",
    desc: "Lancer de dé = catégorie imposée. Buzzer sur la question posée dans cette catégorie. Best of 3 entre les deux équipes affronto.",
    rules: [
      "Demi-finales + finale.",
      "Lancer de dé → catégorie : 1=Histoire, 2=Science, 3=Littérature, 4=Géographie, 5=Philo/Art, 6=Pop/Culture.",
      "Le MJ pose une question dans la catégorie tirée.",
      "Première main levée avec bonne réponse = point.",
      "Mauvaise réponse = point à l'adversaire.",
    ],
    reward: "Classement par score → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    material: null,
    content: {
      type: "questions", title: "6 questions par catégorie (exemples)",
      items: [
        { q: "🎲1 HIST — Premier président des États-Unis ?", r: "George Washington", cat: "HIST" },
        { q: "🎲2 SCIENCE — Métal liquide à température ambiante ?", r: "Le mercure", cat: "SCIENCE" },
        { q: "🎲3 LIT — Auteur de « Don Quichotte » ?", r: "Miguel de Cervantes", cat: "LIT" },
        { q: "🎲4 GÉO — Quel pays se trouve à l'intersection de l'équateur et du méridien de Greenwich ?", r: "Le Gabon", cat: "GÉO" },
        { q: "🎲5 PHILO — Quel concept platonicien décrit des hommes enchaînés ne voyant que des ombres ?", r: "L'allégorie de la caverne", cat: "PHILO" },
        { q: "🎲6 POP — Héros de One Piece au chapeau de paille ?", r: "Monkey D. Luffy", cat: "POP" },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FORMAT : COOPÉRATIF  (2 jeux)
  // ═══════════════════════════════════════════

  // ═══════════════════════════════════════════
  // FORMAT : COOP  (1 jeu)
  // ═══════════════════════════════════════════

  {
    id: 35, emoji: "🧘", name: "The Mind",
    format: "coop", duration: "3-5 min",
    desc: "Sans parler, sans signaux, les joueurs de l'équipe posent leurs cartes en ordre croissant en suivant uniquement leur concentration collective. La plus rapide sans erreur gagne.",
    rules: [
      "Chaque joueur reçoit 2 cartes (numéros aléatoires entre 1 et 100) — garder la main cachée.",
      "ZÉRO communication : ni paroles, ni gestes, ni signaux.",
      "Les joueurs posent leurs cartes sur la table en ordre croissant, une à une, sans concertation.",
      "Si une carte est posée dans le mauvais ordre, c'est raté.",
      "Chronométrez depuis la première carte posée jusqu'à la dernière.",
      "Comparez les temps entre les équipes — la plus rapide sans erreur gagne.",
    ],
    material: "Jeu The Mind (cartes 1–100) · Chronomètre",
    reward: "Classement par temps (+ rapide sans erreur = 🥇) → 🥇 +8₽ · 🥈 +4₽ · 🥉 +2₽ · 4e 0₽",
    content: null,
  },

];
