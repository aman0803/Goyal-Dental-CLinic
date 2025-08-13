
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BriefcaseMedical, CalendarCheck } from "lucide-react";
import { ToothIcon } from "../icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/assistant", label: "AI Assistant" },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ToothIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Goyal Dental Clinic
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
             <Link
                href="/check-appointment"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname === "/check-appointment" ? "text-primary" : "text-muted-foreground"
                )}
                >
                <CalendarCheck className="h-4 w-4" />
                Check Status
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <ToothIcon className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Goyal Dental Clinic</span>
                </Link>
                <nav className="grid gap-y-6">
                  {navLinks.map((link) => (
                     <Link
                     key={`mobile-${link.href}`}
                     href={link.href}
                     className={cn(
                       "flex items-center text-lg font-medium transition-colors hover:text-primary",
                       pathname === link.href ? "text-primary" : "text-muted-foreground"
                     )}
                   >
                     {link.label}
                   </Link>
                  ))}
                   <Link
                    href="/check-appointment"
                    className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        pathname === "/check-appointment" ? "text-primary" : "text-muted-foreground"
                    )}
                    >
                    Check Status
                    </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <ToothIcon className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Goyal Dental Clinic</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/book-appointment">Book Appointment</Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Admin Login">
              <Link href="/login">
                <BriefcaseMedical className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
