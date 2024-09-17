import { Milestone, MilestoneStep as DBMilestoneStep } from '../db';
export interface MilestoneStep extends DBMilestoneStep {}
export type CreateMilestoneStepData = Partial<Omit<MilestoneStep, 'id' | 'dueDate'>> & {
  dueDate: Date;
};
export type UpdateMilestoneStepData = Partial<Omit<MilestoneStep, 'id' | 'milestone_id'>>;
export type MilestoneWithSteps = Milestone & { steps: MilestoneStep[] };
