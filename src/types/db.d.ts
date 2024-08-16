import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Badge {
  icon: string;
  id: Generated<number>;
  message: string;
  name: string;
  receivedDate: Timestamp;
  senderName: string;
  userId: string;
}

export interface BlogPost {
  author: string;
  content: string;
  date: Timestamp;
  id: Generated<number>;
  imagePath: string;
  title: string;
}

export interface DevelopmentArea {
  id: Generated<number>;
  name: string;
  userId: string;
}

export interface Education {
  degree: string;
  endDate: Timestamp | null;
  fieldOfStudy: string;
  grade: string | null;
  id: Generated<number>;
  institution: string;
  onGoing: boolean;
  startDate: Timestamp;
  userId: string;
}

export interface Experience {
  company: string;
  current: boolean;
  endDate: Timestamp | null;
  id: Generated<number>;
  location: string;
  position: string;
  startDate: Timestamp;
  userId: string;
}

export interface GetInTouch {
  demo: boolean;
  email: string;
  feedback: boolean;
  firstName: string;
  id: Generated<number>;
  lastName: string;
  message: string;
  question: boolean;
  receivedDate: Timestamp | null;
}

export interface MentorMentee {
  createdAt: Generated<Timestamp>;
  menteeId: string;
  mentorId: string;
  updatedAt: Timestamp;
}

export interface Milestone {
  endDate: Timestamp;
  id: Generated<number>;
  startDate: Timestamp;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  title: string;
  userId: string;
}

export interface MilestoneStep {
  id: Generated<number>;
  milestoneId: number;
  name: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

export interface Skill {
  id: Generated<number>;
  name: string;
  userId: string;
}

export type MentorshipRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface MentorshipRequest {
  id: Generated<number>;
  mentorId: string;
  menteeId: string;
  status: MentorshipRequestStatus;
  message: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface User {
  id: string;
  name: string;
  email: string | null;
  aboutMe: string | null;
  linkedInProfileLink: string | null;
  profilePictureURL: string | null;
  isMentor: boolean;
  isMentee: boolean;
  mentorAreas: string[];
  menteeInterests: string[];
  availability: string | null;
}

export interface Video {
  description: string;
  embeddingLink: string;
  id: Generated<number>;
  title: string;
  videoLength: string;
}

export interface Chat {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
}

export interface ChatParticipant {
  chatId: number;
  userId: string;
  joinedAt: Generated<Timestamp>;
}

export interface Message {
  id: Generated<number>;
  content: string;
  createdAt: Generated<Timestamp>;
  chatId: number;
  senderId: string;
}

export interface DB {
  Badge: Badge;
  BlogPost: BlogPost;
  DevelopmentArea: DevelopmentArea;
  Education: Education;
  Experience: Experience;
  GetInTouch: GetInTouch;
  MentorMentee: MentorMentee;
  Milestone: Milestone;
  MilestoneStep: MilestoneStep;
  Skill: Skill;
  User: User;
  Video: Video;
  MentorshipRequest: MentorshipRequest;
  Chat: Chat;
  ChatParticipant: ChatParticipant;
  Message: Message;
}
