import { useState } from 'react';
import '../styles/outils.css';

const BASE = '/Germain/';

const contents = [
  {
    title: '// Leçon',
    description:
      "Des leçons réalisées par des passionnés pour passionner. Il est beaucoup plus simple d'apprendre une notion quand on a du plaisir à l'apprendre.",
    image: 'Professor-amico.svg',
    alt: 'Illustration : un professeur devant un tableau',
    link: `${BASE}blog`,
    action: 'Parcourir les leçons',
  },
  {
    title: '// Exercice',
    description:
      'Des exercices pour pratiquer et renforcer vos connaissances. La pratique est essentielle pour maîtriser de nouvelles compétences.',
    image: 'Exercise-amico.svg',
    alt: 'Illustration : une personne qui fait des exercices',
    link: `${BASE}exercices`,
    action: 'Voir les exercices',
  },
  {
    title: '// Quiz',
    description:
      "Des quiz pour tester vos connaissances et voir vos progrès. Les quiz sont un excellent moyen de réviser et de s'assurer que vous avez bien compris les leçons.",
    image: 'Quiz-amico.svg',
    alt: 'Illustration : une personne qui répond à un quiz',
    link: `${BASE}application`,
    action: 'Essayer un quiz',
  },
];

// Une seule icône : la flèche de gauche est la même, retournée en CSS (.left-arrow svg)
const ChevronDroit = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export default function Explication() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = contents[currentIndex];

  const changeContent = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + contents.length) % contents.length);
  };

  return (
    <div className="container-box">
      <div className="item">
        {/* key : relance la petite animation à chaque changement */}
        <img key={current.image} src={`${BASE}${current.image}`} alt={current.alt} />
      </div>

      <div className="text">
        {/* aria-live : les lecteurs d'écran annoncent le nouveau contenu */}
        <div aria-live="polite">
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <a className="text-lien" href={current.link}>
            {current.action}
          </a>
        </div>

        <div className="l">
          <button
            type="button"
            className="arrow left-arrow"
            onClick={() => changeContent(-1)}
            aria-label="Contenu précédent"
          >
            <ChevronDroit />
          </button>

          <div className="points">
            {contents.map((c, i) => (
              <button
                key={c.title}
                type="button"
                className="point"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Afficher : ${c.title.replace('// ', '')}`}
                aria-current={i === currentIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className="arrow right-arrow"
            onClick={() => changeContent(1)}
            aria-label="Contenu suivant"
          >
            <ChevronDroit />
          </button>
        </div>
      </div>
    </div>
  );
}