type MarkupElement = {
  type: string;
  text: string;
  className?: string;
};

type TextWithMarkup = {
  text: string;
  markup?: MarkupElement[];
};

interface AboutConfig {
  carouselSlides: AboutCarouselConfig[];
  heroContent: HeroContentConfig;
  additionalContent: AdditionalContent;
}

interface PrivacyPolicyConfig {
  heroSection: HeroSectionConfig;
  sections: PrivacyPolicySection[];
}

export interface TermsAndConditionsConfig {
  heroSection: HeroSectionConfig;
  sections: TermsAndConditionsSection[];
}

export interface GetInTouchConfig {
  heroSection: HeroSectionConfig;
  popularQuestions: PopularQuestion[];
  visitUs: Address;
  mailUs: Email;
  accordionImage: AccordionImage;
  form: GetInTouchForm;
}

export interface GetInTouchForm {
  firstName: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  lastName: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  email: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  feedback: {
    label: string;
  };
  question: {
    label: string;
  };
  message: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  submitButton: {
    text: string;
  };
  toast: {
    title: string;
  };
}

export interface TermsAndConditionsSection {
  title: TextWithMarkup;
  content: TextWithMarkup[];
  imagePath?: string;
}

export interface KnowledgeHubConfig {
  heroSection: HeroSectionConfig;
  videos: VideoConfig[];
  carouselSlides: BlogsConfig[];
}

export interface EnterpriseSolutionsConfig {
  heroContent: HeroContentConfig;
  additionalContent: TextWithMarkup;
  additionalImagePath: string;
  form: EnterpriseSolutionsForm;
}

export interface EnterpriseSolutionsForm {
  firstName: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  lastName: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  email: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  message: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  demo: {
    label: string;
  };
  submitButton: {
    text: string;
  };
  toast: {
    title: string;
  };
}

export interface HeroSectionConfig {
  title: TextWithMarkup;
  imagePath: string;
}

export interface HeroContentConfig {
  title: TextWithMarkup;
  content: TextWithMarkup;
  imagePath: string;
}

export interface AboutCarouselConfig {
  title: TextWithMarkup;
  content: TextWithMarkup;
  imagePath: string;
}

export interface AdditionalContent {
  content: TextWithMarkup;
  link: TextWithMarkup;
  linkHref: string;
  suffix: TextWithMarkup;
}

export interface VideoConfig {
  id: number;
  title: TextWithMarkup;
  description: TextWithMarkup;
  embeddingLink: string;
  length: string;
}

export interface BlogsConfig {
  id: number;
  title: TextWithMarkup;
  content: TextWithMarkup;
  date: Date;
  author: TextWithMarkup;
  imagePath: string;
}

export interface PopularQuestion {
  title: TextWithMarkup;
  answer: TextWithMarkup;
}

export interface Address {
  title: TextWithMarkup;
  address: TextWithMarkup;
}

export interface Email {
  title: TextWithMarkup;
  email: TextWithMarkup;
}

export interface AccordionImage {
  imagePath: string;
}

export interface PrivacyPolicySection {
  title: TextWithMarkup;
  content: TextWithMarkup[];
}

export interface HomeConfig {
  mainTitle: {
    words: TextWithMarkup[];
    staticText: TextWithMarkup;
  };
  subtitle: TextWithMarkup;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  perks: {
    title: string;
    items: {
      title: TextWithMarkup;
      imagePath: string;
    }[];
  };
  introVideo: {
    title: string;
    videoUrl: string;
  };
  features: {
    title: string;
    items: {
      title: TextWithMarkup;
      description: TextWithMarkup;
      imagePath: string;
    }[];
  };
  mentorBenefits: {
    title: string;
    imagePath: string;
    items: {
      description: TextWithMarkup;
      imagePath: string;
      sourceUrl: string;
    }[];
  };
  menteeBenefits: {
    title: string;
    items: {
      title: TextWithMarkup;
      description: TextWithMarkup;
      imagePath: string;
    }[];
  };
  testimonials: {
    title: string;
    items: {
      name: TextWithMarkup;
      role: TextWithMarkup;
      image: string;
      quote: TextWithMarkup;
    }[];
  };
  acknowledgementOfCountry: {
    title: string;
    text: string;
  };
}

interface NavItem {
  title: string;
  href?: string;
}

interface NavConfig {
  navItems: NavItem[];
}
