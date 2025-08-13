
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { DoctorAvailability } from '@/lib/types';
import { allTimeSlots } from '@/lib/constants';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const initialAvailability: DoctorAvailability = daysOfWeek.map(day => ({
  day,
  slots: allTimeSlots,
}));


export default function AvailabilityPage() {
  const { toast } = useToast();
  const [availability, setAvailability] = useState<DoctorAvailability>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAvailability = localStorage.getItem('doctorAvailability');
    if (storedAvailability) {
      setAvailability(JSON.parse(storedAvailability));
    } else {
      setAvailability(initialAvailability);
    }
    setIsLoading(false);
  }, []);

  const handleSlotChange = (day: string, slot: string, checked: boolean) => {
    setAvailability(prev =>
      prev.map(dayInfo =>
        dayInfo.day === day
          ? {
              ...dayInfo,
              slots: checked
                ? [...dayInfo.slots, slot].sort() // Keep it sorted for consistency
                : dayInfo.slots.filter(s => s !== slot),
            }
          : dayInfo
      )
    );
  };

  const handleSave = () => {
    localStorage.setItem('doctorAvailability', JSON.stringify(availability));
    toast({
      title: "Availability Saved",
      description: "Your availability settings have been updated successfully.",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Availability</h1>
        <p className="text-muted-foreground">
          Select the days and times you are available for appointments. Uncheck a time slot to mark it as unavailable.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
            <div className="space-y-6">
                {availability.map(({ day, slots }) => (
                <Card key={day}>
                    <CardHeader>
                    <CardTitle>{day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {allTimeSlots.map(slot => (
                        <div key={slot} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${day}-${slot}`}
                                checked={slots.includes(slot)}
                                onCheckedChange={(checked) => handleSlotChange(day, slot, !!checked)}
                            />
                            <label
                                htmlFor={`${day}-${slot}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {slot}
                            </label>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
