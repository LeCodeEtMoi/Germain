import React, { useState } from 'react';
import MathTex from './MathTex.tsx';

// Génère un nombre aléatoire entre un intervalle
const random = (type: number) => {
  if (type === 1) {
    return Math.floor(Math.random() * (40 - 27 + 1)) + 27; // entre 27 et 40
  } else {
    return Math.floor(Math.random() * (10 - 3 + 1)) + 3;   // entre 3 et 10
  }
};

// Génère trois nombres qui, une fois additionnés, donnent k
const genererTroisNombres = (k: number) => {
    const a = Math.floor(Math.random() * (k / 2)); // Premier nombre (aléatoire entre 0 et k/2)
    const b = Math.floor(Math.random() * (k - a)); // Deuxième nombre (aléatoire entre 0 et k-a)
    const c = k - (a + b); // Troisième nombre (le reste de k après a et b)
  
    return [a, b, c];
  };
// Génere un nombre aléatoire possible d'eleves de ses
const eleves_ses = (k:nombre)=> {
    return Math.floor(Math.random() * (k - 2 + 1)) + 2;
}

// Génère une expression descendante (ex: 27 × 26 × 25...)
const expressionDescendante = (n: number, k: number): string => {
  const termes = [];
  for (let i = 0; i < k; i++) {
    termes.push(n - i);
  }
  return termes.join(" × ");
};

// Génère une expression descendante (ex: 27 + 26 + 25...)
const expressionDescendante1 = (n: number, k: number): string => {
    const termes = [];
    for (let i = 0; i < k; i++) {
      termes.push(n - i);
    }
    return termes.join(" + ");
  };

// Fonction pour créer un nouvel exercice
const genererExercice = () => {
  const nb_eleves = random(1);
  const groupe = random(0);
  const a = genererTroisNombres(nb_eleves);
  const ph = a[0]; // Premier nombre pour la spécialité physique-chimie
  const ses = a[1]; // Deuxième nombre pour la spécialité SES
  const llce = a[2]; // Troisième nombre pour la spécialité LLCE
  const eleve_ses = eleves_ses(ses);
  

  const propositions = [
    { tex: `\\binom{${ses}}{${eleve_ses}}+\\binom{${nb_eleves-groupe}}{${eleve_ses}}`, correct: false },
    { tex: `\\binom{${ses}}{${eleve_ses}}*\\binom{${nb_eleves-groupe}}{${eleve_ses}}`, correct: true },
    { tex: `${ses}^{${eleve_ses}}*${nb_eleves-groupe}^{${eleve_ses}}`, correct: false },
    { tex: `\\binom{${ses}}{${eleve_ses}}`, correct: false },
  ];
  const melange = propositions.sort(() => Math.random() - 0.5);
  return { nb_eleves, groupe, ph, ses, llce, eleve_ses,propositions: melange };
};

const Denombremement: React.FC = () => {
  const [exercice, setExercice] = useState(genererExercice());
  const [checked, setChecked] = useState<number | null>(null);
  const [validated, setValidated] = useState<boolean>(false);

  const handleChange = (index: number) => () => {
    setChecked(index);
  };

  const handleValidate = () => {
    setValidated(true);
  };

  const handleNewExercise = () => {
    setExercice(genererExercice());
    setChecked(null);
    setValidated(false);
  };

  return (
    <div>
      <h4>
        Une professeure de terminale Spé Maths s'intéresse à l'autre spécialité des {exercice.nb_eleves} élèves de son groupe :
      </h4>
      <ul>
        <li><p>{exercice.ph} élèves ont choisi la spécialité physique-chimie</p></li>
        <li><p>{exercice.ses} élèves ont choisi la spécialité SES</p></li>
        <li><p>{exercice.llce} élèves ont choisi la spécialité LLCE espagnol.</p></li>
      </ul>
      <p>Elle veut former un groupe de {exercice.groupe} élèves comportant exactement {exercice.eleve_ses} élèves ayant choisi la spécialité SES.
      De combien de façons différentes peut-elle former un tel groupe ?</p>

      {exercice.propositions.map((item, index) => (
        <label key={index} style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="proposition"
            checked={checked === index}
            onChange={handleChange(index)}
          />{" "}
          <MathTex tex={item.tex} />
        </label>
      ))}

      <button onClick={handleValidate} style={{ marginRight: '10px' }}>
        Valider
      </button>
      <button onClick={handleNewExercise}>Nouvel exercice</button>

      {validated && checked !== null && (
        <p style={{ color: exercice.propositions[checked].correct ? 'green' : 'red' }}>
          {exercice.propositions[checked].correct ? 'Bonne réponse !' : 'Mauvaise réponse.'}
        </p>
      )}
    </div>
  );
};

export default Denombremement;
