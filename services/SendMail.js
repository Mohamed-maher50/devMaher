import emailjs from "@emailjs/browser";
export const SendMail = async (data) => {
  return emailjs.send(
    process.env.REACT_APP_SERVICES_ID,
    process.env.REACT_APP_TEMPLATE_ID,
    { ...data },
    {
      publicKey: process.env.REACT_APP_PUBLIC_ID,
    }
  );
};
