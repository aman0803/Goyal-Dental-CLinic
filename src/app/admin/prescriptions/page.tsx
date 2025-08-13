
'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Prescription } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus, Download, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                        </Button>
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
