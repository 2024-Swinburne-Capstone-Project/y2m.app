import React, { useState } from 'react';
import RatingStar from './rating-star';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { User, Skill } from '@/types/db';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { mentorFeedbackConfig } from '@/config/application/mentor-feedback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FeedbackStarsProps {
  hasExistingConnection: boolean;
  profile: User;
  submitFeedback: (feedback: string, rating: number, endorsedSkill?: string) => void;
  hasGivenFeedback: boolean;
  onFeedbackButtonClick: () => void;
  skills: Skill[];
}

const FeedbackStars: React.FC<FeedbackStarsProps> = ({
  hasExistingConnection,
  profile,
  submitFeedback,
  hasGivenFeedback,
  onFeedbackButtonClick,
  skills,
}) => {
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [endorsedSkill, setEndorsedSkill] = useState<string>('');

  const handleFeedbackSubmit = () => {
    submitFeedback(feedback, rating, endorsedSkill);
  };

  return (
    <div className="flex items-center space-x-3">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RatingStar rating={Number(profile.overallRating)} />
      </div>
      {hasExistingConnection && !hasGivenFeedback && profile.isMentor && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'}>{mentorFeedbackConfig.giveFeedbackButtonText}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {mentorFeedbackConfig.dialogHeader}
                {profile.name}
              </DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder={mentorFeedbackConfig.dialogPlaceholder}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Label className="text-sm font-medium">{mentorFeedbackConfig.ratingLabel}</Label>
            <Input
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              type="number"
              min={1}
              max={5}
            />
            <Label className="text-sm font-medium">Endorse a Skill (Optional)</Label>
            <Select onValueChange={setEndorsedSkill} value={endorsedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill to endorse" />
              </SelectTrigger>
              <SelectContent>
                {skills.map((skill) => (
                  <SelectItem key={skill.id.toString()} value={skill.name}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={handleFeedbackSubmit}>
                  {mentorFeedbackConfig.dialogSubmitButtonText}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Button variant={'outline'} onClick={onFeedbackButtonClick}>
        View Feedback
      </Button>
    </div>
  );
};

export default FeedbackStars;
