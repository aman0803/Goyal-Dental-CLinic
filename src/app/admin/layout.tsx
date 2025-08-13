
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
  ChevronLeft,
  CalendarClock
} from "lucide-react";
import { ToothIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: Users,
  },
  {
    title: "Prescriptions",
    href: "/admin/prescriptions",
    icon: FileText,
  },
  {
    title: "Availability",
    href: "/admin/availability",
    icon: CalendarClock,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect now only runs on the client-side for admin pages
    try {
      const authStatus = sessionStorage.getItem("isAuthenticated") === 'true';
      setIsAuthenticated(authStatus);
      if (!authStatus) {
        router.replace("/login");
      }
    } catch (e) {
      // sessionStorage is not available during server-side rendering or in some browser modes
      setIsAuthenticated(false);
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  // A loading state while we verify authentication.
  if (isAuthenticated === null) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  // If not authenticated, we'll be redirecting, so render nothing to avoid a flash of content.
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="fixed hidden md:flex h-full w-64 flex-col border-r bg-white dark:bg-gray-800">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ToothIcon className="h-6 w-6 text-primary" />
            <span>Goyal Dental</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
                pathname === item.href &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => router.push('/')}>
                <ChevronLeft className="h-4 w-4" />
                Back to Main Site
            </Button>
            <Button variant="destructive" className="w-full justify-start gap-3 mt-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 dark:bg-gray-800 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <ToothIcon className="h-6 w-6 text-primary" />
                <span>Admin</span>
            </Link>
        </header>
        <main className="flex-1 p-4 md:p-10">{children}</main>
      </div>
    </div>
  );
}
