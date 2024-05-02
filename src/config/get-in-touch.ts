import { GetInTouchConfig } from '@/types';

export const getInTouchConfig: GetInTouchConfig = {
  heroSection: {
    title: {
      text: 'Get in Touch',
    },
    imagePath: '/customer-support.svg',
  },
  popularQuestions: [
    {
      title: {
        text: '1. How to signup as a mentor?',
      },
      answer: {
        text: 'Go to My Account page and register using your LinkedIn Account',
      },
    },
    {
      title: {
        text: '2. Can mentors be mentees?',
      },
      answer: {
        text: 'When you register as a mentor, you can navigate both as a mentor and a mentee',
      },
    },
    {
      title: {
        text: '3. Why mentees can rate mentors?',
      },
      answer: {
        text: "We want to enhance your experience as a mentee with the best mentors. As a mentee, it's important that you rate a mentor based on your overall experience and not necessarily on whether you like the answer provided, as it's sometimes a mentor's role to give you a different perspective to think about",
      },
    },
    {
      title: {
        text: '4.When will video conferencing be available?',
      },
      answer: {
        text: 'We aim to add further features in the coming months, including calendar and video conferencing functionality to book one-on-one sessions with mentors',
      },
    },
    {
      title: {
        text: "5. Why can't I update my email address?",
      },
      answer: {
        text: 'If you have signed up through LinkedIn, your email address will be changed automatically when the primary email on LinkedIn is updated',
      },
    },
  ],
  visitUs: {
    address: {
      text: 'Collins Street Tower, Level 3, 480 Collins Street, Melbourne VIC 3000',
    },
  },
  mailUs: {
    email: {
      text: 'info@you2mentor.com',
    },
  },
  accordionImage: {
    imagePath: '/get-in-touch/question-mark.svg',
  },
};
