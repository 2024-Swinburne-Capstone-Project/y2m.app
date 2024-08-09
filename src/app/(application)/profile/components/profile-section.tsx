import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User } from '@/types/profile/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useUser } from '@auth0/nextjs-auth0/client';

interface ProfileSectionProps {
  profile: User;
  isEditing: boolean;
  onChange: (updatedProfile: ProfileSectionProps['profile']) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  isEditing,
  onChange,
  setIsEditing,
}) => {
  const { user } = useUser();
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      onChange({ ...profile, profilePictureURL: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className={'mb-5'}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="picture">Profile Picture</Label>
          <div className="flex w-full items-center gap-1.5">
            <Input
              disabled={!isEditing}
              className="h-20 w-auto"
              id="picture"
              type="file"
              onChange={handleImageChange}
            />
            <Avatar className="h-20">
              <AvatarImage
                src={profile.profilePictureURL ?? user?.picture ?? ''}
                alt={profile.name ?? ''}
                className="h-20 rounded-full"
              />
            </Avatar>
          </div>
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={profile?.name || ''}
            onChange={(e) => onChange({ ...profile, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={profile?.email || ''}
            onChange={(e) => onChange({ ...profile, email: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="aboutMe">About Me</Label>
          <Textarea
            id="aboutMe"
            value={profile?.aboutMe || ''}
            onChange={(e) => onChange({ ...profile, aboutMe: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="linkedInProfileLink">LinkedIn Profile</Label>
          <Input
            id="linkedInProfileLink"
            value={profile?.linkedInProfileLink || ''}
            onChange={(e) => onChange({ ...profile, linkedInProfileLink: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
