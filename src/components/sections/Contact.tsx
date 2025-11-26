import { Section } from '@/components/layout';
import { SectionHeading, AnimatedElement } from '@/components/common';
import { ContactForm } from '@/components/features/contact-form';
import { contactInfo } from '@/data';

export function Contact() {
  const { phone, email, linkedin, website } = contactInfo;

  return (
    <Section id="contact" className="bg-gray-100 dark:bg-gray-900">
      <AnimatedElement animation="fadeUp">
        <SectionHeading>Get in Touch</SectionHeading>
      </AnimatedElement>
      <AnimatedElement animation="fadeUp" delay={0.1}>
        <p className="mb-8 text-center text-lg">
          Interested in collaborating or have a project in mind? Let&apos;s connect!
        </p>
      </AnimatedElement>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <AnimatedElement animation="slideInLeft" delay={0.2}>
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
            <p>
              <span className="mr-2 font-medium text-[var(--primary-color)]">Phone:</span>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="transition-colors hover:text-[var(--primary-color)]"
              >
                {phone}
              </a>
            </p>
            <p>
              <span className="mr-2 font-medium text-[var(--primary-color)]">Email:</span>
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-[var(--primary-color)]"
              >
                {email}
              </a>
            </p>
            <p>
              <span className="mr-2 font-medium text-[var(--primary-color)]">LinkedIn:</span>
              <a
                href={linkedin.url}
                className="transition-colors hover:text-[var(--primary-color)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkedin.label}
              </a>
            </p>
            <p>
              <span className="mr-2 font-medium text-[var(--primary-color)]">Website:</span>
              <a
                href={website.url}
                className="transition-colors hover:text-[var(--primary-color)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {website.label}
              </a>
            </p>
          </div>
        </AnimatedElement>

        {/* Contact Form */}
        <AnimatedElement animation="slideInRight" delay={0.2}>
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold">Send a Message</h3>
            <ContactForm />
          </div>
        </AnimatedElement>
      </div>
    </Section>
  );
}
