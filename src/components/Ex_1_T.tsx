import React, { useState } from "react";
import { Button } from "src/components/ui/button.tsx"; // exemple UI shadcn
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

type Coord = [number, number, number];

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button>Button</Button>
    </div>
  )
}

// Fonction pour générer une équation cartésienne d’un plan
function equationCartesienne(A: Coord, V: Coord): string {
  const [a, b, c] = V;
  const [x, y, z] = A;
  const d = -(a * x + b * y + c * z);

  const terms: string[] = [];
  if (a !== 0) terms.push(`${a}x`);
  if (b !== 0) terms.push(`${b > 0 && terms.length > 0 ? "+" : ""}${b}y`);
  if (c !== 0) terms.push(`${c > 0 && terms.length > 0 ? "+" : ""}${c}z`);
  if (d !== 0 || terms.length === 0) {
    terms.push(`${d > 0 && terms.length > 0 ? "+" : ""}${d}`);
  }
  return terms.join(" ") + " = 0";
}

// Génération aléatoire de coordonnées entre -5 et 5
function randomCoord(): Coord {
  return [
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
  ];
}

export default function EquationCartesienne() {
  const [A, setA] = useState<Coord>(randomCoord());
  const [V, setV] = useState<Coord>(randomCoord());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  const correctEq = equationCartesienne(A, V);

  function handleValidate() {
    const normalizedUser = userInput.replace(/\s+/g, "").toLowerCase();
    const normalizedCorrect = correctEq.replace(/\s+/g, "").toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback({ correct: true, message: <p>🎉 Bravo Maître, la réponse est correcte !</p> });
    } else {
      setFeedback({
        correct: false,
        message: (
          <div>
            <p>❌ Oups, une erreur s'est glissée, Maître.</p>
            <p>Le vecteur normal n⃗ = ({V.join(", ")}) est normal au plan.</p>
            <p>La formule du plan est : ax + by + cz + d = 0</p>
            <p>
              Avec a = {V[0]}, b = {V[1]}, c = {V[2]} et le point A({A.join(", ")})
            </p>
            <p>
              d = - (a × x + b × y + c × z) = -(
              {V[0]}×{A[0]} + {V[1]}×{A[1]} + {V[2]}×{A[2]}) = {-(V[0] * A[0] + V[1] * A[1] + V[2] * A[2])}
            </p>
            <p>
              <strong>Équation correcte :</strong> {correctEq}
            </p>
          </div>
        ),
      });
    }
  }

  function handleNewExercise() {
    setA(randomCoord());
    setV(randomCoord());
    setUserInput("");
    setFeedback(null);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗</h2>

      <div>
        <p>
          <strong>Point A :</strong> ({A.join(", ")})
        </p>
        <p>
          <strong>Vecteur normal n⃗ :</strong> ({V.join(", ")})
        </p>
      </div>

      <div>
        <Label htmlFor="userInput" className="mb-1 block font-medium">
          Écris ton équation cartésienne
        </Label>
        <Input
          id="userInput"
          type="text"
          placeholder="Ex: 2x - 3y + 4z + 1 = 0"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>



      <div className="flex gap-3">
         <div onClick={handleValidate} className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button>Valider a</Button>
    </div>
        <Button onClick={handleNewExercise} variant="outline">
          Nouvelle exercice
        </Button>
      </div>

      {feedback && (
        <div className={`p-4 rounded ${feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}
