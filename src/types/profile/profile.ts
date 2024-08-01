export interface Profile {
  FullName: string;
  Email: string;
  AboutMe: string;
  LinkedInProfileLink: string;
  Skills: string[];
  Education: Education[];
  Experience: Experience[];
}

export interface Education {
  Institution: string;
  Degree: string;
  FieldOfStudy: string;
  OnGoing: boolean;
  Grade?: string;
  StartDate: string;
  EndDate: string;
}

export interface Experience {
  Position: string;
  Company: string;
  Location: string;
  Current: boolean;
  StartDate: string;
  EndDate: string;
}
