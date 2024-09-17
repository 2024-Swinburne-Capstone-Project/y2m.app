import { Milestone as DBMilestone, MilestoneComment } from '../db';
export interface Milestone extends Omit<DBMilestone, 'comments'> {
  comments: MilestoneComment[];
}

export type CreateMilestoneData = Partial<
  Omit<Milestone, 'id' | 'user_id' | 'startDate' | 'endDate' | 'steps' | 'comments'>
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
