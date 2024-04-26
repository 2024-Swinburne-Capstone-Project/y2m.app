import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface HeroContentBodyProps {
  titleText?: string;
  children?: ReactNode;
  className?: string;
}

const HeroContentBody: React.FC<HeroContentBodyProps> = ({ titleText, children, className }) => {
  const bodyClasses = cn('mb-8 md:mb-0 md:w-1/2', className);

  return (
    <div className={bodyClasses}>
      {titleText && (
        <h2 className="text-2xl font-semibold leading-none tracking-tight">{titleText}</h2>
      )}
      <br />
      {children && <div className="text-muted-foreground">{children}</div>}
    </div>
  );
};

export default HeroContentBody;
