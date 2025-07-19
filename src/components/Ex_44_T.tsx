import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

function generateSample(n: number, mean: number, stdDev: number): number[] {
  const sample: number[] = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const value = mean + stdDev * z;
    sample.push(Number(value.toFixed(2)));
  }
  return sample;
}

function computeMeans(sample: number[]): { k: number; Mk: number }[] {
  const result: { k: number; Mk: number }[] = [];
  let sum = 0;
  for (let k = 1; k <= sample.length; k++) {
    sum += sample[k - 1];
    result.push({ k, Mk: Number((sum / k).toFixed(2)) });
  }
  return result;
}

export default function LawOfLargeNumbers() {
  const [mean] = useState(Math.floor(Math.random() * 10 + 5)); // µ ∈ [5, 14]
  const [stdDev] = useState(Math.floor(Math.random() * 3 + 1)); // σ ∈ [1, 3]
  const [n] = useState(Math.floor(Math.random() * 21 + 30)); // n ∈ [30, 50]
  const [sample, setSample] = useState<number[]>([]);
  const [data, setData] = useState<{ k: number; Mk: number }[]>([]);
  const [userEstimate, setUserEstimate] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const s = generateSample(n, mean, stdDev);
    setSample(s);
    setData(computeMeans(s));
  }, [n, mean, stdDev]);

  const checkAnswer = () => {
    const parsed = parseFloat(userEstimate);
    if (isNaN(parsed)) {
      setFeedback('Veuillez entrer un nombre réel, Maître.');
      return;
    }
    if (data.length === 0) {
      setFeedback('Erreur : données non prêtes, veuillez réessayer.');
      return;
    }
    const lastMk = data[data.length - 1].Mk;
    const error = Math.abs(parsed - mean);
    if (error < 0.5) {
      setFeedback(`✅ Excellente estimation, Maître ! L’espérance réelle est ${mean}.`);
    } else {
      setFeedback(`❌ Ce n’est pas exact, Maître. L’espérance est ${mean}, vous avez proposé ${parsed}.`);
    }
  };

  const newExercise = () => {
    window.location.reload();
  };

  return (
    <div className="box content">
      <h2 className="title is-4">Loi des grands nombres</h2>
      <p>
        On considère un échantillon de <strong>{n}</strong> variables aléatoires indépendantes de même espérance <strong>µ</strong>.
        Leur écart-type est σ = <strong>{stdDev}</strong>.
      </p>
      <p>
        On note M<sub>k</sub> = (X₁ + ... + X<sub>k</sub>) / k. Voici son évolution :
      </p>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="k" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="Mk" stroke="#3273dc" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Chargement du graphique…</p>
      )}

      <div className="field mt-4">
        <label className="label">Votre estimation de µ :</label>
        <input
          type="number"
          className="input"
          value={userEstimate}
          onChange={(e) => setUserEstimate(e.target.value)}
        />
      </div>

      <div className="buttons mt-3">
        <button className="button is-primary" onClick={checkAnswer}>Valider</button>
        <button className="button is-light" onClick={newExercise}>Nouvel exercice</button>
      </div>

      {feedback && (
        <div className="notification is-info mt-4">
          {feedback}
        </div>
      )}

      {data.length > 0 && (
        <div className="mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>L’espérance réelle µ = <strong>{mean}</strong>.</p>
          <p>La moyenne empirique M<sub>n</sub> ≈ <strong>{data[data.length - 1].Mk}</strong>.</p>
          <p>La loi des grands nombres assure que M<sub>n</sub> converge vers µ quand n devient grand.</p>
        </div>
      )}
    </div>
  );
}
