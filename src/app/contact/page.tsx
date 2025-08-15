
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  const mapSrc = "https://maps.google.com/maps?q=Goyal%20Dental%20Clinic%2C%20Bikaner%20road%2C%20near%20Allahabad%2FIndian%20Bank%20335804%2C%20Suratgarh%2C%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <>
    <Header />
    <div className="bg-background">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're here to help. Contact us with any questions or to schedule an appointment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold font-headline mb-6">Send us a Message</h2>
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you today?" {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Submit Message</Button>
                </form>
              </Form>
            </Card>

            <div className="space-y-8">
                <Card className="p-6 shadow-lg">
                    <h2 className="text-2xl font-bold font-headline mb-6">Contact Information</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <MapPin className="h-6 w-6 mt-1 mr-4 shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold">Our Address</h3>
                                <p className="text-muted-foreground">
                                Goyal Dental Clinic, Bikaner road, near Allahabad/Indian Bank 335804, Suratgarh, Rajasthan
                                </p>
                                <Link href="https://maps.app.goo.gl/VYMJ9WDsZLjj9C6M8" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    Get Directions
                                </Link>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <Phone className="h-6 w-6 mt-1 mr-4 shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <a href="tel:9929270337" className="text-muted-foreground hover:text-primary transition-colors">9929270337</a>
                            </div>
                        </li>
                    </ul>
                </Card>
                 <div className="rounded-lg shadow-lg overflow-hidden">
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Goyal Dental Clinic Location"
                    ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
