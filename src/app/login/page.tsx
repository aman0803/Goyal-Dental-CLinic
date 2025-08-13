
'use client';

import { LoginForm } from "@/components/LoginForm";
import { ToothIcon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();

    useEffect(() => {
        // If the user is already authenticated, redirect them to the dashboard.
        if (sessionStorage.getItem("isAuthenticated") === "true") {
            router.replace('/admin/dashboard');
        }
    }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center space-x-2">
                <ToothIcon className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">Goyal Dental Clinic</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
