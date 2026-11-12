// Exercices de BUT 2, chapitre « Chiffrements symétriques » : Ex_11_B2 à Ex_25_B2.
// L'ordre suit la progression du chapitre : permutations, substitutions, masque jetable,
// modes opératoires, schéma de Feistel, sécurité des clés.

export interface ExerciceB2 {
  /** Nom du fichier et du composant, par exemple Ex_11_B2. */
  nom: string;
  slug: string;
  titre: string;
  description: string;
}

export const exercicesB2: ExerciceB2[] = [
  { nom: "Ex_11_B2", slug: "ex_11_b2", titre: "Chiffrement par permutation", description: "Chiffrer et déchiffrer par blocs, compter les clés, retrouver une clé." },
  { nom: "Ex_12_B2", slug: "ex_12_b2", titre: "Le chiffre de César", description: "Décalage, nombre de clés et attaque par force brute." },
  { nom: "Ex_13_B2", slug: "ex_13_b2", titre: "Une clé qui s'annule elle-même", description: "ROT13 et composition de décalages." },
  { nom: "Ex_14_B2", slug: "ex_14_b2", titre: "Substitution mono-alphabétique", description: "Chiffrer, déchiffrer et compter les clés." },
  { nom: "Ex_15_B2", slug: "ex_15_b2", titre: "Analyse des fréquences", description: "Casser une substitution grâce aux statistiques du français." },
  { nom: "Ex_16_B2", slug: "ex_16_b2", titre: "Le chiffre de Vigenère", description: "Chiffrer, déchiffrer et traduire dans Z/26Z." },
  { nom: "Ex_17_B2", slug: "ex_17_b2", titre: "Le masque jetable", description: "Chiffrer et comprendre pourquoi il est incassable." },
  { nom: "Ex_18_B2", slug: "ex_18_b2", titre: "César en mode CBC", description: "Chaîner les blocs avec un vecteur d'initialisation." },
  { nom: "Ex_19_B2", slug: "ex_19_b2", titre: "Mode CBC avec vol de chiffré", description: "Découpage en blocs et protocole de déchiffrement." },
  { nom: "Ex_20_B2", slug: "ex_20_b2", titre: "Le mode XTS", description: "Déchiffrer un bloc d'un secteur de disque." },
  { nom: "Ex_21_B2", slug: "ex_21_b2", titre: "Erreurs de transmission", description: "Propagation d'un bit faux selon le mode opératoire." },
  { nom: "Ex_22_B2", slug: "ex_22_b2", titre: "Un mode opératoire à analyser", description: "Déchiffrement et faiblesse d'un chaînage mal placé." },
  { nom: "Ex_23_B2", slug: "ex_23_b2", titre: "Schéma de Feistel", description: "Fonctions de Feistel et mini-DES à deux tours." },
  { nom: "Ex_24_B2", slug: "ex_24_b2", titre: "Entropie d'un mot de passe", description: "Combinaisons, entropie et force." },
  { nom: "Ex_25_B2", slug: "ex_25_b2", titre: "La force brute", description: "Temps et facteur de travail d'une recherche exhaustive." },
];
