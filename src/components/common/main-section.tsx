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
        'flex flex-col items-center justify-center space-x-6 px-4 py-12 md:flex-row md:px-8',
        className
      )}
    >
      {children}
    </section>
  );
};

export default MainSection;
