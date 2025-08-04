import React, { useState } from 'react';
import '../styles/outils.css';

const Section = () => {
  const contents = [
    {
      title: "// Leçon",
      description: "Des leçons réalisées par des passionnés pour passionner. Il est beaucoup plus simple d'apprendre une notion quand on a du plaisir à l'apprendre.",
      image: "Professor-amico.svg"
    },
    {
      title: "// Exercice",
      description: "Des exercices pour pratiquer et renforcer vos connaissances. La pratique est essentielle pour maîtriser de nouvelles compétences.",
      image: "Exercise-amico.svg"
    },
    {
      title: "// Quiz",
      description: "Des quiz pour tester vos connaissances et voir vos progrès. Les quiz sont un excellent moyen de réviser et de s'assurer que vous avez bien compris les leçons.",
      image: "Quiz-amico.svg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Typage de 'direction' comme 'number'
 const changeContent = (direction: number) => {
  console.log("Changement de contenu : ", direction);
  setCurrentIndex((prevIndex) => (prevIndex + direction + contents.length) % contents.length);
};
  return (
  )
}

export default Section;
