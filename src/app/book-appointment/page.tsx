
import { AppointmentForm } from "@/components/AppointmentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarCheck, Phone } from "lucide-react";
import Image from "next/image";

export default function BookAppointmentPage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">
              Book Your Appointment
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Schedule your visit with us online. Fill out the form below, and our team will get in touch to confirm your appointment details.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <Card className="p-6 md:p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Appointment Request Form</CardTitle>
                  <CardDescription>
                    Please provide your details below. Fields marked with * are required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentForm />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2 space-y-8">
               <Card className="p-6 shadow-lg">
                  <CardHeader>
                     <CardTitle className="font-headline text-xl">Booking Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                      <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold text-foreground">Clinic Hours</h4>
                            <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CalendarCheck className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold text-foreground">Confirmation</h4>
                            <p>After submitting, we will call you on the provided number to confirm your slot.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold text-foreground">Prefer to call?</h4>
                            <p>You can also book an appointment by calling us directly at <a href="tel:9929270337" className="text-primary font-semibold hover:underline">9929270337</a>.</p>
                        </div>
                      </div>
                  </CardContent>
               </Card>
               <Image
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="friendly receptionist"
                    width={600}
                    height={400}
                    alt="Friendly staff"
                    className="rounded-lg shadow-lg object-cover"
                />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

