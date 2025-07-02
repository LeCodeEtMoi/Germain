import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Ex_18_T = () => {
  const [response, setResponse] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctAnswers = ['175'];

  const checkResponse = () => {
    const isAnswerCorrect = correctAnswers.includes(response.trim());
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  return (
    <div className="ex-container">
      <h2 className="ex-title">Exercice 18 : Somme des termes d'une suite</h2>
      <div className="ex-content">
        <div className="ex-text">
          <p>On considère la suite <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`(u_n)`) }} /> définie par <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_0 = 100`) }} /> et pour tout entier naturel <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} />, <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_{n+1} = 0.5 \\times u_n`) }} />.</p>
          <p>On souhaite calculer la somme des premiers termes de cette suite.</p>
          <p>On a écrit le script Python suivant :</p>
        </div>
        <div className="ex-code">
          <pre>
            <code>
{`def somme(n):
  u = 100
  s = 0
  for i in range(n + 1):
    s = s + u
    u = u * 0.5
  return s`}
            </code>
          </pre>
        </div>
        <div className="ex-question">
          <p>Que renvoie l'appel <code>somme(2)</code> ?</p>
          <div className="ex-options">
            <label>
              <input type="radio" value="100" checked={response === '100'} onChange={handleOptionChange} />
              100
            </label>
            <label>
              <input type="radio" value="150" checked={response === '150'} onChange={handleOptionChange} />
              150
            </label>
            <label>
              <input type="radio" value="175" checked={response === '175'} onChange={handleOptionChange} />
              175
            </label>
            <label>
              <input type="radio" value="200" checked={response === '200'} onChange={handleOptionChange} />
              200
            </label>
          </div>
        </div>
        <button className="ex-button" onClick={checkResponse}>Valider</button>
        {showExplanation && (
          <div className="ex-explanation">
            {isCorrect ? (
              <p className="ex-feedback-correct">Correct ! L'appel <code>somme(2)</code> renvoie bien 175.</p>
            ) : (
              <p className="ex-feedback-incorrect">Incorrect.</p>
            )}
            <p>
              <strong>Explication :</strong>
            </p>
            <ul>
              <li>Initialisation : <code>u = 100</code>, <code>s = 0</code>. La boucle <code>for</code> s'exécute pour <code>i</code> allant de 0 à 2.</li>
              <li><code>i = 0</code> : <code>s</code> devient <code>0 + 100 = 100</code>. <code>u</code> devient <code>100 * 0.5 = 50</code>.</li>
              <li><code>i = 1</code> : <code>s</code> devient <code>100 + 50 = 150</code>. <code>u</code> devient <code>50 * 0.5 = 25</code>.</li>
              <li><code>i = 2</code> : <code>s</code> devient <code>150 + 25 = 175</code>. <code>u</code> devient <code>25 * 0.5 = 12.5</code>.</li>
              <li>La boucle se termine. La fonction renvoie <code>s</code>, qui vaut 175.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ex_18_T;
