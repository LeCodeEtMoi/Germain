import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Ex_19_T = () => {
  const [response, setResponse] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctAnswers = ['u<=100', '100>=u'];

  const checkResponse = () => {
    const sanitizedResponse = response.trim().replace(/\s/g, '');
    const isAnswerCorrect = correctAnswers.includes(sanitizedResponse);
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);
  };

  return (
    <div className="ex-container">
      <h2 className="ex-title">Exercice 19 : Seuil de suite</h2>
      <div className="ex-content">
        <div className="ex-text">
          <p>On considère la suite <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`(u_n)`) }} /> définie par <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_0 = 10`) }} /> et pour tout entier naturel <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} />, <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_{n+1} = u_n + 5`) }} />.</p>
          <p>On souhaite déterminer le plus petit entier <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} /> tel que <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_n > 100`) }} />.</p>
          <p>Compléter le script Python suivant pour qu'il renvoie la valeur de <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} /> recherchée.</p>
        </div>
        <div className="ex-code">
          <pre>
            <code>
{`def seuil():
  n = 0
  u = 10
  while `}
<input
  type="text"
  value={response}
  onChange={(e) => setResponse(e.target.value)}
  placeholder="votre condition"
  className="ex-input"
/>
{`: 
    n = n + 1
    u = u + 5
  return n`}
            </code>
          </pre>
        </div>
        <button className="ex-button" onClick={checkResponse}>Valider</button>
        {showExplanation && (
          <div className="ex-explanation">
            {isCorrect ? (
              <p className="ex-feedback-correct">Correct ! La condition est bien <code>u &lt;= 100</code>.</p>
            ) : (
              <p className="ex-feedback-incorrect">Incorrect. La condition doit permettre à la boucle de continuer tant que <code>u</code> n'a pas dépassé 100.</p>
            )}
            <p>
              <strong>Explication :</strong>
            </p>
            <p>
              La boucle <code>while</code> doit s'exécuter tant que la condition <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_n \\le 100`) }} /> est vraie.
              Dès que <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_n > 100`) }} />, la boucle s'arrête et la fonction renvoie la valeur de <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} /> correspondante.
              La condition à écrire est donc <code>u &lt;= 100</code>.
              Le script renverra 19.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ex_19_T;
