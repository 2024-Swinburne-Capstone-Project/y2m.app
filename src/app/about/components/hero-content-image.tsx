import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroContentImageProps {
  imagePath: string;
  className?: string;
}

const HeroContentImage: React.FC<HeroContentImageProps> = ({
  imagePath,
  className,
}) => {
  return (
    <div className={cn("md:w-1/2", className)}>
      <Image
        src={imagePath}
        width={1280}
        height={300}
        alt="Hero Section"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default HeroContentImage;
