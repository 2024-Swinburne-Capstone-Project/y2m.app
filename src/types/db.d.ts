import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface BlogPost {
  author: string;
  content: string;
  date: Timestamp;
  id: Generated<number>;
  imagePath: string;
  title: string;
}

export interface MentorMentee {
  createdAt: Generated<Timestamp>;
  menteeId: string;
  mentorId: string;
  updatedAt: Timestamp;
}

export interface Users {
  bio: string | null;
  createdAt: Generated<Timestamp>;
  email: string | null;
  id: string;
  name: string;
  profilePicture: string | null;
  updatedAt: Timestamp;
}

export interface Video {
  description: string;
  embeddingLink: string;
  id: Generated<number>;
  title: string;
  videoLength: string;
}

export interface DB {
  BlogPost: BlogPost;
  mentor_mentee: MentorMentee;
  users: Users;
  Video: Video;
}
