import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          &copy; {new Date().getFullYear()} You2Mentor. All rights reserved.
        </p>
        <nav className="mt-4 flex space-x-4 sm:mt-0">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
