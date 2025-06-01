import React, { useState } from 'react';

type Coord = [number, number, number];

function equationCartesienne(A: Coord, V: Coord): string {
  const [a, b, c] = V;
  const [x, y, z] = A;
  const d = -(a * x + b * y + c * z);

  const terms: string[] = [];
  if (a !== 0) terms.push(`${a}x`);
  if (b !== 0) terms.push(`${b > 0 && terms.length > 0 ? '+' : ''}${b}y`);
  if (c !== 0) terms.push(`${c > 0 && terms.length > 0 ? '+' : ''}${c}z`);

  // Ajout de d avec signe explicite si nécessaire
  if (d !== 0 || terms.length === 0) {
    terms.push(`${d > 0 && terms.length > 0 ? '+' : ''}${d}`);
  }

  return terms.join(' ') + ' = 0';
}


function randomCoord(): Coord {
  return [
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
  ];
}

const EquationCartesienne: React.FC = () => {
  const [A, setA] = useState<Coord>(randomCoord());
  const [V, setV] = useState<Coord>(randomCoord());
  const [userInput, setUserInput] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  const correctEq = equationCartesienne(A, V);

  const checkAnswer = () => {
    setShowCorrection(true);
  };

  const newExercise = () => {
    setA(randomCoord());
    setV(randomCoord());
    setUserInput('');
    setShowCorrection(false);
  };

  return (
    <div>
      <h4>Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗</h4>
      <p>Point A : ({A.join(', ')})</p>
      <p>Vecteur normal n⃗ : ({V.join(', ')})</p>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ex: 2x - 3y + 4z + 1 = 0"
        style={{ width: '300px' }}
      />
      <div>
        <button onClick={checkAnswer}>Valider</button>
        <button onClick={newExercise} style={{ marginLeft: '1em' }}>Nouvel exercice</button>
      </div>

      {showCorrection && (
        <div style={{ marginTop: '20px' }}>
          {userInput.replace(/\s+/g, '') === correctEq.replace(/\s+/g, '') ? (
            <p><strong>Bravo Maître, la réponse est correcte !</strong></p>
          ) : (
            <div>
              <p><strong>Aïe, une erreur s'est glissée, Maître.</strong></p>
              <p>Le vecteur n⃗({V.join(', ')}) est normal au plan.</p>
              <p>On utilise la formule : ax + by + cz + d = 0</p>
              <p>Avec a={V[0]}, b={V[1]}, c={V[2]} et le point A({A.join(', ')})</p>
              <p>d = -({V[0]}×{A[0]} + {V[1]}×{A[1]} + {V[2]}×{A[2]}) = {-(
                V[0] * A[0] +
                V[1] * A[1] +
                V[2] * A[2]
              )}</p>
              <p><strong>Équation correcte : {correctEq}</strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EquationCartesienne;
