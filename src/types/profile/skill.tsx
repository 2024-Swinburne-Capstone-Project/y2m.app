import { Skill as DBSkill } from '../db';

export interface Skill extends DBSkill {}
export interface CreateSkillData extends Omit<DBSkill, 'id' | 'userId'> {}
