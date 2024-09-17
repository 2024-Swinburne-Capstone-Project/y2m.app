import { DevelopmentArea, Skill } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SkillsAndDevAreasSummaryProps {
  skills: Skill[];
  developmentAreas?: DevelopmentArea[];
}

const SkillsAndDevAreasSummary: React.FC<SkillsAndDevAreasSummaryProps> = ({
  skills,
  developmentAreas,
}) => {
  return (
    <div className="flex items-center">
      {skills && skills.length > 0 && (
        <div className="flex grow space-x-1 overflow-y-auto">
          <div className="text-sm font-medium">Skills:</div>
          <div className="flex flex-wrap gap-2 last:pr-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {developmentAreas && developmentAreas.length > 0 && (
        <div className="flex grow space-x-1 overflow-y-auto">
          <div className="text-sm font-medium">Development Areas:</div>
          <div className="flex flex-wrap gap-2">
            {developmentAreas.map((area, index) => (
              <Badge key={index} variant="secondary">
                {area.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAndDevAreasSummary;
