'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MentorshipNotification } from '@/types/db';
import { useMentorshipNotifications } from '@/hooks/useMentorshipNotifications';

export default function NotificationsButton() {
  const [mounted, setMounted] = useState(false);
  const { notifications, markRead } = useMentorshipNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState<MentorshipNotification[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const newUnreadNotifications = notifications;
      if (newUnreadNotifications.length > unreadNotifications.length) {
        playNotificationSound();
      }
      setUnreadNotifications(newUnreadNotifications);
    }
  }, [notifications, unreadNotifications.length]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification-chime.wav');
    audio.play();
  };

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size="icon" className="relative">
          <Bell size={20} />
          {unreadNotifications.length > 0 && (
            <span className="absolute right-2 top-2 block size-2 rounded-full bg-blue-500"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-92" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <p className="text-md font-medium leading-none">Notifications</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {unreadNotifications.length > 0 ? (
          <div>
            {unreadNotifications.map((notification) => (
              <Link href={notification.redirectLink} key={notification.id.toString()}>
                <DropdownMenuItem
                  className="flex items-center space-x-2"
                  onClick={() => markRead(notification.id.toString())}
                >
                  <span>{notification.message}</span>
                </DropdownMenuItem>
              </Link>
            ))}
          </div>
        ) : (
          <DropdownMenuItem className="text-muted-foreground">
            No new notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
