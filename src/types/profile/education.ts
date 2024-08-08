import { Education as DBEducation } from '../db';

export interface Education extends DBEducation {}

export type CreateEducationData = Partial<
  Omit<Education, 'id' | 'user_id' | 'startDate' | 'endDate'>
> & {
  startDate: Date;
  endDate: Date | undefined;
};
