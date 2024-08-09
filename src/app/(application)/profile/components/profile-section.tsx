import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types/profile/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

interface ProfileSectionProps {
  profile: User;
  isEditing: boolean;
  onProfileChange: (field: string, value: string) => void;
  onEditToggle: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  isEditing,
  onProfileChange,
  onEditToggle,
  handleImageChange,
}) => {
  return (
    <Card className="mb-5 overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 text-white hover:bg-white/20"
          onClick={onEditToggle}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>
      <CardContent className="relative px-6 pb-6 pt-0">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
          <div className="relative -mt-16 flex">
            <Avatar className="size-32 border-4 border-white bg-white">
              <AvatarImage src={profile.profilePictureURL || ''} alt={profile.name || ''} />
              <AvatarFallback className="text-4xl">{profile.name?.[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg">
                <Label htmlFor="picture" className="cursor-pointer">
                  <Camera size={20} />
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
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
              onChange={(e) => onProfileChange('name', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              value={profile.email || ''}
              onChange={(e) => onProfileChange('email', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="aboutMe" className="text-sm font-medium">
              About Me
            </Label>
            <Input
              id="aboutMe"
              value={profile.aboutMe || ''}
              onChange={(e) => onProfileChange('aboutMe', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="linkedInProfileLink" className="text-sm font-medium">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedInProfileLink"
              value={profile.linkedInProfileLink || ''}
              onChange={(e) => onProfileChange('linkedInProfileLink', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
