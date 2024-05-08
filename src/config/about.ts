import { AboutConfig } from '@/types';

export const aboutConfig: AboutConfig = {
  heroContent: {
    title: {
      text: 'At You2Mentor, we believe that everyone should have the opportunity to access a mentor',
      markup: [
        {
          type: 'span',
          className: 'text-primary',
          text: 'everyone',
        },
      ],
    },
    content: {
      text: 'With the goal of making mentorship accessible to all, You2Mentor was launched in December 2022 to be a dedicated online resource for personal growth. It provides users with the necessary tools and guidance to help them reach their potential.',
    },
    imagePath: '/creative-work.svg',
  },
  additionalContent: {
    content: {
      text: 'According to Gallup, only 37% of individuals currently have access to at least one mentor. So we have created a platform for individual development where not only can you drive your growth, you can utilise a tribe of mentors based on development goals and mentor others utilising your strengths.',
    },
    link: {
      text: 'Signup',
    },
    linkHref: '/api/auth/login',
    suffix: {
      text: 'to take the next step in your development journey',
    },
  },
  carouselSlides: [
    {
      title: {
        text: 'Keep It Simple',
      },
      content: {
        text: 'Our Aim Is To Make It Simple To Drive Individual Development For Individuals And Organisations.',
      },
      imagePath: '/about/values/meditation-boy.svg',
    },
    {
      title: {
        text: 'Community For Individual Growth',
      },
      content: {
        text: 'Facilitate A Community That Supports And Celebrates Each Others Achievements.',
      },
      imagePath: '/about/values/communication.svg',
    },
    {
      title: {
        text: 'Empower Others',
      },
      content: {
        text: 'In Order To Achieve Greatness, We Need To Dream Big',
      },
      imagePath: '/work-party.svg',
    },
    {
      title: {
        text: 'Be A Force For Good',
      },
      content: {
        text: 'Having A Mentor Is Considered A Luxury In Low And Middle Income Countries (LMIC). We Aim To Bridge This Gap To Open Up Opportunities To Grow',
      },
      imagePath: '/about/values/woman-hugging-earth.svg',
    },
    {
      title: {
        text: 'Learning And Innovation',
      },
      content: {
        text: 'We Believe That Life Is A Continuous Journey Of Learning Which Leads To Innovation And Thinking Outside The Norm',
      },
      imagePath: '/studying.svg',
    },
  ],
};
