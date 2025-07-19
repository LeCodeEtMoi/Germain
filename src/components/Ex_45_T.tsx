import React, { useState } from 'react';

// Fonction pour générer un entier aléatoire entre min et max inclus
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function DiceSumExercise() {
  const [nFaces] = useState(randInt(4, 12)); // nombre de faces d'un dé
  const [nDice] = useState(randInt(2, 5));  // nombre de dés

  const [showCorrection, setShowCorrection] = useState(false);

  const expectedValueOneDie = (nFaces + 1) / 2;
  const expectedValueTotal = nDice * expectedValueOneDie;

  const handleShow = () => setShowCorrection(true);

  return (
    <div className="box">
      <h2 className="title is-4">Somme de variables aléatoires (dés)</h2>
      <p>
        On lance <strong>{nDice}</strong> dés équilibrés à <strong>{nFaces}</strong> faces, numérotées de 1 à {nFaces}.
        Soit <strong>X</strong> la variable aléatoire donnant la somme des résultats obtenus.
      </p>

      <ul className="mt-3">
        <li>Décomposer X en somme de variables aléatoires indépendantes suivant une même loi que vous préciserez.</li>
        <li>Calculez l’espérance mathématique E(X).</li>
        <li>Interprétez ce résultat dans le contexte.</li>
      </ul>

      <button className="button is-link mt-4" onClick={handleShow}>Afficher la correction</button>

      {showCorrection && (
        <div className="content mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            Soit <strong>X₁, X₂, ..., X<sub>{nDice}</sub></strong> les variables aléatoires correspondant aux résultats de chaque dé.
          </p>
          <p>
            Chaque X<sub>i</sub> suit une loi uniforme discrète sur l’ensemble {'{1, 2, ..., ' + nFaces + '}'}.
          </p>
          <p>
            On a alors : <strong>X = X₁ + X₂ + ... + X<sub>{nDice}</sub></strong>
          </p>
          <p>
            Pour un dé à {nFaces} faces, on a :
            <br />
            <strong>E(X<sub>i</sub>) = (1 + {nFaces}) / 2 = {expectedValueOneDie}</strong>
          </p>
          <p>
            Donc : <strong>E(X) = {nDice} × {expectedValueOneDie} = {expectedValueTotal}</strong>
          </p>
          <p>
            <strong>Interprétation :</strong> si on répète un grand nombre de fois cette expérience (lancer de {nDice} dés à {nFaces} faces), la moyenne des sommes obtenues tendra vers <strong>{expectedValueTotal}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
