import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeType } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MyBadgesProps {
  badges: BadgeType[];
  setBadges: React.Dispatch<React.SetStateAction<BadgeType[]>>;
}

const MyBadges: React.FC<MyBadgesProps> = ({ badges, setBadges }) => {
  const handleRemoveBadge = (badgeId: string) => {
    const updatedBadges = badges.filter((badge) => badge.id.toString() !== badgeId);
    setBadges(updatedBadges);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.myBadges.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center">
          {badges.map((badge) => (
            <Dialog key={badge.id.toString()}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="m-2 p-8 hover:bg-gray-800">
                  <span className="text-4xl">{badge.icon}</span>
                  <span>{badge.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{badge.name} Badge</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p>Sender: {badge.senderName}</p>
                  <p>Date: {new Date(badge.receivedDate.toString()).toLocaleDateString()}</p>
                  <p>Message: {badge.message}</p>
                </div>
                <Button
                  onClick={() => handleRemoveBadge(badge.id.toString())}
                  variant="destructive"
                >
                  Remove Badge
                </Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBadges;
