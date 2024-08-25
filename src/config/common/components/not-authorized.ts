import { NotAuthorizedConfig } from '@/types';

export const notAuthorizedConfig: NotAuthorizedConfig = {
  title: 'Oops! Unauthorized Access',
  description: 'You do not have permission to view this page.',
  imageSource: '/not-authorized.svg',
  imageAlt: '401 Not Authorized',
  buttonText: 'Go Back Home',
  buttonHref: '/',
};
