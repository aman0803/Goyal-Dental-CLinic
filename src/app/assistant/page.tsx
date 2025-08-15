
import FaqAssistant from "@/components/FaqAssistant";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AssistantPage() {
  return (
    <>
    <Header />
    <div className="bg-background">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">
              Smart Assistant
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get instant answers to your questions about our clinic, services, and appointments. Our AI assistant is here to help you 24/7.
            </p>
          </div>
          <FaqAssistant />
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
