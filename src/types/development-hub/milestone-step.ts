import { Milestone, MilestoneStep as DBMilestoneStep } from '../db';
export interface MilestoneStep extends DBMilestoneStep {}
export type CreateMilestoneStepData = Omit<MilestoneStep, 'id'>;
export type UpdateMilestoneStepData = Partial<Omit<MilestoneStep, 'id' | 'milestone_id'>>;
export type MilestoneWithSteps = Milestone & { steps: MilestoneStep[] };
