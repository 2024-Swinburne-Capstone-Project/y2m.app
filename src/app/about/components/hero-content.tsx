// hero-content.tsx
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroContentProps {
  children?: ReactNode;
  className?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        "flex flex-col md:flex-row justify-center items-center py-12 px-4 md:px-8 space-x-6",
        className
      )}>
      {children}
    </section>
  );
};

export default HeroContent;
