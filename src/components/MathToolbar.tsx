import React, { useRef, useEffect } from 'react';
import MathToolbar from './MathToolbar';

const MathEditor: React.FC = () => {
  const mathfieldRef = useRef<MathfieldElement>(null);

  useEffect(() => {
    const mf = new MathfieldElement({
      virtualKeyboardMode: 'manual',
      smartFence: true,
      smartMode: true,
    });

    mf.className = 'math-input';
    mf.value = '';
    mf.style.minWidth = '300px';
    mf.style.fontSize = '1.2rem';

    if (mathfieldRef.current) {
      mathfieldRef.current.replaceWith(mf);
    }

    mathfieldRef.current = mf;
  }, []);

  const handleInsertSymbol = (symbol: string, cursorPos?: number) => {
    mathfieldRef.current?.focus();
    mathfieldRef.current?.insert(symbol);
    if (cursorPos) {
      mathfieldRef.current?.moveToOffset(cursorPos);
    }
  };

  return (
    <div>
      <div ref={mathfieldRef} />
      <MathToolbar onInsertSymbol={handleInsertSymbol} />
    </div>
  );
};

export default MathEditor;
