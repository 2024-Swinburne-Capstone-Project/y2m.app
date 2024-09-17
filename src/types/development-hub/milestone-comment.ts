import { MilestoneComment as DBMilestoneComment } from '../db';

export interface MilestoneComment extends Omit<DBMilestoneComment, 'createdAt'> {
  createdAt: Date | string;
}

export type CreateMilestoneCommentData = Omit<MilestoneComment, 'id' | 'createdAt'>;
