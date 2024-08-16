import { MentorSearchConfig } from '@/types';

export const mentorSearchConfig: MentorSearchConfig = {
  heroSection: {
    title: 'Find Your Perfect Mentor',
    subtitle:
      'Connect with industry professionals who can guide you on your career journey and help you achieve your goals.',
  },
  searchSection: {
    inputPlaceholder: 'Search mentors by name, skills, or industry...',
    buttonText: 'Search',
  },
  resultsSection: {
    noDataTitle: 'No mentors found',
    noDataDescription: 'Try adjusting your search criteria or explore other mentors.',
    requestButtonText: {
      default: 'Request Mentorship',
      sent: 'Request Sent',
      connected: 'Already Connected',
    },
    dialogTitle: 'Request Mentorship from {mentorName}',
    dialogPlaceholder: 'Enter your mentorship request message here...',
    dialogButtonText: {
      default: 'Send Request',
      sending: 'Sending Request...',
    },
  },
  requestButtonText: {
    default: 'Request Mentorship',
    sent: 'Request Sent',
  },
  dialogTitle: 'Request Mentorship from {mentorName}',
  dialogPlaceholder: 'Enter your mentorship request message here...',
  dialogButtonText: {
    default: 'Send Request',
    sending: 'Sending Request...',
  },
};
