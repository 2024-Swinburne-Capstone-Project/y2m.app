import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notAuthorizedConfig } from '@/config/common/components/not-authorized';

const NotAuthorizedPage = () => {
  return (
    <div className="mx-6 mb-6 min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-4 text-center">
        <Image
          src={notAuthorizedConfig.imageSource}
          alt={notAuthorizedConfig.imageAlt}
          width={300}
          height={300}
          className="mx-auto mb-8 mt-20"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {notAuthorizedConfig.title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{notAuthorizedConfig.description}</p>
        <Button asChild>
          <Link href={notAuthorizedConfig.buttonHref}>{notAuthorizedConfig.buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
