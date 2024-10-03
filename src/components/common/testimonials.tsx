import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/types';
import { Badge } from '@/components/ui/badge';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">Testimonials</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6 shadow-sm"
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
                  <p className="text-sm text-muted-foreground">{testimonial.role?.text}</p>
                </div>
              </div>
              <p className="mb-4 text-muted-foreground">{testimonial.quote.text}</p>
              {testimonial.endorsedSkill && (
                <Badge variant="secondary" className="mt-2">
                  Endorsed: {testimonial.endorsedSkill} {' '}
                  -> {testimonial.rating} / 5
                </Badge>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
