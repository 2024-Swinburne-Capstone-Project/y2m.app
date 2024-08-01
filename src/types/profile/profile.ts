import { Education } from './education';
import { Experience } from './experience';

export interface Profile {
  FullName: string;
  Email: string;
  AboutMe: string;
  LinkedInProfileLink: string;
  Skills: string[];
  Education: Education[];
  Experience: Experience[];
}
