import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CreateDevelopmentAreaData, DevelopmentArea } from '@/types';

interface DevelopmentAreasProps {
  areas: DevelopmentArea[];
  setAreas: React.Dispatch<React.SetStateAction<DevelopmentArea[]>>;
}

const DevelopmentAreas: React.FC<DevelopmentAreasProps> = ({ areas, setAreas }) => {
  const [newAreaName, setNewAreaName] = useState('');

  const handleAddArea = () => {
    if (newAreaName.trim()) {
      const newArea: CreateDevelopmentAreaData = {
        name: newAreaName,
      };
      setAreas((prevAreas) => [...prevAreas, newArea as DevelopmentArea]);
    }
  };

  const handleRemoveArea = (id: string) => {
    setAreas((prevAreas) => prevAreas.filter((area) => area.id.toString() !== id));
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.developmentAreas.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {areas.map((area) => (
            <TooltipProvider key={area.id.toString()}>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="secondary"
                    onClick={() => handleRemoveArea(area.id.toString())}
                    className="cursor-pointer transition-colors hover:bg-destructive hover:text-destructive-foreground"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleRemoveArea(area.id.toString());
                      }
                    }}
                  >
                    {area.name}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to remove</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            placeholder={developmentHubConfig.developmentAreas.placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddArea();
              }
            }}
          />
          <Button onClick={handleAddArea}>
            <PlusCircle className="mr-2 size-4" /> {developmentHubConfig.developmentAreas.addButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentAreas;
