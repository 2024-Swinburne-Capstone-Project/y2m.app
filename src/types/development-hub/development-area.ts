import { DevelopmentArea as DBDevelopmentArea } from '../db';
export interface DevelopmentArea extends DBDevelopmentArea {}
export type CreateDevelopmentAreaData = Partial<Omit<DevelopmentArea, 'id' | 'user_id'>>;
export type UpdateDevelopmentAreaData = Partial<Omit<DevelopmentArea, 'id' | 'user_id'>>;
