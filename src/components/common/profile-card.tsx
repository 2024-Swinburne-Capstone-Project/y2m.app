import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UserData } from '@/types/mentor-search/user-data';

interface ProfileCard {
  userData: UserData;
  actionButton: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCard> = ({ userData, actionButton }) => {
  const { user, educations, experiences, skills } = userData;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.profilePictureURL || ''} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <Link href={user.linkedInProfileLink || '#'} className="text-sm text-blue-500">
            LinkedIn Profile
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm">{user.aboutMe}</p>
        <div className="mb-2">
          <strong>Areas of Expertise:</strong>
          <div className="mt-1 flex flex-wrap gap-1">
            {user.mentorAreas &&
              user.mentorAreas.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
          </div>
        </div>
        <div className="mb-2">
          <strong>Availability:</strong> {user.availability}
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="skills">
            <AccordionTrigger>Skills</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="experience">
            <AccordionTrigger>Experience</AccordionTrigger>
            <AccordionContent>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">
                    {exp.position} at {exp.company}
                  </p>
                  <p className="text-sm">
                    {exp.startDate.toString()} - {exp.endDate?.toString() || 'Present'}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent>
              {educations.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <p className="text-sm">{edu.institution}</p>
                  <p className="text-sm">
                    {edu.startDate.toString()} - {edu.endDate?.toString() || 'Present'}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {actionButton}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
