import React from 'react';
import { Skill } from '@/types';
import { profileConfig } from '@/config/application/profile-config';
import TagInput from '@/components/common/tag-input';

interface SkillsSectionProps {
  skills: Skill[];
  onUpdate: React.Dispatch<React.SetStateAction<Skill[]>>;
  disabled: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onUpdate, disabled }) => {
  return (
    <TagInput<Skill>
      className={'my-5'}
      title={profileConfig.profileForm.skills.label}
      items={skills}
      setItems={onUpdate}
      itemToString={(skill: Skill) => skill.name}
      placeholder="Add a new skill"
      addButtonText="Add Skill"
      createNewItem={(name: string) => ({ name }) as Skill}
      disabled={disabled}
    />
  );
};

export default SkillsSection;
