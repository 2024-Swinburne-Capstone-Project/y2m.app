import { Video as DBVideo } from '../db';

export interface Video extends DBVideo {}

export type CreateVideoData = Omit<Video, 'id'>;
