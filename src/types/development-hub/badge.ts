import { Badge as DBBadge } from '../db';
export interface Badge extends DBBadge {}
export type CreateBadgeData = Omit<Badge, 'id'>;
export type UpdateBadgeData = Partial<Omit<Badge, 'id' | 'user_id'>>;
