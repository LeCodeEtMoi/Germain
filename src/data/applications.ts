/**
 * Données de la page « Applications des mathématiques ».
 * Pour ajouter une application : ajouter un objet dans `applications` avec une `categorie` existante.
 * Pour ajouter une catégorie : ajouter un objet dans `categories`.
 */
export interface Categorie {
  id: string;
  nom: string;
  /** Emoji décoratif. */
  icone: string;
  resume: string;
}

export interface Application {
  titre: string;
  accroche: string;
  texte: string;
  categorie: string;
  /** Notions mathématiques mobilisées. */
  maths: string[];
  /** Lien facultatif vers une page du site (chemin sans le préfixe /Germain/). */
  lien?: { texte: string; chemin: string };
}

export const categories: Categorie[] = [
  { id: 'sante', nom: 'Santé et vivant', icone: '🧬', resume: 'Biologie, médecine, épidémies' },
  { id: 'numerique', nom: 'Numérique', icone: '💻', resume: 'Algorithmes, sécurité, IA, images' },
  { id: 'terre', nom: 'Terre et climat', icone: '🌍', resume: 'Météo, GPS, séismes' },
  { id: 'physique', nom: 'Physique et ingénierie', icone: '⚙️', resume: 'Mouvement, structures, énergie' },
  { id: 'economie', nom: 'Économie et société', icone: '📊', resume: 'Finance, sondages, vote' },
  { id: 'arts', nom: 'Arts et loisirs', icone: '🎵', resume: 'Musique, jeux, casse-têtes' },
  { id: 'sport', nom: 'Sport', icone: '⚽', resume: 'Trajectoires, classements, tournois' },
];

export const applications: Application[] = [
  /* ---------------- Santé et vivant ---------------- */
  {
    titre: 'Les populations qui évoluent',
    accroche: 'Combien de lapins dans dix ans ?',
    texte:
      'Des suites et des équations différentielles décrivent comment une population croît, se stabilise ou oscille. Le modèle proie-prédateur de Lotka et Volterra (années 1920) explique pourquoi les effectifs de loups et de lièvres montent et descendent en cycles.',
    categorie: 'sante',
    maths: ['Suites', 'Équations différentielles', 'Modélisation'],
  },
  {
    titre: 'L’imagerie médicale',
    accroche: 'Le scanner ne photographie pas : il calcule.',
    texte:
      'Un scanner mesure l’absorption de rayons X sous de nombreux angles, puis un calcul reconstruit l’image (transformée de Radon). L’IRM s’appuie sur la transformée de Fourier. Sans ces mathématiques, ces appareils ne produiraient que des mesures illisibles.',
    categorie: 'sante',
    maths: ['Intégrales', 'Transformée de Fourier', 'Algèbre linéaire'],
  },
  {
    titre: 'Comprendre une épidémie',
    accroche: 'Prévoir le pic avant qu’il n’arrive.',
    texte:
      'Le modèle SIR, proposé par Kermack et McKendrick en 1927, répartit une population en personnes saines, infectées et guéries, et décrit leur évolution par un système d’équations. Il permet d’étudier l’effet d’une réduction des contacts ou d’une vaccination.',
    categorie: 'sante',
    maths: ['Équations différentielles', 'Exponentielle', 'Modélisation'],
  },

  /* ---------------- Numérique ---------------- */
  {
    titre: 'Algorithmes et graphes',
    accroche: 'Comment ton GPS trouve le chemin le plus court.',
    texte:
      'Itinéraires, réseaux sociaux, moteurs de recherche : tout cela se modélise par des graphes. L’algorithme de Dijkstra, conçu en 1956, trouve le plus court chemin dans un graphe pondéré. La complexité mesure le temps qu’un algorithme met quand les données grossissent.',
    categorie: 'numerique',
    maths: ['Graphes', 'Algorithmique', 'Complexité'],
  },
  {
    titre: 'La cryptographie',
    accroche: 'Protéger un paiement avec des nombres premiers.',
    texte:
      'Les échanges sécurisés sur Internet reposent sur de l’arithmétique. Le système RSA (1977) exploite un fait simple : multiplier deux très grands nombres premiers est facile, retrouver ces deux nombres à partir du produit est extrêmement long.',
    categorie: 'numerique',
    maths: ['Arithmétique', 'Nombres premiers', 'Congruences'],
  },
  {
    titre: 'L’intelligence artificielle',
    accroche: 'Un modèle apprend en réduisant une erreur.',
    texte:
      'Un modèle d’apprentissage automatique ajuste des millions de paramètres pour minimiser une erreur. Le gradient (une généralisation de la dérivée) indique dans quel sens corriger, les données sont stockées dans des matrices, et les probabilités mesurent l’incertitude.',
    categorie: 'numerique',
    maths: ['Dérivation', 'Matrices', 'Probabilités'],
  },
  {
    titre: 'Images de synthèse et jeux vidéo',
    accroche: 'Chaque image est un calcul.',
    texte:
      'Dans un jeu vidéo ou un film d’animation, les positions sont des vecteurs, les rotations et les déplacements des matrices, et l’éclairage d’une surface se calcule avec un produit scalaire. L’ordinateur refait ces calculs des dizaines de fois par seconde.',
    categorie: 'numerique',
    maths: ['Vecteurs', 'Matrices', 'Produit scalaire'],
  },

  /* ---------------- Terre et climat ---------------- */
  {
    titre: 'La météo et l’effet papillon',
    accroche: 'Pourquoi on ne prévoit pas la pluie à trois semaines.',
    texte:
      'Les prévisions résolvent numériquement des équations qui décrivent l’atmosphère, en des millions de points. En 1963, Edward Lorenz a montré qu’une minuscule différence au départ peut changer complètement le résultat : c’est l’effet papillon, qui limite la fiabilité des prévisions à quelques jours.',
    categorie: 'terre',
    maths: ['Simulation', 'Chaos', 'Équations aux dérivées partielles'],
  },
  {
    titre: 'Le GPS',
    accroche: 'Quatre satellites pour trouver où tu es.',
    texte:
      'Le récepteur mesure le temps que mettent les signaux de plusieurs satellites à lui parvenir, et en déduit des distances. Il faut au moins quatre satellites : trois pour les coordonnées, un pour corriger l’horloge du récepteur. Sans les corrections de la relativité, l’erreur augmenterait d’une dizaine de kilomètres par jour.',
    categorie: 'terre',
    maths: ['Distances', 'Systèmes d’équations', 'Géométrie dans l’espace'],
  },
  {
    titre: 'Les séismes et les échelles logarithmiques',
    accroche: 'Un point de plus sur l’échelle, c’est beaucoup plus fort.',
    texte:
      'L’échelle de magnitude est logarithmique : quand la magnitude augmente de 1, l’amplitude des ondes sismiques est multipliée par 10 et l’énergie libérée par environ 32. Un séisme de magnitude 7 libère donc près de 1 000 fois l’énergie d’un séisme de magnitude 5.',
    categorie: 'terre',
    maths: ['Logarithme', 'Puissances', 'Échelles'],
  },

  /* ---------------- Physique et ingénierie ---------------- */
  {
    titre: 'Mouvement, électricité et lumière',
    accroche: 'La vitesse est la dérivée de la position.',
    texte:
      'Dérivées et intégrales sont nées en partie pour décrire le mouvement : la vitesse est la dérivée de la position, l’accélération celle de la vitesse. Au XIXᵉ siècle, quatre équations, celles de Maxwell, ont décrit ensemble l’électricité, le magnétisme et la lumière.',
    categorie: 'physique',
    maths: ['Dérivation', 'Intégrales', 'Vecteurs'],
  },
  {
    titre: 'La solidité des structures',
    accroche: 'Un pont tient parce qu’on a calculé comment il se déforme.',
    texte:
      'Pour concevoir un pont, un avion ou un bâtiment, les ingénieurs calculent comment les matériaux se déforment sous les charges : c’est la théorie de l’élasticité. Sophie Germain y a contribué : en 1816, elle a remporté le prix de l’Académie des sciences pour sa théorie des plaques élastiques vibrantes.',
    categorie: 'physique',
    maths: ['Équations aux dérivées partielles', 'Dérivation', 'Modélisation'],
  },

  /* ---------------- Économie et société ---------------- */
  {
    titre: 'Placer de l’argent, emprunter',
    accroche: 'Les intérêts rapportent des intérêts.',
    texte:
      'Avec un placement à 3 % par an, la somme ne grandit pas de la même quantité chaque année : les intérêts produisent eux-mêmes des intérêts. C’est une suite géométrique. Emprunts, assurances et retraites reposent sur ce type de calcul.',
    categorie: 'economie',
    maths: ['Suites géométriques', 'Pourcentages', 'Exponentielle'],
  },
  {
    titre: 'Les sondages',
    accroche: '1 000 personnes pour représenter des millions.',
    texte:
      'Comment un échantillon de 1 000 personnes peut-il renseigner sur l’opinion de millions d’habitants ? Grâce aux probabilités : un intervalle de confiance donne la marge d’erreur, d’environ 3 points pour un échantillon de cette taille, à condition qu’il soit bien tiré au hasard.',
    categorie: 'economie',
    maths: ['Statistiques', 'Probabilités', 'Intervalle de confiance'],
  },
  {
    titre: 'Voter : un problème mathématique',
    accroche: 'Aucun système de vote n’est parfait.',
    texte:
      'Le théorème d’impossibilité d’Arrow (1951) montre qu’aucun système de vote classant plus de deux options ne peut satisfaire à la fois plusieurs conditions d’équité pourtant raisonnables. Le choix du scrutin n’est donc jamais neutre.',
    categorie: 'economie',
    maths: ['Logique', 'Combinatoire', 'Théorie du vote'],
    lien: { texte: 'Un médiateur en parle dans son témoignage', chemin: 'MathsEtMetier/MediateurScientifique' },
  },

  /* ---------------- Arts et loisirs ---------------- */
  {
    titre: 'La musique',
    accroche: 'Une octave, c’est un rapport de 2 à 1.',
    texte:
      'Deux notes séparées d’une octave ont des fréquences dans le rapport 2 : 1, et une quinte correspond à peu près à 3 : 2. Un son est une somme de sinusoïdes, que la transformée de Fourier permet de séparer : c’est le principe de l’accordeur électronique ou de la reconnaissance musicale.',
    categorie: 'arts',
    maths: ['Fonctions trigonométriques', 'Rapports', 'Transformée de Fourier'],
  },
  {
    titre: 'Casse-têtes et Rubik’s cube',
    accroche: 'Plus de 43 milliards de milliards de positions.',
    texte:
      'Le Rubik’s cube a 43 252 003 274 489 856 000 positions possibles. En 2010, des chercheurs ont démontré, à l’aide d’ordinateurs, qu’on peut toujours le résoudre en 20 mouvements au plus. La théorie des groupes décrit l’ensemble de ses mouvements.',
    categorie: 'arts',
    maths: ['Dénombrement', 'Combinatoire', 'Théorie des groupes'],
  },

  /* ---------------- Sport ---------------- */
  {
    titre: 'Les trajectoires',
    accroche: 'Quel angle pour aller le plus loin ?',
    texte:
      'Sans frottement de l’air, un ballon suit une parabole. S’il est lancé depuis le sol, l’angle de 45° donne la portée maximale. Dans la réalité (hauteur de lancer, air, effet), l’angle optimal change : les entraîneurs l’étudient avec des modèles mathématiques.',
    categorie: 'sport',
    maths: ['Second degré', 'Dérivation', 'Optimisation'],
  },
  {
    titre: 'Classements et tournois',
    accroche: 'Comment classer des équipes qui ne se sont jamais rencontrées ?',
    texte:
      'Le système Elo, inventé pour les échecs, estime la force de chaque joueur après chaque match. Le classement mondial masculin de la FIFA s’en inspire depuis 2018. Organiser un tournoi équitable, avec des duels bien répartis, est aussi un problème de graphes.',
    categorie: 'sport',
    maths: ['Probabilités', 'Exponentielle', 'Graphes'],
  },
];