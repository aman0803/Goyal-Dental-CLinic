
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Sparkles, HeartHandshake, Bone, Smile, Baby } from "lucide-react";
import Image from "next/image";
import { ToothIcon } from "@/components/icons";

const services = [
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Cosmetic Dentistry",
    description: "Achieve the smile of your dreams with our cosmetic dentistry services. We offer teeth whitening, veneers, dental bonding, and smile makeovers to enhance your appearance and boost your confidence.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "cosmetic dentistry"
    }
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Oral Surgery",
    description: "Our experienced surgeons perform a variety of oral surgery procedures, including tooth extractions, wisdom teeth removal, and dental implant placement, with a focus on your safety and comfort.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "dental surgery"
    }
  },
  {
    icon: <ToothIcon className="h-10 w-10 text-primary" />,
    title: "General Dentistry",
    description: "Maintain your oral health with our comprehensive general dentistry services. This includes routine check-ups, professional cleanings, fillings, and preventive care for the whole family.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "dental checkup"
    }
  },
  {
    icon: <Bone className="h-10 w-10 text-primary" />,
    title: "Dental Implants",
    description: "Restore your smile and function with dental implants, the gold standard for replacing missing teeth. We provide complete implant solutions from placement to restoration.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "dental implant"
    }
  },
  {
    icon: <Smile className="h-10 w-10 text-primary" />,
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with our orthodontic treatments. We offer traditional braces and modern clear aligners for both adults and teenagers.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "orthodontics braces"
    }
  },
  {
    icon: <Baby className="h-10 w-10 text-primary" />,
    title: "Pediatric Dentistry",
    description: "We provide gentle and friendly dental care for children of all ages. Our goal is to make dental visits a positive experience and build a foundation for a lifetime of healthy smiles.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "child dentist"
    }
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">
              Our Dental Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We offer a full range of dental services to meet the needs of you and your family. Our team is dedicated to providing personalized care in a comfortable setting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                   <Image
                      src={service.image.src}
                      data-ai-hint={service.image.hint}
                      width={600}
                      height={400}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                        {service.icon}
                        <CardTitle className="text-2xl font-headline">{service.title}</CardTitle>
                    </div>
                  <p className="text-muted-foreground flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

