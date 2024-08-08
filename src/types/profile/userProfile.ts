import { Education, Experience, Skill } from '@/types';
import { User } from '@/types/profile/user';

export interface UserProfile {
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  user: User;
}
