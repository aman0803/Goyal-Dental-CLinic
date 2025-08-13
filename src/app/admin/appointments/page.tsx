
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

const allAppointments: Appointment[] = [
    { id: '1', patientName: 'Aarav Sharma', date: '2024-08-01', time: '10:00 AM', reason: 'Regular Check-up', status: 'Confirmed' },
    { id: '2', patientName: 'Priya Patel', date: '2024-08-01', time: '11:30 AM', reason: 'Tooth Pain', status: 'Confirmed' },
    { id: '3', patientName: 'Rohan Mehta', date: '2024-08-01', time: '02:00 PM', reason: 'Cleaning', status: 'Pending' },
    { id: '4', patientName: 'Saanvi Gupta', date: '2024-08-02', time: '09:00 AM', reason: 'Braces Adjustment', status: 'Confirmed' },
    { id: '5', patientName: 'Vivaan Singh', date: '2024-08-02', time: '03:00 PM', reason: 'New Patient Consultation', status: 'Cancelled' },
    { id: '6', patientName: 'Diya Joshi', date: '2024-08-03', time: '10:30 AM', reason: 'Filling', status: 'Confirmed' },
    { id: '7', patientName: 'Kabir Kumar', date: '2024-08-03', time: '12:00 PM', reason: 'Wisdom Tooth Extraction', status: 'Confirmed' },
];

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage all patient appointments.</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input placeholder="Search by patient name..." className="max-w-sm" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Confirmed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patientName}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>{apt.reason}</TableCell>
                  <TableCell>
                    <Badge variant={apt.status === 'Confirmed' ? 'default' : apt.status === 'Pending' ? 'secondary' : 'destructive'}>
                        {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
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

