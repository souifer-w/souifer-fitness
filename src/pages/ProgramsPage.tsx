import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProgramsPage.css";

gsap.registerPlugin(ScrollTrigger);

type Category = "strength" | "hypertrophy" | "metabolic" | "restoration";

type Program = {
  id: string;
  title: string;
  category: Category;
  level: string;
  tag: string;
  description: string;
  duration: string;
  image: string;
};

const programs: Program[] = [
  {
    id: "01",
    title: "STRENGTH TRAINING",
    category: "strength",
    level: "ADVANCED",
    tag: "VELOCITY-BASED BARBELL & FORCE DYNAMICS",
    description:
      "Targeted peak central nervous system output, maximal rate of force development and calibrated barbell loads tracked via linear transducer metrics.",
    duration: "4-6 WKS - 4 SESSIONS/WK",
    image: "images/programs/strength-training-photo.jpg",
  },
  {
    id: "02",
    title: "BODYBUILDING",
    category: "hypertrophy",
    level: "INTERMEDIATE / ADV",
    tag: "TARGETED HYPERTROPHY & TIME UNDER TENSION",
    description:
      "Biomechanical muscle isolation, strict cadence profiling and progressive overload built for structural symmetry and muscle growth.",
    duration: "8-12 WKS - 5 SESSIONS/WK",
    image: "images/programs/bodybuilding-photo.jpg",
  },
  {
    id: "03",
    title: "PERSONAL TRAINING",
    category: "strength",
    level: "ALL LEVELS",
    tag: "BESPOKE 1-ON-1 DIAGNOSTICS",
    description:
      "Complete bio-individual customization with personalized load progression, real-time coaching and performance adjustments.",
    duration: "CUSTOM - ON DEMAND",
    image: "images/programs/personal-training-photo.jpg",
  },
  {
    id: "04",
    title: "FUNCTIONAL TRAINING",
    category: "metabolic",
    level: "INTERMEDIATE",
    tag: "MULTI-PLANAR STABILITY",
    description:
      "Multi-planar kinetic chain integration, core transfer efficiency and tactical conditioning that bridges gym strength and athletic performance.",
    duration: "6 WKS - 4 SESSIONS/WK",
    image: "images/programs/functional-training-photo.jpg",
  },
  {
    id: "05",
    title: "HIIT INTERVALS",
    category: "metabolic",
    level: "HIGH INTENSITY",
    tag: "EPOC ACCELERATION & LACTATE BUFFER",
    description:
      "High-intensity intervals paired with structured recovery blocks to develop anaerobic capacity and cardiovascular conditioning.",
    duration: "45 MIN - 3 SESSIONS/WK",
    image: "images/programs/hiit-intervals-photo.jpg",
  },
  {
    id: "06",
    title: "CARDIO ENDURANCE",
    category: "metabolic",
    level: "ALL LEVELS",
    tag: "VO2 MAX & AEROBIC THRESHOLD",
    description:
      "Zone 2 foundational aerobic development combined with structured intervals to build long-term cardiovascular endurance.",
    duration: "8 WKS - 3-4 SESSIONS/WK",
    image: "images/programs/cardio-endurance-photo.jpg",
  },
  {
    id: "07",
    title: "CROSS TRAINING",
    category: "strength",
    level: "ADVANCED",
    tag: "OLYMPIC LIFTS & GYMNASTIC DENSITY",
    description:
      "Hybrid conditioning combining technical weightlifting with gymnastics volume and metabolic stamina.",
    duration: "6-10 WKS - 5 SESSIONS/WK",
    image: "images/programs/cross-training-photo.jpg",
  },
  {
    id: "08",
    title: "MOBILITY & RECOVERY",
    category: "restoration",
    level: "RESTORATIVE",
    tag: "JOINT ARTICULATION & CRYO RESET",
    description:
      "Mobility work, guided breathing, tissue recovery and structured cold-water immersion sequences.",
    duration: "YEAR-ROUND - UNLIMITED",
    image: "images/programs/mobility-recovery-photo.jpg",
  },
];

const scienceItems = [
  {
    icon: "sensors",
    number: "01",
    title: "BIOMETRIC PRECISION",
    description:
      "Performance tracking helps monitor movement speed, training readiness and fatigue.",
    target: "TARGET: MEASURED PERFORMANCE",
  },
  {
    icon: "waves",
    number: "02",
    title: "PERIODIZED TRAINING",
    description:
      "Structured training phases balance progressive overload with planned recovery.",
    target: "TARGET: LONG-TERM PROGRESSION",
  },
  {
    icon: "square_foot",
    number: "03",
    title: "PRECISION EQUIPMENT",
    description:
      "Professional lifting platforms and quality equipment support consistent training.",
    target: "STANDARD: PROFESSIONAL GRADE",
  },
  {
    icon: "ac_unit",
    number: "04",
    title: "RECOVERY INTEGRATION",
    description:
      "Dedicated recovery sessions complement demanding training cycles.",
    target: "FOCUS: RECOVERY & CONSISTENCY",
  },
];

function ProgramsPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(page.querySelectorAll("[data-gsap]"), {
          clearProps: "all",
        });
        return;
      }

      const scrollDefaults = {
        toggleActions: "play none none reverse" as const,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      };

      const reveal = (
        elements: string | Element[] | NodeListOf<Element>,
        options: {
          y?: number;
          x?: number;
          duration?: number;
          stagger?: number;
          start?: string;
          ease?: string;
          scale?: number;
          opacity?: number;
        } = {},
      ) => {
        gsap.utils.toArray<Element>(elements).forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: options.y ?? 42,
              x: options.x ?? 0,
              opacity: options.opacity ?? 0,
              scale: options.scale ?? 1,
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              duration: options.duration ?? 0.85,
              ease: options.ease ?? "power3.out",
              scrollTrigger: {
                trigger: element,
                start: options.start ?? "top 88%",
                ...scrollDefaults,
              },
            },
          );
        });
      };

      const revealGroup = (
        selector: string,
        options: {
          y?: number;
          x?: number;
          duration?: number;
          stagger?: number;
          start?: string;
        } = {},
      ) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, page);
        elements.forEach((element) => {
          const children = Array.from(element.children).filter(
            (child) => !(child as HTMLElement).hasAttribute("aria-hidden"),
          );
          if (!children.length) return;

          gsap.fromTo(
            children,
            {
              y: options.y ?? 35,
              x: options.x ?? 0,
              opacity: 0,
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              duration: options.duration ?? 0.8,
              stagger: options.stagger ?? 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: options.start ?? "top 86%",
                ...scrollDefaults,
              },
            },
          );
        });
      };

      // HERO: entrance animation plays on load; parallax follows scroll in both directions.
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .fromTo(
          ".programs-hero-bg",
          { scale: 1.14, opacity: 0.55 },
          { scale: 1, opacity: 1, duration: 1.7, ease: "power2.out" },
        )
        .fromTo(
          ".programs-hero-top",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=1.05",
        )
        .fromTo(
          ".programs-hero-label",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".programs-hero h1",
          { y: 55, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.95,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".programs-hero-main > p",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.48",
        )
        .fromTo(
          ".programs-hero-actions",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.4",
        )
        .fromTo(
          ".programs-hero-bottom",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.25",
        );

      gsap.to(".programs-hero-bg", {
        yPercent: 13,
        ease: "none",
        scrollTrigger: {
          trigger: ".programs-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Section headings and supporting copy.
      reveal(".programs-section-heading", { y: 34, duration: 0.8 });
      reveal(".curriculum-description", { y: 22, duration: 0.7 });
      revealGroup(".science-heading", {
        y: 28,
        stagger: 0.14,
        duration: 0.75,
      });

      // Featured image: directional mask reveal, then a subtle image settle.
      gsap.utils
        .toArray<HTMLElement>(".featured-visual", page)
        .forEach((visual) => {
          const image = visual.querySelector("img");
          gsap.fromTo(
            visual,
            { clipPath: "inset(0 0 0 100%)", opacity: 0.7 },
            {
              clipPath: "inset(0 0 0 0%)",
              opacity: 1,
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: visual,
                start: "top 82%",
                ...scrollDefaults,
              },
            },
          );
          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.16, x: 24 },
              {
                scale: 1,
                x: 0,
                duration: 1.35,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: visual,
                  start: "top 82%",
                  ...scrollDefaults,
                },
              },
            );
          }
        });

      reveal(".featured-details > *", {
        x: 34,
        y: 0,
        duration: 0.75,
        start: "top 84%",
      });
      reveal(".featured-points > div", {
        x: 24,
        y: 0,
        duration: 0.7,
      });
      reveal(".featured-telemetry > div", {
        y: 18,
        duration: 0.65,
      });

      // Curriculum cards: each card owns its trigger so fast scrolling does not
      // make the whole row animate at the same time. Hidden marquee clone is skipped.
      const programCards = gsap.utils.toArray<HTMLElement>(
        ".programs-marquee-group:not([aria-hidden='true']) .program-card",
        page,
      );
      programCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 48, opacity: 0, scale: 0.975 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: (index % 4) * 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              ...scrollDefaults,
            },
          },
        );
      });

      // Card content is revealed after the card itself enters.
      reveal(".program-card-content > *", {
        y: 18,
        duration: 0.65,
        start: "top 90%",
      });

      // Numbers and small data labels receive a short, readable entrance.
      reveal(
        ".curriculum-count, .section-reference, .programs-reference, .programs-hero-bottom span, .featured-telemetry strong, .synergy-metric strong, .science-target, .program-level",
        { y: 16, duration: 0.6, start: "top 90%" },
      );

      // Optional count-up support: add data-count="4200" to a numeric element.
      gsap.utils
        .toArray<HTMLElement>("[data-count]", page)
        .forEach((counter) => {
          const target = Number(counter.dataset.count);
          if (!Number.isFinite(target)) return;
          const state = { value: 0 };
          const suffix = counter.dataset.suffix ?? "";
          const prefix = counter.dataset.prefix ?? "";
          const decimals = Number(counter.dataset.decimals ?? 0);
          gsap.fromTo(
            state,
            { value: 0 },
            {
              value: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`;
              },
              scrollTrigger: {
                trigger: counter,
                start: "top 88%",
                ...scrollDefaults,
              },
            },
          );
        });

      // Science and synergy cards animate individually and reverse on scroll-up.
      reveal(".science-card", {
        y: 45,
        duration: 0.8,
        start: "top 88%",
        scale: 0.985,
      });
      reveal(".synergy-card", {
        y: 42,
        duration: 0.85,
        start: "top 88%",
        scale: 0.985,
      });
      reveal(".synergy-metric > div", {
        y: 18,
        duration: 0.65,
        start: "top 90%",
      });

      // CTA background and content.
      gsap.fromTo(
        ".programs-cta-bg",
        { scale: 1.12, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".programs-cta",
            start: "top 88%",
            ...scrollDefaults,
          },
        },
      );
      reveal(".programs-cta-content > *", {
        y: 30,
        duration: 0.75,
        start: "top 88%",
      });

      // Recalculate positions after page images have loaded.
      const images = Array.from(page.querySelectorAll("img"));
      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", () => ScrollTrigger.refresh(), {
            once: true,
          });
        }
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, page);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (!selectedProgram || !pageRef.current) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        ".protocol-modal-content",
        { y: 35, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }, pageRef);

    return () => context.revert();
  }, [selectedProgram]);

  useEffect(() => {
    if (!selectedProgram) return;

    function closeModal(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProgram(null);
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeModal);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeModal);
    };
  }, [selectedProgram]);

  const renderProgramCards = (group: string) =>
    programs.map((program) => (
      <article
        className="program-card"
        key={`${group}-${program.id}`}
        style={{ backgroundImage: `url("${program.image}")` }}
      >
        <div className="program-card-overlay" />

        <div className="program-card-top">
          <span className="program-level">{program.level}</span>
        </div>

        <div className="program-card-content">
          <span className="program-tag">{program.tag}</span>

          <h3>{program.title}</h3>

          <p>{program.description}</p>

          <div className="program-card-bottom">
            <button onClick={() => setSelectedProgram(program)} type="button">
              EXPLORE DETAILS
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <span>{program.duration}</span>
          </div>
        </div>
      </article>
    ));

  return (
    <main className="programs-page" ref={pageRef}>
      {/* HERO */}
      <section className="programs-hero">
        <div className="programs-hero-bg" />

        <div className="programs-hero-overlay" />

        <div className="programs-container programs-hero-content">
          <div className="programs-hero-top">
            <div className="programs-eyebrow">
              <span className="programs-live-dot" />
              TRAINING PROGRAMS - SOUIFER FITNESS
            </div>

            <span className="programs-reference">SYS.REF: SOUIFER-PRG-08</span>
          </div>

          <div className="programs-hero-main">
            <span className="programs-hero-label">
              BUILT FOR YOUR NEXT LEVEL
            </span>

            <h1>
              FIND YOUR WAY TO <span>STRONGER.</span>
            </h1>

            <p>
              Every athletic ceiling demands an uncompromising approach.
              Discover calibrated training programs engineered to accelerate
              strength, performance and resilience.
            </p>

            <div className="programs-hero-actions">
              <a href="#programs-list" className="programs-hero-button">
                EXPLORE PROGRAMS
                <span className="material-symbols-outlined">
                  arrow_downward
                </span>
              </a>
            </div>
          </div>

          <div className="programs-hero-bottom">
            <span>PERFORMANCE / STRENGTH / RECOVERY</span>
            <span>01 — 08</span>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAM */}
      <section className="programs-featured section-padding">
        <div className="programs-container">
          <div className="programs-section-heading">
            <div>
              <span className="section-kicker">SPOTLIGHT ARCHITECTURE</span>
              <h2>01 STRENGTH TRAINING — THE SOUIFER FOUNDATION</h2>
            </div>

            <span className="section-reference">
              BENCHMARK CALIBRATION: CLASS I-IV
            </span>
          </div>

          <div className="featured-grid">
            <div className="featured-visual">
              <img
                src={programs[0].image}
                alt="Athlete preparing for a heavy barbell lift"
              />

              <div className="featured-image-top">
                <span>STATUS - ENROLLMENT OPEN</span>
                <span className="material-symbols-outlined">
                  fitness_center
                </span>
              </div>

              <div className="featured-telemetry">
                <div>
                  <span>CYCLE LENGTH</span>
                  <strong>4-6 WEEKS</strong>
                </div>

                <div>
                  <span>METRIC SYSTEM</span>
                  <strong>VELOCITY GUIDED</strong>
                </div>

                <div>
                  <span>DIFFICULTY TIER</span>
                  <strong>ADVANCED</strong>
                </div>
              </div>
            </div>

            <div className="featured-details">
              <span className="featured-label">
                <i /> FLAGSHIP DISCIPLINE - REVOLUTIONARY METHODOLOGY
              </span>

              <h3>NEUROMUSCULAR PEAK POTENTIATION</h3>

              <p className="featured-description">
                Engineered exclusively for raw force output. We deploy
                velocity-loss cutoff protocols, performance tracking and
                Olympic-grade equipment to systematically develop maximal
                strength.
              </p>

              <div className="featured-points">
                <div>
                  <span className="material-symbols-outlined">
                    electric_bolt
                  </span>
                  <div>
                    <h4>CNS Potentiation Protocols</h4>
                    <p>
                      Structured training sequences designed to improve
                      neuromuscular readiness.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="material-symbols-outlined">speed</span>
                  <div>
                    <h4>Barbell Kinematics & Encoders</h4>
                    <p>
                      Real-time movement tracking to monitor lifting speed and
                      training quality.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="material-symbols-outlined">monitoring</span>
                  <div>
                    <h4>Force Plate Diagnostics</h4>
                    <p>
                      Performance assessment focused on balance, force and
                      movement symmetry.
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="program-primary-btn"
                onClick={() => setSelectedProgram(programs[0])}
                type="button"
              >
                OPEN PROGRAM DETAILS
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM CURRICULUM */}
      <section
        className="programs-curriculum section-padding"
        id="programs-list"
      >
        <div className="programs-container">
          <div className="programs-section-heading curriculum-heading">
            <div>
              <span className="section-kicker">
                FULL CURRICULUM - SOUIFER FITNESS
              </span>

              <h2>EIGHT DISCIPLINES OF POWER.</h2>
            </div>

            <span className="curriculum-count">08 PROGRAMS</span>
          </div>

          <p className="curriculum-description">
            Uncompromised standards across strength, hypertrophy, metabolic
            conditioning and recovery.
          </p>

          <div className="programs-marquee">
            <div className="programs-marquee-track">
              <div className="programs-marquee-group">
                {renderProgramCards("original")}
              </div>

              <div className="programs-marquee-group" aria-hidden="true">
                {renderProgramCards("duplicate")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="programs-science section-padding">
        <div className="programs-container">
          <div className="science-heading">
            <span className="section-kicker">SCIENTIFIC FOUNDATION</span>

            <h2>WHY OUR PROGRAMS DELIVER RESULTS.</h2>

            <p>
              We reject arbitrary volume. Every exercise, rest interval and
              training load is selected with a clear performance objective.
            </p>
          </div>

          <div className="science-grid">
            {scienceItems.map((item) => (
              <article className="science-card" key={item.number}>
                <div className="science-icon">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>

                <span className="section-kicker">PILLAR {item.number}</span>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <span className="science-target">{item.target}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING COMBINATIONS */}
      <section className="programs-synergies section-padding">
        <div className="programs-container">
          <div className="programs-section-heading">
            <div>
              <span className="section-kicker">TRAINING COMBINATIONS</span>
              <h2>OPTIMAL TRAINING COMBINATIONS.</h2>
            </div>

            <span className="section-reference">CROSS-SYSTEM INTEGRATION</span>
          </div>

          <div className="synergy-grid">
            <article className="synergy-card">
              <div>
                <span className="section-kicker">TRAINING COMBINATION A</span>

                <h3>STRENGTH + MOBILITY & RECOVERY</h3>

                <p>
                  Combine demanding strength sessions with mobility and recovery
                  work to support a balanced training routine.
                </p>
              </div>

              <div className="synergy-metric">
                <div>
                  <span>RECOMMENDED RATIO</span>
                  <strong>4 : 2</strong>
                </div>

                <div className="synergy-bar">
                  <span style={{ width: "66%" }} />
                </div>

                <small>STRENGTH / RECOVERY</small>
              </div>
            </article>

            <article className="synergy-card">
              <div>
                <span className="section-kicker">TRAINING COMBINATION B</span>

                <h3>FUNCTIONAL TRAINING + HIIT</h3>

                <p>
                  Combine multi-directional movement with interval training for
                  a varied conditioning routine.
                </p>
              </div>

              <div className="synergy-metric">
                <div>
                  <span>RECOMMENDED RATIO</span>
                  <strong>3 : 2</strong>
                </div>

                <div className="synergy-bar">
                  <span style={{ width: "60%" }} />
                </div>

                <small>AGILITY / CONDITIONING</small>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="programs-cta">
        <div className="programs-cta-bg" />

        <div className="programs-cta-content">
          <span className="section-kicker">
            <span className="material-symbols-outlined">flash_on</span>
            SOUIFER FITNESS - NEXT LEVEL
          </span>

          <h2>READY TO FIND YOUR DISCIPLINE?</h2>

          <p>
            Consult with our team to find the right training approach for your
            goals, experience and performance level.
          </p>

          <div className="programs-cta-actions">
            <a href="/contact" className="program-primary-btn">
              BOOK INITIAL EVALUATION
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAM DETAILS MODAL */}
      {selectedProgram && (
        <div
          className="protocol-modal"
          onClick={() => setSelectedProgram(null)}
          role="presentation"
        >
          <div
            className="protocol-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="protocol-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="protocol-close"
              onClick={() => setSelectedProgram(null)}
              aria-label="Close dialog"
              type="button"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="section-kicker">
              PROGRAM DETAILS - SPEC {selectedProgram.id}
            </span>

            <h2 id="protocol-title">{selectedProgram.title} PROGRAM</h2>

            <p className="protocol-intro">{selectedProgram.description}</p>

            <div className="protocol-info-grid">
              <div>
                <span>PROGRAM LEVEL</span>
                <strong>{selectedProgram.level}</strong>
              </div>

              <div>
                <span>PROGRAM DURATION</span>
                <strong>{selectedProgram.duration}</strong>
              </div>

              <div>
                <span>TRAINING CATEGORY</span>
                <strong>{selectedProgram.category.toUpperCase()}</strong>
              </div>
            </div>

            <div className="protocol-schedule">
              <span className="section-kicker">PROGRAM OVERVIEW</span>

              <h3>{selectedProgram.tag}</h3>

              <p>
                Your coach will help adapt this program to your current fitness
                level, training experience and personal goals.
              </p>
            </div>

            <div className="protocol-footer">
              <span>
                <i /> COACHING EVALUATION RECOMMENDED
              </span>

              <a href="/contact" className="program-primary-btn">
                INQUIRE NOW
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProgramsPage;
