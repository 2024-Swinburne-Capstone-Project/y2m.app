import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Skill } from '@/types/db';
import { motion } from 'framer-motion';

interface SkillEndorsementsProps {
  skills: Skill[];
}

const SkillEndorsements: React.FC<SkillEndorsementsProps> = ({ skills }) => {
  const endorsedSkills = skills.filter(
    (skill) => skill.endorsements && Number(skill.endorsements) > 0
  );
  const maxEndorsements = Math.max(...endorsedSkills.map((skill) => Number(skill.endorsements)));

  if (endorsedSkills.length === 0) {
    return null;
  }

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Endorsed Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {endorsedSkills.map((skill, index) => (
            <motion.div
              key={skill.id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-2 flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">
                  {Number(skill.endorsements)} endorsements
                </span>
              </div>
              <div className="relative pt-1">
                <div className="mb-2 flex h-2 overflow-hidden rounded bg-gray-200">
                  <motion.div
                    className="flex flex-col justify-center overflow-hidden bg-primary text-xs text-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${(Number(skill.endorsements) / maxEndorsements) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillEndorsements;
