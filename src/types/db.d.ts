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

export interface Chat {
  createdAt: Generated<Timestamp>;
  id: Generated<number>;
  updatedAt: Timestamp;
}

export interface ChatParticipant {
  chatId: number;
  joinedAt: Generated<Timestamp>;
  userId: string;
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

export interface MediaRelease {
  description: string;
  href: string;
  id: Generated<number>;
  imagePath: string;
  title: string;
}

export interface MentorFeedback {
  feedback: string;
  id: Generated<number>;
  menteeId: string;
  mentorId: string;
  rating: number;
  receivedDate: Generated<Timestamp>;
}

export interface MentorMentee {
  createdAt: Generated<Timestamp>;
  menteeId: string;
  mentorId: string;
  updatedAt: Timestamp;
}

export interface MentorshipRequest {
  createdAt: Generated<Timestamp>;
  id: Generated<number>;
  menteeId: string;
  mentorId: string;
  message: string;
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
  updatedAt: Timestamp;
}

export interface Message {
  chatId: number;
  content: string;
  createdAt: Generated<Timestamp>;
  id: Generated<number>;
  senderId: string;
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

export interface User {
  aboutMe: string | null;
  availability: string | null;
  email: string | null;
  id: string;
  isMentee: Generated<boolean>;
  isMentor: Generated<boolean>;
  linkedInProfileLink: string | null;
  menteeInterests: string[] | null;
  mentorAreas: string[] | null;
  name: string;
  overallRating: Generated<number>;
  profileBackgroundURL: string | null;
  profilePictureURL: string | null;
  role: Generated<string>;
}

export interface Video {
  description: string;
  embeddingLink: string;
  id: Generated<number>;
  title: string;
  videoLength: string;
}

export interface DB {
  Badge: Badge;
  BlogPost: BlogPost;
  Chat: Chat;
  ChatParticipant: ChatParticipant;
  DevelopmentArea: DevelopmentArea;
  Education: Education;
  Experience: Experience;
  GetInTouch: GetInTouch;
  MediaRelease: MediaRelease;
  MentorFeedback: MentorFeedback;
  MentorMentee: MentorMentee;
  MentorshipRequest: MentorshipRequest;
  Message: Message;
  Milestone: Milestone;
  MilestoneStep: MilestoneStep;
  Skill: Skill;
  User: User;
  Video: Video;
}
