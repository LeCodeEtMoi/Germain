import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MathTex } from "@/components/maths/MathTex";
import "bulma/css/bulma.css";

const ExerciceFonctionEtSuite = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // Choix aléatoire d'un coefficient pour diversifier un peu l'exercice
  const a = 2;
  const f = (x: number) => a * x * (1 - x);
  const u0 = -0.1;

  const handleShowCorrection = () => {
    setShowCorrection(true);
  };

  return (
    <Card className="m-4">
      <CardContent>
        <h2 className="title is-4">Fonction et suites – Continuité, variations, convergence</h2>

        <p>Soit la fonction définie sur <MathTex tex="I = [0 ; 1]" /> par :</p>
        <p>
          <MathTex tex={`f(x) = ${a}x(1 - x)`} />
        </p>

        <ol>
          <li>
            <strong>1.a)</strong> Justifier que <MathTex tex="f" /> est continue sur <MathTex tex="I" />.
          </li>
          <li>
            <strong>b)</strong> Résoudre l'équation <MathTex tex="f(x) = x" /> dans <MathTex tex="I" />.
          </li>
          <li>
            <strong>c)</strong> Montrer que si <MathTex tex="x \in [0 ; \frac{1}{2}]" />, alors <MathTex tex="f(x) \in [0 ; \frac{1}{2}]" />.
          </li>
          <li>
            <strong>d)</strong> Quelles sont les variations de <MathTex tex="f" /> sur <MathTex tex="I" /> ?
          </li>
        </ol>

        <p>
          <strong>2.</strong> On définit la suite <MathTex tex="u_0 = -0{,}1" /> telle que pour tout <MathTex tex="n \in \mathbb{N}" />,
          <MathTex tex="u_{n+1} = f(u_n)" />.
        </p>
        <ol>
          <li>
            <strong>a)</strong> Démontrer par récurrence que pour tout <MathTex tex="n \in \mathbb{N}" />, la suite est croissante et majorée sur <MathTex tex="I" />.
          </li>
          <li>
            <strong>b)</strong> En déduire que la suite <MathTex tex="(u_n)" /> est convergente vers une limite <MathTex tex="\ell" /> et déterminer <MathTex tex="\ell" />.
          </li>
        </ol>

        <Button onClick={handleShowCorrection} className="mt-4 is-primary">
          Afficher la correction
        </Button>

        {showCorrection && (
          <div className="content mt-5">
            <h3 className="title is-5">Correction</h3>

            <ul>
              <li><strong>1.a)</strong> La fonction f est un polynôme de degré 2 donc elle est continue sur <MathTex tex="\mathbb{R}" />, en particulier sur <MathTex tex="I = [0 ; 1]" />.</li>
              <li><strong>b)</strong> On résout <MathTex tex={`${a}x(1 - x) = x`} /> soit <MathTex tex={`${a}x(1 - x) - x = 0`} /> ⟹ <MathTex tex={`${a}x - ${a}x^2 - x = 0`} /> ⟹ <MathTex tex={`${(a - 1)}x - ${a}x^2 = 0`} />.
                Factorisation : <MathTex tex={`x[(${a - 1}) - ${a}x] = 0`} /> donc les solutions sont <MathTex tex="x = 0" /> et <MathTex tex={`x = \frac{${a - 1}}{${a}}`} />.
                Ici, <MathTex tex={`\frac{${a - 1}}{${a}} = ${((a - 1) / a).toFixed(2)}`} /> ∈ [0 ; 1]
              </li>
              <li><strong>c)</strong> Si <MathTex tex="x \in [0 ; \frac{1}{2}]" />, alors <MathTex tex="1 - x \in [\frac{1}{2} ; 1]" /> donc <MathTex tex="f(x) = ${a}x(1 - x) \in [0 ; \frac{1}{2}]" />.
              </li>
              <li><strong>d)</strong> f est une parabole de sommet en <MathTex tex="x = \frac{1}{2}" />. Sur [0 ; 1], elle est croissante sur <MathTex tex="[0 ; \frac{1}{2}]" /> puis décroissante sur <MathTex tex="[\frac{1}{2} ; 1]" />.</li>
              <li><strong>2.a)</strong> On pose <MathTex tex="u_0 = -0{,}1 < 0" />. Or <MathTex tex="f(x) > 0" /> si <MathTex tex="x \in [-0.1 ; 0]" />. Donc <MathTex tex="u_1 = f(u_0) > 0" />.
                Supposons par récurrence que <MathTex tex="u_n \in [0 ; \ell]" /> avec <MathTex tex="\ell = \frac{1}{2}" />.
                Alors <MathTex tex="u_{n+1} = f(u_n) \in [0 ; \ell]" /> et <MathTex tex="f(u_n) > u_n" /> car f est croissante sur [0 ; 1/2]. Donc la suite est croissante et majorée par <MathTex tex="\ell" />.
              </li>
              <li><strong>b)</strong> La suite est croissante et majorée donc elle converge vers une limite <MathTex tex="\ell" />.
                Par passage à la limite dans <MathTex tex="u_{n+1} = f(u_n)" />, on a <MathTex tex="\ell = f(\ell)" />.
                Or les solutions de <MathTex tex="f(x) = x" /> sont <MathTex tex="0" /> et <MathTex tex={`\frac{${a - 1}}{${a}}`} />, donc <MathTex tex={`\ell = ${((a - 1)/a).toFixed(2)}`} />.
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciceFonctionEtSuite;
