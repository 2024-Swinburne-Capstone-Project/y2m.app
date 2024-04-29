import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const RotatingWord = ({ words }: { words: string[] }) => {
  const [word, setWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <motion.div
      key={word}
      className="text-primary"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      {word}
    </motion.div>
  );
};

export default RotatingWord;
