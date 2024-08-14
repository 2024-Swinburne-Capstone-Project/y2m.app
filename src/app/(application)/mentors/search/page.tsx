'use client';
import { useState } from 'react';
import { useMentorSearch } from '@/hooks/useMentorSearch';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const DEBOUNCE_TIME = 500
  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_TIME);
  const { mentors, isLoading, error } = useMentorSearch(debouncedSearchQuery);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">Potential Mentors</h1>
      <Input
        type="text"
        onChange={handleSearch}
        placeholder="Search mentors..."
        className="mb-4 w-full"
      />
      {searchQuery &&
        (isLoading ? (
          <div>Loading...</div>
        ) : mentors.length > 0 ? (
          <DataTable columns={columns} data={mentors} />
        ) : (
          <div>No mentors found.</div>
        ))}
    </div>
  );
}
