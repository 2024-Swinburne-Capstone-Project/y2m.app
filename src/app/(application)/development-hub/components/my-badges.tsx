// noinspection TypeScriptUnresolvedReference

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeType } from '@/types';
import { developmentHubConfig } from '@/config/application/development-hub';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Award } from 'lucide-react';

interface MyBadgesProps {
  badges: BadgeType[];
  setBadges: React.Dispatch<React.SetStateAction<BadgeType[]>>;
}

const MyBadges: React.FC<MyBadgesProps> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  const openBadgeModal = (badge: BadgeType) => {
    setSelectedBadge(badge);
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{developmentHubConfig.myBadges.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow items-center">
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <TooltipProvider key={Number(badge.id)}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer p-3 text-2xl transition-colors hover:bg-secondary/80"
                    onClick={() => openBadgeModal(badge)}
                  >
                    {badge.icon}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{badge.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>

      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">{selectedBadge?.icon}</span>
              {selectedBadge?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-primary" />
              <span className="font-semibold">Sender:</span> {selectedBadge?.senderName}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              <span className="font-semibold">Received on:</span>{' '}
              {selectedBadge?.receivedDate
                ? new Date(selectedBadge.receivedDate.toString()).toLocaleDateString()
                : 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Message:</span>
              <p className="mt-1 text-sm text-muted-foreground">{selectedBadge?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MyBadges;
