import React, { useEffect, useRef } from 'react';

interface EditableMathInputProps {
  onInput?: (value: string) => void;
}

const EditableMathInput: React.FC<EditableMathInputProps> = ({ onInput }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mathfield: any;

    // Importer uniquement côté client
    (async () => {
      const { MathfieldElement } = await import('mathlive/dist/mathfield-element.mjs');

      mathfield = new MathfieldElement({
        virtualKeyboardMode: 'manual',
        smartFence: true,
        smartMode: true,
      });

      mathfield.className = 'math-input';
      mathfield.value = '';

      mathfield.addEventListener('input', () => {
        onInput?.(mathfield.value);
      });

      if (containerRef.current) {
        containerRef.current.replaceWith(mathfield);
      }
    })();

    return () => {
      if (mathfield) {
        mathfield.remove();
      }
    };
  }, [onInput]);

  return <div ref={containerRef} />;
};

export default EditableMathInput;
