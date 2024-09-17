import React from 'react';
import { DevelopmentArea } from '@/types';
import { profileConfig } from '@/config/application/profile-config';
import TagInput from '@/components/common/tag-input';
import { BrainCircuit } from 'lucide-react';

interface DevelopmentAreasSectionProps {
  developmentAreas: DevelopmentArea[];
  onUpdate: React.Dispatch<React.SetStateAction<DevelopmentArea[]>>;
  disabled: boolean;
}

const DevelopmentAreasSection: React.FC<DevelopmentAreasSectionProps> = ({
  developmentAreas,
  onUpdate,
  disabled,
}) => {
  return (
    <TagInput<DevelopmentArea>
      title={profileConfig.profileForm.developmentAreas.label}
      items={developmentAreas}
      setItems={onUpdate}
      itemToString={(area) => area.name}
      placeholder={profileConfig.profileForm.developmentAreas.placeholder}
      addButtonText={profileConfig.profileForm.developmentAreas.addButtonText}
      createNewItem={(name: string) => ({ name }) as DevelopmentArea}
      disabled={disabled}
      noDataIcon={<BrainCircuit />}
      noDataTitle={profileConfig.profileForm.developmentAreas.noDataTitle}
    />
  );
};

export default DevelopmentAreasSection;
