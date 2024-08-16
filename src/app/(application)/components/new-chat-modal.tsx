import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useConnections } from '@/hooks/useConnections';
import { LoadingSkeleton } from '@/components/common/loading-skeleton';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (userId: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onCreateChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { mentors, mentees, isLoading, error } = useConnections();

  const filteredConnections = [...mentors, ...mentees].filter((connection) =>
    connection.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <LoadingSkeleton />;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a New Chat</DialogTitle>
          <DialogDescription>Select a connection to start a new chat.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="max-h-60 overflow-y-auto">
          {filteredConnections.map((connection) => (
            <Button
              key={connection.user.id}
              onClick={() => onCreateChat(connection.user.id)}
              variant="ghost"
              className="w-full justify-start"
            >
              <Avatar className="mr-2 size-8">
                <AvatarImage
                  src={connection.user.profilePictureURL || ''}
                  alt={connection.user.name}
                />
                <AvatarFallback>{connection.user.name[0]}</AvatarFallback>
              </Avatar>
              {connection.user.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
