import React, { useState } from 'react';
import { UserData } from '@/types/mentor-search/user-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, GraduationCap } from 'lucide-react';
import { mentorSearchConfig as mentorCardConfig } from '@/config/application/mentor-search';

interface MentorCardProps {
  mentor: UserData;
  onRequestMentorship: (mentorId: string, message: string) => void;
  isCreating: boolean;
  hasExistingRequest: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  onRequestMentorship,
  isCreating,
  hasExistingRequest,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleRequestMentorship = () => {
    onRequestMentorship(mentor.user.id, message);
    setIsOpen(false);
    setMessage('');
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="size-12">
          <AvatarImage src={mentor.user.profilePictureURL || ''} alt={mentor.user.name} />
          <AvatarFallback>{mentor.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{mentor.user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{mentor.user.mentorAreas?.join(', ')}</p>
        </div>
      </CardHeader>
      <CardContent className="flex grow flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Briefcase className="size-4" />
            <p className="text-sm">
              {mentor.experiences[0]?.position} at {mentor.experiences[0]?.company}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="size-4" />
            <p className="text-sm">
              {mentor.educations[0]?.degree} from {mentor.educations[0]?.institution}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {mentor.skills.slice(0, 5).map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full" disabled={hasExistingRequest}>
              {hasExistingRequest
                ? mentorCardConfig.requestButtonText.sent
                : mentorCardConfig.requestButtonText.default}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mentorCardConfig.dialogTitle.replace('{mentorName}', mentor.user.name)}
              </DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder={mentorCardConfig.dialogPlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleRequestMentorship} disabled={isCreating}>
              {isCreating
                ? mentorCardConfig.dialogButtonText.sending
                : mentorCardConfig.dialogButtonText.default}
            </Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
