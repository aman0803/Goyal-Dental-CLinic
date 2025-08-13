
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToothIcon } from "@/components/icons";
import { Download, Printer } from "lucide-react";
import type { Prescription } from "@/lib/types";

// Mock data fetching function
const getPrescriptionById = (id: string): Prescription | null => {
    if (id === 'presc_1') {
        return { 
            id: 'presc_1', 
            patientName: 'Priya Patel', 
            doctorName: 'Dr. Sushil Goyal', 
            date: '2024-08-01', 
            medication: 'Amoxicillin', 
            dosage: '500mg', 
            instructions: 'Take one tablet twice a day for 7 days after meals. Complete the full course.'
        };
    }
    return null;
}


export default function PrescriptionViewPage({ params }: { params: { id: string } }) {
    const prescription = getPrescriptionById(params.id);

    if (!prescription) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <Card className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold text-destructive mb-4">Prescription Not Found</h1>
                    <p className="text-muted-foreground">The prescription you are looking for does not exist or the link is invalid.</p>
                </Card>
            </div>
        );
    }
  
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl space-y-4">
            <Card className="shadow-lg">
                <CardHeader className="bg-primary/10 border-b p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <ToothIcon className="h-10 w-10 text-primary" />
                                <div>
                                    <h2 className="text-2xl font-bold font-headline">Goyal Dental Clinic</h2>
                                    <p className="text-sm text-muted-foreground">Your trusted dental care partner</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <h1 className="text-2xl font-bold text-primary">PRESCRIPTION</h1>
                             <p className="text-sm text-muted-foreground">ID: {prescription.id}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Patient</p>
                            <p className="font-semibold text-lg">{prescription.patientName}</p>
                        </div>
                         <div className="text-right">
                            <p className="text-sm text-muted-foreground">Date Issued</p>
                            <p className="font-semibold">{prescription.date}</p>
                        </div>
                    </div>
                   
                    <div className="space-y-4">
                        <p className="text-sm font-semibold text-muted-foreground">Rx (Medication)</p>
                        <div>
                            <p className="text-2xl font-bold text-primary">{prescription.medication}</p>
                            <p className="text-lg font-semibold text-muted-foreground">{prescription.dosage}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Instructions:</p>
                            <p className="text-muted-foreground text-base p-4 border bg-gray-50 rounded-md">{prescription.instructions}</p>
                        </div>
                    </div>
                    
                    <div className="border-t pt-4 text-right">
                        <p className="text-lg font-semibold">{prescription.doctorName}</p>
                        <p className="text-sm text-muted-foreground">BDS, Cosmetic and Oral Dental Surgeon</p>
                    </div>

                </CardContent>
            </Card>
            <div className="flex justify-end gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print</Button>
                <Button><Download className="mr-2 h-4 w-4"/> Download PDF</Button>
            </div>
        </div>
    </div>
  );
}

