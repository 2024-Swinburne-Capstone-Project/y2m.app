import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MainSectionImageProps {
  imagePath: string;
  className?: string;
  width?: number;
  height?: number;
}

const MainSectionImage: React.FC<MainSectionImageProps> = ({
  imagePath,
  className,
  width,
  height,
}) => {
  return (
    <div className={cn(className)}>
      <Image
        src={imagePath}
        width={width ?? 600}
        height={height ?? 300}
        alt="Hero Section"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default MainSectionImage;
