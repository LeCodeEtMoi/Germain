// Chargeur unique des exercices de BUT 2 : la page Astro hydrate ce composant,
// qui affiche l'exercice demandé. (Astro ne sait pas hydrater un composant choisi
// dynamiquement dans le frontmatter.)
import type { ComponentType } from "react";
import Ex_11_B2 from "./Ex_11_B2";
import Ex_12_B2 from "./Ex_12_B2";
import Ex_13_B2 from "./Ex_13_B2";
import Ex_14_B2 from "./Ex_14_B2";
import Ex_15_B2 from "./Ex_15_B2";
import Ex_16_B2 from "./Ex_16_B2";
import Ex_17_B2 from "./Ex_17_B2";
import Ex_18_B2 from "./Ex_18_B2";
import Ex_19_B2 from "./Ex_19_B2";
import Ex_20_B2 from "./Ex_20_B2";
import Ex_21_B2 from "./Ex_21_B2";
import Ex_22_B2 from "./Ex_22_B2";
import Ex_23_B2 from "./Ex_23_B2";
import Ex_24_B2 from "./Ex_24_B2";
import Ex_25_B2 from "./Ex_25_B2";

const COMPOSANTS: Record<string, ComponentType> = {
  ex_11_b2: Ex_11_B2,
  ex_12_b2: Ex_12_B2,
  ex_13_b2: Ex_13_B2,
  ex_14_b2: Ex_14_B2,
  ex_15_b2: Ex_15_B2,
  ex_16_b2: Ex_16_B2,
  ex_17_b2: Ex_17_B2,
  ex_18_b2: Ex_18_B2,
  ex_19_b2: Ex_19_B2,
  ex_20_b2: Ex_20_B2,
  ex_21_b2: Ex_21_B2,
  ex_22_b2: Ex_22_B2,
  ex_23_b2: Ex_23_B2,
  ex_24_b2: Ex_24_B2,
  ex_25_b2: Ex_25_B2,
};

export default function ExerciceB2({ slug }: { slug: string }) {
  const Composant = COMPOSANTS[slug];
  return Composant ? <Composant /> : <p>Exercice introuvable.</p>;
}
