import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { mentorSearchConfig } from '@/config/application/mentor-search';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { searchSection } = mentorSearchConfig;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length > 0) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder={searchSection.inputPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="grow"
        />
        <Button type="submit" disabled={query.length === 0}>
          <Search className="mr-2 size-4" /> {searchSection.buttonText}
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchSection;
