import React from 'react';
import 'katex/dist/katex.min.css';
import MathTex from './MathTex';
import './MathToolbar.css';

interface MathSymbol {
  latex: string;
  displayLatex?: string;
  cursorPos?: number;
}

interface MathToolbarProps {
  onInsertSymbol: (symbol: string, cursorPos?: number) => void;
}
const MathToolbar: React.FC<MathToolbarProps> = ({ onInsertSymbol }) => {
  const symbolGroups: { [key: string]: MathSymbol[] } = {
    'Opérations': [
      { latex: '+' },
      { latex: '-' },
      { latex: '\\times' },
      { latex: '\\div' },
      { latex: '\\pm' },
    ],
    'Relations': [
      { latex: '=' },
      { latex: '\\neq' },
      { latex: '<' },
      { latex: '>' },
      { latex: '\\leq' },
      { latex: '\\geq' },
    ],
    'Symboles': [
      { latex: '\\infty' },
      { latex: '\\pi' },
      { latex: '^\\circ' },
      { latex: '\\%' },
      { latex: '\\in' },
      { latex: '\\notin' },
    ],
    'Ensembles': [
      { latex: '\\mathbb{R}' },
      { latex: '\\mathbb{N}' },
      { latex: '\\mathbb{Z}' },
      { latex: '\\mathbb{Q}' },
      { latex: '\\mathbb{C}' },
    ],
    'Structures': [
      { latex: '\\frac{}{}', displayLatex: '\\frac{a}{b}', cursorPos: 6 },
      { latex: '\\sqrt{}', displayLatex: '\\sqrt{a}', cursorPos: 6 },
      { latex: '\\sqrt[]{}', displayLatex: '\\sqrt[n]{a}', cursorPos: 6 },
      { latex: '^{2}', displayLatex: 'x^2' },
      { latex: '^{}', displayLatex: 'x^n', cursorPos: 2 },
      { latex: '_{}', displayLatex: 'x_n', cursorPos: 2 },
      { latex: '\\left| \\right|', displayLatex: '|a|', cursorPos: 6 },
    ],
    'Lettres Grecques': [
      { latex: '\\alpha' },
      { latex: '\\beta' },
      { latex: '\\gamma' },
      { latex: '\\delta' },
      { latex: '\\theta' },
    ],
    'Calcul': [
        { latex: '\\lim_{n\\to\\infty}' },
        { latex: '\\int_{a}^{b}' },
        { latex: '\\sum_{i=0}^{n}' },
        { latex: '\\frac{d}{dx}' },
    ],
    'Vecteurs': [
        { latex: '\\vec{}', displayLatex: '\\vec{v}', cursorPos: 5 },
        { latex: '\\binom{}{}', displayLatex: '\\binom{x}{y}', cursorPos: 7 },
    ]
  };

  return (
    <div className="math-toolbar">
      {Object.entries(symbolGroups).map(([groupName, symbols]) => (
        <div key={groupName} className="mb-2">
          <p className="has-text-weight-bold is-size-7">{groupName}</p>
          <div className="buttons are-small">
            {symbols.map((symbol, index) => (
              <button
                key={index}
                className="button"
                onClick={() => onInsertSymbol(symbol.latex, symbol.cursorPos)}
              >
                <MathTex tex={symbol.displayLatex || symbol.latex} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MathToolbar;