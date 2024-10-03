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
  endorsedSkill: string | null;
  receivedDate: Generated<Timestamp>;
}

export interface MentorMentee {
  createdAt: Generated<Timestamp>;
  menteeId: string;
  mentorId: string;
  updatedAt: Timestamp;
}

export interface MentorshipNotification {
  id: Generated<number>;
  message: string;
  read: Generated<boolean>;
  receivedDate: Generated<Timestamp>;
  redirectLink: string;
  type: 'ACCEPTED_MENTORSHIP_REQUEST' | 'NEW_MENTORSHIP_REQUEST' | 'REJECTED_MENTORSHIP_REQUEST';
  userId: string;
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

export interface MilestoneComment {
  id: Generated<number>;
  milestoneId: string;
  content: string;
  createdAt: string | Date;
}

export interface MessageNotification {
  chatId: number;
  id: Generated<number>;
  read: Generated<boolean>;
  receivedDate: Generated<Timestamp>;
  userId: string;
}

export interface Milestone {
  id: Generated<number>;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  startDate: string | Date;
  endDate: string | Date;
  userId: string;
}

export interface MilestoneWithComments extends Milestone {
  comments: MilestoneComment[];
}

export interface MilestoneStep {
  dueDate: Timestamp | null;
  id: Generated<number>;
  milestoneId: number;
  name: string;
  dueDate: Timestamp;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

export interface Skill {
  id: Generated<number>;
  name: string;
  userId: string;
  endorsements: Generated<number>;
}

export interface User {
  aboutMe: string | null;
  availability: string | null;
  email: string | null;
  id: string;
  isMentee: Generated<boolean>;
  isMentor: Generated<boolean>;
  linkedInProfileLink: string | null;
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
  MentorshipNotification: MentorshipNotification;
  MentorshipRequest: MentorshipRequest;
  Message: Message;
  MessageNotification: MessageNotification;
  Milestone: Milestone;
  MilestoneComment: MilestoneComment;
  MilestoneStep: MilestoneStep;
  Skill: Skill;
  User: User;
  Video: Video;
}
