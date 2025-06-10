import React from 'react';
import 'katex/dist/katex.min.css';
import './MathToolbar.css';

interface MathToolbarProps {
  onInsertSymbol: (symbol: string) => void;
}
const MathToolbar: React.FC<MathToolbarProps> = ({ onInsertSymbol }) => {
  const symbols = [
    { label: 'a', latex: 'a' },
    { label: 'b', latex: 'b' },
    { label: 'c', latex: 'c' },
    { label: 'x', latex: 'x' },
    { label: 'y', latex: 'y' },
    { label: 'z', latex: 'z' },
    { label: 'k', latex: 'k' },
    { label: 'n', latex: 'n' },
    { label: 'i', latex: 'i' },
    { label: 'e', latex: 'e' },
    { label: 'V', latex: 'V' },
    { label: 'F', latex: 'F' },
    { label: '+', latex: '+' },
    { label: '-', latex: '-' },
    { label: '×', latex: '\\times' },
    { label: '÷', latex: '\\div' },
    { label: '| |', latex: '\\left| \\right|' },
    { label: '√', latex: '\\sqrt{a + 5}' },
    { label: 'x²', latex: 'x^2' },
    { label: 'xⁿ', latex: 'x^{n}' },
    { label: '×10ⁿ', latex: '\\times 10^{n}' },
    { label: '°', latex: '^\\circ' },
    { label: '%', latex: '\\%' },
    { label: ';', latex: ';' },
    { label: '1', latex: '1' },
    { label: '2', latex: '2' },
    { label: '3', latex: '3' },
    { label: '4', latex: '4' },
    { label: '5', latex: '5' },
    { label: '6', latex: '6' },
    { label: '7', latex: '7' },
    { label: '8', latex: '8' },
    { label: '9', latex: '9' },
    { label: '0', latex: '0' },
    { label: ',', latex: ',' },
    { label: 'π', latex: '\\pi' },
  ];

  const handleSymbolClick = (latex: string) => {
    onInsertSymbol(latex);
  };

  return (
    <div className="math-toolbar">
      {symbols.map((symbol, index) => (
        <button key={index} onClick={() => handleSymbolClick(symbol.latex)}>
          <span dangerouslySetInnerHTML={{ __html: symbol.label }} />
        </button>
      ))}
    </div>
  );
};

export default MathToolbar;