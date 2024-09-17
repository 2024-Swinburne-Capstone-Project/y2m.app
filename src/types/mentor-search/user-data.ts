import { DevelopmentArea, Testimonial } from '..';
import {
  Education as DBEducation,
  Experience as DBExperience,
  Skill as DBSkill,
  User as DBUser,
} from '../db';

export interface Education extends Partial<Omit<DBEducation, 'id' | 'startDate' | 'endDate'>> {
  id: number;
  startDate: Date;
  endDate: Date | null;
}
export interface Experience extends Partial<Omit<DBExperience, 'id' | 'startDate' | 'endDate'>> {
  id: number;
  startDate: Date;
  endDate: Date | null;
}
export interface Skill extends Partial<Omit<DBSkill, 'id'>> {
  id: number;
}
export interface User extends DBUser {}
export interface UserData {
  user: User;
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  testimonials?: Testimonial[];
  developmentAreas?: DevelopmentArea[];
  hasExistingRequest: boolean;
  hasExistingConnection: boolean;
}
