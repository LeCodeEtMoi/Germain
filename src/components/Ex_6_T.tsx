import React, { useState, useEffect } from "react";
import { generateRandomPoint, type Point3D } from "./RandomPoint3D";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Fonction pour générer les données d'un nouvel exercice
function generateExerciseData() {
  const linePointA = generateRandomPoint(-10, 10);
  
  let lineVectorU: Point3D;
  do {
    lineVectorU = generateRandomPoint(-5, 5);
  } while (lineVectorU.x === 0 && lineVectorU.y === 0 && lineVectorU.z === 0);

  const shouldBeOnLine = Math.random() > 0.5;
  let pointM: Point3D;
  let isPointOnLine: boolean;

  if (shouldBeOnLine) {
    const t = randomInt(-5, 5);
    pointM = {
      x: linePointA.x + lineVectorU.x * t,
      y: linePointA.y + lineVectorU.y * t,
      z: linePointA.z + lineVectorU.z * t,
    };
    isPointOnLine = true;
  } else {
    const t = randomInt(-5, 5);
    pointM = {
      x: linePointA.x + lineVectorU.x * t,
      y: linePointA.y + lineVectorU.y * t,
      z: linePointA.z + lineVectorU.z * t,
    };
    const coordToChange = ['x', 'y', 'z'][randomInt(0, 2)] as keyof Point3D;
    pointM[coordToChange] += randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    isPointOnLine = false;
  }

  return { linePointA, lineVectorU, pointM, isPointOnLine };
}

// Fonction pour formater la représentation paramétrique
function formatParametric(A: Point3D, V: Point3D): React.ReactNode {
    const formatVal = (val: number, sign: boolean = false) => {
        if (val === 0) return "";
        const signStr = val > 0 ? "+" : "-";
        const absVal = Math.abs(val);
        if (absVal === 1) return `${sign ? signStr : (val > 0 ? "" : "-")}t`;
        return `${sign ? signStr : (val > 0 ? "" : "-")}${absVal}t`;
    }

    return (
        <pre className="is-family-monospace has-background-light p-3">
            {`{\n  x = ${A.x} ${formatVal(V.x, true)}\n  y = ${A.y} ${formatVal(V.y, true)}\n  z = ${A.z} ${formatVal(V.z, true)}\n(t ∈ ℝ)`}
        </pre>
    );
}

export default function PointOnLineCheck() {
  const [linePointA, setLinePointA] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [lineVectorU, setLineVectorU] = useState<Point3D>({ x: 1, y: 1, z: 1 });
  const [pointM, setPointM] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [isPointOnLine, setIsPointOnLine] = useState(false);
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  function handleNewExercise() {
    const { linePointA, lineVectorU, pointM, isPointOnLine } = generateExerciseData();
    setLinePointA(linePointA);
    setLineVectorU(lineVectorU);
    setPointM(pointM);
    setIsPointOnLine(isPointOnLine);
    setFeedback(null);
  }

  useEffect(() => {
    handleNewExercise();
  }, []);

  function getFeedbackMessage(correct: boolean): React.ReactNode {
    if (correct) {
      return <p>🎉 Bravo Maître, la réponse est correcte !</p>;
    }

    const { x: xM, y: yM, z: zM } = pointM;
    const { x: xA, y: yA, z: zA } = linePointA;
    const { x: u, y: v, z: w } = lineVectorU;
    
    const steps = [];

    if (u !== 0) {
        const t = (xM - xA) / u;
        steps.push(<p>{`${xM} = ${xA} + ${u}t → ${u}t = ${xM - xA} → t = ${t.toFixed(2)}`}</p>);
    } else {
        steps.push(<p>Pour x, on vérifie si {xM} = {xA}. C'est {xM === xA ? "vrai" : "faux"}.</p>);
    }

    if (v !== 0) {
        const t = (yM - yA) / v;
        steps.push(<p>{`${yM} = ${yA} + ${v}t → ${v}t = ${yM - yA} → t = ${t.toFixed(2)}`}</p>);
    } else {
        steps.push(<p>Pour y, on vérifie si {yM} = {yA}. C'est {yM === yA ? "vrai" : "faux"}.</p>);
    }

    if (w !== 0) {
        const t = (zM - zA) / w;
        steps.push(<p>{`${zM} = ${zA} + ${w}t → ${w}t = ${zM - zA} → t = ${t.toFixed(2)}`}</p>);
    } else {
        steps.push(<p>Pour z, on vérifie si {zM} = {zA}. C'est {zM === zA ? "vrai" : "faux"}.</p>);
    }

    const conclusion = isPointOnLine
      ? "Le point est sur la droite mais vous avez répondu non."
      : "Le point n'est pas sur la droite mais vous avez répondu oui.";

    return (
      <div className="content">
        <p>❌ Oups, une erreur s'est glissée, Maître. {conclusion}</p>
        <p><strong>Explication :</strong></p>
        <p>On cherche s'il existe un réel 't' qui satisfait les trois équations simultanément :</p>
        {steps}
        <p>Pour que le point appartienne à la droite, il faut trouver la même valeur de 't' pour chaque équation (ou que les coordonnées fixes correspondent).</p>
        <p>La bonne réponse était : <strong>{isPointOnLine ? "Oui" : "Non"}</strong>.</p>
      </div>
    );
  }

  function handleValidate(userAnswer: boolean) {
    if (userAnswer === isPointOnLine) {
      setFeedback({ correct: true, message: getFeedbackMessage(true) });
    } else {
      setFeedback({ correct: false, message: getFeedbackMessage(false) });
    }
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Le point M appartient-il à la droite (Δ) ?</h2>

          <div className="mb-4">
            <p>
              <strong>Point M :</strong> ({`${pointM.x}; ${pointM.y}; ${pointM.z}`})
            </p>
            <div>
              <strong>Représentation paramétrique de (Δ) :</strong>
              {formatParametric(linePointA, lineVectorU)}
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-success" onClick={() => handleValidate(true)}>
                Oui
              </button>
            </div>
            <div className="control">
              <button className="button is-danger" onClick={() => handleValidate(false)}>
                Non
              </button>
            </div>
          </div>
          
          <div className="field is-grouped is-grouped-centered mt-4">
             <div className="control">
              <button className="button is-light" onClick={handleNewExercise}>
                Nouvel exercice
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`notification ${feedback.correct ? "is-success" : "is-danger"} is-light mt-4`}>
              <button className="delete" onClick={() => setFeedback(null)}></button>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
