<div align="center">

# Germain

**Des mathématiques accessibles, pour toutes et pour tous.**

Exercices interactifs, toujours différents, corrigés pas à pas.

![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Bulma](https://img.shields.io/badge/Bulma-00D1B2?logo=bulma&logoColor=white)

</div>

---

## 🎯 Le projet

En France, le niveau en mathématiques n'est plus au sommet depuis quelque temps. L'équipe de Germain a pour objectif de **rendre les mathématiques plus accessibles** et de permettre à celles et ceux qui en ont le désir de s'y intéresser, en éveillant la curiosité pour cette discipline millénaire.

Les femmes sont encore sous-représentées dans le domaine des mathématiques, et cela doit changer : rien ne justifie qu'elles soient moins capables que les hommes dans ce domaine.

### Pourquoi « Germain » ?

En hommage à **Sophie Germain**, pionnière des mathématiques qui a dû se battre pour avoir le droit d'étudier cette science. C'est grâce à ses travaux que la Tour Eiffel tient encore debout aujourd'hui.

Les mathématiques permettent de réaliser d'innombrables choses : la musique, l'économie, la météorologie, la cryptographie, la médecine, l'informatique, le sport…

---

## ✨ Ce que propose le site

- **Des exercices de Terminale** (56 à ce jour) : suites, limites, continuité, dérivation et convexité, fonctions composées, logarithme et exponentielle, intégration, équations différentielles, probabilités, algorithmique en Python…
- **Des valeurs aléatoires** à chaque chargement et à chaque clic sur « Nouvel exercice » : une infinité d'exercices similaires mais uniques.
- **Une correction immédiate**, sans rechargement de page :
  - bonne réponse → un message d'encouragement ;
  - mauvaise réponse → une correction détaillée, pas à pas, avec les **erreurs fréquentes** et des **conseils** pour la prochaine fois.
- **Du code Python lisible** : blocs façon éditeur (onglet, numéros de ligne, coloration, repères d'indentation).
- **Une liste d'exercices générée automatiquement** à partir des métadonnées de chaque page.
- Des pages d'information : accueil, à propos, déontologie, aide.

---

## 🧱 Stack

| Rôle | Outil |
| --- | --- |
| Framework du site | [Astro](https://astro.build) |
| Exercices interactifs | [React](https://react.dev) (îlots `client:load`) |
| Langage | TypeScript |
| Interface | [Bulma](https://bulma.io) + feuille de style maison |
| Formules | [KaTeX](https://katex.org) via le composant `MathTex` |

---

## 🚀 Démarrer

Prérequis : [Node.js](https://nodejs.org) récent et npm.

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire le site pour la production
npm run build

# Prévisualiser la version construite
npm run preview
```

---

## 🗂️ Structure

```text
src/
├── components/
│   ├── Ex_1_T.tsx … Ex_56_T.tsx   # un exercice = un composant React
│   ├── ExerciceUI.tsx             # pièces d'interface communes (cadre, boutons, retours, BlocCode…)
│   ├── Questions.tsx              # bloc « questions + Valider + Nouvel exercice + correction »
│   └── MathTex.tsx                # rendu des formules (KaTeX)
├── lib/
│   ├── maths.ts                   # tirages, fractions, lecture et calcul d'expressions saisies
│   ├── reponses.ts                # vérification des réponses (fonctions, primitives, fractions…)
│   ├── intervalles.ts  trigo.ts  algo.ts  equations.ts
│   └── python.ts                  # coloration syntaxique Python
├── pages/
│   └── ex/ex_1_T.astro … ex_56_T.astro   # une page par exercice
└── styles/
    ├── exercice.css               # charte graphique des exercices
    └── python.css                 # style « IDE » des blocs de code
```

---

## 🧪 Charte de conception des exercices

**Interface**
- Bulma + `exercice.css` uniquement, composants accessibles et responsives.
- Le CSS est importé dans le fichier `.astro`, jamais dans le `.tsx`.

**Données**
- Toutes les valeurs numériques sont tirées au hasard, dans des plages adaptées : ni trop simples, ni impossibles.
- Le tirage se fait dans le navigateur, après l'affichage : l'énoncé affiché est toujours celui que la correction utilise.

**Chaque exercice contient**
- un énoncé dynamique, clair et bien formaté ;
- une zone de réponse : champ libre (numérique ou littéral) ou boutons radio ;
- les boutons **« Valider »** et **« Nouvel exercice »** (qui réinitialise tout : valeurs, énoncé, réponses, messages) ;
- une validation qui compare la réponse à la solution **recalculée** à partir des valeurs générées, et gère proprement les états neutre, succès et erreur.

**Fiabilité des réponses**
- Les réponses saisies sont lues par un analyseur d'expressions et comparées numériquement : toute écriture équivalente est acceptée (`2x+4` comme `2(x+2)`).
- Les calculs utilisent des fractions exactes : pas d'arrondis cachés.
- Les générateurs restent simples, pour des exercices toujours cohérents.

---

## ➕ Ajouter un exercice

1. Créer `src/components/Ex_N_T.tsx` : un `genererExercice()` qui tire les données, une fonction `questions(exo)` et le composant qui assemble `Cadre`, `Titre`, `Enonce` et `Questions`.
2. Créer `src/pages/ex/ex_N_T.astro` :

```astro
---
import LeconLayout from '../../layouts/Exercice.astro';
import MonExercice from '../../components/Ex_N_T.tsx';
import '../../styles/exercice.css';

const exerciceMeta = {
  title: "Titre court de l'exercice",
  description: "Une phrase qui dit ce qu'on demande",
  chapitre: "Nom du chapitre",
};
---

<LeconLayout title={exerciceMeta.description}>
  <main>
    <MonExercice client:load />
  </main>
</LeconLayout>
```

3. Si l'exercice affiche du code Python, ajouter aussi `import '../../styles/python.css';`.

La page `exercices` lit `exerciceMeta` : le nouvel exercice apparaît tout seul dans la liste, classé par chapitre.

---

## 🎨 Identité visuelle

- **Violet** `#6528d9`, **lavande** pâle, **jaune « craie »** `#ffd84d` pour les accents.
- Titres en **Righteous**, texte en **Inter**.
- Titres de section préfixés par `//`, boutons en forme de pilule.

---

## 🤝 Contribuer

Les contributions sont les bienvenues : nouveaux exercices, corrections, améliorations d'accessibilité.

- Respecter la charte de conception ci-dessus.
- Vérifier qu'une bonne réponse est **toujours** acceptée, quelle que soit la valeur tirée, et qu'une mauvaise réponse donne une correction juste.
- Rédiger les messages et corrections en français, avec bienveillance.

---

<div align="center">

*« Rien ne justifie que les femmes soient moins capables que les hommes en mathématiques. »*
Sophie Germain ouvrait la voie ; à nous de la rendre plus large. 💜

</div>