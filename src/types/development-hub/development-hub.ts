import { Badge } from './badge';
import { DevelopmentArea } from './development-area';
import { Milestone } from './milestone';
import { MilestoneStep } from './milestone-step';

export interface DevelopmentHubData {
  milestones: Milestone[];
  milestoneSteps: MilestoneStep[];
  developmentAreas: DevelopmentArea[];
  badges: Badge[];
}
