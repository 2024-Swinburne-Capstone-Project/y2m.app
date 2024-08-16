import React from 'react';
import { Button } from '@/components/ui/button';
import { MailOpenIcon } from 'lucide-react';

interface ChatFABButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatFABButton: React.FC<ChatFABButtonProps> = ({ onClick, isOpen }) => {
  return (
    <Button
      className={`rounded-full p-4 shadow-lg transition-all ${
        isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={onClick}
    >
      {isOpen ? 'Close' : <MailOpenIcon className="size-6 text-white" />}
    </Button>
  );
};

export default ChatFABButton;
