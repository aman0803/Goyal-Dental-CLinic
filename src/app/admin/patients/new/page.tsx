
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Patient } from "@/lib/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  medicalHistory: z.string().optional(),
  xrayImage: z
    .any()
    .refine((files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
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
            medicalHistory: "",
        },
    });

    const fileRef = form.register("xrayImage");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const storedPatients = localStorage.getItem('patients');
        const patients: Patient[] = storedPatients ? JSON.parse(storedPatients) : [];
        
        let xrayImageDataUri: string | undefined = undefined;
        if (values.xrayImage && values.xrayImage.length > 0) {
            const file = values.xrayImage[0];
            const reader = new FileReader();
            xrayImageDataUri = await new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            });
        }

        const newPatient: Patient = {
            id: new Date().getTime().toString(), // simple unique id
            name: values.name,
            email: values.email,
            phone: values.phone,
            joinedDate: new Date().toLocaleDateString(),
            medicalHistory: values.medicalHistory,
            xrayImage: xrayImageDataUri,
        };

        const updatedPatients = [...patients, newPatient];
        localStorage.setItem('patients', JSON.stringify(updatedPatients));

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
                            <FormField
                            control={form.control}
                            name="medicalHistory"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Medical History (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., Allergies, past surgeries, current medications..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="xrayImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Patient X-Ray (Optional)</FormLabel>
                                    <FormControl>
                                         <Input type="file" accept="image/*" {...fileRef} />
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
