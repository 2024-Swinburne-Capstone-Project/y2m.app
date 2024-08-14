import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/db';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'aboutMe',
    header: 'About',
    cell: ({ row }) => {
      const aboutMe = row.getValue('aboutMe') as string;
      return <div className="max-w-[300px] truncate">{aboutMe || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'linkedInProfileLink',
    header: 'LinkedIn',
    cell: ({ row }) => {
      const link = row.getValue('linkedInProfileLink') as string;
      return link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Profile
        </a>
      ) : (
        'N/A'
      );
    },
  },
  {
    accessorKey: 'profilePictureURL',
    header: 'Profile Picture',
    cell: ({ row }) => {
      const imageUrl = row.getValue('profilePictureURL') as string;
      return imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${row.getValue('name')}'s profile picture`}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        'No Image'
      );
    },
  },
];
