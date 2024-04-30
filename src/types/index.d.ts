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
  heroSection: {
    title: string;
    imagePath: string;
  };
  popularQuestions: {
    title: string;
    answer: string;
  }[];
  visitUs: {
    address: string;
  };
  mailUs: {
    email: string;
  };
  accordionImage: {
    imagePath: string;
  };
}

export interface TermsAndConditionsSection {
  title: string;
  content: string[];
  imagePath?: string;
}

export interface KnowledgeHubConfig {
  heroSection: HeroSectionConfig;
  videos: VideoConfig[];
  carouselSlides: BlogsConfig[];
}

export interface EnterpriseSolutionsConfig {
  heroContent: HeroContentConfig;
  additionalContent: AdditionalContent;
  additionalImagePath: string;
}

export interface HeroSectionConfig {
  title: string;
  imagePath: string;
}

export interface HeroContentConfig {
  titleText: string;
  contentText: string;
  imagePath: string;
}

export interface AboutCarouselConfig {
  title: string;
  content: string;
  imagePath: string;
}

export interface AdditionalContent {
  contentBody: string;
}

export interface VideoConfig {
  id: number;
  title: string;
  description: string;
  embeddingLink: string;
  length: string;
}

export interface BlogsConfig {
  id: number;
  title: string;
  content: string;
  date: Date;
  author: string;
  imagePath: string;
}
