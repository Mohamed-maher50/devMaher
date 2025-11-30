import { useTranslation } from "react-i18next";
import ContactForm from "../components/ContactForm";
import SplitDualLayout from "../components/layout/SplitDualLayout";
import FormImage from "../components/ContactForm/FormImage";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contactMe" className="container mx-auto">
      <h2 className="mb-4 text-4xl text-secondary-content capitalize font-extrabold  ">
        {t("contactForm.contactMe")}📬
      </h2>
      <SplitDualLayout>
        <ContactForm />

        <div className="flex  h-full w-full overflow-hidden  max-md:hidden  items-center justify-center">
          <FormImage />
        </div>
      </SplitDualLayout>
    </section>
  );
};

export default ContactSection;
