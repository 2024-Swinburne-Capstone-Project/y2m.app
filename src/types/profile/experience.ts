import { Experience as DBExperience } from '../db';

export interface Experience extends DBExperience {}

export type CreateExperienceData = Omit<Experience, 'id' | 'userId' | 'startDate' | 'endDate'> & {
  startDate: Date;
  endDate: Date | undefined;
};
