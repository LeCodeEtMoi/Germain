/**
 * Références de la page « Comment apprendre les maths ? ».
 * L'ordre du tableau donne la numérotation affichée : [1], [2], etc.
 * Pour citer une référence dans la page : <Cite id="dunlosky2013" />
 */
export type TypeRef = 'article' | 'synthese' | 'rapport' | 'ressource' | 'video';

export interface Reference {
  id: string;
  type: TypeRef;
  auteurs: string;
  annee: number | string;
  titre: string;
  /** Revue, éditeur ou site. */
  source: string;
  url: string;
}

export const LIBELLE_TYPE: Record<TypeRef, string> = {
  article: 'Étude',
  synthese: 'Synthèse de recherches',
  rapport: 'Guide / rapport',
  ressource: 'Ressource',
  video: 'Vidéo',
};

export const REFS: Reference[] = [
  {
    id: 'dunlosky2013',
    type: 'synthese',
    auteurs: 'Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham, D. T.',
    annee: 2013,
    titre: "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology",
    source: 'Psychological Science in the Public Interest, 14(1), 4–58',
    url: 'https://doi.org/10.1177/1529100612453266',
  },
  {
    id: 'roediger2006',
    type: 'article',
    auteurs: 'Roediger, H. L. & Karpicke, J. D.',
    annee: 2006,
    titre: 'Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention',
    source: 'Psychological Science, 17(3), 249–255',
    url: 'https://doi.org/10.1111/j.1467-9280.2006.01693.x',
  },
  {
    id: 'pashler2007',
    type: 'rapport',
    auteurs: 'Pashler, H., Bain, P. M., Bottge, B. A., Graesser, A., Koedinger, K., McDaniel, M. & Metcalfe, J.',
    annee: 2007,
    titre: 'Organizing Instruction and Study to Improve Student Learning (IES Practice Guide)',
    source: 'Institute of Education Sciences, What Works Clearinghouse',
    url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1',
  },
  {
    id: 'cepeda2006',
    type: 'synthese',
    auteurs: 'Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. & Rohrer, D.',
    annee: 2006,
    titre: 'Distributed practice in verbal recall tasks: A review and quantitative synthesis',
    source: 'Psychological Bulletin, 132(3), 354–380',
    url: 'https://doi.org/10.1037/0033-2909.132.3.354',
  },
  {
    id: 'cepeda2008',
    type: 'article',
    auteurs: 'Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T. & Pashler, H.',
    annee: 2008,
    titre: 'Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention',
    source: 'Psychological Science, 19(11), 1095–1102',
    url: 'https://doi.org/10.1111/j.1467-9280.2008.02209.x',
  },
  {
    id: 'rohrer2007',
    type: 'article',
    auteurs: 'Rohrer, D. & Taylor, K.',
    annee: 2007,
    titre: 'The shuffling of mathematics problems improves learning',
    source: 'Instructional Science, 35(6), 481–498',
    url: 'https://doi.org/10.1007/s11251-007-9015-8',
  },
  {
    id: 'rohrer2020',
    type: 'article',
    auteurs: 'Rohrer, D., Dedrick, R. F., Hartwig, M. K. & Cheung, C.-N.',
    annee: 2020,
    titre: 'A randomized controlled trial of interleaved mathematics practice',
    source: 'Journal of Educational Psychology, 112(1), 40–52 (évaluée par le What Works Clearinghouse)',
    url: 'https://ies.ed.gov/ncee/wwc/Study/88770',
  },
  {
    id: 'sweller1985',
    type: 'article',
    auteurs: 'Sweller, J. & Cooper, G. A.',
    annee: 1985,
    titre: 'The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra',
    source: 'Cognition and Instruction, 2(1), 59–89',
    url: 'https://doi.org/10.1207/s1532690xci0201_3',
  },
  {
    id: 'atkinson2000',
    type: 'synthese',
    auteurs: 'Atkinson, R. K., Derry, S. J., Renkl, A. & Wortham, D.',
    annee: 2000,
    titre: 'Learning from Examples: Instructional Principles from the Worked Examples Research',
    source: 'Review of Educational Research, 70(2), 181–214',
    url: 'https://doi.org/10.3102/00346543070002181',
  },
  {
    id: 'chi1994',
    type: 'article',
    auteurs: 'Chi, M. T. H., de Leeuw, N., Chiu, M.-H. & LaVancher, C.',
    annee: 1994,
    titre: 'Eliciting self-explanations improves understanding',
    source: 'Cognitive Science, 18(3), 439–477',
    url: 'https://doi.org/10.1207/s15516709cog1803_3',
  },
  {
    id: 'metcalfe2017',
    type: 'synthese',
    auteurs: 'Metcalfe, J.',
    annee: 2017,
    titre: 'Learning from Errors',
    source: 'Annual Review of Psychology, 68, 465–489',
    url: 'https://doi.org/10.1146/annurev-psych-010416-044022',
  },
  {
    id: 'booth2013',
    type: 'article',
    auteurs: 'Booth, J. L., Lange, K. E., Koedinger, K. R. & Newton, K. J.',
    annee: 2013,
    titre: 'Using example problems to improve student learning in algebra: Differentiating between correct and incorrect examples',
    source: 'Learning and Instruction, 25, 24–34',
    url: 'https://doi.org/10.1016/j.learninstruc.2012.11.002',
  },
  {
    id: 'nesbit2006',
    type: 'synthese',
    auteurs: 'Nesbit, J. C. & Adesope, O. O.',
    annee: 2006,
    titre: 'Learning With Concept and Knowledge Maps: A Meta-Analysis',
    source: 'Review of Educational Research, 76(3), 413–448',
    url: 'https://doi.org/10.3102/00346543076003413',
  },
  {
    id: 'karpicke2011',
    type: 'article',
    auteurs: 'Karpicke, J. D. & Blunt, J. R.',
    annee: 2011,
    titre: 'Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping',
    source: 'Science, 331(6018), 772–775',
    url: 'https://doi.org/10.1126/science.1199327',
  },
  {
    id: 'diekelmann2010',
    type: 'synthese',
    auteurs: 'Diekelmann, S. & Born, J.',
    annee: 2010,
    titre: 'The memory function of sleep',
    source: 'Nature Reviews Neuroscience, 11(2), 114–126',
    url: 'https://doi.org/10.1038/nrn2762',
  },
  {
    id: 'ramirez2011',
    type: 'article',
    auteurs: 'Ramirez, G. & Beilock, S. L.',
    annee: 2011,
    titre: 'Writing About Testing Worries Boosts Exam Performance in the Classroom',
    source: 'Science, 331(6014), 211–213',
    url: 'https://doi.org/10.1126/science.1199427',
  },
  {
    id: 'yeager2019',
    type: 'article',
    auteurs: 'Yeager, D. S., Hanselman, P., Walton, G. M. et al.',
    annee: 2019,
    titre: 'A national experiment reveals where a growth mindset improves achievement',
    source: 'Nature, 573, 364–369',
    url: 'https://doi.org/10.1038/s41586-019-1466-y',
  },
  {
    id: 'pashler2008',
    type: 'synthese',
    auteurs: 'Pashler, H., McDaniel, M., Rohrer, D. & Bjork, R.',
    annee: 2008,
    titre: 'Learning Styles: Concepts and Evidence',
    source: 'Psychological Science in the Public Interest, 9(3), 105–119',
    url: 'https://doi.org/10.1111/j.1539-6053.2009.01038.x',
  },
  {
    id: 'ace_lille',
    type: 'ressource',
    auteurs: 'Académie de Lille, DSDEN du Nord (Pédagogie Nord)',
    annee: 2023,
    titre: "ACE – ArithmÉcole : ressources pour l'enseignant (progressions CP et CE1, journal du nombre, calcul mental, estimation)",
    source: 'pedagogie-nord.ac-lille.fr',
    url: 'https://pedagogie-nord.ac-lille.fr/ace-arithmecole-ressources-pour-lenseignant/',
  },
  {
    id: 'ace_lea',
    type: 'ressource',
    auteurs: 'Joffredo-Le Brun, S. & Le Reun, C.',
    annee: 2017,
    titre: "La recherche ACE-ArithmÉcole, conception d'une ingénierie coopérative (LéA Réseau Écoles Bretagne)",
    source: 'Institut français de l’Éducation (ENS de Lyon), Rencontre nationale des LéA',
    url: 'https://ife.ens-lyon.fr/lea/manifestations/rencontres-internationales/rencontre-nationale-des-lea-2017/rencontre-nationale-des-lea-2017-1/resumes-des-co/co_lea-reb_2017',
  },
  {
    id: 'ace_rfp',
    type: 'article',
    auteurs: 'Équipe de recherche ACE',
    annee: 2017,
    titre: "Peut-on améliorer l'enseignement et l'apprentissage de l'arithmétique au CP ? Le dispositif ACE",
    source: 'Revue française de pédagogie, 2017/4 (n° 201), p. 105 et suivantes',
    url: 'https://cairn.info/revue-francaise-de-pedagogie-2017-4-page-105.htm',
  },
  {
    id: 'rosenshine2012',
    type: 'synthese',
    auteurs: 'Rosenshine, B.',
    annee: 2012,
    titre: 'Principles of Instruction: Research-Based Strategies That All Teachers Should Know',
    source: 'American Educator, 36(1), printemps 2012',
    url: 'https://www.aft.org/ae/spring2012/rosenshine',
  },
  {
    id: 'gersten2009',
    type: 'rapport',
    auteurs: 'Gersten, R., Beckmann, S., Clarke, B., Foegen, A., Marsh, L., Star, J. R. & Witzel, B.',
    annee: 2009,
    titre: 'Assisting Students Struggling with Mathematics: Response to Intervention (RtI) for Elementary and Middle Schools (IES Practice Guide)',
    source: 'Institute of Education Sciences, What Works Clearinghouse',
    url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/2',
  },
  {
    id: 'video_se',
    type: 'video',
    auteurs: 'ScienceÉtonnante',
    annee: '',
    titre: 'MIEUX APPRENDRE & ÉTUDIER : les (vraies) techniques scientifiques',
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=RVB3PBPxMWg',
  },
];

export const numeroRef = (id: string): number => {
  const i = REFS.findIndex((r) => r.id === id);
  if (i < 0) throw new Error(`Référence inconnue : « ${id} » (voir src/data/apprendre.ts)`);
  return i + 1;
};