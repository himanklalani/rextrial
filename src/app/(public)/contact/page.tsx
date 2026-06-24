import { ContactCard } from "@/components/ui/ContactCard";
import { ContactForm } from "@/components/features/ContactForm";
import TextType from "@/components/ui/TextType";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Contact Our Printer Experts | Rex International Mumbai",
  description: "Get in touch with Rex International Mumbai for printer repair quotes, corporate AMC enquiries, bulk hardware orders, and on-site service bookings. Mon–Sat 10am–8pm.",
  alternates: { canonical: '/contact' }
};

export default async function ContactPage() {
  return (
    <main className="flex-1 bg-brand-white">
      <section className="py-16 md:py-24 border-b border-brand-gray/20 bg-brand-white-pure">
        <div className="container-inner text-center max-w-3xl mx-auto">
          <TextType 
            as="h1"
            className="heading-section text-4xl md:text-5xl"
            text="Contact Our Experts"
            typingSpeed={50}
            startOnVisible={true}
            loop={false}
          />
          <div className="text-lg md:text-xl text-brand-dark-muted mt-4">
            <ScrollReveal baseOpacity={0} blurStrength={10} enableBlur={true}>
              Whether you are requesting a bulk hardware quotation, looking for a rare dotmatrix component, or need immediate repair services, our team is ready to assist you.
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-inner max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <ContactCard />
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
          
          <div className="mt-16 card-base overflow-hidden border-none shadow-sm h-[450px]">
            <iframe
              src="https://maps.google.com/maps?q=19.1747064,72.9548683&z=17&hl=en&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rex International Location Map"
            />
          </div>
        </div>
      </section>
      <section className="section-padding bg-brand-white-pure">
        <div className="container-inner max-w-5xl">
          <TextType 
            as="h2"
            className="text-3xl font-bold font-outfit text-brand-dark mb-10 text-center flex justify-center w-full"
            text="Support Operations"
            typingSpeed={50}
            startOnVisible={true}
            loop={false}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-brand-white p-8 rounded-2xl border border-brand-gray/20">
              <h3 className="text-xl font-bold font-outfit mb-2 text-brand-dark">Retail & General Inquiry</h3>
              <p className="text-brand-dark-muted mb-4">For immediate single-unit purchases, repair drop-offs, or general troubleshooting, our Mumbai store operates six days a week.</p>
              <div className="text-sm font-semibold tracking-wider text-brand-green uppercase">Mon-Sat: 10:00 AM - 8:00 PM</div>
            </div>
            <div className="bg-brand-white p-8 rounded-2xl border border-brand-gray/20">
              <h3 className="text-xl font-bold font-outfit mb-2 text-brand-dark">Enterprise SLA Support</h3>
              <p className="text-brand-dark-muted mb-4">AMC clients and corporate procurement teams have access to priority dispatch and rapid-response on-site technicians.</p>
              <div className="text-sm font-semibold tracking-wider text-brand-green uppercase">SLA Dependent: Up to 24/7 Coverage</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
