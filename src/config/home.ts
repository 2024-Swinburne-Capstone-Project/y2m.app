// config/home.ts
import { HomeConfig } from '@/types';

export const homeConfig: HomeConfig = {
  mainTitle: {
    words: [
      { text: 'Unleash' },
      { text: 'Discover' },
      { text: 'Achieve' },
      { text: 'Conquer' },
      { text: 'Unlock' },
      { text: 'Realize' },
      { text: 'Fulfill' },
      { text: 'Maximize' },
    ],
    staticText: { text: 'Your Potential!' },
  },
  subtitle: {
    text: 'A Platform for Peer to Peer Mentoring and Personal Development',
  },
  heroImage: {
    src: '/paper-plane.svg',
    alt: '',
    width: 300,
    height: 300,
  },
};
