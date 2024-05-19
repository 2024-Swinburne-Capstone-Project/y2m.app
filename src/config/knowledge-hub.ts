import { KnowledgeHubConfig } from '@/types';

export const knowledgeHubConfig: KnowledgeHubConfig = {
  heroSection: {
    title: {
      text: 'Knowledge Hub',
    },
    imagePath: '/genius.svg',
  },
  videos: [
    {
      id: 1,
      title: {
        text: 'Welcome to You2Mentor',
      },
      description: {
        text: 'This video provides a brief overview of You2Mentor, and how the platform can facilitate your development through peer-to-peer mentoring.',
      },
      embeddingLink: 'https://www.youtube.com/embed/Iv41XbkORAA?si=0TWReHSOKVsf5H8Q&rel=0',
      length: '2:01',
    },
    {
      id: 2,
      title: {
        text: 'Benefits of Mentorship',
      },
      description: {
        text: "Let's look at some of the benefits of mentorship for both mentees and mentors.",
      },
      embeddingLink: 'https://www.youtube.com/embed/Gm1RqeJ-4Yg?si=Emv17RVHTsVnQAtm&rel=0',
      length: '1:49',
    },
    {
      id: 3,
      title: {
        text: 'Goal Setting',
      },
      description: {
        text: 'Setting goals is vital for your development. This is part of a mini series that looks at how you can go about setting goals for your personal and professional growth.',
      },
      embeddingLink: 'https://www.youtube.com/embed/q6w2VDnU8Yo?si=O3yE6BnpDKS-Qr43&rel=0',
      length: '4:06',
    },
  ],
};
