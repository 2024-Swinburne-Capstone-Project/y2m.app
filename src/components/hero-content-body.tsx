import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface HeroContentBodyProps {
  titleText?: string;
  children?: ReactNode;
  className?: string;
}

const HeroContentBody: React.FC<HeroContentBodyProps> = ({ titleText, children, className }) => {
  const bodyClasses = cn('mb-8 md:mb-0 md:w-1/2 max-w-7xl mx-auto', className);

  return (
    <div className={bodyClasses}>
      {titleText && (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {titleText}
        </h2>
      )}
      <br />
      {children && <div className="text-muted-foreground">{children}</div>}
    </div>
  );
};

export default HeroContentBody;
