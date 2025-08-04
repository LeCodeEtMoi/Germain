import React, { useEffect, useRef } from 'react';
import { MathfieldElement } from 'mathlive';

interface EditableMathInputProps {
  onInput?: (value: string) => void;
}

const EditableMathInput: React.FC<EditableMathInputProps> = ({ onInput }) => {
  const mathfieldRef = useRef<MathfieldElement | null>(null);

  useEffect(() => {
    const mf = new MathfieldElement({
      virtualKeyboardMode: 'manual', // or 'onfocus'
      smartFence: true,
      smartMode: true,
    });

    mf.className = 'math-input';
    mf.value = ''; // Initial expression

    mf.addEventListener('input', () => {
      onInput?.(mf.value);
    });

    if (mathfieldRef.current) {
      mathfieldRef.current.replaceWith(mf);
    }

    mathfieldRef.current = mf;
  }, [onInput]);

  return <div ref={mathfieldRef} />;
};

export default EditableMathInput;
