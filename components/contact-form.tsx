"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendMail } from "@/lib/Mailer";
import { toast } from "sonner";

// 1️⃣ schema أساسي بدون رسائل ديناميكية
export const contactFormBaseSchema = z.object({
  name: z.string().optional(),
  email: z.email(), // الرسائل ستضاف لاحقًا
  message: z.string().min(10),
});

// 2️⃣ تصدير النوع مباشرة

// 3️⃣ دالة لإنشاء schema مع رسائل مترجمة

export const useContactFormSchema = () => {
  const t = useTranslations("contact");

  return z.object({
    name: z.string().optional(),
    email: z.email(t("emailError")),
    message: z.string().min(10, t("messageError")),
  });
};
export type ContactFormData = z.infer<ReturnType<typeof useContactFormSchema>>;

export function ContactForm() {
  const t = useTranslations("contact");
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const schema = useContactFormSchema();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = SendMail(data);
      toast.promise(res, {
        loading: t("sending"),
        success: () => {
          return t("successMessage");
        },
        error: t("errorMessage"),
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{t("title")}</h2>
          <p className="text-muted-foreground font-inter rtl:font-Tajawal font-medium">
            {t("subtitle")}
          </p>
        </div>

        {/* Success Message */}
        {form.formState.isSubmitSuccessful && (
          <div
            className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-100 animate-in fade-in slide-in-from-top-2"
            role="alert"
            aria-live="polite"
          >
            {t("successMessage")}
          </div>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="rtl:font-cairo font-sora">
                {t("name")}
                <span className="text-muted-foreground text-xs">
                  ({t("optional")})
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("namePlaceholder")}
                  className="rtl:font-Tajawal font-inter placeholder:font-inter rtl:placeholder:font-Tajawal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="rtl:font-cairo font-sora">
                {t("email")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className=" rtl:placeholder:font-Tajawal placeholder:font-inter font-inter"
                  placeholder={t("emailPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="rtl:font-cairo font-inter">
                {t("message")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="rtl:placeholder:font-Tajawal placeholder:font-inter"
                  placeholder={t("messagePlaceholder")}
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full font-cairo!"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? t("sending") : t("send")}
        </Button>
      </form>
    </Form>
  );
}
