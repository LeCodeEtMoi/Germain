// ExerciceConvexite.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import  MathTex  from '@/components/MathTex'; // Assurez-vous que ce composant est bien présent

const ExerciceConvexite = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // Génération d'une fonction cubique f(x) = ax³ + bx² + cx + d avec a > 0
  const a = 0.05;
  const b = -0.4;
  const c = 0.5;
  const d = 1;

  const f = (x: number): number => a * x ** 3 + b * x ** 2 + c * x + d;

  const data = Array.from({ length: 41 }, (_, i) => {
    const x = i - 20;
    return { x, y: parseFloat(f(x).toFixed(2)) };
  });

  // Calcul de f''(x) = 6ax + 2b. Le point d'inflexion est en x₀ = -b / (3a)
  const x0 = -b / (3 * a);

  return (
    <div className="box my-5">
      <h2 className="title is-4">Convexité et concavité d'une fonction</h2>
      <p>
        On considère une fonction \( f \) définie sur \([ -10 ; 10 ]\) dont le graphique est donné ci-dessous.
        À l’aide du graphique, déterminer les intervalles où la fonction est convexe et ceux où elle est concave.
      </p>

      <div className="my-4">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" domain={[-10, 10]} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#00d1b2" dot={false} />
        </LineChart>
      </div>

      <button
        className="button is-link"
        onClick={() => setShowCorrection(!showCorrection)}
      >
        {showCorrection ? 'Masquer la correction' : 'Afficher la correction'}
      </button>

      {showCorrection && (
        <div className="content mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            La convexité d'une fonction est déterminée par le signe de la dérivée seconde :
          </p>
          <p>
            \( f''(x) = 6 \cdot {a} \cdot x + 2 \cdot ({b}) = {6 * a}x + {2 * b} \)
          </p>
          <p>
            Le changement de concavité s’effectue lorsque \( f''(x) = 0 \), c’est-à-dire :
          </p>
          <p>
            \( {6 * a}x + {2 * b} = 0 \Rightarrow x = {-b} / (3 \cdot {a}) = {x0.toFixed(2)} \)
          </p>
          <p>
            <strong>Conclusion :</strong>
          </p>
          <ul>
            <li>
              • \( f \) est <strong>concave</strong> sur \( ] -\infty ; {x0.toFixed(2)} [ \)
            </li>
            <li>
              • \( f \) est <strong>convexe</strong> sur \( ] {x0.toFixed(2)} ; +\infty [ \)
            </li>
          </ul>
          <p>
            Le point \( x = {x0.toFixed(2)} \) est un <strong>point d’inflexion</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciceConvexite;
