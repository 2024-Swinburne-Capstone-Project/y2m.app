import React from 'react';
import { UserData } from '@/types/mentor-search/user-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { connectionsOverviewConfig } from '@/config/application/connections-overview';
import Link from 'next/link';

interface ConnectionCardProps {
  userData: UserData;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ userData }) => {
  const { user, skills, developmentAreas } = userData;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="size-16">
          <AvatarImage src={user.profilePictureURL || ''} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.aboutMe}</p>
        </div>
      </CardHeader>
      <CardContent className="flex grow flex-col justify-between">
        <div className="mb-4 flex">
          <div className="mr-1 text-sm font-medium">Skills:</div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 5).map((skill) => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">No Skills Added Yet</p>
          )}
        </div>
        {user.isMentee && (
          <div className="mb-4 flex">
            <div className="mr-1 text-sm font-medium">Development Areas:</div>
            {developmentAreas && developmentAreas.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {developmentAreas.slice(0, 5).map((devArea) => (
                  <Badge key={devArea.id.toString()} variant="secondary">
                    {devArea.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-muted-foreground">
                No Development Areas Added Yet
              </p>
            )}
          </div>
        )}
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/profile-view?id=${user.id}`}>
              {connectionsOverviewConfig.connectionCard.viewProfileButton}
            </Link>
          </Button>
          <Button className={''} asChild>
            <Link href={`/messages/${user.id}`}>
              {connectionsOverviewConfig.connectionCard.messageButton}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
