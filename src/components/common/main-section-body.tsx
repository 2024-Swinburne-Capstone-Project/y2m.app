import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface MainSectionBodyProps {
  children?: ReactNode;
  className?: string;
}

const MainSectionBody: React.FC<MainSectionBodyProps> = ({ children, className }) => {
  const bodyClasses = cn(
    'mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-12 md:flex-row md:space-x-6 md:px-8',
    className
  );

  return <div className={bodyClasses}>{children}</div>;
};

export default MainSectionBody;
