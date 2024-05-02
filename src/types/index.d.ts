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
  additionalContent: AdditionalContent;
  additionalImagePath: string;
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
  address: TextWithMarkup;
}

export interface Email {
  email: TextWithMarkup;
}

export interface AccordionImage {
  imagePath: string;
}

export interface PrivacyPolicySection {
  title: TextWithMarkup;
  content: TextWithMarkup[];
}
