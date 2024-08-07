import { DevelopmentHubConfig } from '@/types';

export const developmentHubConfig: DevelopmentHubConfig = {
  heroSection: {
    title: {
      text: 'Development Hub',
    },
    imagePath: '/enterprise-solutions/idea-launch.svg',
  },

  milestoneProgress: {
    title: 'My progress: Milestones',
    COMPLETED: 'Completed',
    IN_PROGRESS: 'In progress',
    NOT_STARTED: 'Not started',
  },
  graphicalTimeline: {
    title: 'Milestones and actions timeline',
  },
  myBadges: {
    title: 'My Badges',
    senderLabel: {
      text: 'Sender:',
      markup: [{ type: 'strong', text: 'Sender:' }],
    },
    dateLabel: { text: 'Date:', markup: [{ type: 'strong', text: 'Date:' }] },
    messageLabel: {
      text: 'Message:',
      markup: [{ type: 'strong', text: 'Message:' }],
    },
  },
  developmentAreas: {
    title: 'My development areas',
    placeholder: 'Enter a new development area',
    addButton: 'Add',
  },
  keyMilestones: {
    title: 'Key milestones and actions',
    statusLabel: 'Status',
    exportButton: 'Export',
    addButton: 'Add new milestone',
    deleteButton: 'Delete',
  },
};
