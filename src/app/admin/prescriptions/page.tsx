
'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Prescription } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus, Download, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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


export default function AdminPrescriptionsPage() {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedPrescriptions = localStorage.getItem('prescriptions');
    if (storedPrescriptions) {
        setPrescriptions(JSON.parse(storedPrescriptions));
    }
  }, []);

  const deletePrescription = (id: string) => {
    const updatedPrescriptions = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem('prescriptions', JSON.stringify(updatedPrescriptions));
    toast({
        title: "Prescription Deleted",
        description: "The prescription has been successfully deleted.",
    })
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
                <p className="text-muted-foreground">Manage all patient prescriptions.</p>
            </div>
            <Button asChild>
                <Link href="/admin/prescriptions/new">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create New Prescription
                </Link>
            </Button>
        </div>
      
      <Card>
        <CardHeader>
            <Input 
              placeholder="Search by patient name..." 
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
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Medications</TableHead>
                    <TableHead className="hidden md:table-cell">Doctor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredPrescriptions.length > 0 ? filteredPrescriptions.map((p) => (
                    <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.patientName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{p.date}</TableCell>
                    <TableCell>{p.medications.map(m => m.name).join(', ')}</TableCell>
                    <TableCell className="hidden md:table-cell">{p.doctorName}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/prescriptions/${p.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
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
                                    This action cannot be undone. This will permanently delete this prescription.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePrescription(p.id)}>
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
                            No prescriptions found.
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
