
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, MoreHorizontal } from "lucide-react";
import { useState } from "react";
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

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>(['Confirmed', 'Pending', 'Cancelled']);

  const handleFilterChange = (status: string) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const filteredAppointments = appointments
    .filter(apt => statusFilters.includes(apt.status))
    .filter(apt => apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage all patient appointments.</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input 
              placeholder="Search by patient name..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 gap-1 w-full sm:w-auto">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={statusFilters.includes('Confirmed')} onCheckedChange={() => handleFilterChange('Confirmed')}>
                  Confirmed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={statusFilters.includes('Pending')} onCheckedChange={() => handleFilterChange('Pending')}>
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={statusFilters.includes('Cancelled')} onCheckedChange={() => handleFilterChange('Cancelled')}>
                  Cancelled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? filteredAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">{apt.patientName}</TableCell>
                    <TableCell className="hidden md:table-cell">{apt.date}</TableCell>
                    <TableCell className="hidden md:table-cell">{apt.time}</TableCell>
                    <TableCell>{apt.reason}</TableCell>
                    <TableCell>
                      <Badge variant={apt.status === 'Confirmed' ? 'default' : apt.status === 'Pending' ? 'secondary' : 'destructive'}>
                          {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the appointment.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteAppointment(apt.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No appointments found.</TableCell>
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
