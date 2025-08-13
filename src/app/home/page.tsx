
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ToothIcon } from "@/components/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const services = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Cosmetic Dentistry",
      description: "Enhance your smile with our advanced cosmetic treatments, from teeth whitening to veneers.",
      link: "/services"
    },
    {
      icon: <ToothIcon className="h-8 w-16 text-primary" />,
      title: "General Dentistry",
      description: "Comprehensive care including regular check-ups, cleanings, and fillings to maintain your oral health.",
      link: "/services"
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: "Oral Surgery",
      description: "Expert surgical procedures in a safe and comfortable environment, including extractions and implants.",
      link: "/services"
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your Smile, Our Passion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Welcome to Goyal Dental Clinic, where we combine modern technology with compassionate care to give you the best dental experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/book-appointment">
                      Book an Appointment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/services">
                      Our Services
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="dental clinic interior"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Welcome
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Modern Care in a Comfortable Setting
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Goyal Dental Clinic, we are dedicated to providing the highest quality of dental care. Our clinic is equipped with state-of-the-art technology to ensure you receive the best treatment possible, all in a calm and welcoming environment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="friendly dentist"
                width="600"
                height="400"
                alt="About"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-md"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Expert Doctors</h3>
                      <p className="text-muted-foreground">
                        Led by Dr. Sushil Kumar Goyal and Dr. Manju Goyal, our team brings years of experience and a commitment to excellence.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Patient-First Approach</h3>
                      <p className="text-muted-foreground">
                        Your comfort and health are our top priorities. We take the time to listen to your needs and create personalized treatment plans.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Advanced Technology</h3>
                      <p className="text-muted-foreground">
                        We use the latest dental technology for accurate diagnoses and effective, minimally invasive treatments.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button asChild className="mt-4 w-fit">
                  <Link href="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Wide Range of Dental Solutions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive suite of services to meet all your dental needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {service.icon}
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link href={service.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
