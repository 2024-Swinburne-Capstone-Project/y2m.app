import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: string;
  srcDark: string;
  className?: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, className, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className={cn('dark:hidden', className)} />
      <Image {...rest} src={srcDark} className={cn('hidden dark:flex', className)} />
    </>
  );
};

export default ThemeImage;
