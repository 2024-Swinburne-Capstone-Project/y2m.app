import { EnterpriseSolutionsConfig } from '@/types';

export const enterpriseSolutionsConfig: EnterpriseSolutionsConfig = {
  heroContent: {
    title: { text: 'Enterprise Solutions' },
    content: {
      text: 'Create insights driven mentoring programs that facilitates growth and collaboration',
    },
    imagePath: '/enterprise-solutions/idea-launch.svg',
  },
  additionalContent: {
    text: 'With You2Mentor, running your mentoring program is simple. Whether you are a small business or a multinational corporation, we have a cost effective solution for you. Talk to us to maximise benefits of your mentorship program and find out about the tools to support your employees development forward with our secure, user-friendly and engaging mentoring platform.',
  },
  additionalImagePath: '/customer-support.svg',
  form: {
    firstName: {
      label: 'First Name',
      placeholder: 'First Name',
      errorMessage: 'First name must be at least 2 characters.',
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Last Name',
      errorMessage: 'Last name must be at least 2 characters.',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
      errorMessage: 'Please enter a valid email address.',
    },
    message: {
      label: 'Message',
      placeholder: 'Message',
      errorMessage: 'Message must be at least 10 characters.',
    },
    demo: {
      label: 'Request a Demo',
    },
    submitButton: {
      text: 'Send a Message',
    },
    toast: {
      title: "We've Got Your Message, We'll be in Touch Shortly!",
    },
  },
};
