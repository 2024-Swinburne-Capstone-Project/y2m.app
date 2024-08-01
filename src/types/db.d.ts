import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface _PrismaMigrations {
  applied_steps_count: Generated<number>;
  checksum: string;
  finished_at: Timestamp | null;
  id: string;
  logs: string | null;
  migration_name: string;
  rolled_back_at: Timestamp | null;
  started_at: Generated<Timestamp>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  author: string;
  content: string;
  date: Timestamp;
  id: Generated<number>;
  imagePath: string;
  title: string;
}

export interface Video {
  description: string;
  embeddingLink: string;
  id: Generated<number>;
  title: string;
  videoLength: string;
}

export interface DevelopmentArea {
  id: Generated<number>;
  userId: string;
  name: string;
}

export interface Milestone {
  id: Generated<number>;
  userId: string;
  title: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: Timestamp;
  endDate: Timestamp;
}

export interface MilestoneStep {
  id: Generated<number>;
  milestoneId: number;
  name: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Badge {
  id: Generated<number>;
  userId: string;
  name: string;
  icon: string;
  senderName: string;
  receivedDate: Timestamp;
  message: string;
}

export interface GetInTouch {
  id: Generated<number>;
  firstName: string;
  lastName: string;
  email: string;
  demo: boolean;
  feedback: boolean;
  question: boolean;
  message: string;
  receivedDate: Timestamp | null;
}

export interface DB {
  User: User;
  Video: Video;
  BlogPost: BlogPost;
  Milestone: Milestone;
  MilestoneStep: MilestoneStep;
  Action: Action;
  DevelopmentArea: DevelopmentArea;
  Badge: Badge;
  GetInTouch: GetInTouch;
}
