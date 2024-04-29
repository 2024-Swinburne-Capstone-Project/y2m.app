import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface MainSectionBodyProps {
  children?: ReactNode;
  className?: string;
}

const MainSectionBody: React.FC<MainSectionBodyProps> = ({ children, className }) => {
  const bodyClasses = cn(
    'flex flex-col md:flex-row justify-center items-center py-12 px-4 md:px-8 md:space-x-6 max-w-7xl mx-auto',
    className
  );

  return <div className={bodyClasses}>{children}</div>;
};

export default MainSectionBody;
