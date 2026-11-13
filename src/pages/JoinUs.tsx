import { useState, useLayoutEffect, useRef, type FormEvent } from "react";
import { Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./JoinUs.css";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "default" | "loading" | "success" | "error";
type Tier = "Essential" | "Performance" | "Elite";
type Frequency = "monthly" | "yearly";

const goals = [
  "Build Muscle",
  "Lose Weight",
  "Improve Fitness",
  "Increase Strength",
  "Athletic Performance",
  "General Wellness",
];

const experiences = ["Beginner", "Intermediate", "Advanced"];

const timeSlots = [
  "Early Morning",
  "Morning",
  "Afternoon",
  "Evening",
  "Late Night",
];

const tiers: {
  name: Tier;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    name: "Essential",
    price: {
      monthly: 299,
      yearly: 2990,
    },
    description: "Your foundation for a stronger lifestyle.",
    features: [
      "Full gym access",
      "Locker room access",
      "Personal fitness assessment",
      "Standard training hours",
    ],
  },
  {
    name: "Performance",
    price: {
      monthly: 499,
      yearly: 4990,
    },
    description: "More flexibility. More progress.",
    featured: true,
    features: [
      "Everything in Essential",
      "Priority class booking",
      "Monthly progress review",
      "Extended access hours",
      "Guest pass every month",
    ],
  },
  {
    name: "Elite",
    price: {
      monthly: 799,
      yearly: 7990,
    },
    description: "A premium training experience.",
    features: [
      "Everything in Performance",
      "Personal training session",
      "Recovery area access",
      "Priority support",
      "Exclusive member events",
    ],
  },
];

const faqs = [
  {
    question: "When will my membership begin?",
    answer:
      "You can select your preferred activation date during registration. Our team will confirm the details after reviewing your application.",
  },
  {
    question: "Can I change my membership tier later?",
    answer:
      "Yes. You can request an upgrade or a change to your membership tier by contacting the SOUIFER FITNESS team.",
  },
  {
    question: "Can I pause my membership?",
    answer:
      "Membership pause requests are subject to the membership terms. Contact our team for the available options.",
  },
  {
    question: "Is a fitness assessment included?",
    answer:
      "A personal fitness assessment is included with the membership options described above. The team will arrange the details with you.",
  },
];

function getLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatPrice(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export default function JoinUs() {
  const pageRef = useRef<HTMLElement>(null);
  const previousBilling = useRef<Frequency>("monthly");

  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get("plan");
  const initialBilling = searchParams.get("billing");

  const validPlan = tiers.some((tier) => tier.name === initialPlan);
  const validBilling =
    initialBilling === "yearly" || initialBilling === "monthly";

  const [status, setStatus] = useState<FormStatus>("default");
  const [selectedGoal, setSelectedGoal] = useState("Build Muscle");
  const [selectedExperience, setSelectedExperience] = useState("Beginner");
  const [selectedTimes, setSelectedTimes] = useState<string[]>(["Evening"]);

  const [selectedTier, setSelectedTier] = useState<Tier>(
    validPlan ? (initialPlan as Tier) : "Performance",
  );

  const [billing, setBilling] = useState<Frequency>(
    validBilling ? (initialBilling as Frequency) : "monthly",
  );

  const [activationDate, setActivationDate] = useState("2027-04-01");
  const [notes, setNotes] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  // Main page GSAP animations
  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          ".join-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          ".join-hero-copy h1",
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
          ".join-hero-copy > p",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.55",
        )
        .fromTo(
          ".join-hero-actions > *",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4",
        )
        .fromTo(
          ".join-hero-visual",
          {
            opacity: 0,
            scale: 1.1,
            clipPath: "inset(0 0 0 100%)",
          },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.2,
          },
          "-=1",
        )
        .fromTo(
          ".hero-image-caption, .hero-vertical-label, .hero-index",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .fromTo(
          ".join-hero-bottom",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        );

      const reveal = (
        selector: string,
        options: {
          y?: number;
          x?: number;
          scale?: number;
          duration?: number;
        } = {},
      ) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, page);

        elements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: options.y ?? 45,
              x: options.x ?? 0,
              scale: options.scale ?? 1,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: options.duration ?? 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      };

      reveal(".application-intro > div", { x: -45 });
      reveal(".application-intro > p", { x: 45 });
      reveal(".form-section", { y: 55, duration: 0.9 });
      reveal(".field", { y: 25, duration: 0.65 });

      reveal(".choice-button, .experience-card, .time-pill", {
        y: 20,
        duration: 0.55,
      });

      reveal(".tier-card", {
        y: 60,
        scale: 0.96,
        duration: 0.85,
      });

      reveal(".selected-membership", { y: 25 });
      reveal(".intake-card", { x: 40 });
      reveal(".process-card", { x: 40 });
      reveal(".tier-frequency", { y: 20, duration: 0.7 });

      gsap.utils
        .toArray<HTMLElement>(".sidebar-image", page)
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              opacity: 0,
              scale: 1.12,
              clipPath: "inset(10% 10% 10% 10%)",
            },
            {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      // Intake counter
      const intakeNumber = page.querySelector<HTMLElement>(
        ".intake-number strong",
      );

      if (intakeNumber) {
        const counter = { value: 0 };
        const target = Number(intakeNumber.dataset.count ?? 82);

        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            intakeNumber.textContent = `${Math.round(counter.value)}`;
          },
          scrollTrigger: {
            trigger: intakeNumber,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Intake progress bar
      const progressBar = page.querySelector<HTMLElement>(
        ".intake-progress span",
      );

      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { width: "0%" },
          {
            width: "82%",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".intake-progress",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Membership price counters
      gsap.utils
        .toArray<HTMLElement>(".tier-price strong", page)
        .forEach((priceElement) => {
          const target = Number(priceElement.dataset.count);

          if (!target) return;

          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              priceElement.textContent = formatPrice(counter.value);
            },
            scrollTrigger: {
              trigger: priceElement,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

      reveal(".faq-heading > *", { y: 30, duration: 0.7 });
      reveal(".faq-item", { y: 25, duration: 0.65 });
      reveal(".join-final-cta > *", { y: 35, duration: 0.8 });
      reveal(".footer-main > *", { y: 35, duration: 0.75 });
      reveal(".footer-bottom > *", { y: 20, duration: 0.6 });

      // Hero parallax
      gsap.to(".join-hero-visual", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".join-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll indicator
      gsap.to(".hero-scroll-line", {
        scaleY: 0.4,
        transformOrigin: "top",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });

      ScrollTrigger.refresh();
    }, page);

    return () => ctx.revert();
  }, []);

  // Animate membership prices when switching billing
  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const oldBilling = previousBilling.current;

    if (oldBilling === billing) return;

    const priceElements =
      page.querySelectorAll<HTMLElement>(".tier-price strong");

    priceElements.forEach((element, index) => {
      const tier = tiers[index];

      if (!tier) return;

      const oldPrice = tier.price[oldBilling];
      const newPrice = tier.price[billing];

      gsap.killTweensOf(element);

      const counter = { value: oldPrice };

      element.textContent = formatPrice(oldPrice);

      gsap.to(counter, {
        value: newPrice,
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => {
          element.textContent = formatPrice(counter.value);
        },
        onComplete: () => {
          element.textContent = formatPrice(newPrice);
        },
      });

      gsap.fromTo(
        element,
        {
          y: 10,
          opacity: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    });

    previousBilling.current = billing;
  }, [billing]);

  const toggleTime = (time: string) => {
    setSelectedTimes((current) =>
      current.includes(time)
        ? current.filter((item) => item !== time)
        : [...current, time],
    );
  };

  const setDatePreset = (preset: "today" | "monday" | "month") => {
    const date = new Date();

    if (preset === "monday") {
      const daysUntilMonday = (8 - date.getDay()) % 7 || 7;
      date.setDate(date.getDate() + daysUntilMonday);
    }

    if (preset === "month") {
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
    }

    setActivationDate(getLocalDate(date));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedTimes.length === 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    setNewsletterMessage("Thanks for subscribing!");
    setNewsletterEmail("");
  };

  const selectedTierDetails = tiers.find((tier) => tier.name === selectedTier);

  return (
    <main className="join-page" ref={pageRef}>
      {/* HERO */}
      <section className="join-hero" id="home">
        <div className="join-hero-grid">
          <div className="join-hero-copy">
            <div className="join-eyebrow">
              <span className="status-dot" />
              MEMBERSHIP APPLICATION / 2027
            </div>

            <h1>
              YOUR NEXT
              <br />
              LEVEL
              <br />
              <span>STARTS HERE.</span>
            </h1>

            <p>
              More than a gym. A space built for discipline, progress, and the
              person you're becoming.
            </p>

            <div className="join-hero-actions">
              <a
                href="#application"
                className="join-button join-button-primary"
              >
                START YOUR APPLICATION <span>↗</span>
              </a>

              <a href="#membership" className="join-text-link">
                EXPLORE MEMBERSHIPS <span>↓</span>
              </a>
            </div>
          </div>

          <div className="join-hero-visual">
            <div className="hero-image-overlay" />
            <div className="hero-vertical-label">BUILT THROUGH DISCIPLINE</div>
            <div className="hero-image-caption">
              <span>01 — THE MINDSET</span>
              <strong>NO SHORTCUTS.</strong>
            </div>
            <div className="hero-index">31°37' N / 07°59' W</div>
          </div>
        </div>

        <div className="join-hero-bottom">
          <span>SCROLL TO BEGIN</span>
          <span className="hero-scroll-line" />
          <span>01 / 04</span>
        </div>
      </section>

      {/* APPLICATION INTRO */}
      <section className="application-intro" id="application">
        <div>
          <span className="section-kicker">01 / YOUR APPLICATION</span>
          <h2>
            LET'S BUILD
            <br />
            <span>YOUR ROUTINE.</span>
          </h2>
        </div>

        <p>
          Tell us a little about yourself, your goals, and how you want to
          train. We'll use this information to help you find the right
          membership.
        </p>
      </section>

      {/* APPLICATION LAYOUT */}
      <section className="application-layout">
        <form className="membership-form" onSubmit={handleSubmit}>
          {/* PERSONAL INFORMATION */}
          <div className="form-section">
            <div className="form-section-heading">
              <div>
                <span className="section-kicker">01.01 / THE BASICS</span>
                <h3>Personal information</h3>
              </div>
              <span className="required-note">* REQUIRED FIELDS</span>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>First name *</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  autoComplete="given-name"
                  required
                />
              </label>

              <label className="field">
                <span>Last name *</span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  autoComplete="family-name"
                  required
                />
              </label>

              <label className="field">
                <span>Email address *</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="field">
                <span>Phone number *</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+212 6 00 00 00 00"
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="field">
                <span>Date of birth *</span>
                <input
                  type="date"
                  name="birthDate"
                  autoComplete="bday"
                  required
                />
              </label>

              <label className="field">
                <span>City *</span>
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  autoComplete="address-level2"
                  required
                />
              </label>
            </div>
          </div>

          {/* TRAINING PREFERENCES */}
          <div className="form-section">
            <div className="form-section-heading">
              <div>
                <span className="section-kicker">01.02 / YOUR DIRECTION</span>
                <h3>Training preferences</h3>
              </div>
              <span className="step-number">02</span>
            </div>

            <div className="field-block">
              <span className="field-label">What's your primary goal?</span>

              <div className="choice-grid">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`choice-button ${
                      selectedGoal === goal ? "selected" : ""
                    }`}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    <span className="choice-indicator" />
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <span className="field-label">Your training experience</span>

              <div className="experience-options">
                {experiences.map((experience, index) => (
                  <button
                    key={experience}
                    type="button"
                    className={`experience-card ${
                      selectedExperience === experience ? "selected" : ""
                    }`}
                    onClick={() => setSelectedExperience(experience)}
                  >
                    <span className="experience-index">0{index + 1}</span>
                    <strong>{experience}</strong>
                    <span className="experience-check">
                      {selectedExperience === experience ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <span className="field-label">When do you prefer to train?</span>

              <p className="field-hint">
                Select all time slots that work for you.
              </p>

              <div className="time-options">
                {timeSlots.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`time-pill ${
                      selectedTimes.includes(time) ? "selected" : ""
                    }`}
                    onClick={() => toggleTime(time)}
                  >
                    <span>{selectedTimes.includes(time) ? "✓" : "+"}</span>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MEMBERSHIP TIER */}
          <div className="form-section" id="membership">
            <div className="form-section-heading">
              <div>
                <span className="section-kicker">01.03 / CHOOSE YOUR PLAN</span>
                <h3>Membership tier</h3>
              </div>
              <span className="step-number">03</span>
            </div>

            {/* MONTHLY / YEARLY SWITCH */}
            <div className="tier-frequency">
              <div className="tier-frequency-copy">
                <span>CHOOSE YOUR BILLING</span>
                <p>Choose how you want to pay for your membership.</p>
              </div>

              <div
                className="tier-frequency-switch"
                role="group"
                aria-label="Membership billing frequency"
              >
                <button
                  type="button"
                  className={billing === "monthly" ? "active" : ""}
                  onClick={() => setBilling("monthly")}
                  aria-pressed={billing === "monthly"}
                >
                  MONTHLY
                </button>

                <button
                  type="button"
                  className={billing === "yearly" ? "active" : ""}
                  onClick={() => setBilling("yearly")}
                  aria-pressed={billing === "yearly"}
                >
                  YEARLY
                  <span>2 MONTHS FREE</span>
                </button>
              </div>
            </div>

            <div className="tier-grid">
              {tiers.map((tier, index) => {
                const isSelected = selectedTier === tier.name;
                const currentPrice = tier.price[billing];

                return (
                  <article
                    key={tier.name}
                    className={`tier-card ${
                      tier.featured ? "tier-card-featured" : ""
                    } ${isSelected ? "tier-card-selected" : ""}`}
                  >
                    {tier.featured && (
                      <span className="tier-featured-label">MOST POPULAR</span>
                    )}

                    {isSelected && (
                      <span
                        className="tier-selected-icon"
                        aria-label="Selected"
                      >
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                    )}

                    <div className="tier-card-top">
                      <span className="tier-index">0{index + 1}</span>
                      <h4>{tier.name}</h4>
                      <p>{tier.description}</p>
                    </div>

                    <div className="tier-price">
                      <strong data-count={currentPrice}>
                        {formatPrice(currentPrice)}
                      </strong>
                      <span>DH</span>
                      <small>
                        / {billing === "monthly" ? "MONTH" : "YEAR"}
                      </small>
                    </div>

                    {billing === "yearly" && (
                      <span className="tier-yearly-note">
                        2 MONTHS FREE WITH YEARLY BILLING
                      </span>
                    )}

                    <div className="tier-divider" />

                    <ul className="tier-features">
                      {tier.features.map((feature) => (
                        <li key={feature}>
                          <Check size={15} strokeWidth={2} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`tier-select-button ${
                        isSelected ? "tier-select-button-active" : ""
                      }`}
                      onClick={() => setSelectedTier(tier.name)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <>
                          SELECTED
                          <Check size={16} strokeWidth={2.5} />
                        </>
                      ) : (
                        <>
                          SELECT PLAN
                          <span>↗</span>
                        </>
                      )}
                    </button>
                  </article>
                );
              })}
            </div>

            {/* SELECTED MEMBERSHIP SUMMARY */}
            <div className="selected-membership">
              <span className="selected-membership-icon">
                <Check size={17} />
              </span>

              <div>
                <span className="selected-membership-label">
                  YOUR SELECTED MEMBERSHIP
                </span>
                <strong>
                  {selectedTier} /{" "}
                  {billing === "monthly" ? "MONTHLY" : "YEARLY"}
                </strong>
              </div>

              <span className="selected-membership-price">
                {formatPrice(selectedTierDetails?.price[billing] ?? 0)} DH
                <small>/ {billing === "monthly" ? "MONTH" : "YEAR"}</small>
              </span>
            </div>
          </div>

          {/* SCHEDULE AND VERIFICATION */}
          <div className="form-section">
            <div className="form-section-heading">
              <div>
                <span className="section-kicker">01.04 / FINAL DETAILS</span>
                <h3>Schedule & verification</h3>
              </div>
              <span className="step-number">04</span>
            </div>

            <div className="field-block">
              <label className="field">
                <span>Preferred activation date *</span>
                <input
                  type="date"
                  value={activationDate}
                  onChange={(event) => setActivationDate(event.target.value)}
                  required
                />
              </label>

              <div className="date-presets">
                <button type="button" onClick={() => setDatePreset("today")}>
                  Immediately
                </button>
                <button type="button" onClick={() => setDatePreset("monday")}>
                  Next Monday
                </button>
                <button type="button" onClick={() => setDatePreset("month")}>
                  Next Month
                </button>
              </div>
            </div>

            <div className="field-block">
              <label className="field">
                <span>Anything we should know?</span>
                <textarea
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value.slice(0, 500))
                  }
                  maxLength={500}
                  rows={5}
                  placeholder="Tell us about your goals, preferences, or anything you'd like our team to know..."
                />
              </label>

              <div className="textarea-footer">
                <span>OPTIONAL INFORMATION</span>
                <span>{notes.length} / 500</span>
              </div>
            </div>

            <div className="form-consent">
              <label className="checkbox-row">
                <input type="checkbox" required />
                <span className="custom-checkbox" />
                <span>
                  I have read and agree to the membership terms and conditions.
                  <b> *</b>
                </span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" required />
                <span className="custom-checkbox" />
                <span>
                  I confirm that the information provided in this application is
                  accurate.
                  <b> *</b>
                </span>
              </label>
            </div>

            <div className="security-note">
              <span className="security-icon">◇</span>
              <div>
                <strong>YOUR INFORMATION MATTERS.</strong>
                <p>
                  Your application details are used only to process your
                  membership request. Do not submit sensitive medical or
                  financial information through this demo form.
                </p>
              </div>
            </div>

            {status === "error" && (
              <p className="form-message error-message" role="alert">
                Please select at least one preferred training time.
              </p>
            )}

            {status === "success" && (
              <div className="form-success" role="status">
                <span>✓</span>
                <div>
                  <strong>APPLICATION COMPLETED</strong>
                  <p>
                    This is a demo confirmation. No application has been sent to
                    a server.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="join-button submit-button"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? (
                <>
                  PROCESSING APPLICATION
                  <span className="button-spinner" />
                </>
              ) : status === "success" ? (
                <>
                  APPLICATION COMPLETE <span>✓</span>
                </>
              ) : (
                <>
                  SUBMIT APPLICATION <span>↗</span>
                </>
              )}
            </button>

            <p className="submit-caption">
              BY SUBMITTING, YOU AGREE TO BE CONTACTED ABOUT YOUR APPLICATION.
            </p>
          </div>
        </form>

        {/* SIDEBAR */}
        <aside className="application-sidebar">
          <div className="sidebar-card intake-card">
            <span className="section-kicker">LIVE INTAKE STATUS</span>

            <div className="intake-number">
              <strong data-count="82">82</strong>
              <span>%</span>
            </div>

            <div className="intake-progress">
              <span />
            </div>

            <div className="intake-meta">
              <span>18 / 100 PASSES LEFT</span>
              <span>LIMITED</span>
            </div>

            <p>
              Membership availability may change. Submit your application to
              begin the review process.
            </p>
          </div>

          <div className="sidebar-image">
            <div className="sidebar-image-content">
              <span>THE SOUIFER STANDARD</span>
              <strong>SHOW UP.</strong>
              <strong>LEVEL UP.</strong>
            </div>
          </div>

          <div className="sidebar-card process-card" id="process">
            <span className="section-kicker">WHAT HAPPENS NEXT</span>

            <div className="process-step">
              <span>01</span>
              <div>
                <strong>Application review</strong>
                <p>Our team reviews your membership details.</p>
              </div>
            </div>

            <div className="process-step">
              <span>02</span>
              <div>
                <strong>Personal contact</strong>
                <p>We'll contact you to discuss the next steps.</p>
              </div>
            </div>

            <div className="process-step">
              <span>03</span>
              <div>
                <strong>Welcome to SOUIFER</strong>
                <p>Complete your registration and start training.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section className="join-faq" id="faq">
        <div className="faq-heading">
          <span className="section-kicker">02 / NEED TO KNOW</span>

          <h2>
            QUESTIONS?
            <br />
            <span>WE'VE GOT YOU.</span>
          </h2>

          <p>A few things worth knowing before you take the next step.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${openFaq === index ? "active" : ""}`}
              key={faq.question}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                <span className="faq-index">0{index + 1}</span>
                <strong>{faq.question}</strong>
                <span className="faq-toggle">
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>

              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="join-final-cta">
        <span className="section-kicker">YOUR MOVE / YOUR FUTURE</span>

        <h2>
          MAKE THE
          <br />
          <span>COMMITMENT.</span>
        </h2>

        <a href="#application" className="join-button join-button-primary">
          BECOME A MEMBER <span>↗</span>
        </a>

        <div className="final-cta-decoration">S / F</div>
      </section>

      {/* FOOTER */}
      <footer className="join-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="join-logo" href="#home">
              SOUIFER<span>.</span>
              <small>FITNESS CLUB</small>
            </a>

            <p>
              Built on discipline.
              <br />
              Driven by progress.
            </p>
          </div>

          <div className="footer-links">
            <span className="section-kicker">EXPLORE</span>
            <a href="#home">Home</a>
            <a href="#membership">Membership</a>
            <a href="#process">The process</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-links">
            <span className="section-kicker">GET IN TOUCH</span>
            <a href="mailto:hello@souifer.com">Email us ↗</a>
            <a href="#application">Join SOUIFER</a>
            <a href="#home">Back to top ↑</a>
          </div>

          <div className="footer-newsletter">
            <span className="section-kicker">STAY IN THE LOOP</span>

            <p>Updates, training insights, and club news.</p>

            <form onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                required
              />

              <button type="submit" aria-label="Subscribe">
                ↗
              </button>
            </form>

            {newsletterMessage && (
              <span className="newsletter-message">{newsletterMessage}</span>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2027 SOUIFER FITNESS. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR PROGRESS.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
