import { DevelopmentArea as DBDevelopmentArea } from '../db';
export interface DevelopmentArea extends DBDevelopmentArea {}
export type CreateDevelopmentAreaData = Omit<DevelopmentArea, 'id'>;
export type UpdateDevelopmentAreaData = Partial<Omit<DevelopmentArea, 'id' | 'user_id'>>;
