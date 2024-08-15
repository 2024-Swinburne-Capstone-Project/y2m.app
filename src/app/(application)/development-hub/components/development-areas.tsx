import React from 'react';
import { DevelopmentArea } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import TagInput from '@/components/common/tag-input';

interface DevelopmentAreasProps {
  areas: DevelopmentArea[];
  setAreas: React.Dispatch<React.SetStateAction<DevelopmentArea[]>>;
}

const DevelopmentAreas: React.FC<DevelopmentAreasProps> = ({ areas, setAreas }) => {
  return (
    <TagInput<DevelopmentArea>
      title={developmentHubConfig.developmentAreas.title}
      items={areas}
      setItems={setAreas}
      itemToString={(area: DevelopmentArea) => area.name}
      placeholder={developmentHubConfig.developmentAreas.placeholder}
      addButtonText={developmentHubConfig.developmentAreas.addButton}
      createNewItem={(name) => ({ name }) as DevelopmentArea}
    />
  );
};

export default DevelopmentAreas;
