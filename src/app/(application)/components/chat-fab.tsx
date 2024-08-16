import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatFABProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatFAB: React.FC<ChatFABProps> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      className="hover:bg-primary-dark flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </motion.button>
  );
};

export default ChatFAB;
