'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { applicationNavItems, marketingNavItems } from '@/config/common/components/nav';
import { useUser } from '@auth0/nextjs-auth0/client';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col space-y-3">
          <MobileLink key={'/'} href={'/'} onOpenChange={setOpen}>
            <Image
              src={'/y2m-logo.png'}
              alt="You2Mentor"
              width={80}
              height={80}
              className="mb-4 mr-5"
            />
          </MobileLink>
          {user && (
            <>
              {applicationNavItems.map(
                (item) =>
                  item.href && (
                    <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                      {item.title}
                    </MobileLink>
                  )
              )}

              <button onClick={toggleDropdown} className="flex">
                Quick Links
                {isDropdownOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} className="mx-2.5 my-1" />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} className="mx-2.5 my-1" />
                )}
              </button>
              {isDropdownOpen && (
                <ul tabIndex={-1} className="flex flex-col gap-2.5 pl-2.5">
                  {marketingNavItems.map((item) => (
                    <MobileLink
                      className={'w-initial justify-start'}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        buttonRef.current?.blur();
                        setOpen(false);
                      }}
                      href={item.href}
                      key={item.href}
                    >
                      {item.title}
                    </MobileLink>
                  ))}
                </ul>
              )}
            </>
          )}
          {!user && (
            <ul tabIndex={-1} className="flex flex-col gap-2.5">
              {marketingNavItems.map((item) => (
                <MobileLink
                  className={'w-initial justify-start'}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    buttonRef.current?.blur();
                    setOpen(false);
                  }}
                  href={item.href}
                  key={item.href}
                >
                  {item.title}
                </MobileLink>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
