import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MainSectionProps {
  children?: ReactNode;
  className?: string;
}

const MainSection: React.FC<MainSectionProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        'flex flex-col md:flex-row justify-center items-center py-12 px-4 md:px-8 space-x-6',
        className
      )}
    >
      {children}
    </section>
  );
};

export default MainSection;
