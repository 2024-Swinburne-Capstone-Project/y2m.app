import { Milestone as DBMilestone } from '../db';
export interface Milestone extends DBMilestone {}
export type CreateMilestoneData = Omit<Milestone, 'id'>;
export type UpdateMilestoneData = Partial<Omit<Milestone, 'id' | 'user_id'>>;
export interface MilestoneProgress {
  COMPLETED: number;
  IN_PROGRESS: number;
  NOT_STARTED: number;
}
