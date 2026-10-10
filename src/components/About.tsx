import { useRef, useState, type KeyboardEvent } from 'react';
import '../styles/apropos.css';

const BASE = '/Germain/';

type Section = {
  id: string;
  titre: string;
  paragraphes: string[];
  image?: { src: string; alt: string; legende: string };
  lien?: { href: string; texte: string };
};

const sections: Section[] = [
  {
    id: 'naissance',
    titre: 'La naissance de Germain',
    // À REMPLACER par votre vraie histoire si vous le souhaitez.
    paragraphes: [
      "Germain part d'une conviction : beaucoup de gens se croient « nuls en maths » à cause d'une mauvaise expérience, pas par manque de capacités.",
      "Le projet rassemble des leçons, des exercices et des quiz en accès libre, écrits par des passionnés, pour redonner le goût de comprendre. Il est plus simple d'apprendre une notion quand on prend du plaisir à l'apprendre.",
      "Germain est aussi open source : chacun peut relire, corriger ou proposer du contenu, et le projet grandit avec ceux qui l'utilisent.",
    ],
  },
  {
    id: 'nom',
    titre: 'Pourquoi ce nom ?',
    paragraphes: [
      "Sophie Germain (1776-1831) était une mathématicienne française. Elle s'est formée presque seule, en lisant, à une époque où les femmes n'avaient pas accès aux études supérieures de mathématiques.",
      "Pour que ses travaux soient pris au sérieux, elle a écrit à Lagrange puis à Gauss sous le pseudonyme masculin de « Monsieur Le Blanc ». Elle a fait avancer l'étude du dernier théorème de Fermat et a reçu en 1816 un prix de l'Académie des sciences pour ses recherches sur les vibrations des surfaces élastiques.",
      "Ce nom rappelle qu'on peut aimer les mathématiques et y progresser en partant de loin, par curiosité et par persévérance.",
    ],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Germain_-_%C5%92uvres_philosophiques%2C_1896_%28Illustration_page_4%29.jpg/1024px-Germain_-_%C5%92uvres_philosophiques%2C_1896_%28Illustration_page_4%29.jpg',
      alt: 'Portrait de Sophie Germain',
      legende: 'Sophie Germain (1776-1831)',
    },
  },
  {
    id: 'utilite',
    titre: "« Les mathématiques ne servent à rien... » Vraiment ?",
    paragraphes: [
      "Votre GPS calcule des distances et des trajets, un paiement par carte repose sur des mathématiques pour rester secret, une photo est compressée grâce à elles avant d'être envoyée, et les prévisions météo sont des calculs de grande taille.",
      "On les croise aussi dans de nombreux métiers, souvent sans que ceux qui les exercent y pensent. La rubrique « Maths et métier » en donne des exemples concrets.",
    ],
    lien: { href: `${BASE}mathsmetier`, texte: 'Voir les maths dans les métiers' },
  },
];

export default function About() {
  const [actif, setActif] = useState(0);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);
  const section = sections[actif];

  // Navigation clavier : flèches haut/bas, Début, Fin
  const surTouche = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let cible = index;
    if (e.key === 'ArrowDown') cible = (index + 1) % sections.length;
    else if (e.key === 'ArrowUp') cible = (index - 1 + sections.length) % sections.length;
    else if (e.key === 'Home') cible = 0;
    else if (e.key === 'End') cible = sections.length - 1;
    else return;

    e.preventDefault();
    setActif(cible);
    onglets.current[cible]?.focus();
  };

  return (
    <div className="apropos">
      <div className="apropos__onglets" role="tablist" aria-orientation="vertical" aria-label="Questions sur Germain">
        {sections.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              onglets.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`apropos-onglet-${s.id}`}
            className="apropos__onglet"
            aria-selected={i === actif}
            aria-controls="apropos-panneau"
            tabIndex={i === actif ? 0 : -1}
            onClick={() => setActif(i)}
            onKeyDown={(e) => surTouche(e, i)}
          >
            {s.titre}
          </button>
        ))}
      </div>

      {/* key : relance la petite animation quand on change de section */}
      <div
        key={section.id}
        id="apropos-panneau"
        className="apropos__panneau"
        role="tabpanel"
        aria-labelledby={`apropos-onglet-${section.id}`}
      >
        <h2 className="apropos__titre">
          <span aria-hidden="true">// </span>
          {section.titre}
        </h2>

        <div className={section.image ? 'apropos__corps apropos__corps--image' : 'apropos__corps'}>
          <div className="apropos__texte">
            {section.paragraphes.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {section.lien && (
              <a className="apropos__lien" href={section.lien.href}>
                {section.lien.texte}
              </a>
            )}
          </div>

          {section.image && (
            <figure className="apropos__portrait">
              <img src={section.image.src} alt={section.image.alt} loading="lazy" />
              <figcaption>{section.image.legende}</figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}