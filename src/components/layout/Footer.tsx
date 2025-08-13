
import Link from "next/link";
import { ToothIcon } from "../icons";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ToothIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Goyal Dental Clinic</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your smile, our passion. Providing top-quality dental care with a gentle touch.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg font-headline">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/book-appointment" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Appointment</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg font-headline">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-2 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Bikaner road, near Allahabad/Indian Bank 335804, Suratgarh, Rajasthan
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <a href="tel:9929270337" className="text-sm text-muted-foreground hover:text-primary transition-colors">9929270337</a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg font-headline">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Goyal Dental Clinic. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
