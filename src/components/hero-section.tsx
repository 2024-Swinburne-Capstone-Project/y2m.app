import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  imagePath: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, imagePath, className }) => {
  return (
    <div
      className={cn('flex relative items-center justify-center h-48 overflow-hidden', className)}
    >
      <div className="bg-secondary opacity-60 mr-auto hidden md:flex">
        <Image src={imagePath} alt={title} width={300} height={300} />
      </div>
      <h1 className="absolute scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
    </div>
  );
};

export default HeroSection;
