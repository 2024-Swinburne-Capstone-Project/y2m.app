import { ConnectionsOverviewConfig } from '@/types';

export const connectionsOverviewConfig: ConnectionsOverviewConfig = {
  pageTitle: 'My Connections',
  tabs: {
    mentors: 'My Mentors',
    mentees: 'My Mentees',
  },
  noDataDisplay: {
    mentors: {
      title: 'No mentors yet',
      description: "You haven't connected with any mentors yet. Start by searching for mentors!",
    },
    mentees: {
      title: 'No mentees yet',
      description: "You haven't connected with any mentees yet. They'll appear here once you do!",
    },
  },
  actionButton: {
    mentors: 'Find Mentors',
    mentees: 'Mentor Settings',
  },
  connectionCard: {
    viewProfileButton: 'View Profile',
    messageButton: 'Message',
  },
};
