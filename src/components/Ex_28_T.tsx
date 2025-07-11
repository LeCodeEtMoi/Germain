function generateLnEqualityProblem() {
    const isEquation = Math.random() < 0.5;
    const useLnConstant = Math.random() < 0.5; // Nouveau : choisir entre ln = ln ou ln = constante
  
    const a1 = Math.floor(Math.random() * 4) + 2; // [2, 5]
    const b1 = Math.floor(Math.random() * 4) + 1; // [1, 4]
  
    let u = `${a1}x + ${b1}`;
    let domain = `x > ${(-b1 / a1).toFixed(2)}`;
    let question: string;
    let solution: string;
  
    if (isEquation && useLnConstant) {
      // Cas ln(u(x)) = c
      const c = Math.floor(Math.random() * 3) + 1; // ln(u(x)) = 1, 2 ou 3
      const rhs = Math.exp(c);
      const xVal = (rhs - b1) / a1;
      question = `ln(${u}) = ${c}`;
      solution = `x = (e^${c} - ${b1}) / ${a1}`;
    } else if (isEquation && !useLnConstant) {
      // Cas ln(u(x)) = ln(v(x))
      const a2 = Math.floor(Math.random() * 3) + 1; // [1, 3]
      const b2 = Math.floor(Math.random() * 6) + 2; // [2, 7]
      const v = `${a2}x + ${b2}`;
      const solutionValue = (b2 - b1) / (a1 - a2);
      domain = `x > ${Math.max(-b1 / a1, -b2 / a2).toFixed(2)}`;
      question = `ln(${u}) = ln(${v})`;
      solution = `x = ${solutionValue.toFixed(2)}`;
    } else {
      // ln(u(x)) < ln(v(x)) ⇒ u(x) < v(x)
      const a2 = Math.floor(Math.random() * 3) + 1;
      const b2 = Math.floor(Math.random() * 6) + 2;
      const v = `${a2}x + ${b2}`;
      const coeff = a1 - a2;
      const constant = b2 - b1;
      const xVal = constant / coeff;
      const inequalitySymbol = coeff > 0 ? '<' : '>';
      domain = `x > ${Math.max(-b1 / a1, -b2 / a2).toFixed(2)}`;
      question = `ln(${u}) < ln(${v})`;
      solution = `x ${inequalitySymbol} ${xVal.toFixed(2)}`;
    }
  
    return {
      type: isEquation ? 'equation' : 'inequation',
      question,
      domain,
      solution,
    };
  }
  