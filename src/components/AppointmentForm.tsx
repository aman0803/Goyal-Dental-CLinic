
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

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
import { CalendarIcon, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Appointment } from "@/lib/types";

const availableTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  appointmentDate: z.date({ required_error: "Please select a date." }),
  appointmentTime: z.string({ required_error: "Please select a time."}),
  reason: z.string().min(5, { message: "Please provide a brief reason for your visit." }),
});

export function AppointmentForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      reason: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const storedAppointments = localStorage.getItem('appointments');
    const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

    const isSlotTaken = appointments.some(apt => 
        new Date(apt.date).toDateString() === values.appointmentDate.toDateString() &&
        apt.time === values.appointmentTime
    );

    if (isSlotTaken) {
        toast({
            title: "Booking Failed",
            description: "The selected date and time slot is already booked. Please choose another slot.",
            variant: "destructive",
        });
        return;
    }

    const newAppointment: Appointment = {
      id: new Date().getTime().toString(),
      patientName: values.name,
      date: values.appointmentDate.toISOString(),
      time: values.appointmentTime,
      reason: values.reason,
      status: "Pending", // Default status
    };

    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    toast({
      title: "Appointment Request Sent",
      description: `Thank you, ${values.name}. We have received your request for ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime}. We will contact you shortly to confirm.`,
    });
    form.reset();
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
                        onSelect={field.onChange}
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {availableTimeSlots.map(time => (
                            <SelectItem key={time} value={time}>
                            {time}
                            </SelectItem>
                        ))}
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
