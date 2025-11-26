import { useState, useCallback } from 'react';
import type { ContactFormData } from '@/components/features/contact-form/ContactForm.schema';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbzklwz';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  status: FormStatus;
  errorMessage: string | null;
  submitForm: (data: ContactFormData) => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitForm = useCallback(async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Submission failed with status ${response.status}`
        );
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return {
    status,
    errorMessage,
    submitForm,
    reset,
  };
}
