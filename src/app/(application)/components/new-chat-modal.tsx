import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useConnections } from '@/hooks/useConnections';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (userId: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onCreateChat }) => {
  const { mentors, mentees, isLoading, error } = useConnections();

  const connections = [...mentors, ...mentees];

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start a New Chat</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search connections..." />
          <CommandEmpty>No connections found.</CommandEmpty>
          <CommandGroup>
            {connections.map((connection) => (
              <CommandItem
                key={connection.user.id}
                onSelect={() => onCreateChat(connection.user.id)}
              >
                <Avatar className="mr-2 size-8">
                  <AvatarImage
                    src={connection.user.profilePictureURL || ''}
                    alt={connection.user.name}
                  />
                  <AvatarFallback>{connection.user.name[0]}</AvatarFallback>
                </Avatar>
                {connection.user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
