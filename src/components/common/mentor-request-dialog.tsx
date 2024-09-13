import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface MentorRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mentorName: string;
  message: string;
  onMessageChange: (message: string) => void;
  onRequestMentorship: () => void;
  isCreating: boolean;
  hasExistingRequest: boolean;
  hasExistingConnection: boolean;
  dialogTitle: string;
  dialogPlaceholder: string;
  dialogButtonTextDefault: string;
  dialogButtonTextSending: string;
  requestButtonTextDefault: string;
  requestButtonTextSent: string;
  requestButtonTextConnected: string;
}

const MentorRequestDialog: React.FC<MentorRequestDialogProps> = ({
  isOpen,
  onOpenChange,
  mentorName,
  message,
  onMessageChange,
  onRequestMentorship,
  isCreating,
  hasExistingRequest,
  hasExistingConnection,
  dialogTitle,
  dialogPlaceholder,
  dialogButtonTextDefault,
  dialogButtonTextSending,
  requestButtonTextDefault,
  requestButtonTextSent,
  requestButtonTextConnected,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full" disabled={hasExistingRequest || hasExistingConnection}>
          {hasExistingRequest
            ? requestButtonTextSent
            : hasExistingConnection
              ? requestButtonTextConnected
              : requestButtonTextDefault}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle.replace('{mentorName}', mentorName)}</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder={dialogPlaceholder}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <Button onClick={onRequestMentorship} disabled={isCreating}>
          {isCreating ? dialogButtonTextSending : dialogButtonTextDefault}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MentorRequestDialog;
