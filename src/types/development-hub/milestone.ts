import { Milestone as DBMilestone } from '../db';
export interface Milestone extends DBMilestone {}
export type CreateMilestoneData = Partial<
  Omit<Milestone, 'id' | 'user_id' | 'startDate' | 'endDate'>
> & {
  startDate: Date;
  endDate: Date;
};
export type UpdateMilestoneData = Partial<Omit<Milestone, 'id' | 'user_id'>>;
export interface MilestoneProgress {
  COMPLETED: number;
  IN_PROGRESS: number;
  NOT_STARTED: number;
}
