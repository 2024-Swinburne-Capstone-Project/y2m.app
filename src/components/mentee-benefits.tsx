import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const menteeBenefits = [
  {
    title: 'Learn Something New',
    description:
      'Having a mentor outside your company or even not in your direct field can help you gain access to knowledge you may not have known you were missing out on',
    imagePath: '/studying.svg',
  },
  {
    title: 'Career Growth',
    description:
      'Research shows that you are 5 times more likely to get a promotion and 25% more likely to get a raise than someone who does not have a mentor',
    imagePath: '/celebrating-business-success.svg',
  },
  {
    title: 'Guidance',
    description:
      'Mentors offer unbiased constructive feedback and encouragement designed to strengthen areas you want improvement in',
    imagePath: '/shaking-hands.svg',
  },
  {
    title: 'Networking Connections',
    description:
      'Mentors commonly offer to let their mentees use their networks. Enlisting the assistance of a mentor may enhance your potential to discover new connections, which may ultimately result in new opportunities.',
    imagePath: '/work-party.svg',
  },
  {
    title: 'Engagement and Motivation',
    description:
      "Mentors support a person's professional and personal development and motivate you to reach your goals",
    imagePath: '/creative-work.svg',
  },
  {
    title: 'Problem Solving',
    description:
      'If you have a problem to solve, a mentor can provide you with useful advice to address the issue or options to consider',
    imagePath: '/genius.svg',
  },
  {
    title: 'Goal Setting',
    description:
      'Mentors are the ideal supporters to hold you accountable if you need assistance developing and achieving goals. Your mentor can help you grow by helping you set new stretch goals and give you direction on what to do next',
    imagePath: '/success.svg',
  },
  {
    title: 'Accountability',
    description:
      'Mentors hold their mentee accountable for their goals. By tracking progress, the mentor helps the mentee stay focused and on track',
    imagePath: '/calculator.svg',
  },
];

export function MenteeBenefits() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Why You Should Have a Mentor</h2>
      <div className="grid gap-8 md:grid-cols-2 text-center">
        <AnimatePresence>
          {menteeBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6 flex flex-row items-center text-left gap-8"
            >
              <Image
                src={benefit.imagePath}
                alt=""
                width={300}
                height={300}
                className="w-28 h-auto basis-1/5 object-cover dark:bg-primary-foreground dark:rounded-full dark:overflow-hidden"
              />
              <div className="basis-4/5">
                <h1 className="mb-2 text-xl font-semibold">{benefit.title}</h1>
                <h3 className="text-muted-foreground">{benefit.description}</h3>{' '}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
