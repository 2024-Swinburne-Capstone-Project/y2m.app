// File: src/app/(application)/development-hub/components/my-badges.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { developmentHubConfig } from '@/config/application/development-hub';
import parseTextWithMarkup from '@/config/common/parser/parseTextWithMarkup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeType } from '@/types';

interface MyBadgesProps {
  badges: BadgeType[];
}

const MyBadges: React.FC<MyBadgesProps> = ({ badges }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{developmentHubConfig.myBadges.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
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
                  <p>
                    {parseTextWithMarkup(developmentHubConfig.myBadges.senderLabel)}{' '}
                    {badge.senderName}
                  </p>
                  <p>
                    {parseTextWithMarkup(developmentHubConfig.myBadges.dateLabel)}{' '}
                    {new Date(badge.receivedDate.toString()).toLocaleDateString()}
                  </p>
                  <p>
                    {parseTextWithMarkup(developmentHubConfig.myBadges.messageLabel)}{' '}
                    {badge.message}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBadges;
