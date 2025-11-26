import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks';
import { contactFormSchema, type ContactFormData } from './ContactForm.schema';

export function ContactForm() {
  const { status, errorMessage, submitForm, reset } = useContactForm();
  const successMessageRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<HTMLDivElement>(null);

  const form = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    await submitForm(data);
  };

  // Focus success/error messages for screen readers
  useEffect(() => {
    if (status === 'success' && successMessageRef.current) {
      successMessageRef.current.focus();
    } else if (status === 'error' && errorMessageRef.current) {
      errorMessageRef.current.focus();
    }
  }, [status]);

  const handleReset = () => {
    form.reset();
    reset();
  };

  if (status === 'success') {
    return (
      <div
        ref={successMessageRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20"
      >
        <CheckCircle2
          className="mx-auto mb-4 h-12 w-12 text-green-600 dark:text-green-400"
          aria-hidden="true"
        />
        <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
          Message Sent Successfully!
        </h3>
        <p className="mb-4 text-green-700 dark:text-green-300">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button type="button" variant="outline" onClick={handleReset}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
        aria-label="Contact form"
      >
        {status === 'error' && (
          <div
            ref={errorMessageRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-900/20"
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">
                Failed to send message
              </p>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {errorMessage || 'Please try again later.'}
              </p>
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Message <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can I help you?"
                  rows={5}
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span>Sending...</span>
              <span className="sr-only">Please wait while your message is being sent</span>
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
