import { useState } from "react";

const titres = [
  "// La naissance de Germain",
  "// Pourquoi ce nom ?",
  "// 'Les mathématiques ne servent à rien...' Vraiment ?"
];

const textes = [
  "Des leçons réalisées par des passionnés pour vous passionner. Il est beaucoup plus simple d'apprendre une notion lorsqu'on prend du plaisir à l'apprendre.",
  "Des exercices aléatoires à refaire autant de fois que nécessaire, sans jamais connaître la réponse à l'avance, pour maîtriser chaque notion en profondeur.",
  "Découvrez comment les mathématiques s'invitent dans la vie de tous les jours, à travers des exemples concrets, utiles et parfois étonnants.",
];



export default function TexteCyclique() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % textes.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + textes.length) % textes.length);
  };

  return (
    <div className="">
      <h2 className="title">{titres[index]}</h2>
      <p>{textes[index]}</p>
      <div className="buttons is-centered mt-4">
        <button className="button" onClick={prev}>⬅️</button>
        <button className="button" onClick={next}>➡️</button>
      </div>
    </div>
  );
}
