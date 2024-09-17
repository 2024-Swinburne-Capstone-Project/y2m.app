import React from 'react';
import { Skill } from '@/types';
import { profileConfig } from '@/config/application/profile-config';
import TagInput from '@/components/common/tag-input';
import { UserCog } from 'lucide-react';

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
      itemToString={(skill) => skill.name}
      placeholder={profileConfig.profileForm.skills.placeholder}
      addButtonText={profileConfig.profileForm.skills.addButtonText}
      createNewItem={(name: string) => ({ name }) as Skill}
      disabled={disabled}
      noDataIcon={<UserCog />}
      noDataTitle={profileConfig.profileForm.skills.noDataTitle}
    />
  );
};

export default SkillsSection;
