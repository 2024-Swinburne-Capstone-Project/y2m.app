import { Education, Experience, Skill } from '@/types';

export type UserData = {
  user: {
    id: string;
    name: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
};
