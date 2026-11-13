import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: "01",
    icon: "timer",
    title: "DISCIPLINE",
    description:
      "Unwavering adherence to routine, relentless personal accountability, and the refusal to negotiate with self-imposed limits.",
    label: "EXECUTION RATE",
    value: "100% INTENTIONAL",
  },
  {
    number: "02",
    icon: "trending_up",
    title: "PROGRESS",
    description:
      "Measurable gains tracked through training consistency, performance, and recovery rather than speculative guesswork.",
    label: "METRIC AUDIT",
    value: "REAL-TIME DATA",
  },
  {
    number: "03",
    icon: "offline_bolt",
    title: "PERFORMANCE",
    description:
      "Translating training into real-world output, structural resilience, athletic longevity, and psychological strength.",
    label: "APPLICATION",
    value: "TACTICAL / ELITE",
  },
  {
    number: "04",
    icon: "groups",
    title: "COMMUNITY",
    description:
      "A community of committed practitioners who eliminate ego at the door and help elevate every athlete.",
    label: "ETHOS",
    value: "MUTUAL ELEVATION",
  },
];

const facilities = [
  {
    number: "01",
    title: "OLYMPIC LIFTING PLATFORMS",
    description:
      "Professional lifting platforms, calibrated weight plates, and dedicated strength training equipment.",
    image: "images/image-facility-olympic.jpg",
    className: "facility-large",
    icon: "fitness_center",
  },
  {
    number: "02",
    title: "RECOVERY & COLD THERAPY",
    description:
      "Dedicated recovery spaces designed to support your training routine.",
    image: "images/image-facility-recovery.jpg",
    className: "",
    icon: "ac_unit",
  },
  {
    number: "03",
    title: "PERFORMANCE LAB",
    description:
      "A dedicated space for fitness assessments and performance monitoring.",
    image: "images/image-facility-performance.jpg",
    className: "",
    icon: "monitoring",
  },
  {
    number: "04",
    title: "MOBILITY & RECOVERY DECKS",
    description:
      "A calm environment for mobility work, stretching, and post-training recovery.",
    image: "images/image-facility-mobility.jpg",
    className: "facility-wide",
    icon: "self_improvement",
  },
];

const metrics = [
  {
    label: "MEMBERS",
    number: "1,200",
    suffix: "+",
    title: "ACTIVE MEMBERS",
    description: "A growing community committed to consistent training.",
  },
  {
    label: "MEMBER PROGRESS",
    number: "98.6",
    suffix: "%",
    title: "PROGRESS FOCUSED",
    description: "A training philosophy built around measurable improvement.",
  },
  {
    label: "EQUIPMENT",
    number: "38",
    suffix: "",
    title: "TRAINING PLATFORMS",
    description: "Dedicated stations for strength and athletic development.",
  },
  {
    label: "LOCATIONS",
    number: "04",
    suffix: "",
    title: "TRAINING ZONES",
    description: "Specialized spaces for different training objectives.",
  },
];

function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      // HERO IMAGE — REVEAL FROM CENTER TO BOTH SIDES
      const heroImage = page.querySelector<HTMLElement>(".about-hero-image");

      if (heroImage) {
        gsap.fromTo(
          heroImage,
          {
            clipPath: "inset(0 50% 0 50%)",
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.8,
            ease: "power4.inOut",
            delay: 0.2,
          },
        );
      }

      // HERO CONTENT
      gsap.fromTo(
        ".about-hero-labels",
        {
          autoAlpha: 0,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: 0.4,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".about-hero-text > *",
        {
          autoAlpha: 0,
          y: 45,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.6,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".about-scroll-indicator",
        {
          autoAlpha: 0,
          y: 15,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: 1.5,
          ease: "power2.out",
        },
      );

      // REUSABLE SCROLL REVEAL
      const revealUp = (
        selector: string,
        options: {
          y?: number;
          duration?: number;
          stagger?: number;
          start?: string;
        } = {},
      ) => {
        const elements = page.querySelectorAll(selector);

        if (!elements.length) return;

        gsap.fromTo(
          elements,
          {
            autoAlpha: 0,
            y: options.y ?? 45,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: options.duration ?? 0.9,
            stagger: options.stagger ?? 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elements[0],
              start: options.start ?? "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      };

      // STORY CONTENT
      revealUp(
        ".story-content > .section-eyebrow, .story-content > h2, .story-content > p, .story-specification",
        {
          y: 40,
          stagger: 0.14,
        },
      );

      // STORY IMAGE
      const storyImage = page.querySelector<HTMLElement>(".story-visual img");

      if (storyImage) {
        gsap.fromTo(
          storyImage,
          {
            clipPath: "inset(0 50% 0 50%)",
            scale: 1.08,
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1,
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".story-visual",
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // SECTION HEADINGS
      revealUp(
        ".section-heading > *, .section-heading > div > *, .facilities-count",
        {
          y: 35,
          stagger: 0.12,
        },
      );

      // PHILOSOPHY CARDS
      revealUp(".philosophy-card", {
        y: 55,
        stagger: 0.2,
      });

      // PHILOSOPHY CHART AND RECOVERY LIST
      revealUp(".recovery-chart, .recovery-list > div", {
        y: 25,
        stagger: 0.12,
      });

      // VALUES CARDS
      revealUp(".value-card", {
        y: 55,
        stagger: 0.15,
      });

      // FACILITY CARDS
      revealUp(".facility-card", {
        y: 45,
        stagger: 0.15,
      });

      // FACILITY IMAGES
      const facilityImages =
        page.querySelectorAll<HTMLElement>(".facility-card img");

      facilityImages.forEach((image) => {
        gsap.fromTo(
          image,
          {
            clipPath: "inset(0 50% 0 50%)",
            scale: 1.1,
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: image.closest(".facility-card"),
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

      // FACILITY CONTENT
      revealUp(".facility-content > *", {
        y: 25,
        stagger: 0.1,
      });

      // MISSION
      revealUp(".mission-content > *", {
        y: 40,
        stagger: 0.15,
      });

      // METRIC CARDS
      revealUp(".metric-card", {
        y: 45,
        stagger: 0.15,
      });

      // NUMBER COUNTERS
      const counters = page.querySelectorAll<HTMLElement>(".metric-count");

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        const decimalPlaces = Number(counter.dataset.decimals || 0);

        const padded = counter.dataset.padded === "true";

        const counterValue = { value: 0 };

        const updateCounter = () => {
          let formatted = counterValue.value.toFixed(decimalPlaces);

          if (decimalPlaces === 0) {
            formatted = Math.round(counterValue.value).toLocaleString("en-US");
          }

          if (padded) {
            formatted = formatted.padStart(2, "0");
          }

          counter.textContent = formatted;
        };

        gsap.to(counterValue, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: updateCounter,
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // CTA CONTENT
      revealUp(".cta-content > *", {
        y: 40,
        stagger: 0.15,
      });

      // CTA BACKGROUND
      const ctaBackground = page.querySelector<HTMLElement>(".cta-background");

      if (ctaBackground) {
        gsap.fromTo(
          ctaBackground,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-cta",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      ScrollTrigger.refresh();
    }, page);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-image" />
        <div className="about-hero-overlay" />

        <div className="about-container about-hero-content">
          <div className="about-hero-labels">
            <span className="about-status">
              <span className="status-dot" />
              THE VOLT STANDARD // 2027 PROTOCOL
            </span>
          </div>

          <div className="about-hero-text">
            <span className="about-eyebrow">MORE THAN A GYM. A STANDARD.</span>

            <h1>
              BUILT ON
              <br />
              DISCIPLINE.
              <br />
              <span>DRIVEN BY PROGRESS.</span>
            </h1>

            <p>
              Strength is more than what you lift. It is the discipline you
              build, the challenges you overcome, and the person you become
              through uncompromising dedication.
            </p>

            <div className="about-hero-stats">
              <div>
                <span>OUR APPROACH</span>
                <strong>PRECISION TRAINING</strong>
              </div>
              <div>
                <span>OUR STANDARD</span>
                <strong>NO SHORTCUTS</strong>
              </div>
              <div>
                <span>OUR MISSION</span>
                <strong>CONSTANT PROGRESS</strong>
              </div>
              <div>
                <span>OUR COMMUNITY</span>
                <strong>ONE STANDARD</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="about-scroll-indicator">
          <span />
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-section about-story">
        <div className="about-container story-grid">
          <div className="story-content">
            <span className="section-eyebrow">
              ORIGINS &amp; INTENT // ARCHIVE 001
            </span>

            <h2>
              HONEST ENGINEERING.
              <br />
              <span>UNCOMPROMISING</span>
              <br />
              ATHLETIC RIGOR.
            </h2>

            <p>
              VOLT was conceived to challenge the ordinary gym experience. We
              believe training should be about more than appearances. It should
              be about building strength, developing discipline, and creating
              lasting progress.
            </p>

            <p>
              Every training space, every piece of equipment, and every detail
              within VOLT exists for one objective: helping people become
              stronger, healthier, and more capable.
            </p>

            <div className="story-specification">
              <div className="spec-icon">
                <span className="material-symbols-outlined">
                  precision_manufacturing
                </span>
              </div>

              <div className="spec-copy">
                <strong>BUILT FOR PERFORMANCE</strong>
                <span>QUALITY EQUIPMENT // PURPOSEFUL DESIGN</span>
              </div>

              <span className="spec-status">VOLT STANDARD</span>
            </div>
          </div>

          <div className="story-visual">
            <img
              src={facilities[3].image}
              alt="Close-up of professional strength training equipment"
            />

            <div className="story-image-overlay" />

            <div className="story-image-caption">
              <div>
                <span>OUR FOUNDATION</span>
                <strong>PRECISION IN EVERY DETAIL.</strong>
              </div>
              <span className="material-symbols-outlined">north_east</span>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-section philosophy-section">
        <div className="about-container">
          <div className="section-heading">
            <span className="section-eyebrow">THE CODE // 001</span>

            <h2>
              A DIFFERENT STANDARD
              <br />
              OF <span>TRAINING.</span>
            </h2>

            <p>
              Purposeful training over mindless exhaustion. We believe intensity
              should have a purpose, and progress should have a plan.
            </p>
          </div>

          <div className="philosophy-grid">
            <article className="philosophy-card philosophy-main">
              <div>
                <span className="card-index">KINETIC PARADIGM // 01</span>
                <h3>TRAIN WITH PURPOSE.</h3>
                <p>
                  Every training session should move you closer to your personal
                  goals. Our approach combines structured programming,
                  consistent effort, and a focus on proper technique.
                </p>
              </div>

              <div className="recovery-chart">
                <div className="chart-heading">
                  <span>THE PROGRESS CYCLE</span>
                  <span className="chart-highlight">CONSISTENCY IS KEY</span>
                </div>

                <svg
                  viewBox="0 0 500 100"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Illustrative training progress curve"
                >
                  <defs>
                    <linearGradient id="voltGlow" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c9f249" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#c9f249" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0,80 Q70,75 120,40 T240,65 T360,20 T480,45 L500,42 L500,100 L0,100 Z"
                    fill="url(#voltGlow)"
                  />

                  <path
                    d="M0,80 Q70,75 120,40 T240,65 T360,20 T480,45"
                    stroke="#c9f249"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  <circle cx="360" cy="20" r="5" fill="#c9f249" />
                </svg>

                <div className="chart-labels">
                  <span>START</span>
                  <span>CONSISTENCY</span>
                  <span>ADAPTATION</span>
                  <span>PROGRESS</span>
                </div>
              </div>
            </article>

            <article className="philosophy-card philosophy-secondary">
              <div>
                <span className="card-index">KINETIC PARADIGM // 02</span>
                <h3>RECOVERY MATTERS.</h3>
                <p>
                  Real progress is built through the balance between training
                  and recovery. Rest, mobility, sleep, and consistency all
                  matter.
                </p>
              </div>

              <div className="recovery-list">
                <div>
                  <span>01</span>
                  <strong>SMART TRAINING</strong>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <span>02</span>
                  <strong>ACTIVE RECOVERY</strong>
                  <span className="material-symbols-outlined">replay</span>
                </div>
                <div>
                  <span>03</span>
                  <strong>CONSISTENT ROUTINE</strong>
                  <span className="material-symbols-outlined">schedule</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-section values-section">
        <div className="about-container">
          <div className="section-heading values-heading">
            <div>
              <span className="section-eyebrow">
                FOUNDATIONAL PILLARS // 004
              </span>
              <h2>
                THE PRINCIPLES
                <br />
                THAT <span>DEFINE US.</span>
              </h2>
            </div>

            <p>
              Standards that are not just written on walls, but practiced
              through daily commitment and accountability.
            </p>
          </div>

          <div className="values-grid">
            {values.map((item) => (
              <article className="value-card" key={item.number}>
                <div className="value-card-top">
                  <span className="value-number">[ {item.number} ]</span>
                  <div className="value-icon">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="value-card-footer">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="about-section facilities-section">
        <div className="about-container">
          <div className="section-heading facilities-heading">
            <div>
              <span className="section-eyebrow">
                ARCHITECTURAL SANCTUARY // 004
              </span>
              <h2>
                ENGINEERED FOR
                <br />
                <span>PERFORMANCE.</span>
              </h2>
            </div>

            <span className="facilities-count">
              04 SPECIALIZED TRAINING ZONES
            </span>
          </div>

          <div className="facilities-grid">
            {facilities.map((facility) => (
              <article
                className={`facility-card ${facility.className}`}
                key={facility.number}
              >
                <img src={facility.image} alt={facility.title} />

                <div className="facility-overlay" />

                <div className="facility-content">
                  <span className="facility-number">
                    FACILITY ZONE {facility.number}
                  </span>

                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                </div>

                <div className="facility-icon">
                  <span className="material-symbols-outlined">
                    {facility.icon}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-section mission-section">
        <div className="about-container">
          <div className="mission-card">
            <div className="mission-glow" />

            <div className="mission-content">
              <span className="section-eyebrow">
                <span className="material-symbols-outlined">bolt</span>
                THE VOLT ATHLETIC MANIFESTO
              </span>

              <h2>
                WE EXIST TO BRIDGE THE GAP BETWEEN HUMAN POTENTIAL AND PHYSICAL
                REALITY THROUGH <span>DISCIPLINE</span>, PURPOSE, AND{" "}
                <span>UNRELENTING PROGRESS.</span>
              </h2>

              <div className="mission-bottom">
                <p>
                  “We do not train for temporary attention. We train to build
                  strength, confidence, and a stronger version of ourselves.
                  VOLT is more than a gym. It is a commitment to progress.”
                </p>

                <div>
                  <strong>THE VOLT TEAM</strong>
                  <span>BUILT ON DISCIPLINE.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="about-section metrics-section">
        <div className="about-container">
          <div className="section-heading metrics-heading">
            <div>
              <span className="section-eyebrow">
                SCALE &amp; COMMITMENT // 2027
              </span>
              <h2>
                PROGRESS YOU
                <br />
                CAN <span>MEASURE.</span>
              </h2>
            </div>

            <p>
              Our focus is simple: creating an environment where every member
              can work toward meaningful progress.
            </p>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className="metric-label">{metric.label}</span>

                <div className="metric-number">
                  <span
                    className="metric-count"
                    data-target={Number(metric.number.replace(",", ""))}
                    data-decimals={metric.number.includes(".") ? 1 : 0}
                    data-padded={metric.number.startsWith("0")}
                  >
                    {metric.number}
                  </span>
                  <span>{metric.suffix}</span>
                </div>

                <h3>{metric.title}</h3>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="about-section about-cta-section">
        <div className="about-container">
          <div className="about-cta">
            <div className="cta-background" />
            <div className="cta-overlay" />

            <div className="cta-content">
              <span className="cta-label">
                <span className="status-dot" />
                JOIN THE STANDARD
              </span>

              <h2>
                READY TO MOVE
                <br />
                <span>DIFFERENTLY?</span>
              </h2>

              <p>
                Experience what happens when discipline meets the right
                environment. Your next chapter starts here.
              </p>

              <div className="cta-actions">
                <a href="/membership" className="about-primary-button">
                  START YOUR JOURNEY
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>

                <a href="/contact" className="about-secondary-button">
                  CONTACT OUR TEAM
                  <span className="material-symbols-outlined">north_east</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
