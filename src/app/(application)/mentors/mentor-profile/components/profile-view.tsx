import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types/profile/user';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { profileConfig } from '@/config/application/profile-config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import FeedbackStars from './feeback-stars';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { mentorSearchConfig } from '@/config/application/mentor-search';
import { DialogClose } from '@radix-ui/react-dialog';

interface ProfileViewProps {
  loggedInUser: User;
  profile: User;
  hasExistingConnection: boolean;
  hasExistingRequest: boolean;
  onRequestMentorship: (mentorId: string, message: string) => void;
  submitFeedback: (feeback: string, rating: number) => void;
  isCreating: boolean;
  hasGivenFeedback: boolean;
  onFeedbackButtonClick: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  loggedInUser,
  profile,
  hasExistingConnection,
  hasExistingRequest,
  onRequestMentorship,
  submitFeedback,
  isCreating,
  hasGivenFeedback,
  onFeedbackButtonClick,
}) => {
  const { resultsSection } = mentorSearchConfig;
  const [message, setMessage] = React.useState('');
  const [viewingSelf, setViewingSelf] = React.useState(false);

  const handleRequestMentorship = () => {
    onRequestMentorship(profile.id, message);
    setMessage('');
  };

  useEffect(() => {
    if (loggedInUser?.id === profile.id) {
      setViewingSelf(true);
    }
  }, [loggedInUser, profile.id]);

  return (
    <Card className="mb-5 overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500">
        {profile.profileBackgroundURL && (
          <Image
            src={profile.profileBackgroundURL}
            alt="Profile Background"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <CardContent className="relative px-6 pb-6 pt-0">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
          <div className="relative -mt-10 flex">
            <Avatar className="size-32 border-4 border-white bg-white">
              <AvatarImage src={profile.profilePictureURL || ''} alt={profile.name || ''} />
              <AvatarFallback className="text-4xl">{profile.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p className="pt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
              {profile.name}
            </p>
            <p className="pb-3 text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
            <div className="flex items-center space-x-2">
              <FeedbackStars
                hasExistingConnection={hasExistingConnection}
                profile={profile}
                submitFeedback={submitFeedback}
                hasGivenFeedback={hasGivenFeedback}
                onFeedbackButtonClick={onFeedbackButtonClick}
              />
              {!viewingSelf && !hasExistingConnection && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={hasExistingRequest || hasExistingConnection}>
                      {hasExistingRequest
                        ? resultsSection.requestButtonText.sent
                        : hasExistingConnection
                          ? resultsSection.requestButtonText.connected
                          : resultsSection.requestButtonText.default}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {resultsSection.dialogTitle.replace('{mentorName}', profile.name)}
                      </DialogTitle>
                    </DialogHeader>
                    <Textarea
                      placeholder={resultsSection.dialogPlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <DialogClose asChild>
                      <Button onClick={handleRequestMentorship} disabled={isCreating}>
                        {isCreating
                          ? resultsSection.dialogButtonText.sending
                          : resultsSection.dialogButtonText.default}
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={profile.name || ''}
              disabled
              className="mt-1 disabled:cursor-auto disabled:opacity-100"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              {profileConfig.profileForm.email.label}
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="email"
                    value={profile.email || ''}
                    disabled
                    className="mt-1 disabled:cursor-auto disabled:opacity-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{profileConfig.profileForm.email.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="aboutMe" className="text-sm font-medium">
              About Me
            </Label>
            <Input
              id="aboutMe"
              value={profile.aboutMe || ''}
              disabled
              className="mt-1 disabled:cursor-auto disabled:opacity-100"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="linkedInProfileLink" className="text-sm font-medium">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedInProfileLink"
              value={profile.linkedInProfileLink || ''}
              disabled
              className="mt-1 disabled:cursor-auto disabled:opacity-100"
            />
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="availability" className="text-sm font-medium">
              {profileConfig.profileForm.availability.label}
            </Label>
            <Textarea
              id="availability"
              value={profile.availability || ''}
              disabled
              className="mt-1 disabled:cursor-auto disabled:opacity-100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileView;
