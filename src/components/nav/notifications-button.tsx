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
import { Notification } from '@/types/db';
import { useNotifications } from '@/hooks/useNotifications';

export default function NotificationsButton() {
  const [mounted, setMounted] = useState(false);
  const { notifications, markRead } = useNotifications();
  const [unreadNotification, setUnreadNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (notifications) {
      const newUnreadNotifications = notifications.filter(
        (notification) => notification.type !== 'NEW_MESSAGE'
      );
      if (newUnreadNotifications.length > unreadNotification.length) {
        playNotificationSound();
      }
      setUnreadNotifications(newUnreadNotifications);
    }
  }, [notifications, unreadNotification.length]);

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
          {unreadNotification.length > 0 && (
            <span className="absolute right-2 top-2 block size-2 rounded-full bg-blue-500"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-92" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <p className="text-md font-medium leading-none">Notifications</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {unreadNotification.length > 0 ? (
          <div>
            {unreadNotification.map((notification) => (
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
