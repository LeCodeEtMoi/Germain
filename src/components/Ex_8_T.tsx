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
  const propositions = [
    { tex: `\\binom{${nb_eleves}}{${groupe}}`, correct: true },
    { tex: expressionDescendante(nb_eleves, groupe), correct: false },
    { tex: expressionDescendante1(nb_eleves, groupe), correct: false },
    { tex: `${nb_eleves}^{${groupe}}`, correct: false },
  ];
  const melange = propositions.sort(() => Math.random() - 0.5);
  return { nb_eleves, groupe, propositions: melange };
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
        Une professeure enseigne la spécialité mathématiques dans une classe de {exercice.nb_eleves} élèves de terminale.
      </h4>
      <p>Elle veut former un groupe de {exercice.groupe} élèves.</p>
      <p>De combien de façons différentes peut-elle former un tel groupe ?</p>

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
