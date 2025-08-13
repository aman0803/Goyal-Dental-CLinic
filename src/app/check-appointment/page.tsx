
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Appointment } from '@/lib/types';
import { Search } from 'lucide-react';

export default function CheckAppointmentPage() {
  const [phone, setPhone] = useState('');
  const [foundAppointments, setFoundAppointments] = useState<Appointment[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setSearched(false);

    // Simulate a small delay for better UX
    setTimeout(() => {
        const storedAppointments = localStorage.getItem('appointments');
        const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];
        const appointmentsForPhone = appointments.filter(apt => apt.phone === phone);
        setFoundAppointments(appointmentsForPhone);
        setSearched(true);
        setLoading(false);
    }, 500);

  };

  return (
    <div className="bg-background py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Check Your Appointment Status</CardTitle>
            <CardDescription>
              Enter the phone number you used to book your appointment to see its status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your 10-digit phone number"
                aria-label="Your phone number"
                disabled={loading}
                pattern="\d{10}"
                title="Please enter a 10-digit phone number"
                required
              />
              <Button type="submit" disabled={loading || !phone.trim()}>
                {loading ? 'Searching...' : <><Search className="mr-2 h-4 w-4" />Search</>}
              </Button>
            </form>

            {searched && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Your Appointments</h3>
                {foundAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {foundAppointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell>{new Date(apt.date).toLocaleDateString()}</TableCell>
                            <TableCell>{apt.time}</TableCell>
                            <TableCell>{apt.reason}</TableCell>
                            <TableCell>
                               <Badge variant={apt.status === 'Confirmed' ? 'default' : apt.status === 'Pending' ? 'secondary' : 'destructive'}>
                                {apt.status}
                                </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground mt-8">
                    No appointments found for this phone number. Please check the number or contact us if you believe this is an error.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
