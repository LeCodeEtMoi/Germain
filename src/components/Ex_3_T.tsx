import React, { useState, useEffect } from "react";
import { generateRandomPoint, type Point3D } from "./RandomPoint3D";

// Helper functions for vector math
const subtract = (p1: Point3D, p2: Point3D): Point3D => ({ x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z });
const crossProduct = (v1: Point3D, v2: Point3D): Point3D => ({
  x: v1.y * v2.z - v1.z * v2.y,
  y: v1.z * v2.x - v1.x * v2.z,
  z: v1.x * v2.y - v1.y * v2.x,
});
const dotProduct = (v1: Point3D, v2: Point3D): number => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
const isZeroVector = (v: Point3D): boolean => v.x === 0 && v.y === 0 && v.z === 0;
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to find GCD of two numbers
const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while(b) {
    [a, b] = [b, a % b];
  }
  return a;
};

// Function to simplify a vector by dividing by GCD of its components
const simplifyVector = (v: Point3D): Point3D => {
    const commonDivisor = gcd(gcd(v.x, v.y), v.z);
    if (commonDivisor > 1) {
        return { x: v.x / commonDivisor, y: v.y / commonDivisor, z: v.z / commonDivisor };
    }
    return v;
}

// Generates the data for a new exercise
function generateExerciseData() {
  let A: Point3D, B: Point3D, C: Point3D, AB: Point3D, AC: Point3D;

  // Ensure points are not collinear
  do {
    A = generateRandomPoint(-5, 5);
    B = generateRandomPoint(-5, 5);
    C = generateRandomPoint(-5, 5);
    AB = subtract(B, A);
    AC = subtract(C, A);
  } while (isZeroVector(crossProduct(AB, AC)));

  const correctNormalVector = simplifyVector(crossProduct(AB, AC));
  const shouldBeNormal = Math.random() > 0.5;
  let n: Point3D;

  if (shouldBeNormal) {
    n = correctNormalVector;
  } else {
    // Generate a vector that is likely not normal
    n = { ...correctNormalVector };
    const coordToChange = ['x', 'y', 'z'][randomInt(0, 2)] as keyof Point3D;
    n[coordToChange] += randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
  }
  
  // Final check and sanitization
  // Ensure vector n has integer components
  n = {
      x: Math.round(n.x),
      y: Math.round(n.y),
      z: Math.round(n.z),
  };

  // If n becomes zero vector after rounding, nudge it.
  if (isZeroVector(n)) {
      n.x = 1;
  }

  // The definitive answer is based on the final, integer vector n
  const isActuallyNormal = Math.abs(dotProduct(n, AB)) < 1e-9 && Math.abs(dotProduct(n, AC)) < 1e-9;

  return { A, B, C, n, isNormal: isActuallyNormal };
}

export default function VectorNormalToPlaneCheck() {
  const [A, setA] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [B, setB] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [C, setC] = useState<Point3D>({ x: 0, y: 0, z: 0 });
  const [n, setN] = useState<Point3D>({ x: 1, y: 1, z: 1 });
  const [isNormal, setIsNormal] = useState(false);
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  function handleNewExercise() {
    const { A, B, C, n, isNormal } = generateExerciseData();
    setA(A);
    setB(B);
    setC(C);
    setN(n);
    setIsNormal(isNormal);
    setFeedback(null);
  }

  useEffect(() => {
    handleNewExercise();
  }, []);

  function getFeedbackMessage(correct: boolean): React.ReactNode {
    if (correct) {
      return <p>🎉 Bravo Maître, la réponse est correcte !</p>;
    }

    const AB = subtract(B, A);
    const AC = subtract(C, A);
    const dotAB = dotProduct(n, AB);
    const dotAC = dotProduct(n, AC);

    const conclusion = isNormal
      ? "Le vecteur est normal au plan, mais vous avez répondu non."
      : "Le vecteur n'est pas normal au plan, mais vous avez répondu oui.";

    return (
      <div className="content">
        <p>❌ Oups, une erreur s'est glissée, Maître. {conclusion}</p>
        <p><strong>Explication :</strong></p>
        <p>Pour que le vecteur <span className="is-family-monospace">n⃗</span> soit normal au plan (ABC), il doit être orthogonal à deux vecteurs non colinéaires du plan, par exemple <span className="is-family-monospace">AB→</span> et <span className="is-family-monospace">AC→</span>. On vérifie cela en calculant les produits scalaires.</p>
        <ul>
          <li>Vecteur <span className="is-family-monospace">AB→</span> = B - A = ({B.x} - {A.x}; {B.y} - {A.y}; {B.z} - {A.z}) = <strong>({AB.x}; {AB.y}; {AB.z})</strong></li>
          <li>Vecteur <span className="is-family-monospace">AC→</span> = C - A = ({C.x} - {A.x}; {C.y} - {A.y}; {C.z} - {A.z}) = <strong>({AC.x}; {AC.y}; {AC.z})</strong></li>
        </ul>
        <p>Calculons les produits scalaires :</p>
        <ul>
          <li><span className="is-family-monospace">n⃗ · AB→</span> = ({n.x})×({AB.x}) + ({n.y})×({AB.y}) + ({n.z})×({AB.z}) = <strong>{dotAB}</strong></li>
          <li><span className="is-family-monospace">n⃗ · AC→</span> = ({n.x})×({AC.x}) + ({n.y})×({AC.y}) + ({n.z})×({AC.z}) = <strong>{dotAC}</strong></li>
        </ul>
        <p>
          Pour que <span className="is-family-monospace">n⃗</span> soit normal au plan (ABC), les deux produits scalaires doivent être nuls.
          {isNormal ? " C'est bien le cas ici." : " Or, au moins un des produits scalaires n'est pas nul."}
        </p>
        <p>La bonne réponse était : <strong>{isNormal ? "Oui" : "Non"}</strong>.</p>
      </div>
    );
  }

  function handleValidate(userAnswer: boolean) {
    if (userAnswer === isNormal) {
      setFeedback({ correct: true, message: getFeedbackMessage(true) });
    } else {
      setFeedback({ correct: false, message: getFeedbackMessage(false) });
    }
  }

  const formatPoint = (p: Point3D) => `(${p.x}; ${p.y}; ${p.z})`;

  return (
    <div className="box content">
      <h2 className="title is-4">Le vecteur est-il normal au plan ?</h2>
      <p>Dans un repère orthonormé, on considère les points :</p>
      <ul>
        <li>A {formatPoint(A)}</li>
        <li>B {formatPoint(B)}</li>
        <li>C {formatPoint(C)}</li>
      </ul>
      <p>Le vecteur <span className="is-family-monospace">n⃗ {formatPoint(n)}</span> est-il normal au plan (ABC) ?</p>

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
  );
}
