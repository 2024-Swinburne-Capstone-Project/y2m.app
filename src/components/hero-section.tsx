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
      <h1 className="absolute text-4xl z-10 font-bold text-secondary-foreground">{title}</h1>
      <div className="bg-secondary opacity-60">
        <Image src={imagePath} alt={title} width={1280} height={300} />
      </div>
    </div>
  );
};

export default HeroSection;
