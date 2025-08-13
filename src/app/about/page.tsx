
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BadgeCheck, Hospital, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">
                About Goyal Dental Clinic
              </h1>
              <p className="text-lg text-muted-foreground">
                Founded on the principles of compassion, expertise, and innovation, Goyal Dental Clinic is committed to providing exceptional dental care for the entire family.
              </p>
              <p className="text-muted-foreground">
                Our mission is to create a welcoming and comfortable environment where patients can receive the highest standard of dental treatment. We leverage state-of-the-art technology and a patient-centric approach to ensure optimal oral health and beautiful smiles for our community.
              </p>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="dental office reception"
                width={600}
                height={400}
                alt="Clinic Interior"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter mb-12">
                Meet Our Expert Doctors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <Card className="text-center p-6 shadow-md hover:shadow-xl transition-shadow">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="male doctor" />
                        <AvatarFallback>SKG</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold font-headline">Dr. Sushil Kumar Goyal</h3>
                    <p className="text-primary font-semibold">BDS, Cosmetic and Oral Dental Surgeon</p>
                    <p className="text-sm text-muted-foreground mt-2">Ex-consultant, Airforce</p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Dr. Sushil Kumar Goyal is a seasoned dental surgeon with extensive experience in cosmetic and oral surgery. His commitment to precision and patient comfort ensures the best possible outcomes.
                    </p>
                </Card>
                <Card className="text-center p-6 shadow-md hover:shadow-xl transition-shadow">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="female doctor" />
                        <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold font-headline">Dr. Manju Goyal</h3>
                    <p className="text-primary font-semibold">BDS, Cosmetic and Oral Dental Surgeon</p>
                    <p className="text-sm text-muted-foreground mt-2">Ex-consultant, Airforce</p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Dr. Manju Goyal specializes in creating beautiful, healthy smiles. Her artistic eye and gentle approach make her a favorite among patients seeking cosmetic enhancements and general dental care.
                    </p>
                </Card>
            </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-4">
                    <div className="p-4 bg-accent/20 rounded-full mb-4">
                        <BadgeCheck className="h-10 w-10 text-accent"/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Experienced Team</h3>
                    <p className="text-muted-foreground">Both our doctors are former Airforce consultants with a wealth of experience and expertise.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <div className="p-4 bg-primary/20 rounded-full mb-4">
                         <Hospital className="h-10 w-10 text-primary"/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Modern Clinic</h3>
                    <p className="text-muted-foreground">We use the latest technology to ensure efficient, comfortable, and effective treatments.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                    <div className="p-4 bg-purple-500/20 rounded-full mb-4">
                        <Users className="h-10 w-10 text-purple-500"/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Patient-Focused Care</h3>
                    <p className="text-muted-foreground">Your comfort is our priority. We provide personalized care tailored to your unique needs.</p>
                </div>
            </div>
          </div>
      </section>
    </div>
  );
}

