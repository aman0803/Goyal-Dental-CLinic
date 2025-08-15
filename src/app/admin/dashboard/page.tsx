
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, Activity } from "lucide-react";
import type { Appointment, Patient } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
    }
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
        setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const today = new Date().setHours(0,0,0,0);
  const todaysAppointments = appointments.filter(apt => new Date(apt.date).setHours(0,0,0,0) === today);
  const recentAppointments = appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  
  const getMonthlyNewPatients = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return patients.filter(p => {
        const joinedDate = new Date(p.joinedDate);
        return joinedDate.getMonth() === currentMonth && joinedDate.getFullYear() === currentYear;
    }).length;
  }
  
  const getPrescriptionsCount = () => {
    const storedPrescriptions = localStorage.getItem('prescriptions');
    return storedPrescriptions ? JSON.parse(storedPrescriptions).length : 0;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your clinic's activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointments.length}</div>
            <p className="text-xs text-muted-foreground">{todaysAppointments.length > 0 ? `${todaysAppointments.filter(a => a.status === 'Confirmed').length} confirmed` : 'No appointments today'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients (Month)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMonthlyNewPatients()}</div>
            <p className="text-xs text-muted-foreground">New patients this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPrescriptionsCount()}</div>
            <p className="text-xs text-muted-foreground">Total prescriptions issued</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter(a=> new Date(a.date) > new Date()).length}</div>
            <p className="text-xs text-muted-foreground">Total upcoming appointments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>A list of the 5 most recent appointments.</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/appointments">View All <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
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
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {recentAppointments.length > 0 ? recentAppointments.map((apt) => (
                        <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.patientName}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(apt.date).toLocaleDateString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{apt.time}</TableCell>
                        <TableCell>{apt.reason}</TableCell>
                        <TableCell>
                            <Badge variant={apt.status === 'Confirmed' ? 'default' : apt.status === 'Pending' ? 'secondary' : 'destructive'}>
                                {apt.status}
                            </Badge>
                        </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">No recent appointments.</TableCell>
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
