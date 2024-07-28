// config/marketing.ts
import { HomeConfig } from '@/types';

export const homeConfig: HomeConfig = {
  mainTitle: {
    words: [
      { text: 'Libérez' },
      { text: 'Découvrez' },
      { text: 'Atteignez' },
      { text: 'Conquérez' },
      { text: 'Déverrouillez' },
      { text: 'Réalisez' },
      { text: 'Accomplissez' },
      { text: 'Maximisez' },
    ],
    staticText: { text: 'Votre Potentiel !' },
  },
  subtitle: {
    text: 'Une Plateforme de Mentorat et de Développement Personnel entre Pairs',
  },
  heroImage: {
    src: '/paper-plane.svg',
    alt: '',
    width: 300,
    height: 300,
  },
  perks: {
    title: 'Que Proposons-Nous ?',
    items: [
      {
        title: { text: 'Gratuit' },
        imagePath: '/work-from-home.svg',
      },
      {
        title: { text: "Apprenez des Professionnels de l'Industrie" },
        imagePath: '/businessman-with-a-suitcase.svg',
      },
      {
        title: { text: 'Mentorez les Autres' },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  introVideo: {
    title: 'Qui Sommes-Nous',
    videoUrl: 'https://www.youtube.com/embed/Iv41XbkORAA?si=0TWReHSOKVsf5H8Q&rel=0',
  },
  features: {
    title: 'Ce Que Vous Pouvez Faire',
    items: [
      {
        title: { text: 'Définir et Suivre des Objectifs' },
        description: {
          text: "You2mentor dispose d'un hub Mon Développement où vous pouvez définir et suivre la progression de vos objectifs de développement",
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'Trouver des Mentors' },
        description: {
          text: 'Vous pouvez rechercher un mentor pour une croissance personnelle globale ou trouver une tribu de mentors adaptés à des objectifs spécifiques',
        },
        imagePath: '/team-idea.svg',
      },
      {
        title: { text: 'Mentorer les Autres' },
        description: {
          text: 'Mentorer les autres non seulement soutient le développement des mentorés, mais offre également aux mentors des expériences pour devenir un expert en la matière et augmente considérablement les opportunités de croissance de carrière',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'Mentorat Inversé' },
        description: {
          text: 'Mentorez et réseautez avec des leaders qui souhaitent participer au mentorat inversé pour acquérir de nouvelles perspectives',
        },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  mentorBenefits: {
    title: 'Pourquoi Vous Devriez Être un Mentor',
    imagePath: '/analysis-presentation.svg',
    items: [
      {
        description: {
          text: "6 fois plus susceptible d'être promu que quelqu'un qui n'est pas mentor",
        },
        imagePath: '/product-launch.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: "28% plus susceptible d'obtenir une augmentation de salaire contre 5% des non-mentors",
        },
        imagePath: '/spending-money.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: "Reconnaissance en tant qu'expert et leader",
        },
        imagePath: '/shaking-hands.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'Opportunité de développer et de défendre les autres',
        },
        imagePath: '/man-calling.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'Développement de vos styles de leadership et de coaching personnels',
        },
        imagePath: '/creative-work.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
    ],
  },
  menteeBenefits: {
    title: 'Pourquoi Vous Devriez Avoir un Mentor',
    items: [
      {
        title: { text: 'Apprendre Quelque Chose de Nouveau' },
        description: {
          text: 'Avoir un mentor en dehors de votre entreprise ou même dans un domaine différent peut vous aider à accéder à des connaissances dont vous ne saviez pas que vous manquiez',
        },
        imagePath: '/studying.svg',
      },
      {
        title: { text: 'Croissance de Carrière' },
        description: {
          text: "Les recherches montrent que vous avez 5 fois plus de chances d'obtenir une promotion et 25% de chances en plus d'obtenir une augmentation qu'une personne qui n'a pas de mentor",
        },
        imagePath: '/celebrating-business-success.svg',
      },
      {
        title: { text: 'Orientation' },
        description: {
          text: 'Les mentors offrent des commentaires constructifs impartiaux et des encouragements conçus pour renforcer les domaines dans lesquels vous souhaitez vous améliorer',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'Connexions de Réseau' },
        description: {
          text: "Les mentors proposent généralement à leurs mentorés d'utiliser leurs réseaux. Faire appel à l'aide d'un mentor peut améliorer votre potentiel à découvrir de nouvelles connexions, ce qui peut finalement aboutir à de nouvelles opportunités.",
        },
        imagePath: '/work-party.svg',
      },
      {
        title: { text: 'Engagement et Motivation' },
        description: {
          text: "Les mentors soutiennent le développement professionnel et personnel d'une personne et vous motivent à atteindre vos objectifs",
        },
        imagePath: '/creative-work.svg',
      },
      {
        title: { text: 'Résolution de Problèmes' },
        description: {
          text: 'Si vous avez un problème à résoudre, un mentor peut vous fournir des conseils utiles pour résoudre le problème ou des options à considérer',
        },
        imagePath: '/genius.svg',
      },
      {
        title: { text: "Définition d'Objectifs" },
        description: {
          text: "Les mentors sont les supporters idéaux pour vous responsabiliser si vous avez besoin d'aide pour développer et atteindre des objectifs. Votre mentor peut vous aider à vous développer en vous aidant à fixer de nouveaux objectifs ambitieux et à vous donner des directives sur ce qu'il faut faire ensuite",
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'Responsabilité' },
        description: {
          text: 'Les mentors tiennent leur mentoré responsable de leurs objectifs. En suivant les progrès, le mentor aide le mentoré à rester concentré et sur la bonne voie',
        },
        imagePath: '/calculator.svg',
      },
    ],
  },
  testimonials: {
    title: 'Témoignages',
    items: [
      {
        name: { text: 'John Doe' },
        role: { text: 'Ingénieur Logiciel' },
        image: '/male-user.png',
        quote: {
          text: 'You2Mentor a joué un rôle déterminant dans la croissance de ma carrière. Les mentors sont compétents et bienveillants.',
        },
      },
      {
        name: { text: 'Jane Smith' },
        role: { text: 'Chef de Produit' },
        image: '/female-user.png',
        quote: {
          text: "Je recommande vivement You2Mentor à tous ceux qui cherchent à améliorer leurs compétences. C'est une plateforme incroyable.",
        },
      },
    ],
  },
  acknowledgementOfCountry: {
    title: 'Reconnaissance du Pays',
    text: "You2Mentor reconnaît les peuples aborigènes et les insulaires du détroit de Torres comme les gardiens traditionnels de notre terre - l'Australie. Nous leur témoignons notre respect, ainsi qu'à leurs cultures et aux anciens, présents et émergents. Les peuples Wurundjeri Woi Wurrung et Bunurong Boon Wurrung du Kulin de l'Est sont les gardiens traditionnels de la terre sur laquelle se trouve le bureau de You2Mentor.",
  },
};
