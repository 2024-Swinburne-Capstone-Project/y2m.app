interface AboutConfig {
  carouselSlides: AboutCarouselConfig[];
  heroSection: HeroSectionConfig;
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

export interface TermsAndConditionsSection {
  title: string;
  content: string[];
  imagePath?: string;
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
