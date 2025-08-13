
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Patient } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

const allPatients: Patient[] = [
    { id: '1', name: 'Aarav Sharma', email: 'aarav.s@example.com', phone: '9876543210', joinedDate: '2023-01-15' },
    { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', phone: '9876543211', joinedDate: '2023-02-20' },
    { id: '3', name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '9876543212', joinedDate: '2023-03-10' },
    { id: '4', name: 'Saanvi Gupta', email: 'saanvi.g@example.com', phone: '9876543213', joinedDate: '2023-04-05' },
    { id: '5', name: 'Vivaan Singh', email: 'vivaan.s@example.com', phone: '9876543214', joinedDate: '2023-05-22' },
    { id: '6', name: 'Diya Joshi', email: 'diya.j@example.com', phone: '9876543215', joinedDate: '2023-06-30' },
    { id: '7', name: 'Kabir Kumar', email: 'kabir.k@example.com', phone: '9876543216', joinedDate: '2023-07-18' },
];

export default function AdminPatientsPage() {
  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                <p className="text-muted-foreground">View and manage patient records.</p>
            </div>
            <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Patient
            </Button>
        </div>
      
      <Card>
        <CardHeader>
            <Input placeholder="Search by patient name or phone..." className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.joinedDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Profile</Button>
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

