import { UserData } from '@/types/mentor-search/user-data';

export enum MentorshipRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  status: MentorshipRequestStatus;
  message: string;
  createdAt: string;
  updatedAt: string;
  mentor: UserData;
  mentee: UserData;
}

export type CreateMentorshipRequestData = Omit<
  MentorshipRequest,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'mentor' | 'mentee' | 'menteeId'
>;
