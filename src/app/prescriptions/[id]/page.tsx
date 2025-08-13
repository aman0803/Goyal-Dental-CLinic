
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ToothIcon } from "@/components/icons";
import { Download, Printer } from "lucide-react";
import type { Prescription } from "@/lib/types";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const getPrescriptionById = (id: string): Prescription | null => {
    const storedPrescriptions = localStorage.getItem('prescriptions');
    if (!storedPrescriptions) return null;
    
    const prescriptions: Prescription[] = JSON.parse(storedPrescriptions);
    return prescriptions.find(p => p.id === id) || null;
}


export default function PrescriptionViewPage({ params }: { params: { id: string } }) {
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundPrescription = getPrescriptionById(params.id);
        setPrescription(foundPrescription);
        setIsLoading(false);
    }, [params.id]);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <Card className="w-full max-w-md p-8">
                    <p>Loading prescription...</p>
                </Card>
            </div>
        )
    }

    if (!prescription) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <Card className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold text-destructive mb-4">Prescription Not Found</h1>
                    <p className="text-muted-foreground">The prescription you are looking for does not exist, the link is invalid, or it has not been created yet.</p>
                </Card>
            </div>
        );
    }
  
    return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="w-full max-w-4xl space-y-4">
            <Card className="shadow-lg" id="prescription-content">
                <CardHeader className="bg-primary/10 border-b p-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <ToothIcon className="h-10 w-10 text-primary" />
                            <div>
                                <h2 className="text-2xl font-bold font-headline">Goyal Dental Clinic</h2>
                                <p className="text-md font-semibold text-muted-foreground">{prescription.doctorName}</p>
                                <p className="text-sm text-muted-foreground">BDS, Cosmetic and Oral Dental Surgeon</p>
                                <p className="text-sm text-muted-foreground">Phone: 9929270337</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
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

                    {prescription.diagnoses && prescription.diagnoses.length > 0 && (
                      <div className="border-b pb-4">
                          <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Diagnosis</p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Tooth #</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prescription.diagnoses.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{d.toothNumber || 'N/A'}</TableCell>
                                        <TableCell>{d.description}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                      </div>
                    )}
                    
                    {prescription.treatmentPlan && (
                       <div className="border-b pb-4">
                          <p className="text-sm font-semibold text-muted-foreground uppercase mb-1">Treatment Plan</p>
                          <p className="text-gray-700 whitespace-pre-wrap">{prescription.treatmentPlan}</p>
                      </div>
                    )}
                   
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Rx (Medications)</p>
                        <div className="space-y-4">
                            {prescription.medications.map((med, index) => (
                                <div key={index} className="border-b pb-3 last:border-b-0">
                                    <p className="text-xl font-bold text-primary">{med.name}</p>
                                    <p className="text-md font-semibold text-muted-foreground">{med.dosage}</p>
                                    <p className="mt-1 text-sm text-gray-600">{med.instructions}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-8">
                        <p className="text-sm text-muted-foreground">Signature:</p>
                        <div className="h-16 border-b"></div>
                    </div>

                </CardContent>
            </Card>
            <div className="flex justify-end gap-2 print:hidden">
                <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/> Print</Button>
                <Button disabled>
                  <Download className="mr-2 h-4 w-4"/> Download PDF
                </Button>
            </div>
        </div>
        <style jsx global>{`
            @media print {
                body {
                    background-color: white;
                }
                .print\\:hidden {
                    display: none;
                }
                #prescription-content {
                    box-shadow: none;
                    border: none;
                }
                 .flex.justify-center.items-start {
                    padding: 0;
                }
            }
        `}</style>
    </div>
  );
}

