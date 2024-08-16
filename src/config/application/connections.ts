import { ConnectionsConfig } from '@/types';

export const connectionsConfig: ConnectionsConfig = {
  pageTitle: 'Mentorship Connections',
  tabs: {
    incoming: 'Incoming Requests',
    outgoing: 'Outgoing Requests',
  },
  requestCard: {
    acceptButton: 'Accept',
    rejectButton: 'Reject',
    pendingStatus: 'Status: Pending',
  },
  noDataDisplay: {
    incoming: {
      title: 'No incoming requests',
      description: "You don't have any incoming mentorship requests at the moment.",
    },
    outgoing: {
      title: 'No outgoing requests',
      description: "You don't have any outgoing mentorship requests at the moment.",
    },
  },
  toastMessages: {
    acceptSuccess: 'Request accepted successfully',
    acceptError: 'Failed to accept request',
    rejectSuccess: 'Request rejected successfully',
    rejectError: 'Failed to reject request',
  },
};
