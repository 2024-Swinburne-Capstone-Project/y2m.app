import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTiktok,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <Link href="/">
          <Image src={'/y2m-logo.png'} alt="You2Mentor" width={80} height={80} className="mb-3" />
        </Link>
        <p className="text-center text-sm text-muted-foreground sm:text-left mb-3">
          &copy; {new Date().getFullYear()} You2Mentor. All rights reserved.
        </p>
        <div className="flex gap-6 mb-3">
          <Link href="https://www.linkedin.com/company/you2mentor/">
            <FontAwesomeIcon
              className="w-5"
              icon={faLinkedin}
              style={{ color: 'hsl(var(--muted-foreground))' }}
            />
          </Link>
          <Link href="https://www.twitter.com/You2Mentor">
            <FontAwesomeIcon
              className="w-5"
              icon={faXTwitter}
              style={{ color: 'hsl(var(--muted-foreground))' }}
            />
          </Link>
          <Link href="https://www.instagram.com/You2Mentor/">
            <FontAwesomeIcon
              className="w-5"
              icon={faInstagram}
              style={{ color: 'hsl(var(--muted-foreground))' }}
            />
          </Link>
          <Link href="https://www.tiktok.com/@you2mentor?_t=8lnc5akDhHG&_r=1">
            <FontAwesomeIcon
              className="w-5"
              icon={faTiktok}
              style={{ color: 'hsl(var(--muted-foreground))' }}
            />
          </Link>
          <Link href="https://www.facebook.com/You2mentor/">
            <FontAwesomeIcon
              className="w-5"
              icon={faFacebook}
              style={{ color: 'hsl(var(--muted-foreground))' }}
            />
          </Link>
        </div>
        <nav className="flex space-x-4 sm:mt-0">
          <Link href="/legal" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/legal" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
