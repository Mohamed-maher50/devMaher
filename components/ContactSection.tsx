import Image from "next/image";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section className="w-full mb-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full aspect-square bg-linear-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden flex items-center justify-center border border-border">
              <Image
                src={
                  "https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg"
                }
                alt="Contact section"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
