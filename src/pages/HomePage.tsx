import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./HomePage.css";

import { LocationCard } from "../components/programs-card";

import { PricingSection } from "../components/PricingSection";

const images = {
  hero: "/images/hero-2.jpg",
  strength: "/images/image-strength.jpg",
  conditioning: "/images/image-push.jpg",
  recovery: "/images/image-recovery.jpg",
  facility: "/images/image-facility.jpg",
  coach: "/images/coach-one.jpg",
};

const metrics = [
  {
    number: "4,200+",
    label: "ACTIVE ATHLETES",
    detail: "A community built around progress.",
    icon: "groups",
  },
  {
    number: "98.4%",
    label: "PERFORMANCE INDEX",
    detail: "Progress tracked with precision.",
    icon: "monitoring",
  },
  {
    number: "24",
    label: "EXPERT COACHES",
    detail: "Experienced performance specialists.",
    icon: "workspace_premium",
  },
  {
    number: "03",
    label: "GLOBAL LOCATIONS",
    detail: "Zurich, Berlin and London.",
    icon: "location_on",
  },
];

const programs = [
  {
    number: "01",
    category: "STRENGTH & POWER",
    title: "Build your strength.",
    description:
      "Progressive strength training designed to develop power, improve technique and build lasting physical capability.",
    image: images.strength,
    duration: "16 WEEK PROGRAM",
    level: "ALL LEVELS",
    tags: ["Strength", "Power", "Technique"],
  },
  {
    number: "02",
    category: "CONDITIONING",
    title: "Push your limits.",
    description:
      "Structured conditioning sessions that develop cardiovascular capacity, endurance and athletic performance.",
    image: images.conditioning,
    duration: "12 WEEK PROGRAM",
    level: "INTERMEDIATE",
    tags: ["Endurance", "Cardio", "Performance"],
  },
  {
    number: "03",
    category: "RECOVERY & MOBILITY",
    title: "Recover stronger.",
    description:
      "Dedicated recovery and mobility protocols to support movement quality, consistency and long-term training.",
    image: images.recovery,
    duration: "FLEXIBLE PROGRAM",
    level: "ALL LEVELS",
    tags: ["Mobility", "Recovery", "Balance"],
  },
];

function Icon({ name }: { name: string }) {
  return (
    <span className="material-symbols-outlined" aria-hidden="true">
      {name}
    </span>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Keep the hero visible. It has no entrance or scroll animation.
      const heroElements = gsap.utils.toArray<HTMLElement>(
        [
          ".hero-topline",
          ".hero-content",
          ".hero-content .eyebrow-pill",
          ".hero-content h1",
          ".hero-content > p",
          ".hero-buttons",
          ".hero-trust",
          ".hero-bottom",
          ".hero-bottom > *",
        ].join(","),
        page,
      );

      gsap.set(heroElements, {
        autoAlpha: 1,
        clearProps: "transform,clipPath",
      });

      // Keep all three program cards and their images visible.
      const programElements = gsap.utils.toArray<HTMLElement>(
        ".program-grid, .program-grid > *, .program-grid img",
        page,
      );

      gsap.set(programElements, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        clearProps: "transform,clipPath",
      });

      if (reducedMotion) {
        gsap.set(page.querySelectorAll("*"), {
          clearProps: "opacity,visibility,transform,clipPath",
        });

        return;
      }

      /* -------------------------------------------------------
       NEW: HERO IMAGE ANIMATION
    ------------------------------------------------------- */

      const heroImage = page.querySelector<HTMLElement>(".hero-background");

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
      /* -------------------------------------------------------
       NEW: HERO TITLE ANIMATION
    ------------------------------------------------------- */

      const heroTitle = page.querySelector<HTMLElement>(".hero-content h1");

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          {
            y: 70,
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            delay: 0.35,
            ease: "power3.out",
            clearProps: "transform,clipPath",
          },
        );
      }

      /* -------------------------------------------------------
       NEW: HERO BUTTONS ANIMATION
    ------------------------------------------------------- */

      const heroButtons = gsap.utils.toArray<HTMLElement>(
        ".hero-buttons .button, .hero-buttons a, .hero-buttons button",
        page,
      );

      if (heroButtons.length) {
        gsap.fromTo(
          heroButtons,
          {
            y: 30,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
      }

      /* -------------------------------------------------------
       1. REUSABLE SCROLL-DRIVEN REVEAL
       Animation progress follows the scrollbar.
    ------------------------------------------------------- */

      const scrubReveal = (
        selector: string,
        options: {
          y?: number;
          x?: number;
          start?: string;
          end?: string;
          clip?: boolean;
        } = {},
      ) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, page);

        elements.forEach((element) => {
          const from: gsap.TweenVars = {
            autoAlpha: 0,
            y: options.y ?? 45,
            x: options.x ?? 0,
          };

          const to: gsap.TweenVars = {
            autoAlpha: 1,
            y: 0,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: options.start ?? "top 90%",
              end: options.end ?? "top 55%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          };

          if (options.clip) {
            from.clipPath = "inset(0 0 100% 0)";
            to.clipPath = "inset(0 0 0% 0)";
          }

          gsap.fromTo(element, from, to);
        });
      };

      /* -------------------------------------------------------
       2. SECTION HEADINGS AND TEXT
    ------------------------------------------------------- */

      scrubReveal(".section-topline", { y: 25 });
      scrubReveal(".section-heading", { y: 70 });
      scrubReveal(".section-kicker", { y: 20 });
      scrubReveal(".section-side-note", { y: 20 });

      scrubReveal(".ethos-description > *", { y: 35 });
      scrubReveal(".programs-heading > p", { x: 45, y: 0 });
      scrubReveal(".facility-copy > *", { x: 45, y: 0 });
      scrubReveal(".coach-copy > *", { x: 45, y: 0 });

      scrubReveal(".programs-footer", { y: 30 });
      scrubReveal(".coach-stats > div", { y: 35 });
      scrubReveal(".final-cta-content > *", { y: 45 });
      scrubReveal(".footer-bottom", { y: 25 });

      /* -------------------------------------------------------
       3. METRIC CARDS
    ------------------------------------------------------- */

      gsap.fromTo(
        ".metric-card",
        {
          y: 90,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".metrics-grid",
            start: "top 88%",
            end: "bottom 55%",
            scrub: 1.2,
          },
        },
      );

      /* -------------------------------------------------------
       4. IMAGE REVEALS
       Facility and coach images only.
       Program images are deliberately excluded.
    ------------------------------------------------------- */

      const imageSelectors = [".facility-main-image", ".coach-portrait"];

      imageSelectors.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector, page).forEach((image) => {
          gsap.fromTo(
            image,
            {
              scale: 1.15,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              scale: 1,
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top 90%",
                end: "top 35%",
                scrub: 1.3,
              },
            },
          );
        });
      });

      /* -------------------------------------------------------
   SF PROGRAM SCENE — SCROLL ANIMATIONS
------------------------------------------------------- */

      // Main scene
      gsap.fromTo(
        ".sf-program-scene",
        {
          y: 70,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".sf-program-scene",
            start: "top 90%",
            end: "top 45%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      );

      // Images
      gsap.utils
        .toArray<HTMLElement>(".sf-program-scene img", page)
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              scale: 1.18,
            },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top 95%",
                end: "top 35%",
                scrub: 1.3,
                invalidateOnRefresh: true,
              },
            },
          );
        });

      // Text elements
      gsap.utils
        .toArray<HTMLElement>(
          ".sf-program-scene h1, .sf-program-scene h2, .sf-program-scene h3, .sf-program-scene p, .sf-program-scene span, .sf-program-scene a",
          page,
        )
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 35,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                end: "top 65%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        });

      /* -------------------------------------------------------
       5. FACILITY FEATURES
    ------------------------------------------------------- */

      gsap.fromTo(
        ".facility-feature",
        {
          y: 45,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".facility-feature-grid",
            start: "top 90%",
            end: "bottom 65%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".facility-list-item",
        {
          x: 55,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".facility-list",
            start: "top 90%",
            end: "bottom 55%",
            scrub: 1.2,
          },
        },
      );

      /* -------------------------------------------------------
       6. COACH PANEL
    ------------------------------------------------------- */

      gsap.fromTo(
        ".coach-panel",
        {
          y: 85,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".coach-panel",
            start: "top 90%",
            end: "top 45%",
            scrub: 1.2,
          },
        },
      );

      /* -------------------------------------------------------
       7. MEMBERSHIP
    ------------------------------------------------------- */

      gsap.fromTo(
        ".pricing-section",
        {
          y: 75,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 90%",
            end: "top 45%",
            scrub: 1.2,
          },
        },
      );

      /* -------------------------------------------------------
       8. NUMBER COUNTERS
       Count from zero when each metric enters the viewport.
    ------------------------------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(".metric-value[data-count]", page)
        .forEach((counter) => {
          const target = Number(counter.dataset.count || 0);
          const decimals = Number(counter.dataset.decimals || 0);
          const suffix = counter.dataset.suffix || "";
          const leadingZero = counter.dataset.leadingZero === "true";

          const count = { value: 0 };

          gsap.to(count, {
            value: target,
            duration: 2.2,
            ease: "power2.out",
            snap: {
              value: decimals > 0 ? 0.1 : 1,
            },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              let formatted = count.value.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });

              if (leadingZero) {
                formatted = Math.round(count.value).toString().padStart(2, "0");
              }

              counter.textContent = `${formatted}${suffix}`;
            },
          });
        });

      /* -------------------------------------------------------
       9. FINAL CTA
    ------------------------------------------------------- */

      gsap.fromTo(
        ".final-cta-panel",
        {
          y: 100,
          scale: 0.96,
          autoAlpha: 0,
        },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".final-cta-panel",
            start: "top 90%",
            end: "top 40%",
            scrub: 1.3,
          },
        },
      );

      /* -------------------------------------------------------
       10. FOOTER
    ------------------------------------------------------- */

      gsap.fromTo(
        ".footer-grid > *",
        {
          y: 65,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".footer-grid",
            start: "top 90%",
            end: "bottom 60%",
            scrub: 1.2,
          },
        },
      );

      ScrollTrigger.refresh();
    }, page);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="volt-page" ref={pageRef}>
      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div
            className="hero-background"
            style={{ backgroundImage: `url("${images.hero}")` }}
          />
          <div className="hero-overlay" />

          <div className="hero-topline page-container">
            <div className="status-pill">
              <span className="status-dot" />
              <span>NOW ACCEPTING NEW MEMBERS</span>
            </div>
          </div>

          <div className="hero-content page-container">
            <div className="eyebrow-pill">
              <span className="eyebrow-line" />
              <span>THE NEXT LEVEL STARTS HERE</span>
            </div>

            <h1>
              BUILT
              <br />
              FOR <span>MORE.</span>
            </h1>

            <p>
              More than a gym. A place to build strength, sharpen your focus and
              become the strongest version of yourself.
            </p>

            <div className="hero-buttons">
              <a
                className="button button-primary button-large"
                href="/programs"
              >
                EXPLORE PROGRAMS
                <Icon name="arrow_forward" />
              </a>

              <a className="button button-glass button-large" href="/about">
                DISCOVER SOUIFER
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars" aria-hidden="true">
                <span>S</span>
                <span>+</span>
                <span>4K</span>
              </div>

              <div>
                <strong>Built around your potential.</strong>
                <span>A community of ambitious athletes.</span>
              </div>
            </div>
          </div>

          <div className="hero-bottom page-container">
            <a className="scroll-cue" href="/about">
              <span className="scroll-cue-icon">
                <Icon name="south" />
              </span>
              SCROLL TO EXPLORE
            </a>

            <div className="hero-location">
              <Icon name="location_on" />
              ZURICH · SWITZERLAND
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="ethos-section" id="about">
          <div className="page-container">
            <div className="section-topline">
              <span className="section-kicker">01 / THE SOUIFER MINDSET</span>
              <span className="section-side-note">PURPOSE OVER EVERYTHING</span>
            </div>

            <div className="section-heading ethos-heading">
              <div>
                <h2>
                  YOUR POTENTIAL
                  <br />
                  HAS <span>NO LIMIT.</span>
                </h2>
              </div>

              <div className="ethos-description">
                <span className="small-accent-line" />

                <p>
                  We believe real progress is built through consistency,
                  intelligent training and the right environment. Every detail
                  at SOUIFER is designed to help you move forward.
                </p>

                <a className="text-link" href="/about">
                  OUR PHILOSOPHY
                  <Icon name="arrow_outward" />
                </a>
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <article className="metric-card" key={metric.label}>
                  <div className="metric-card-top">
                    <span>
                      0{index + 1} / {metric.label}
                    </span>

                    <Icon name={metric.icon} />
                  </div>

                  <div className="metric-card-bottom">
                    <strong
                      className="metric-value"
                      data-count={metric.number.replace(/[^0-9.]/g, "")}
                      data-suffix={metric.number.replace(/[0-9.,]/g, "")}
                      data-decimals={metric.number.includes(".") ? 1 : 0}
                      data-leading-zero={
                        metric.number === "03" ? "true" : "false"
                      }
                    >
                      {metric.number}
                    </strong>

                    <p>{metric.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="programs-section section-space" id="programs">
          <div className="page-container">
            <div className="section-topline">
              <span className="section-kicker">02 / TRAIN WITH PURPOSE</span>
              <span className="section-side-note">FIND YOUR DISCIPLINE</span>
            </div>

            <div className="section-heading programs-heading">
              <div>
                <h2>
                  FIND YOUR
                  <br />
                  <span>STRONGER.</span>
                </h2>
              </div>

              <p>
                Different goals. Different paths. One standard: becoming better
                every day. Find the program that moves you forward.
              </p>
            </div>

            <div className="program-grid">
              {programs.map((program) => (
                <LocationCard
                  key={program.number}
                  city={program.title}
                  address={program.description}
                  imageUrl={program.image}
                  directionsUrl="/programs"
                  category={program.category}
                  duration={program.duration}
                  level={program.level}
                  tags={program.tags}
                />
              ))}
            </div>

            <div className="programs-footer">
              <span>01 — 03 / TRAINING SYSTEMS</span>

              <a href="/programs">
                VIEW ALL PROGRAMS
                <Icon name="arrow_outward" />
              </a>
            </div>
          </div>
        </section>

        {/* FACILITY */}
        <section className="facility-section" id="facility">
          <div className="page-container facility-layout">
            <div className="facility-visuals">
              <div
                className="facility-main-image"
                style={{
                  backgroundImage: `url("${images.facility}")`,
                }}
              >
                <div className="facility-image-fade" />

                <div className="facility-image-label">
                  <span className="status-dot" />
                  <span>THE SOUIFER TRAINING ENVIRONMENT</span>
                </div>
              </div>

              <div className="facility-feature-grid">
                <div className="facility-feature">
                  <span className="feature-icon">
                    <Icon name="fitness_center" />
                  </span>

                  <span>
                    <strong>PRO EQUIPMENT</strong>
                    <small>Performance-grade training tools</small>
                  </span>
                </div>

                <div className="facility-feature">
                  <span className="feature-icon">
                    <Icon name="monitor_heart" />
                  </span>

                  <span>
                    <strong>SMART TRAINING</strong>
                    <small>Progress backed by data</small>
                  </span>
                </div>
              </div>
            </div>

            <div className="facility-copy">
              <div className="section-topline">
                <span className="section-kicker">03 / THE ENVIRONMENT</span>
              </div>

              <h2>
                DESIGNED
                <br />
                TO <span>PERFORM.</span>
              </h2>

              <p>
                Great training deserves a great environment. Discover a
                carefully designed space where premium equipment, thoughtful
                details and focused energy come together.
              </p>

              <div className="facility-list">
                <div className="facility-list-item">
                  <span className="facility-list-number">01</span>

                  <div>
                    <strong>Purpose-built training zones</strong>
                    <small>
                      Dedicated spaces for strength, conditioning and movement.
                    </small>
                  </div>

                  <Icon name="north_east" />
                </div>

                <div className="facility-list-item">
                  <span className="facility-list-number">02</span>

                  <div>
                    <strong>Premium equipment selection</strong>
                    <small>
                      Quality equipment selected for effective training.
                    </small>
                  </div>

                  <Icon name="north_east" />
                </div>

                <div className="facility-list-item">
                  <span className="facility-list-number">03</span>

                  <div>
                    <strong>Recovery-focused spaces</strong>
                    <small>Dedicated areas to support rest and recovery.</small>
                  </div>

                  <Icon name="north_east" />
                </div>
              </div>

              <a className="button button-secondary" href="/about">
                DISCOVER OUR FACILITY
                <Icon name="arrow_outward" />
              </a>
            </div>
          </div>
        </section>

        {/* COACHES */}
        <section className="coach-section section-space" id="trainers">
          <div className="page-container">
            <div className="section-topline">
              <span className="section-kicker">04 / EXPERT GUIDANCE</span>

              <span className="section-side-note">
                PEOPLE BEHIND YOUR PROGRESS
              </span>
            </div>

            <div className="coach-panel">
              <div className="coach-layout">
                <div className="coach-portrait-wrap">
                  <div
                    className="coach-portrait"
                    style={{
                      backgroundImage: `url("${images.coach}")`,
                    }}
                  />

                  <div className="coach-image-caption">
                    <span>HEAD OF PERFORMANCE</span>
                    <span>SOUIFER / COACHING TEAM</span>
                  </div>
                </div>

                <div className="coach-copy">
                  <span className="section-kicker">MEET YOUR COACH</span>

                  <h2>
                    GREATNESS
                    <br />
                    IS <span>TRAINED.</span>
                  </h2>

                  <blockquote>
                    “The goal isn't simply to train harder. It's to train
                    smarter, stay consistent and make every session count.”
                  </blockquote>

                  <p>
                    Our coaching philosophy combines individual attention,
                    structured training and measurable progress. Your goals
                    shape the plan. Our coaches help you stay on track.
                  </p>

                  <div className="coach-stats">
                    <div>
                      <strong>1:4</strong>
                      <span>COACHING RATIO</span>
                    </div>

                    <div>
                      <strong>12+</strong>
                      <span>YEARS EXPERIENCE</span>
                    </div>

                    <div>
                      <strong>100%</strong>
                      <span>ATHLETE FOCUSED</span>
                    </div>
                  </div>

                  <a className="text-link" href="/trainers">
                    MEET THE COACHING TEAM
                    <Icon name="arrow_outward" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP PLANS */}
        <PricingSection
          heading="MEMBERSHIP PLANS"
          description="Choose the right plan for your goals."
        />

        {/* FINAL CTA */}
        <section className="final-cta-section">
          <div className="page-container">
            <div className="final-cta-panel">
              <div className="cta-glow" />

              <div className="final-cta-content">
                <span className="section-kicker">
                  <span className="status-dot" />
                  YOUR NEXT CHAPTER STARTS NOW
                </span>

                <h2>
                  MAKE YOUR
                  <br />
                  <span>MOVE.</span>
                </h2>

                <p>
                  Take the first step towards a stronger, more confident you.
                  Discover SOUIFER and find the training experience that fits
                  your ambition.
                </p>

                <div className="hero-buttons">
                  <a
                    className="button button-primary button-large"
                    href="/JoinUs"
                  >
                    START YOUR JOURNEY
                    <Icon name="arrow_forward" />
                  </a>

                  <a
                    className="button button-glass button-large"
                    href="/contact"
                  >
                    TALK TO OUR TEAM
                  </a>
                </div>
              </div>

              <div className="cta-decoration" aria-hidden="true">
                <span>S</span>
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" id="contact">
        <div className="page-container">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <a className="footer-brand" href="/home">
                <span className="brand-mark">
                  <Icon name="bolt" />
                </span>

                <span>
                  SOUIFER<span>.</span>
                </span>
              </a>

              <h2>BUILT FOR MORE.</h2>

              <p>
                A new standard in athletic performance. Train with purpose,
                build your strength and become more.
              </p>

              <div className="footer-status">
                <span className="status-dot" />
                MADE FOR PROGRESS. BUILT TO LAST.
              </div>
            </div>

            <div className="footer-dispatch">
              <span className="footer-label">THE SOUIFER JOURNAL</span>

              <h3>Stay in your strongest state.</h3>

              <p>
                Training insights, performance ideas and updates from the
                SOUIFER community.
              </p>

              <a className="newsletter-static" href="/contact">
                <span>GET IN TOUCH WITH US</span>

                <strong>
                  <Icon name="arrow_forward" />
                </strong>
              </a>

              <div className="social-links">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  INSTAGRAM
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  YOUTUBE
                </a>

                <a href="https://discord.com/" target="_blank" rel="noreferrer">
                  DISCORD
                </a>
              </div>
            </div>

            <div className="footer-links-column">
              <div>
                <span className="footer-label">EXPLORE</span>

                <a href="/about">ABOUT SOUIFER</a>
                <a href="/programs">PROGRAMS</a>
                <a href="/facility">THE FACILITY</a>
                <a href="/trainers">OUR COACHES</a>
                <a href="/membership">MEMBERSHIP</a>
              </div>

              <div>
                <span className="footer-label">INFORMATION</span>

                <a href="/schedule">SCHEDULE</a>
                <a href="/contact">CONTACT</a>
                <a href="/privacy">PRIVACY POLICY</a>
                <a href="/terms">TERMS & CONDITIONS</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} SOUIFER ATHLETICS. ALL RIGHTS
              RESERVED.
            </span>

            <div>
              <span>DESIGNED FOR PERFORMANCE</span>

              <a href="/home">
                BACK TO TOP
                <Icon name="north_east" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
