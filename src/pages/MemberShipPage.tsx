import { Fragment, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./MembershipPage.css";
import { PricingSection } from "../components/PricingSection";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    number: "01",
    icon: "group_off",
    title: "Zero Congestion Policy",
    description:
      "Every facility strictly limits active memberships. We maintain a controlled occupancy level so you spend less time waiting and more time training.",
    footer: "CAPPED ENROLLMENT PER SQUARE METER",
  },
  {
    number: "02",
    icon: "query_stats",
    title: "Precision Telemetry",
    description:
      "Training platforms and performance tools help you monitor bar velocity, power output, and training progress through your performance dashboard.",
    footer: "INTEGRATED PERFORMANCE TRACKING",
  },
  {
    number: "03",
    icon: "ac_unit",
    title: "Recovery Suite",
    description:
      "Recover after demanding sessions with access to dedicated recovery spaces, sauna facilities, infrared experiences, and cold immersion.",
    footer: "RECOVERY AND WELLNESS FACILITIES",
  },
  {
    number: "04",
    icon: "clinical_notes",
    title: "Expert Coaching",
    description:
      "Get guidance from experienced coaches who help you build a structured training plan and improve your performance over time.",
    footer: "PERSONALIZED COACHING",
  },
];

const comparisonGroups = [
  {
    title: "01 // ACCESS & FACILITIES",
    rows: [
      ["24/7 Facility Access", "✓", "✓", "✓"],
      ["Access to All Facilities", "—", "—", "✓"],
      ["Guest Privileges", "—", "1 / month", "4 / month"],
    ],
  },
  {
    title: "02 // PERFORMANCE & DIAGNOSTICS",
    rows: [
      ["Performance Tracking", "✓", "✓", "✓"],
      ["Performance Assessment", "Onboarding", "Bi-weekly", "Unlimited"],
      ["VO2 Max Analysis", "—", "Quarterly", "Monthly"],
      ["Body Composition Scan", "—", "1 Scan", "Quarterly"],
    ],
  },
  {
    title: "03 // RECOVERY & WELLNESS",
    rows: [
      ["Cryotherapy Sessions", "€25 / session", "4 / month", "Unlimited"],
      ["Sauna & Cold Plunge", "✓", "✓", "✓"],
      ["Compression Recovery", "—", "✓", "✓"],
    ],
  },
  {
    title: "04 // COACHING & AMENITIES",
    rows: [
      ["Personal Coaching", "—", "2 Sessions", "4 / month"],
      ["Dedicated Locker", "Day use", "Assigned", "Full Valet"],
      ["Post-workout Shake Bar", "A La Carte", "10% Off", "Complimentary"],
    ],
  },
];

const onboardingSteps = [
  {
    number: "01",
    days: "DAYS 01 – 03",
    title: "Baseline Assessment",
    description:
      "A movement screening and initial fitness assessment to understand your current level and training goals.",
    deliverable: "DELIVERABLE: INITIAL ASSESSMENT",
  },
  {
    number: "02",
    days: "DAYS 04 – 06",
    title: "Personal Training Blueprint",
    description:
      "A structured training roadmap tailored to your goals, experience, and recovery needs.",
    deliverable: "DELIVERABLE: CUSTOM PROGRAM",
  },
  {
    number: "03",
    days: "DAYS 07 – 09",
    title: "Performance Integration",
    description:
      "Set up your member profile and connect your training progress with the Souifer performance dashboard.",
    deliverable: "DELIVERABLE: PROFILE CONNECTED",
  },
  {
    number: "04",
    days: "DAYS 10 – 14",
    title: "Training Execution",
    description:
      "Start your training plan with coaching guidance, progress tracking, and recovery recommendations.",
    deliverable: "DELIVERABLE: FIRST CYCLE STARTED",
  },
];

const faqs = [
  {
    question: "How does the membership cap and waiting list operate?",
    answer:
      "Membership availability depends on the capacity of the facility. If all places are allocated, you can contact our team to ask about the next available membership.",
  },
  {
    question: "Can I freeze or pause my membership during travel?",
    answer:
      "Membership pause conditions depend on the selected plan. Contact our team before your next billing date to discuss the available options.",
  },
  {
    question: "Are personal training sessions included?",
    answer:
      "The Performance Pro and Black Card plans include additional coaching benefits. The exact number of sessions is displayed in the membership comparison table.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation conditions depend on your selected membership and billing cycle. Please contact the Souifer Fitness team before purchasing to confirm the applicable terms.",
  },
  {
    question: "Can I visit the gym before committing?",
    answer:
      "Yes. Contact our team to arrange a facility tour and learn more about the training spaces, equipment, and membership options.",
  },
];

function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pageRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const revealActions = "play reverse play reverse";

        // Pricing entrance
        gsap.fromTo(
          ".pricing-section",
          {
            autoAlpha: 0,
            y: 45,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "all",
          },
        );

        // Section headings
        gsap.utils
          .toArray<HTMLElement>(".membership-section-heading")
          .forEach((heading) => {
            const title = heading.querySelector("h2");
            const label = heading.querySelector(".membership-section-label");
            const description = heading.querySelector("p");

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: revealActions,
              },
            });

            if (label) {
              tl.fromTo(
                label,
                { autoAlpha: 0, y: 15 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
              );
            }

            if (title) {
              tl.fromTo(
                title,
                { autoAlpha: 0, y: 45 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                },
                "-=0.25",
              );
            }

            if (description) {
              tl.fromTo(
                description,
                { autoAlpha: 0, y: 25 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                },
                "-=0.4",
              );
            }
          });

        // Benefits cards
        gsap.fromTo(
          ".membership-benefit-card",
          {
            autoAlpha: 0,
            y: 65,
            rotateX: 8,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".membership-benefits-grid",
              start: "top 82%",
              toggleActions: revealActions,
            },
          },
        );

        // Comparison table
        gsap.fromTo(
          ".comparison-table-wrapper",
          {
            autoAlpha: 0,
            y: 55,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".comparison-table-wrapper",
              start: "top 85%",
              toggleActions: revealActions,
            },
          },
        );

        // Comparison category rows
        gsap.fromTo(
          ".comparison-category",
          {
            autoAlpha: 0,
            x: -25,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".membership-comparison-table",
              start: "top 80%",
              toggleActions: revealActions,
            },
          },
        );

        // Onboarding cards
        gsap.fromTo(
          ".membership-step-card",
          {
            autoAlpha: 0,
            y: 65,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.17,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".membership-steps-grid",
              start: "top 82%",
              toggleActions: revealActions,
            },
          },
        );

        // FAQ items
        gsap.fromTo(
          ".membership-faq-item",
          {
            autoAlpha: 0,
            y: 30,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".membership-faq-list",
              start: "top 85%",
              toggleActions: revealActions,
            },
          },
        );

        // Final CTA image reveal
        gsap.fromTo(
          ".final-cta-image",
          {
            clipPath: "inset(0 100% 0 0)",
            scale: 1.08,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".membership-final-cta",
              start: "top 80%",
              toggleActions: revealActions,
            },
          },
        );

        // Final CTA content
        gsap.fromTo(
          ".final-cta-content",
          {
            autoAlpha: 0,
            x: 65,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".membership-final-cta",
              start: "top 75%",
              toggleActions: revealActions,
            },
          },
        );
      });

      return () => mm.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const selectPlan = (planName: string) => {
    window.location.assign(
      `/contact?plan=${encodeURIComponent(planName.toLowerCase())}`,
    );
  };

  return (
    <main className="membership-page" ref={pageRef}>
      {/* MEMBERSHIP PLANS */}
      <PricingSection
        heading="INVEST IN YOUR PERFORMANCE."
        description="Choose the membership that matches your goals. Build strength, improve performance, and get more from every session."
      />

      {/* BENEFITS */}
      <section className="membership-benefits-section">
        <div className="membership-container">
          <div className="membership-section-heading split-heading">
            <div>
              <span className="membership-section-label">
                THE SOUIFER ADVANTAGE
              </span>

              <h2>
                THE UNCOMPROMISING
                <br />
                <span>STANDARD.</span>
              </h2>
            </div>

            <p>
              More than a gym membership. Discover a training environment
              designed around consistency, performance, and progress.
            </p>
          </div>

          <div className="membership-benefits-grid">
            {benefits.map((benefit) => (
              <article className="membership-benefit-card" key={benefit.number}>
                <div className="benefit-top">
                  <span>{benefit.number} //</span>

                  <div className="benefit-icon">
                    <span className="material-symbols-outlined">
                      {benefit.icon}
                    </span>
                  </div>
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>

                <div className="benefit-footer">
                  <span>{benefit.footer}</span>
                  <span className="material-symbols-outlined">check</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="membership-comparison-section">
        <div className="membership-container">
          <div className="membership-section-heading centered-heading">
            <span className="membership-section-label">
              SPECIFICATION COMPARISON
            </span>

            <h2>
              DETAILED CAPABILITY
              <span> MATRIX.</span>
            </h2>

            <p>
              Compare membership plans and find the right level of access for
              your training goals.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="membership-comparison-table">
              <thead>
                <tr>
                  <th>DIMENSION / PROTOCOL</th>
                  <th>ESSENTIAL</th>
                  <th className="comparison-highlight">PERFORMANCE PRO</th>
                  <th>BLACK CARD</th>
                </tr>
              </thead>

              <tbody>
                {comparisonGroups.map((group) => (
                  <Fragment key={group.title}>
                    <tr className="comparison-category">
                      <td colSpan={4}>{group.title}</td>
                    </tr>

                    {group.rows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>

                        {row.slice(1).map((value, index) => (
                          <td
                            className={
                              index === 1 ? "comparison-highlight" : ""
                            }
                            key={`${row[0]}-${index}`}
                          >
                            {value === "✓" ? (
                              <span className="material-symbols-outlined comparison-check">
                                check
                              </span>
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ONBOARDING */}
      <section className="membership-onboarding-section">
        <div className="membership-container">
          <div className="membership-section-heading split-heading">
            <div>
              <span className="membership-section-label">
                THE ACCELERATION SEQUENCE
              </span>

              <h2>
                YOUR FIRST
                <br />
                <span>14 DAYS.</span>
              </h2>
            </div>

            <p>
              Your journey starts with a clear plan. Follow a structured
              introduction designed to help you get the most from your
              membership.
            </p>
          </div>

          <div className="membership-steps-grid">
            {onboardingSteps.map((step) => (
              <article className="membership-step-card" key={step.number}>
                <span className="step-background-number">{step.number}</span>

                <div className="step-number">{step.number}</div>
                <span className="step-days">{step.days}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>

                <div className="step-deliverable">{step.deliverable}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="membership-faq-section">
        <div className="membership-container membership-faq-container">
          <div className="membership-section-heading centered-heading">
            <span className="membership-section-label">
              PRECISION CLARIFICATIONS
            </span>

            <h2>
              FREQUENTLY ASKED
              <span> QUESTIONS.</span>
            </h2>

            <p>
              Everything you need to know about membership, access, and getting
              started.
            </p>
          </div>

          <div className="membership-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  className={`membership-faq-item ${isOpen ? "open" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>

                    <span className="material-symbols-outlined faq-toggle-icon">
                      {isOpen ? "remove" : "add"}
                    </span>
                  </button>

                  <div className="membership-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="membership-final-cta-section">
        <div className="membership-container">
          <div className="membership-final-cta">
            <div className="final-cta-image" />
            <div className="final-cta-overlay" />

            <div className="final-cta-content">
              <span className="membership-section-label">
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              <h2>
                READY TO COMMIT
                <br />
                TO <span>EXCELLENCE?</span>
              </h2>

              <p>
                Choose your membership and take the next step toward a stronger,
                more consistent version of yourself.
              </p>

              <div className="final-cta-actions">
                <button
                  type="button"
                  onClick={() => selectPlan("performance-pro")}
                >
                  BEGIN ENROLLMENT
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>

                <a href="/contact">
                  BOOK A GYM TOUR
                  <span className="material-symbols-outlined">north_east</span>
                </a>
              </div>

              <div className="final-cta-note">
                <span className="material-symbols-outlined">verified</span>
                TRAIN WITH PURPOSE. PROGRESS WITH CONFIDENCE.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MembershipPage;
