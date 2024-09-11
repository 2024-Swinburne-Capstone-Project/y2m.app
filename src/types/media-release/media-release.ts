import { MediaRelease as DBMediaRelease } from '../db';

export interface MediaRelease extends DBMediaRelease {}

export type CreateMediaReleaseData = Omit<MediaRelease, 'id'>;
