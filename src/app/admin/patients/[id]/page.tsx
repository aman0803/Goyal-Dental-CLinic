
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Patient } from '@/lib/types';
import { ChevronLeft, User, Mail, Phone, History, Camera } from 'lucide-react';
import Image from 'next/image';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const storedPatients = localStorage.getItem('patients');
      const patients: Patient[] = storedPatients ? JSON.parse(storedPatients) : [];
      const foundPatient = patients.find(p => p.id === id);
      setPatient(foundPatient || null);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading patient details...</p>
        </div>
    );
  }

  if (!patient) {
     return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-destructive">Patient Not Found</h1>
            <p className="text-muted-foreground mt-2">Could not find a patient with the specified ID.</p>
            <Button onClick={() => router.push('/admin/patients')} className="mt-4">Back to Patients</Button>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" onClick={() => router.push('/admin/patients')} className="mb-4 -ml-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Patient Details</h1>
        <p className="text-muted-foreground">Comprehensive view of the patient's record.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-6 w-6" /> 
                        {patient.name}
                    </CardTitle>
                    <CardDescription>Joined on {patient.joinedDate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground"/>
                        <p>{patient.email}</p>
                    </div>
                     <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground"/>
                        <p>{patient.phone}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History className="h-6 w-6"/> Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                        {patient.medicalHistory || "No medical history provided."}
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Camera className="h-6 w-6"/> Patient X-Ray</CardTitle>
                </CardHeader>
                <CardContent>
                   {patient.xrayImage ? (
                        <Image
                            src={patient.xrayImage}
                            alt={`${patient.name}'s X-Ray`}
                            width={500}
                            height={500}
                            className="rounded-lg border object-contain w-full"
                        />
                   ) : (
                       <p className="text-muted-foreground text-center py-8">No X-ray image uploaded.</p>
                   )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
