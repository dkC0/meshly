'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const BUSINESS_TYPES = [
  'Restaurant / Hospitality',
  'Legal / Professional Services',
  'Construction / Real Estate',
  'Retail / E-commerce',
  'Technology / Startup',
  'Other',
];

const BUDGETS = [
  '€1,000 – €3,000',
  '€3,000 – €6,000',
  '€6,000 – €12,000',
  '€12,000+',
  "Let's discuss",
];

interface FormData {
  name:         string;
  businessType: string;
  budget:       string;
  message:      string;
}

interface FormErrors {
  name?:    string;
  message?: string;
}

const fade = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '', businessType: '', budget: '', message: '',
  });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const listeningFired = useRef(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'message') {
      // Dispatch listening events for Nav
      if (!listeningFired.current) {
        window.dispatchEvent(new CustomEvent('meshly:listening-start'));
        listeningFired.current = true;
      }
      window.dispatchEvent(new CustomEvent('meshly:typing', { detail: { text: value } }));
      window.dispatchEvent(new CustomEvent('meshly:typing-stop'));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleFocus = useCallback(() => {
    if (!listeningFired.current) {
      window.dispatchEvent(new CustomEvent('meshly:listening-start'));
    }
  }, []);

  const handleBlur = useCallback(() => {
    listeningFired.current = false;
    window.dispatchEvent(new CustomEvent('meshly:typing-stop'));
  }, []);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim())    errs.name    = 'Your name is required';
    if (!formData.message.trim()) errs.message = 'Please tell us about your project';
    return errs;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback to mailto
      const subject = encodeURIComponent(`Project inquiry${formData.businessType ? ` — ${formData.businessType}` : ''}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nBusiness: ${formData.businessType}\nBudget: ${formData.budget}\n\n${formData.message}`
      );
      window.location.href = `mailto:hello@meshly.pl?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, [formData]);

  return (
    <section id="contact" className={styles.section} aria-label="Start a project">
      <div className={styles.inner}>

        {/* Left */}
        <motion.div
          className={styles.left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fade}
        >
          <span className={styles.eyebrow}>Start a project</span>
          <h2 className={styles.headline}>Tell us what you need.</h2>
          <p className={styles.sub}>
            Every engagement begins with a 30-minute discovery call.
            No commitment required. We'll tell you honestly whether
            we're the right studio for your project.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:hello@meshly.pl" className={styles.contactValue}>
                hello@meshly.pl
              </a>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactValue}>Warsaw, Poland</span>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Response</span>
              <span className={styles.contactValue}>Within 24 hours</span>
            </div>
          </div>

          <p className={styles.nda}>
            Happy to sign NDAs for sensitive industry projects.
          </p>
        </motion.div>

        {/* Right — form */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <div className={styles.success} role="status">
              <svg className={styles.successIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="11" stroke="var(--color-copper)" strokeWidth="1.5" />
                <path d="M7 12l3 3 7-7" stroke="var(--color-copper)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={styles.successHeadline}>Message sent.</p>
              <p className={styles.successSub}>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Project enquiry form">

              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Studio or full name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  aria-required="true"
                  autoComplete="name"
                />
                {errors.name && <span className={styles.fieldError} role="alert">{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-type" className={styles.label}>Business type</label>
                <select
                  id="contact-type"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select your industry</option>
                  {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-budget" className={styles.label}>Project budget</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select a range</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Tell us about your project</label>
                <textarea
                  id="contact-message"
                  name="message"
                  ref={textareaRef}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="What does your business need this website to do?"
                  rows={5}
                  className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  aria-required="true"
                />
                {errors.message && <span className={styles.fieldError} role="alert">{errors.message}</span>}
              </div>

              {submitError && (
                <p className={styles.submitError} role="alert">{submitError}</p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
