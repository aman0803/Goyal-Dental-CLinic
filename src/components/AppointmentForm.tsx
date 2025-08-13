
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, getDay } from "date-fns";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Appointment, DoctorAvailability } from "@/lib/types";
import { allTimeSlots } from "@/lib/constants";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  appointmentDate: z.date({ required_error: "Please select a date." }),
  appointmentTime: z.string({ required_error: "Please select a time."}),
  reason: z.string().min(5, { message: "Please provide a brief reason for your visit." }),
});

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function AppointmentForm() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorAvailability, setDoctorAvailability] = useState<DoctorAvailability | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
    const storedAvailability = localStorage.getItem('doctorAvailability');
    if (storedAvailability) {
      setDoctorAvailability(JSON.parse(storedAvailability));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      reason: "",
    },
  });

  const handleDateChange = (date: Date | undefined) => {
    form.setValue('appointmentDate', date, { shouldValidate: true });
    form.setValue('appointmentTime', ''); // Reset time when date changes
    
    if (date) {
      // 1. Get doctor's general availability for the selected day of the week
      const dayOfWeek = dayMap[getDay(date)];
      const doctorsSlotsForDay = doctorAvailability?.find(d => d.day === dayOfWeek)?.slots || allTimeSlots;

      // 2. Get already booked slots for the selected date
      const storedAppointments = localStorage.getItem('appointments');
      const allAppointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];
      const bookedSlots = allAppointments
        .filter(apt => new Date(apt.date).toDateString() === date.toDateString())
        .map(apt => apt.time);
      
      // 3. Final available slots are doctor's slots minus booked slots
      const availableSlots = doctorsSlotsForDay.filter(slot => !bookedSlots.includes(slot));
      setAvailableTimeSlots(availableSlots);
    } else {
        setAvailableTimeSlots([]);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAppointment: Appointment = {
      id: new Date().getTime().toString(),
      patientName: values.name,
      phone: values.phone,
      date: values.appointmentDate.toISOString(),
      time: values.appointmentTime,
      reason: values.reason,
      status: "Pending", // Default status
    };

    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments); // Update state to reflect new booking
    handleDateChange(values.appointmentDate); // Re-calculate available slots for the same day

    toast({
      title: "Appointment Request Sent",
      description: `Thank you, ${values.name}. We have received your request for ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime}. We will contact you shortly to confirm.`,
    });
    form.reset({ name: "", phone: "", reason: "" });
    form.setValue('appointmentDate', undefined);
    form.setValue('appointmentTime', undefined);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9929270337" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Preferred Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateChange}
                        disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0)) || date.getDay() === 0 // Disable past dates and Sundays
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="appointmentTime"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!form.getValues('appointmentDate')}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={!form.getValues('appointmentDate') ? 'Select a date first' : 'Select a time slot'} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {availableTimeSlots.length > 0 ? availableTimeSlots.map(time => (
                            <SelectItem key={time} value={time}>
                            {time}
                            </SelectItem>
                        )) : (
                           <SelectItem value="none" disabled>
                            {!form.getValues('appointmentDate') ? 'Select date' : 'No available slots'}
                           </SelectItem>
                        )}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Regular check-up, teeth cleaning, tooth pain..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">Request Appointment</Button>
      </form>
    </Form>
  );
}
