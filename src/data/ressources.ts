// Ressources mathématiques francophones affichées sur /ressources.
// Pour ajouter une ressource : ajoutez un objet à la liste, la page se met à jour seule.

export type TypeRessource = "livre" | "video" | "site" | "association";
export type Public = "college" | "lycee" | "superieur" | "tous";

export interface Ressource {
  titre: string;
  auteur?: string;
  description: string;
  url?: string; // facultatif : pas de lien pour un livre sans page officielle
  type: TypeRessource;
  publics: Public[];
  gratuit: boolean;
}

export const TYPES: Record<TypeRessource, string> = {
  livre: "Livres",
  video: "Vidéos",
  site: "Sites et exercices",
  association: "Associations",
};

export const PUBLICS: Record<Public, string> = {
  college: "Collège",
  lycee: "Lycée",
  superieur: "Études supérieures",
  tous: "Tout public",
};

export const ressources: Ressource[] = [
  // ---------- Sites et exercices ----------
  {
    titre: "Sésamath",
    description:
      "Association de professeurs qui publie des manuels et cahiers de collège et de lycée sous licence libre, consultables gratuitement en ligne.",
    url: "https://www.sesamath.net/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: true,
  },
  {
    titre: "MathALEA (Coopmaths)",
    description:
      "Générateur d'exercices aléatoires avec corrections, du CP au lycée. Recommandé sur Éduscol comme commun numérique.",
    url: "https://coopmaths.fr/www/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: true,
  },
  {
    titre: "Maths et tiques",
    auteur: "Yvan Monka",
    description:
      "Cours, exercices et des centaines de vidéos courtes qui suivent le programme, de la 6e à la terminale.",
    url: "https://www.maths-et-tiques.fr/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: true,
  },
  {
    titre: "J'ai compris Maths",
    description:
      "Cours en vidéo, exercices interactifs et sujets corrigés du brevet et du bac, jusqu'aux classes prépa et à la L2.",
    url: "https://www.jaicompris.com/",
    type: "site",
    publics: ["college", "lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Hedacademy",
    description:
      "Vidéos, fiches et quiz de la 6e à la terminale. Une partie du contenu est payante.",
    url: "https://hedacademy.fr/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: false,
  },
  {
    titre: "Khan Academy en français",
    description:
      "Cours en vidéo et exercices auto-corrigés, du calcul de base à l'algèbre linéaire.",
    url: "https://fr.khanacademy.org/math",
    type: "site",
    publics: ["college", "lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Annales de l'APMEP",
    description:
      "Sujets et corrigés du brevet et du bac publiés par l'Association des professeurs de mathématiques de l'enseignement public.",
    url: "https://www.apmep.fr/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: true,
  },
  {
    titre: "Exo7",
    description:
      "Cours en PDF, milliers d'exercices corrigés, QCM et vidéos pour la licence (L1 à L3).",
    url: "https://exo7.emath.fr/",
    type: "site",
    publics: ["superieur"],
    gratuit: true,
  },
  {
    titre: "Bibm@th",
    description:
      "Bibliothèque de cours, d'exercices corrigés et de biographies de mathématiciennes et mathématiciens, du lycée au supérieur.",
    url: "https://www.bibmath.net/",
    type: "site",
    publics: ["lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Mathraining",
    description:
      "Entraînement interactif aux olympiades de mathématiques, avec des solutions relues par des correcteurs bénévoles.",
    url: "https://www.mathraining.be/",
    type: "site",
    publics: ["lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Images des mathématiques",
    description:
      "Revue en ligne du CNRS où des chercheuses et chercheurs racontent les mathématiques d'aujourd'hui.",
    url: "https://images.math.cnrs.fr/",
    type: "site",
    publics: ["lycee", "superieur", "tous"],
    gratuit: true,
  },
  {
    titre: "CultureMATH",
    description:
      "Site de l'ENS : articles de fond pour approfondir une notion, son histoire et ses applications.",
    url: "https://culturemath.ens.fr/",
    type: "site",
    publics: ["lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Programmes officiels (Éduscol)",
    description:
      "Les programmes de mathématiques de l'Éducation nationale et les ressources d'accompagnement.",
    url: "https://eduscol.education.gouv.fr/",
    type: "site",
    publics: ["college", "lycee"],
    gratuit: true,
  },

  // ---------- Vidéos ----------
  {
    titre: "Micmaths",
    auteur: "Mickaël Launay",
    description:
      "Chaîne de vulgarisation : curiosités, énigmes et belles idées mathématiques, sans prérequis.",
    url: "https://www.youtube.com/channel/UC4PasDd25MXqlXBogBw9CAg",
    type: "video",
    publics: ["college", "lycee", "tous"],
    gratuit: true,
  },
  {
    titre: "El Jj",
    description:
      "Vidéos de vulgarisation qui prennent le temps d'expliquer des sujets mathématiques étonnants.",
    url: "https://www.youtube.com/channel/UCgkhWgBGRp0sdFy2MHDWfSg",
    type: "video",
    publics: ["lycee", "tous"],
    gratuit: true,
  },
  {
    titre: "Voyages au pays des maths",
    description:
      "Série d'animation d'Arte : chaque épisode explore une grande idée mathématique en une dizaine de minutes.",
    url: "https://www.arte.tv/fr/videos/RC-021426/voyages-au-pays-des-maths/",
    type: "video",
    publics: ["lycee", "tous"],
    gratuit: true,
  },
  {
    titre: "Petits contes mathématiques",
    description:
      "Courtes vidéos Lumni qui racontent l'histoire d'un symbole ou d'une notion mathématique.",
    url: "https://www.lumni.fr/programme/petits-contes-mathematiques",
    type: "video",
    publics: ["college", "lycee", "tous"],
    gratuit: true,
  },
  {
    titre: "Exo7 en vidéo",
    description:
      "Cours filmés de première année d'université (intégrales, suites, algèbre linéaire…), hébergés par l'université de Lille.",
    url: "https://pod.univ-lille.fr/exo7/",
    type: "video",
    publics: ["superieur"],
    gratuit: true,
  },
  {
    titre: "Dimensions",
    description:
      "Promenade mathématique en film d'animation, de la deuxième à la quatrième dimension.",
    url: "https://www.youtube.com/playlist?list=PLOthayM7lpwTcSGdbV81dEckmo8o2QCNH",
    type: "video",
    publics: ["lycee", "superieur", "tous"],
    gratuit: true,
  },

  // ---------- Livres ----------
  {
    titre: "Le grand roman des maths",
    auteur: "Mickaël Launay",
    description:
      "L'histoire des mathématiques de la préhistoire à nos jours, racontée comme un récit. Idéal pour commencer.",
    type: "livre",
    publics: ["lycee", "tous"],
    gratuit: false,
  },
  {
    titre: "Le théorème du parapluie",
    auteur: "Mickaël Launay",
    description:
      "Comment changer de point de vue rend un problème simple. Une invitation à regarder le monde en mathématicien.",
    type: "livre",
    publics: ["lycee", "tous"],
    gratuit: false,
  },
  {
    titre: "Le théorème du perroquet",
    auteur: "Denis Guedj",
    description:
      "Roman policier qui fait voyager à travers l'histoire des mathématiques, de Thalès à Fermat.",
    type: "livre",
    publics: ["college", "lycee", "tous"],
    gratuit: false,
  },
  {
    titre: "Théorème vivant",
    auteur: "Cédric Villani",
    description:
      "Le journal de bord d'un mathématicien pendant les deux années de recherche qui ont mené à sa médaille Fields.",
    type: "livre",
    publics: ["lycee", "superieur", "tous"],
    gratuit: false,
  },
  {
    titre: "Manuels et cahiers Sésamath",
    auteur: "Sésamath",
    description:
      "Manuels complets du collège et du lycée, sous licence libre, lisibles gratuitement en ligne ou disponibles en version papier.",
    url: "https://manuel.sesamath.net/",
    type: "livre",
    publics: ["college", "lycee"],
    gratuit: true,
  },
  {
    titre: "Livres Exo7 (Analyse, Algèbre)",
    auteur: "Exo7",
    description:
      "Les cours de première année de licence rassemblés en livres, téléchargeables gratuitement en PDF.",
    url: "https://exo7.emath.fr/",
    type: "livre",
    publics: ["superieur"],
    gratuit: true,
  },

  // ---------- Associations ----------
  {
    titre: "Femmes et Mathématiques",
    description:
      "Association qui agit pour la place des femmes en mathématiques : journées filles et maths, rendez-vous des jeunes mathématiciennes, portraits de mathématiciennes.",
    url: "https://www.femmes-et-maths.fr/",
    type: "association",
    publics: ["college", "lycee", "superieur"],
    gratuit: true,
  },
  {
    titre: "Animath",
    description:
      "Association qui organise des clubs, des stages et des compétitions (olympiades, Tournoi français des jeunes mathématiciennes et mathématiciens).",
    url: "https://www.animath.fr/",
    type: "association",
    publics: ["college", "lycee"],
    gratuit: true,
  },
];
