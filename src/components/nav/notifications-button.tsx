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
import { AccountNotification } from '@/types/account-notification';
import { useMentorshipNotifications } from '@/hooks/useMentorshipNotifications';
import { useAccountNotifications } from '@/hooks/useAccountNotifications';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NotificationsButton() {
  const [mounted, setMounted] = useState(false);
  const { notifications, markRead } = useMentorshipNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState<MentorshipNotification[]>([]);
  const { notifications: accountNotifications } = useAccountNotifications();
  const [unreadAccountNotifications, setUnreadAccountNotifications] = useState<
    AccountNotification[]
  >([]);
  const [tempReadNotification, setTempReadNotification] = useState<AccountNotification>();
  const { user, error } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (notifications && notifications.length > 0 && notifications !== unreadNotifications) {
      const newUnreadNotifications = notifications;
      if (newUnreadNotifications.length > unreadNotifications.length) {
        playNotificationSound();
      }
      setUnreadNotifications(newUnreadNotifications);
    }
  }, [notifications, unreadNotifications]);

  useEffect(() => {
    if (
      accountNotifications &&
      accountNotifications.length > 0 &&
      accountNotifications !== unreadAccountNotifications
    ) {
      const newUnreadAccountNotifications = accountNotifications;
      if (newUnreadAccountNotifications.length > unreadAccountNotifications.length) {
        playNotificationSound();
      }
      setUnreadAccountNotifications(newUnreadAccountNotifications);
    }
  }, [accountNotifications, unreadAccountNotifications]);

  useEffect(() => {
    if (tempReadNotification) {
      const notificationToUpdate = unreadAccountNotifications.find(
        (notification) => notification.id === tempReadNotification.id
      );
      if (notificationToUpdate && !notificationToUpdate.tempRead) {
        notificationToUpdate.tempRead = true;
        setUnreadAccountNotifications([...unreadAccountNotifications]);
      }
    }
  }, [tempReadNotification, unreadAccountNotifications]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification-chime.wav');
    audio.play();
  };

  if (!mounted) return null;
  if (error) return <div>{error.message}</div>;
  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size="icon" className="relative">
          <Bell size={20} />
          {(unreadNotifications.length > 0 ||
            unreadAccountNotifications.some((n) => !n.tempRead)) && (
            <span className="absolute right-2 top-2 block size-2 rounded-full bg-blue-500"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-92" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <p className="text-md font-medium leading-none">Notifications</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {unreadNotifications.length > 0 && (
          <div>
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
            <DropdownMenuSeparator />
          </div>
        )}
        {unreadAccountNotifications.length > 0 && (
          <div>
            {unreadAccountNotifications
              .filter((n) => !n.tempRead)
              .map((notification) => (
                <Link href={notification.redirectLink} key={notification.id.toString()}>
                  <DropdownMenuItem
                    className="flex items-center space-x-2"
                    onClick={() => setTempReadNotification(notification)}
                  >
                    <span>{notification.message}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
          </div>
        )}
        {unreadNotifications.length === 0 &&
          (unreadAccountNotifications.length === 0 ||
            unreadAccountNotifications.every((n) => n.tempRead)) && (
            <DropdownMenuItem className="text-muted-foreground">
              No new notifications
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
