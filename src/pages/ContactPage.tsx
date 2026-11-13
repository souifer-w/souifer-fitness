import { useState, useRef, useLayoutEffect, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactPage.css";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  {
    name: "Marrakech",
    number: "01",
    description: "Our main fitness community.",
  },
  {
    name: "Rabat",
    number: "02",
    description: "Training and personal coaching.",
  },
  {
    name: "Casablanca",
    number: "03",
    description: "Fitness for every level.",
  },
];

const subjects = [
  "Membership",
  "Personal Training",
  "Training Programs",
  "Pricing",
  "Other",
];

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);

  const [selectedCity, setSelectedCity] = useState("Marrakech");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Membership",
    message: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (
      !page ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          ".contact-eyebrow",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          },
        )
        .fromTo(
          ".contact-hero h1",
          {
            opacity: 0,
            y: 65,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
          },
          "-=0.35",
        )
        .fromTo(
          ".contact-hero .contact-container > p",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.55",
        )
        .fromTo(
          ".contact-hero-button",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4",
        );

      // Reusable scroll reveal
      const reveal = (
        selector: string,
        options: {
          y?: number;
          x?: number;
          duration?: number;
          stagger?: number;
        } = {},
      ) => {
        const elements = page.querySelectorAll<HTMLElement>(selector);

        elements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: options.y ?? 35,
              x: options.x ?? 0,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: options.duration ?? 0.85,
              ease: "power3.out",
              delay: options.stagger ? 0 : 0,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      };

      // Contact information
      reveal(".contact-info > .contact-eyebrow", {
        y: 20,
        duration: 0.7,
      });

      reveal(".contact-info h2", {
        y: 45,
        duration: 0.9,
      });

      reveal(".contact-info > p", {
        y: 25,
        duration: 0.8,
      });

      // Information steps
      const infoItems = page.querySelectorAll(".contact-info-item");

      gsap.fromTo(
        infoItems,
        {
          opacity: 0,
          x: -35,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Contact form card
      gsap.fromTo(
        ".contact-form-card",
        {
          opacity: 0,
          y: 65,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-card",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form heading
      reveal(".form-heading > *", {
        y: 20,
        duration: 0.7,
      });

      // Form fields
      const fields = page.querySelectorAll(".contact-input-group");

      gsap.fromTo(
        fields,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-card form",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      reveal(".contact-submit", {
        y: 20,
        duration: 0.7,
      });

      // Bottom CTA
      gsap.fromTo(
        ".contact-bottom > div",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-bottom",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".contact-bottom > a",
        {
          opacity: 0,
          x: 35,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-bottom",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      ScrollTrigger.refresh();
    }, page);

    return () => ctx.revert();
  }, []);

  // Success message entrance
  useLayoutEffect(() => {
    if (!isSubmitted) return;

    const page = pageRef.current;

    if (
      !page ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-success > *",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, page);

    return () => ctx.revert();
  }, [isSubmitted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "Membership",
      message: "",
    });

    setIsSubmitted(false);
  };

  return (
    <main className="contact-page" ref={pageRef}>
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-container">
          <span className="contact-eyebrow">CONTACT SOUIFER FITNESS</span>

          <h1>
            Let's build a <span>stronger</span> you.
          </h1>

          <p>
            Have a question about membership, personal training, or our
            programs? We're here to help you get started.
          </p>

          <a href="#contact-form" className="contact-hero-button">
            Get in touch <span>↗</span>
          </a>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        className="contact-container contact-form-section"
        id="contact-form"
      >
        <div className="contact-info">
          <span className="contact-eyebrow">GET IN TOUCH</span>

          <h2>
            We're ready to <span>help.</span>
          </h2>

          <p>
            Tell us what you're looking for. Our team will help you find the
            right membership or training program.
          </p>

          <div className="contact-info-item">
            <span className="info-icon">01</span>
            <div>
              <h3>Choose your location</h3>
              <p>Marrakech, Rabat or Casablanca.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="info-icon">02</span>
            <div>
              <h3>Tell us what you need</h3>
              <p>Membership, coaching or general questions.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="info-icon">03</span>
            <div>
              <h3>We'll get back to you</h3>
              <p>Our team will follow up about your request.</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {!isSubmitted ? (
            <>
              <div className="form-heading">
                <span className="contact-eyebrow">CONTACT FORM</span>
                <h2>Send us a message.</h2>
                <p>Fill in the details below and we'll be in touch.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="contact-input-group">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-city">Your city</label>
                  <select
                    id="contact-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-subject">
                    What can we help with?
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-message">Your message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={500}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    required
                  />

                  <span className="message-counter">
                    {form.message.length}/500
                  </span>
                </div>

                <button className="contact-submit" type="submit">
                  Send message <span>↗</span>
                </button>

                <p className="form-note">
                  By submitting this form, you agree to be contacted about your
                  request.
                </p>
              </form>
            </>
          ) : (
            <div className="contact-success">
              <span className="success-check">✓</span>

              <span className="contact-eyebrow">MESSAGE READY</span>

              <h2>Thank you!</h2>

              <p>
                Your form has been completed successfully. Connect it to your
                backend or email service to receive real client messages.
              </p>

              <button type="button" onClick={resetForm}>
                Send another message
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="contact-container contact-bottom">
        <div>
          <span className="contact-eyebrow">YOUR NEXT STEP</span>
          <h2>
            Ready to start <span>training?</span>
          </h2>
          <p>Take the first step towards your fitness goals.</p>
        </div>

        <a href="/membership">
          Explore membership <span>↗</span>
        </a>
      </section>
    </main>
  );
}
