import { Badge as DBBadge } from '../db';
export interface Badge extends DBBadge {}
export type CreateBadgeData = Partial<Omit<Badge, 'id' | 'user_id'>>;
export type UpdateBadgeData = Partial<Omit<Badge, 'id' | 'user_id'>>;
