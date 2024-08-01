import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { homeConfig } from '@/config/marketing/home';

export function MentorBenefits() {
  const { mentorBenefits } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{mentorBenefits.title}</h2>
      <div className="grid gap-8 text-center md:grid-cols-2">
        <Image
          src={mentorBenefits.imagePath}
          alt=""
          width={300}
          height={300}
          className="h-auto w-full object-cover dark:overflow-hidden dark:rounded-full dark:bg-foreground"
        />
        <div className="grid gap-8">
          <AnimatePresence>
            {mentorBenefits.items.map((benefit, index) => (
              <motion.div
                key={benefit.description.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center gap-8 rounded-lg border p-6 text-left"
              >
                <Image
                  src={benefit.imagePath}
                  alt=""
                  width={300}
                  height={300}
                  className="h-auto w-28 object-cover dark:rounded-full dark:bg-foreground"
                />
                <div>
                  <h3 className="text-muted-foreground">{benefit.description.text}</h3>
                  <a
                    href={benefit.sourceUrl}
                    style={{ color: 'hsl(var(--primary))' }}
                    target="_blank"
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
