import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    image: "/path/to/john-doe.jpg",
    quote:
      "You2Mentor has been instrumental in my career growth. The mentors are knowledgeable and supportive.",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    image: "/path/to/jane-smith.jpg",
    quote:
      "I highly recommend You2Mentor to anyone looking to advance their skills. It's an amazing platform.",
  },
];

export function Testimonials() {
  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold">Testimonials</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-lg border p-6"
            >
              <div className="mb-4 flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.quote}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}