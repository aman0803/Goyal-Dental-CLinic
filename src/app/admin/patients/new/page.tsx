
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
});

export default function NewPatientPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Here you would typically handle form submission, e.g., send data to an API
        // For now, we'll just show a toast and navigate back
        toast({
            title: "Patient Added",
            description: `${values.name} has been successfully added to the patient records.`,
        });
        router.push("/admin/patients");
    }

    return (
        <div className="space-y-8">
            <div>
                <Button variant="ghost" asChild className="mb-4 -ml-4">
                    <Link href="/admin/patients">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Patients
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Add New Patient</h1>
                <p className="text-muted-foreground">Fill in the details for the new patient.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>
                        Please ensure all details are correct.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="flex gap-2">
                                <Button type="submit">Add Patient</Button>
                                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
