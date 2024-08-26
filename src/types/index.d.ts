export * from './knowledge-hub/blog';
export * from './knowledge-hub/video';
export * from './development-hub/badge';
export * from './development-hub/development-area';
export * from './development-hub/milestone';
export * from './development-hub/milestone-step';
export * from './development-hub/development-hub';
export * from './profile/education';
export * from './profile/experience';
export * from './profile/userProfile';
export * from './profile/skill';
export * from './api';

type MarkupElement = {
  type: string;
  text: string;
  className?: string;
};

export type TextWithMarkup = {
  text: string;
  markup?: MarkupElement[];
};

export interface AboutConfig {
  carouselSlides: AboutCarouselConfig[];
  heroContent: HeroContentConfig;
  additionalContent: AdditionalContent;
}

export interface PrivacyPolicyConfig {
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

export interface ConnectionsConfig {
  pageTitle: string;
  tabs: {
    incoming: string;
    outgoing: string;
  };
  requestCard: {
    acceptButton: string;
    rejectButton: string;
    pendingStatus: string;
  };
  noDataDisplay: {
    incoming: {
      title: string;
      description: string;
    };
    outgoing: {
      title: string;
      description: string;
    };
  };
  toastMessages: {
    acceptSuccess: string;
    acceptError: string;
    rejectSuccess: string;
    rejectError: string;
  };
}

export interface MentorSearchConfig {
  heroSection: {
    title: string;
    subtitle: string;
  };
  searchSection: {
    inputPlaceholder: string;
    buttonText: string;
  };
  resultsSection: {
    noDataTitle: string;
    noDataDescription: string;
    requestButtonText: {
      default: string;
      sent: string;
      connected: string;
    };
    dialogTitle: string;
    dialogPlaceholder: string;
    dialogButtonText: {
      default: string;
      sending: string;
    };
  };
  requestButtonText: {
    default: string;
    sent: string;
  };
  dialogTitle: string;
  dialogPlaceholder: string;
  dialogButtonText: {
    default: string;
    sending: string;
  };
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
    invalidErrorMessage: string;
    errorMessage: string;
  };
  feedback: {
    label: string;
  };
  question: {
    label: string;
  };
  demo: {
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
}

export interface EnterpriseSolutionsConfig {
  heroContent: HeroContentConfig;
  additionalContent: TextWithMarkup;
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
  link: TextWithMarkup;
  linkHref: string;
  suffix: TextWithMarkup;
}

export interface VideoConfig {
  id: number;
  title: TextWithMarkup;
  description: TextWithMarkup;
  embeddingLink: string;
  videoLength: string;
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

export type DevelopmentHubConfig = {
  heroSection: HeroSectionConfig;
  milestoneProgress: {
    title: string;
    COMPLETED: string;
    IN_PROGRESS: string;
    NOT_STARTED: string;
  };
  graphicalTimeline: {
    title: string;
  };
  myBadges: {
    title: string;
    senderLabel: TextWithMarkup;
    dateLabel: TextWithMarkup;
    messageLabel: TextWithMarkup;
  };
  developmentAreas: {
    title: string;
    placeholder: string;
    addButton: string;
  };
  keyMilestones: {
    title: string;
    statusLabel: string;
    exportButton: string;
    addButton: string;
    deleteButton: string;
  };
};

export interface NavItem {
  title: string;
  href: string;
}

export interface NotFoundConfig {
  title: string;
  description: string;
  imageSource: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
}

export interface UserButton {
  profileButton: string;
  connectionsButton: string;
  signOutButton: string;
  loginButton: string;
  profileHref: string;
  connectionsHref: string;
  signOutHref: string;
  loginHref: string;
  connectionsOverviewHref: string;
  connectionsOverviewButton: string;
}

export interface ConnectionsOverviewConfig {
  pageTitle: string;
  tabs: {
    mentors: string;
    mentees: string;
  };
  noDataDisplay: {
    mentors: {
      title: string;
      description: string;
    };
    mentees: {
      title: string;
      description: string;
    };
  };
  actionButton: {
    mentors: string;
    mentees: string;
  };
  connectionCard: {
    viewProfileButton: string;
    messageButton: string;
  };
}

export interface ProfileConfig {
  profileForm: ProfileForm;
  educationForm: EducationForm;
  educationTable: Table;
  experienceForm: ExperienceForm;
  experienceTable: Table;
}

export interface ProfileForm {
  header: {
    text: string;
  };
  fullName: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  email: {
    label: string;
    placeholder: string;
    invalidErrorMessage: string;
    errorMessage: string;
    tooltip: string;
  };
  aboutMe: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  linkedInProfileLink: {
    label: string;
    placeholder: string;
    invalidErrorMessage: string;
    errorMessage: string;
  };
  skills: {
    label: string;
    list: string[];
    errorMessage: string;
  };
  isMentor: {
    label: string;
  };
  isMentee: {
    label: string;
  };
  mentorAreas: {
    label: string;
    placeholder: string;
    addButtonText: string;
  };
  menteeInterests: {
    label: string;
    placeholder: string;
    addButtonText: string;
  };
  availability: {
    label: string;
    placeholder: string;
  };
  submitButton: {
    text: string;
  };
  successMessage: {
    text: string;
  };
}

export interface EducationForm {
  header: {
    text: string;
  };
  institution: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  degree: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  fieldOfStudy: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  onGoing: {
    label: string;
  };
  startDate: {
    label: string;
    errorMessage: string;
  };
  endDate: {
    label: string;
    errorMessage: string;
  };
  grade: {
    label: string;
    placeholder: string;
  };
  submitButton: {
    text: string;
  };
  successMessage: {
    text: string;
  };
}

export interface ExperienceForm {
  header: {
    text: string;
  };
  position: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  company: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  location: {
    label: string;
    placeholder: string;
    errorMessage: string;
  };
  current: {
    label: string;
  };
  startDate: {
    label: string;
    errorMessage: string;
  };
  endDate: {
    label: string;
    errorMessage: string;
  };
  submitButton: {
    text: string;
  };
  successMessage: {
    text: string;
  };
}

export interface Table {
  caption: string;
  headers: string[];
}

export interface NotAuthorizedConfig {
  title: string;
  description: string;
  imageSource: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
}

export type DashboardConfig = {
  heroContent: HeroContentConfig;
  myMentors: TextWithMarkup;
  myMentees: TextWithMarkup;
  developmentOverview: TextWithMarkup;
};
