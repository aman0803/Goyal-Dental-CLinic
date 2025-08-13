
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, Activity } from "lucide-react";
import type { Appointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);

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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No appointments today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients (Month)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No new patients this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions Issued</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No prescriptions today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clinic Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Low</div>
            <p className="text-xs text-muted-foreground">Based on recent bookings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>A list of upcoming appointments.</CardDescription>
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
                        <TableCell className="hidden md:table-cell">{apt.date}</TableCell>
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
