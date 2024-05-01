import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: 'Set & Track Goals',
    description:
      'You2mentor has a My Development hub where you can set and track the progress of your development goals',
    imagePath: '/success.svg',
  },
  {
    title: 'Find Mentors',
    description:
      'You can search for a mentor for overall personal growth or find a tribe of mentors to suit specific goals',
    imagePath: '/team-idea.svg',
  },
  {
    title: 'Mentor Others',
    description:
      'Mentoring others not only support mentees development but provides mentors experiences in becoming a subject matter expert and significantly increase opportunities career growth',
    imagePath: '/shaking-hands.svg',
  },
  {
    title: 'Reverse Mentoring',
    description:
      'Mentor and network with leaders who wants to participate in reverse mentoring to gain new perspectives',
    imagePath: '/creative-work.svg',
  },
];

export function Features() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">What You Can Do</h2>
      <div className="grid gap-8 text-center md:grid-cols-4">
        <AnimatePresence>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <Image
                src={feature.imagePath}
                alt=""
                width={300}
                height={300}
                className="h-auto w-full object-cover dark:overflow-hidden dark:rounded-full dark:bg-primary-foreground"
              />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>{' '}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
