import React, { useState } from 'react';

type Coord = [number, number, number];

const getRandomCoord = (): Coord => [
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 11) - 5,
];

const vector = (from: Coord, to: Coord): Coord => [
  to[0] - from[0],
  to[1] - from[1],
  to[2] - from[2],
];

const solveAlphaBetaSystem = (AB: Coord, AC: Coord, AD: Coord) => {
  const [u1, u2, u3] = AB;
  const [v1, v2, v3] = AC;
  const [w1, w2, w3] = AD;

  // Système : AB = αAC + βAD
  // ⇔ u1 = αv1 + βw1
  // ⇔ u2 = αv2 + βw2
  // ⇔ u3 = αv3 + βw3

  // On résout les 2 premières équations par combinaison
  const det = v1 * w2 - v2 * w1;

  if (Math.abs(det) < 1e-6) {
    return null; // système non résoluble avec les 2 premières équations
  }

  const alpha =
    (u1 * w2 - u2 * w1) / det;
  const beta =
    (v1 * u2 - v2 * u1) / det;

  // Vérification sur la 3e équation
  const left = u3;
  const right = alpha * v3 + beta * w3;

  if (Math.abs(left - right) > 1e-6) {
    return null; // Incohérence sur la 3e équation
  }

  return { alpha, beta };
};

const RandomPoints: React.FC = () => {
  const [pointA, setPointA] = useState<Coord>(getRandomCoord());
  const [pointB, setPointB] = useState<Coord>(getRandomCoord());
  const [pointC, setPointC] = useState<Coord>(getRandomCoord());
  const [pointD, setPointD] = useState<Coord>(getRandomCoord());

  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  const AB = vector(pointA, pointB);
  const AC = vector(pointA, pointC);
  const AD = vector(pointA, pointD);

  const solution = solveAlphaBetaSystem(AB, AC, AD);
  const coplanar = !!solution;

  const handleValidate = () => {
    setShowResult(true);
  };

  const generateNewPoints = () => {
    setPointA(getRandomCoord());
    setPointB(getRandomCoord());
    setPointC(getRandomCoord());
    setPointD(getRandomCoord());
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div>
      <h3>Déterminer si les points A, B, C et D sont coplanaires</h3>
      <p>A = ({pointA.join(', ')})</p>
      <p>B = ({pointB.join(', ')})</p>
      <p>C = ({pointC.join(', ')})</p>
      <p>D = ({pointD.join(', ')})</p>

      <label>
        <input
          type="radio"
          value="coplanar"
          checked={userAnswer === 'coplanar'}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        Coplanaires
      </label>
      <label>
        <input
          type="radio"
          value="nonCoplanar"
          checked={userAnswer === 'nonCoplanar'}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        Non coplanaires
      </label>

      <div>
        <button onClick={handleValidate}>Valider</button>
        <button onClick={generateNewPoints}>Nouveaux points</button>
      </div>

      {showResult && (
        <div style={{ marginTop: '1em' }}>
          <p>
            ✅ Réponse correcte : {coplanar ? 'Les points sont coplanaires' : 'Les points ne sont pas coplanaires'}
          </p>
          <p>
            🎓 Votre réponse :{' '}
            {userAnswer === 'coplanar' ? 'Coplanaires' : 'Non coplanaires'}{' '}
            {userAnswer === (coplanar ? 'coplanar' : 'nonCoplanar') ? '✅' : '❌'}
          </p>

          {userAnswer !== (coplanar ? 'coplanar' : 'nonCoplanar') && (
            <div style={{ marginTop: '1em' }}>
              <h4>Correction détaillée :</h4>
              <p><strong>Étape 1 — Calcul des vecteurs :</strong></p>
              <p>AB = B - A = ({AB.join(', ')})</p>
              <p>AC = C - A = ({AC.join(', ')})</p>
              <p>AD = D - A = ({AD.join(', ')})</p>

              <p><strong>Étape 2 — Mise en équation :</strong></p>
              <p>
                On cherche α et β tels que :
                <br />
                {`AB = α·AC + β·AD`}
              </p>

              <p><strong>Étape 3 — Résolution du système :</strong></p>
              <p>
                u1 = α·{AC[0]} + β·{AD[0]} ⇒ {AB[0]} = α·{AC[0]} + β·{AD[0]}
              </p>
              <p>
                u2 = α·{AC[1]} + β·{AD[1]} ⇒ {AB[1]} = α·{AC[1]} + β·{AD[1]}
              </p>
              <p>
                u3 = α·{AC[2]} + β·{AD[2]} ⇒ {AB[2]} = α·{AC[2]} + β·{AD[2]}
              </p>

              {solution ? (
                <>
                  <p><strong>→ Solution trouvée :</strong></p>
                  <p>
                    α = {solution.alpha.toFixed(2)}, β = {solution.beta.toFixed(2)}
                  </p>
                  <p>Donc AB = α·AC + β·AD, les vecteurs sont coplanaires.</p>
                </>
              ) : (
                <>
                  <p><strong>→ Ce système n’admet pas de solution compatible.</strong></p>
                  <p>Les vecteurs ne sont donc pas coplanaires.</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RandomPoints;
