import React, { useState } from 'react';
import { derivative, simplify, parse } from "mathjs";
import MathTex from './MathTex.tsx';




// Utilitaire
const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Générateurs de fonctions et primitives
const functionTypes = [
  {
    type: 'constant',
    generate: () => {
      const a = randomNumber(1, 10);
      return { func: `${a}`, primitive: `${a}x + C` };
    }
  },
  {
    type: 'polynomial',
    generate: () => {
      const n = randomNumber(2, 5);
      return { func: `x^${n}`, primitive: `x^${n + 1}/${n + 1} + C` };
    }
  },
  {
    type: 'reciprocal',
    generate: () => ({ func: `1/x`, primitive: `ln|x| + C` })
  },
  {
    type: 'inverse_sqrt',
    generate: () => ({ func: `1/sqrt(x)`, primitive: `2*sqrt(x) + C` })
  },
  {
    type: 'exponential',
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `e^(${a}x)`, primitive: `e^(${a}x)/${a} + C` };
    }
  },
  {
    type: 'cosine',
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `cos(${a}x)`, primitive: `sin(${a}x)/${a} + C` };
    }
  },
  {
    type: 'sine',
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `sin(${a}x)`, primitive: `-cos(${a}x)/${a} + C` };
    }
  },
];

// Nettoyage d'expressions mathématiques
const normalizeMath = (expression: string) => {
  return expression
    .replace(/\s+/g, '')        // Supprimer les espaces
    .replace(/\*\*/g, '^')      // Remplacer ** par ^
    .replace(/\*/g, '')         // Enlever les *
    .replace(/ln\|x\|/g, 'ln|x|')
    .replace(/\+C$/i, '')       // Enlever +C pour comparaison
    .replace(/^-/g, 'neg')      // Pour ne pas confondre - et opérateur
    .toLowerCase();
};

// Fonction de comparaison symbolique simple
const expressionsEquivalent = (a: string, b: string) => {
  const normalize = (expr: string) =>
    normalizeMath(expr)
      .replace(/([a-z0-9])\/([a-z0-9])/gi, '($1)/($2)') // homogénéise les fractions
      .replace(/([0-9]+)\/([0-9]+)([a-z\(])/g, '($1/{$2})*$3') // 1/2sin -> (1/2)*sin
      .replace(/([a-z0-9])([a-z])/gi, '$1*$2'); // ab -> a*b
  return normalize(a) === normalize(b);
};

// Génère une fonction aléatoire non validée
const generateRandomFunction = (validated: boolean[]) => {
  const remaining = functionTypes
    .map((_, i) => i)
    .filter(i => !validated[i]);
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  return {
    index,
    ...functionTypes[index].generate()
  };
};

const IntegrationExercise: React.FC = () => {
  const [validated, setValidated] = useState<boolean[]>(Array(functionTypes.length).fill(false));
  const [current, setCurrent] = useState(() => generateRandomFunction(validated));
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = () => {
    if (estBonneRéponse(userAnswer, current.func)) {
      const updated = [...validated];
      updated[current.index] = true;
      setValidated(updated);
  
      if (updated.every(v => v)) {
        setFeedback("🎉 Félicitations Maître ! Vous avez terminé toutes les intégrales.");
      } else {
        setFeedback("✅ Bonne réponse, Maître !");
        setCurrent(generateRandomFunction(updated));
      }
    } else {
      setFeedback(`❌ Mauvaise réponse. La bonne réponse était : \\(${current.primitive}\\)`);
    }
    setUserAnswer('');
  };

  function estBonneRéponse(reponseUtilisateur: string, fonctionOriginale: string): boolean {
    try {
      // On dérive la réponse utilisateur
      const derivéeUtilisateur = simplify(derivative(reponseUtilisateur, 'x'));
      const fonctionSimplifiée = simplify(fonctionOriginale);
  
      // On compare les expressions simplifiées
      return derivéeUtilisateur.equals(fonctionSimplifiée);
    } catch (e) {
      console.error("Erreur de dérivation : ", e);
      return false;
    }
  }
    const insertAtCursor = (text: string) => {
      const input = document.getElementById("primitive-input") as HTMLInputElement;
      if (!input) return;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const current = userAnswer;
      const updated = current.slice(0, start) + text + current.slice(end);
      setUserAnswer(updated);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    };
    

    return (
      <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem', fontFamily: 'sans-serif' }}>
        <h3>📘 Trouvez la primitive de :</h3>
        <MathTex tex={`f(x) = ${current.func}`} />
  
        {/* ⬇️ Vos boutons ici */}
        <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {[
          { label: '^', insert: '^{x}' },
          { label: '*', insert: '\\cdot ' },
          { label: '√', insert: '\\sqrt{x}' },
          { label: 'ln|x|', insert: '\\ln{|x|}' },
          { label: 'π', insert: '\\pi' },
          { label: 'e^', insert: 'e^{x}' },
          { label: 'sin', insert: '\\sin{x}' },
          { label: 'cos', insert: '\\cos{x}' },
          { label: '1/3', insert: '\\frac{1}{3}' },
          { label: '+ C', insert: '+ C' },
        ].map(({ label, insert }) => (
            <button
              key={label}
              type="button"
              onClick={() => insertAtCursor(insert)}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '1rem',
                borderRadius: '0.3rem',
                border: '1px solid #ccc',
                backgroundColor: '#f5f5f5',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>
  
        <input
          id="primitive-input"
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Entrez la primitive de f(x)"
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '100%',
            margin: '1rem 0',
            boxSizing: 'border-box',
          }}
        />
        {userAnswer && (
  <div style={{ marginTop: '1rem' }}>
    <strong>Prévisualisation : </strong>
    <MathTex tex={userAnswer} />
  </div>
)}

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '0.5rem',
          }}
        >
          Valider
        </button>
  
        {feedback && (
          <div style={{ marginTop: '1rem' }}>
            <p>{feedback.includes('\\') ? <MathTex tex={feedback} /> : feedback}</p>
          </div>
        )}
      </div>
    );
  };

export default IntegrationExercise;
