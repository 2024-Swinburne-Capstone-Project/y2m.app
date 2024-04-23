import Image from "next/image";

const HeroSection = ({
  title,
  imagePath,
}: {
  title: string;
  imagePath: string;
}) => {
  return (
    <div className="flex relative items-center justify-center h-48 overflow-hidden">
      <h1 className="absolute text-4xl z-10 font-bold text-white">{title}</h1>
      <div className="bg-gray-900 opacity-60">
        <Image
          src={imagePath}
          alt={title}
          width={1280}
          height={300}
        />
      </div>
    </div>
  );
};

export default HeroSection;
