import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDevelopmentHub } from '@/hooks/useDevelopmentHub';
import { useConnections } from '@/hooks/useConnections';
import { Skill } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react'; // Assuming you're using lucide-react for icons

export const SuggestedSkills: React.FC = () => {
  const { data: developmentHubData } = useDevelopmentHub();
  const { mentors } = useConnections();

  const recommendedSkills = React.useMemo(() => {
    const userSkills: string[] =
      developmentHubData?.developmentAreas?.flatMap((area) => area.name) || [];
    const mentorSkills = mentors.flatMap((mentor) =>
      mentor.skills.map((skill) => skill.name?.toLowerCase())
    );
    const userSkillsLower = userSkills.map((skill) => skill.toLowerCase());
    const gapSkills = mentorSkills.filter((skill) => !userSkillsLower.includes(skill as string));
    const uniqueGapSkills = Array.from(new Set(gapSkills)).sort();
    return uniqueGapSkills.map((name) => ({ name }) as Skill);
  }, [developmentHubData, mentors]);

  if (recommendedSkills.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader className="flex items-center">
        <CardTitle className="flex items-center">
          Recommended Skills to Develop
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-2 cursor-pointer">
                  <Info size={16} className="text-gray-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  These recommended skills are identified by analyzing the skills of your mentors
                  and highlighting the areas where you can enhance your expertise to align with
                  industry standards and your personal development goals.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {recommendedSkills.map((skill) => (
            <Badge key={skill.name} variant="secondary">
              {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
