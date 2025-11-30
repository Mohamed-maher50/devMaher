import { ContactFormData } from "@/components/contact-form";
import emailjs from "@emailjs/browser";
export const SendMail = async (data: ContactFormData) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_JS_SERVICES_ID!,
    process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
    { ...data },
    {
      publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_ID!,
    }
  );
};
