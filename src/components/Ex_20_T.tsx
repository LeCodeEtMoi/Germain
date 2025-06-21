import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Ex_20_T = () => {
  const [response, setResponse] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctAnswers = ['5'];

  const checkResponse = () => {
    const isAnswerCorrect = correctAnswers.includes(response.trim());
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);
  };

  const handleOptionChange = (e) => {
    setResponse(e.target.value);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  return (
    <div className="ex-container">
      <h2 className="ex-title">Exercice 20 : Seuil de somme</h2>
      <div className="ex-content">
        <div className="ex-text">
          <p>On considère la suite <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`(u_n)`) }} /> définie par <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_0 = 2`) }} /> et pour tout entier naturel <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} />, <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`u_{n+1} = u_n + 3`) }} />.</p>
          <p>On note <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`S_n = u_0 + u_1 + ... + u_n`) }} />.</p>
          <p>On souhaite trouver le plus petit entier <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`n`) }} /> tel que <span dangerouslySetInnerHTML={{ __html: katex.renderToString(`S_n > 50`) }} />.</p>
          <p>On a écrit le script Python suivant :</p>
        </div>
        <div className="ex-code">
          <pre>
            <code>
{`def seuil_somme():
  n = 0
  u = 2
  s = 2
  while s <= 50:
    n = n + 1
    u = u + 3
    s = s + u
  return n`}
            </code>
          </pre>
        </div>
        <div className="ex-question">
          <p>Que renvoie l'appel <code>seuil_somme()</code> ?</p>
          <div className="ex-options">
            <label>
              <input type="radio" value="3" checked={response === '3'} onChange={handleOptionChange} />
              3
            </label>
            <label>
              <input type="radio" value="4" checked={response === '4'} onChange={handleOptionChange} />
              4
            </label>
            <label>
              <input type="radio" value="5" checked={response === '5'} onChange={handleOptionChange} />
              5
            </label>
            <label>
              <input type="radio" value="6" checked={response === '6'} onChange={handleOptionChange} />
              6
            </label>
          </div>
        </div>
        <button className="ex-button" onClick={checkResponse}>Valider</button>
        {showExplanation && (
          <div className="ex-explanation">
            {isCorrect ? (
              <p className="ex-feedback-correct">Correct ! La fonction renvoie bien 5.</p>
            ) : (
              <p className="ex-feedback-incorrect">Incorrect.</p>
            )}
            <p>
              <strong>Explication :</strong>
            </p>
            <ul>
              <li>Initialisation : <code>n = 0</code>, <code>u = 2</code>, <code>s = 2</code>.</li>
              <li>Tant que <code>s &lt;= 50</code> :</li>
              <li><code>n=0, u=2, s=2</code>. La condition est vraie.</li>
              <li><code>n=1, u=5, s=7</code>. La condition est vraie.</li>
              <li><code>n=2, u=8, s=15</code>. La condition est vraie.</li>
              <li><code>n=3, u=11, s=26</code>. La condition est vraie.</li>
              <li><code>n=4, u=14, s=40</code>. La condition est vraie.</li>
              <li><code>n=5, u=17, s=57</code>. La condition <code>57 &lt;= 50</code> est fausse. La boucle s'arrête.</li>
              <li>La fonction renvoie <code>n</code>, qui vaut 5.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ex_20_T;
