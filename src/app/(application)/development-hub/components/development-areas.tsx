import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DevelopmentArea } from '@/types';
import { useCreateDevelopmentArea } from '@/hooks/useDevelopmentHub';

interface DevelopmentAreasProps {
  areas: DevelopmentArea[];
}

const DevelopmentAreas: React.FC<DevelopmentAreasProps> = ({ areas: initialAreas }) => {
  const [areas, setAreas] = useState<DevelopmentArea[]>(initialAreas);
  const [newArea, setNewArea] = useState('');
  const createArea = useCreateDevelopmentArea();

  const handleAddArea = () => {
    if (newArea.trim()) {
      createArea.mutate(
        { name: newArea.trim(), user_id: 'current-user-id' },
        {
          onSuccess: (newArea) => {
            setAreas([...areas, newArea]);
            setNewArea('');
          },
        }
      );
    }
  };

  const handleRemoveArea = (id: string) => {
    // In a real application, you would make an API call here to remove the area
    const newAreas = areas.filter((area) => area.id.toString() !== id);
    setAreas(newAreas);
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
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
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
