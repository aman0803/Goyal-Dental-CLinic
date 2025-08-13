
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Patient } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";

export default function AdminPatientsPage() {
    const { toast } = useToast();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedPatients = localStorage.getItem('patients');
        if (storedPatients) {
            setPatients(JSON.parse(storedPatients));
        } else {
            // Pre-populate with one patient if none are in localStorage
            const initialPatient = {
                id: '1',
                name: 'Anjali Sharma',
                email: 'anjali.sharma@example.com',
                phone: '9876543210',
                joinedDate: new Date().toLocaleDateString()
            };
            setPatients([initialPatient]);
            localStorage.setItem('patients', JSON.stringify([initialPatient]));
        }
    }, []);


    const deletePatient = (id: string) => {
        const updatedPatients = patients.filter(p => p.id !== id);
        setPatients(updatedPatients);
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
        toast({
            title: "Patient Deleted",
            description: "The patient record has been successfully deleted.",
        })
    };

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    );

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                <p className="text-muted-foreground">View and manage patient records.</p>
            </div>
            <Button asChild>
                <Link href="/admin/patients/new">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Patient
                </Link>
            </Button>
        </div>
      
      <Card>
        <CardHeader>
            <Input 
                placeholder="Search by patient name or phone..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden sm:table-cell">Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell className="hidden sm:table-cell">{patient.joinedDate}</TableCell>
                    <TableCell className="text-right">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the patient record
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePatient(patient.id)}>
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                    </TableRow>
                )) : (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No patients found.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
