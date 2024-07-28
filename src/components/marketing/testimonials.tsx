// components/testimonials.tsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { homeConfig } from '@/config/marketing/home';

export function Testimonials() {
  const { testimonials } = homeConfig;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{testimonials.title}</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence>
          {testimonials.items.map((testimonial, index) => (
            <motion.div
              key={testimonial.name.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <div className="mb-4 flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name.text}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name.text}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role.text}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.quote.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
