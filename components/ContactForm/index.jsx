import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { SendMail } from "../../services/SendMail";
import { toast } from "react-toastify";
import FormLabel from "../../FormLabel";
import FormInput from "../FormInput";
import LoveIcon from "../../assets/Loveicon.svg";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactForm = ({ dir }) => {
  const { t } = useTranslation();
  const email = useRef();
  const message = useRef();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const res = SendMail({
      message: message.current.value,
      email: email.current.value,
    });
    toast.promise(res, {
      success: {
        render: () => {
          email.current.value = "";
          message.current.value = "";
          return dir === "rtl"
            ? "تم ارسال الرساله بنجاح 💌"
            : "Message sent successfully! 🤩";
        },
      },
      error:
        dir === "rtl" ? "فشل الارسال 🥺" : "Send failed. Please try again. 🥺",
      pending:
        dir === "rtl" ? "جر إسال الرساله 😁" : "Sending your message... 😁 ",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmitForm}
      className="space-y-8 rounded-lg my-4  shadow-md bg-white p-2"
    >
      <div>
        <FormLabel htmlFor="email">{t("contactForm.email")}📧</FormLabel>

        <FormInput
          type="email"
          placeholder={t("contactForm.emailPlaceholder")}
          id="email"
          ref={email}
          required
        />
      </div>
      <div className="sm:col-span-2">
        <FormLabel htmlFor="message"> {t("contactForm.message")} 💌</FormLabel>
        <textarea
          ref={message}
          id="message"
          rows="6"
          className="block p-2.5 min-h-[200px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={t("contactForm.messagePlaceholder")}
        ></textarea>
      </div>
      <button className="btn btn-accent  text-primary shadow-md">
        <Image
          width={24}
          height={24}
          src={LoveIcon}
          className="w-6 h-6"
          alt="love icon"
        />

        {t("contactForm.send")}
      </button>
    </motion.form>
  );
};
{
}
export default ContactForm;
