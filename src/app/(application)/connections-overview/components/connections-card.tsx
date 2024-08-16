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
  const { user, skills } = userData;

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
        <div className="mb-4">
          <h4 className="mb-2 font-semibold">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 5).map((skill) => (
              <Badge key={skill.id} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/profile/${user.id}`}>
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
