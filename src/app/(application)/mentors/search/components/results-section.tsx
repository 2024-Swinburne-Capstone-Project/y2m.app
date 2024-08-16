import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '@/types/mentor-search/user-data';
import { MentorshipRequest } from '@/types/mentorship-request/mentorship-request';
import ProfileCard from '@/components/common/profile-card';
import { UserSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import NoDataDisplay from '@/components/common/no-data-display';
import { mentorSearchConfig } from '@/config/application/mentor-search';

interface ResultsSectionProps {
  mentors: UserData[];
  requests: MentorshipRequest[];
  onRequestMentorship: (mentorId: string, message: string) => void;
  isCreating: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  mentors,
  requests,
  onRequestMentorship,
  isCreating,
}) => {
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { resultsSection } = mentorSearchConfig;

  if (mentors.length === 0) {
    return (
      <NoDataDisplay
        title={resultsSection.noDataTitle}
        description={resultsSection.noDataDescription}
        icon={<UserSearch size={48} />}
      />
    );
  }

  const handleRequestMentorship = () => {
    if (selectedMentorId) {
      onRequestMentorship(selectedMentorId, message);
      setSelectedMentorId(null);
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {mentors.map((mentor, index) => {
        const hasExistingRequest = requests.some((r) => r.mentorId === mentor.user.id);

        return (
          <motion.div
            key={mentor.user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProfileCard
              userData={mentor}
              actionButton={
                <Dialog
                  open={selectedMentorId === mentor.user.id}
                  onOpenChange={(open) => !open && setSelectedMentorId(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="mt-4 w-full"
                      onClick={() => setSelectedMentorId(mentor.user.id)}
                      disabled={hasExistingRequest || mentor.hasExistingConnection}
                    >
                      {hasExistingRequest
                        ? resultsSection.requestButtonText.sent
                        : mentor.hasExistingConnection
                          ? resultsSection.requestButtonText.connected
                          : resultsSection.requestButtonText.default}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {resultsSection.dialogTitle.replace('{mentorName}', mentor.user.name)}
                      </DialogTitle>
                    </DialogHeader>
                    <Textarea
                      placeholder={resultsSection.dialogPlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={handleRequestMentorship} disabled={isCreating}>
                      {isCreating
                        ? resultsSection.dialogButtonText.sending
                        : resultsSection.dialogButtonText.default}
                    </Button>
                  </DialogContent>
                </Dialog>
              }
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ResultsSection;
