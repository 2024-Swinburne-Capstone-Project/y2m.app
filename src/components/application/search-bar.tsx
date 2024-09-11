'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
};

export default SearchBar;
