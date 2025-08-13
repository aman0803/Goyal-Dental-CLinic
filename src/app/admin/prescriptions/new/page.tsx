
import { PrescriptionForm } from "@/components/PrescriptionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewPrescriptionPage() {
    return (
        <div className="space-y-8">
            <div>
                 <Button variant="ghost" asChild className="mb-4 -ml-4">
                    <Link href="/admin/prescriptions">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Prescriptions
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Create New Prescription</h1>
                <p className="text-muted-foreground">Fill in the details below to issue a new prescription.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Prescription Details</CardTitle>
                    <CardDescription>
                        Please ensure all information is accurate.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PrescriptionForm />
                </CardContent>
            </Card>
        </div>
    )
}
