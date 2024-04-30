import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const mentorBenefits = [
  {
    description: '6 time more likely to get promoted than someone who is not a mentors',
    imagePath: '/product-launch.svg',
  },
  {
    description: '28% more likely to get a pay rise compared to 5% of non mentors',
    imagePath: '/spending-money.svg',
  },
  {
    description: 'Recognition as a subject matter expert and a leader',
    imagePath: '/shaking-hands.svg',
  },
  {
    description: 'Opportunity to develop and advocate for others',
    imagePath: '/man-calling.svg',
  },
  {
    description: 'Development of your personal leadership and coaching styles',
    imagePath: '/creative-work.svg',
  },
];

export function MentorBenefits() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Why You Should Be a Mentor</h2>
      <div className="grid gap-8 md:grid-cols-2 text-center">
        <Image
          src="/analysis-presentation.svg"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto object-cover"
        />
        <div className="grid gap-8">
          <AnimatePresence>
            {mentorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-lg border p-6 flex items-center text-left gap-8"
              >
                <Image
                  src={benefit.imagePath}
                  alt=""
                  width={300}
                  height={300}
                  className="w-28 h-auto object-cover"
                />
                <div>
                  <h3 className="text-muted-foreground">{benefit.description}</h3>{' '}
                  <a
                    href="https://onlinelibrary.wiley.com/doi/pdf/10.1002/9781119040002.app5"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    Source
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
