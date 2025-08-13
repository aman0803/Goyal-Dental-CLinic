
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Prescription } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus, Download } from "lucide-react";
import Link from "next/link";

const allPrescriptions: Prescription[] = [
    { id: 'presc_1', patientName: 'Priya Patel', doctorName: 'Dr. Sushil Goyal', date: '2024-08-01', medication: 'Amoxicillin', dosage: '500mg', instructions: 'Take one tablet twice a day for 7 days.'},
    { id: 'presc_2', patientName: 'Rohan Mehta', doctorName: 'Dr. Manju Goyal', date: '2024-07-28', medication: 'Ibuprofen', dosage: '400mg', instructions: 'Take as needed for pain, max 3 per day.'},
    { id: 'presc_3', patientName: 'Aarav Sharma', doctorName: 'Dr. Sushil Goyal', date: '2024-07-25', medication: 'Chlorhexidine Mouthwash', dosage: '15ml', instructions: 'Rinse twice daily after brushing.'},
];

export default function AdminPrescriptionsPage() {
  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
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
            <Input placeholder="Search by patient name..." className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPrescriptions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.patientName}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.medication}</TableCell>
                  <TableCell>{p.doctorName}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/prescriptions/${p.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

