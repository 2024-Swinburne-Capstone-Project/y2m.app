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
  perks: {
    title: 'What Do We Offer?',
    items: [
      {
        title: { text: 'Free to Use' },
        imagePath: '/work-from-home.svg',
      },
      {
        title: { text: 'Learn from Industry Professionals' },
        imagePath: '/businessman-with-a-suitcase.svg',
      },
      {
        title: { text: 'Mentor Others' },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  introVideo: {
    title: 'Who We Are',
    videoUrl: 'https://www.youtube.com/embed/Iv41XbkORAA?si=0TWReHSOKVsf5H8Q&rel=0',
  },
  features: {
    title: 'What You Can Do',
    items: [
      {
        title: { text: 'Set & Track Goals' },
        description: {
          text: 'You2mentor has a My Development hub where you can set and track the progress of your development goals',
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'Find Mentors' },
        description: {
          text: 'You can search for a mentor for overall personal growth or find a tribe of mentors to suit specific goals',
        },
        imagePath: '/team-idea.svg',
      },
      {
        title: { text: 'Mentor Others' },
        description: {
          text: 'Mentoring others not only support mentees development but provides mentors experiences in becoming a subject matter expert and significantly increase opportunities career growth',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'Reverse Mentoring' },
        description: {
          text: 'Mentor and network with leaders who wants to participate in reverse mentoring to gain new perspectives',
        },
        imagePath: '/creative-work.svg',
      },
    ],
  },
  mentorBenefits: {
    title: 'Why You Should Be a Mentor',
    imagePath: '/analysis-presentation.svg',
    items: [
      {
        description: {
          text: '6 time more likely to get promoted than someone who is not a mentors',
        },
        imagePath: '/product-launch.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: '28% more likely to get a pay rise compared to 5% of non mentors',
        },
        imagePath: '/spending-money.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'Recognition as a subject matter expert and a leader',
        },
        imagePath: '/shaking-hands.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'Opportunity to develop and advocate for others',
        },
        imagePath: '/man-calling.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
      {
        description: {
          text: 'Development of your personal leadership and coaching styles',
        },
        imagePath: '/creative-work.svg',
        sourceUrl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5',
      },
    ],
  },
  menteeBenefits: {
    title: 'Why You Should Have a Mentor',
    items: [
      {
        title: { text: 'Learn Something New' },
        description: {
          text: 'Having a mentor outside your company or even not in your direct field can help you gain access to knowledge you may not have known you were missing out on',
        },
        imagePath: '/studying.svg',
      },
      {
        title: { text: 'Career Growth' },
        description: {
          text: 'Research shows that you are 5 times more likely to get a promotion and 25% more likely to get a raise than someone who does not have a mentor',
        },
        imagePath: '/celebrating-business-success.svg',
      },
      {
        title: { text: 'Guidance' },
        description: {
          text: 'Mentors offer unbiased constructive feedback and encouragement designed to strengthen areas you want improvement in',
        },
        imagePath: '/shaking-hands.svg',
      },
      {
        title: { text: 'Networking Connections' },
        description: {
          text: 'Mentors commonly offer to let their mentees use their networks. Enlisting the assistance of a mentor may enhance your potential to discover new connections, which may ultimately result in new opportunities.',
        },
        imagePath: '/work-party.svg',
      },
      {
        title: { text: 'Engagement and Motivation' },
        description: {
          text: "Mentors support a person's professional and personal development and motivate you to reach your goals",
        },
        imagePath: '/creative-work.svg',
      },
      {
        title: { text: 'Problem Solving' },
        description: {
          text: 'If you have a problem to solve, a mentor can provide you with useful advice to address the issue or options to consider',
        },
        imagePath: '/genius.svg',
      },
      {
        title: { text: 'Goal Setting' },
        description: {
          text: 'Mentors are the ideal supporters to hold you accountable if you need assistance developing and achieving goals. Your mentor can help you grow by helping you set new stretch goals and give you direction on what to do next',
        },
        imagePath: '/success.svg',
      },
      {
        title: { text: 'Accountability' },
        description: {
          text: 'Mentors hold their mentee accountable for their goals. By tracking progress, the mentor helps the mentee stay focused and on track',
        },
        imagePath: '/calculator.svg',
      },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    items: [
      {
        name: { text: 'John Doe' },
        role: { text: 'Software Engineer' },
        image: '/male-user.png',
        quote: {
          text: 'You2Mentor has been instrumental in my career growth. The mentors are knowledgeable and supportive.',
        },
      },
      {
        name: { text: 'Jane Smith' },
        role: { text: 'Product Manager' },
        image: '/female-user.png',
        quote: {
          text: "I highly recommend You2Mentor to anyone looking to advance their skills. It's an amazing platform.",
        },
      },
    ],
  },
  acknowledgementOfCountry: {
    title: 'Acknowledgement of Country',
    text: 'You2Mentor acknowledges Aboriginal and Torres Strait Islander peoples as the traditional custodians of our land - Australia. We pay our respect to them and their cultures and to the elders past, present and emerging. Wurundjeri Woi Wurrung and Bunurong Boon Wurrung peoples of the Eastern Kulin are the traditional custodians of the land on which You2Mentor office stands.',
  },
};
