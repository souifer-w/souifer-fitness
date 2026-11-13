import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./TrsinersPage.css";

gsap.registerPlugin(ScrollTrigger);

type Coach = {
  id: string;
  name: string;
  title: string;
  categoryLabel: string;
  experience: string;
  image: string;
  description: string;
  tags: string[];
  bio: string;
  philosophy: string;
  certifications: string[];
};

const coaches: Coach[] = [
  {
    id: "marcus",
    name: "MARCUS VANCE",
    title: "MASTER STRENGTH DIRECTOR & HEAD COACH",
    categoryLabel: "STRENGTH & CONDITIONING",
    experience: "14 YEARS COACHING EXPERIENCE",
    image: "/images/coach-one.jpg",
    description:
      "Specializes in maximal velocity barbell loading, neuromuscular potentiation, and competitive athletic preparation with emphasis on injury risk mitigation.",
    tags: ["Barbell Dynamics", "Force Output", "CNS Priming"],
    bio: "Marcus specializes in strength development, velocity-based training, and athletic preparation. His coaching approach focuses on measurable progress, disciplined execution, and building sustainable strength.",
    philosophy:
      "We do not train for superficial fatigue or random exhaustion. Every repetition is an intentional stimulus measured against your capacity. Precision in the basics builds stronger athletes.",
    certifications: [
      "CSCS*D",
      "USAW Senior Coach",
      "EXOS Performance Specialist",
      "Kistler Force Plate Operator",
    ],
  },
  {
    id: "elena",
    name: "ELENA ROSTOVA",
    title: "BIOMECHANICS & HYPERTROPHY LEAD",
    categoryLabel: "BODYBUILDING & BIOMECHANICS",
    experience: "10 YEARS HYPERTROPHY COACHING",
    image: "/images/coach-tow.jpg",
    description:
      "Focuses on biomechanical alignment, customized movement profiling, and progressive overload for balanced muscular development.",
    tags: ["Muscle Growth", "Tension Mapping", "Periodization"],
    bio: "Elena works with athletes and fitness enthusiasts looking to improve muscular development through structured hypertrophy programming and movement mechanics.",
    philosophy:
      "Muscle growth is mechanical tension properly delivered through structurally sound movement. Focus on technique, consistency, and progressive overload.",
    certifications: [
      "MS Exercise Science",
      "Certified Biomechanist",
      "Precision Nutrition",
      "ISSA Master Physique",
    ],
  },
  {
    id: "david",
    name: "DAVID KALU",
    title: "ATHLETIC SPEED & ROTATIONAL LEAD",
    categoryLabel: "FUNCTIONAL & FIELD SPEED",
    experience: "8 YEARS TACTICAL & FIELD SPEED",
    image: "/images/coach-three.jpg",
    description:
      "Focuses on multi-planar movement, sprint mechanics, rotational power, and hybrid conditioning for real-world athletic performance.",
    tags: ["Kinetic Chains", "Rotational Power", "Sprint Training"],
    bio: "David specializes in functional performance, movement coordination, sprint mechanics, and athletic conditioning.",
    philosophy:
      "Athleticism is the ability to produce and redirect force efficiently. We train movement that translates beyond the gym.",
    certifications: [
      "ALTIS Speed Specialist",
      "FMS Level 2",
      "NASM Performance Enhancement",
      "Athletic Conditioning",
    ],
  },
  {
    id: "sarah",
    name: "DR. SARAH LINDQVIST",
    title: "CLINICAL PERFORMANCE & RESTORATION",
    categoryLabel: "PERSONAL & RESTORATION",
    experience: "11 YEARS CLINICAL & PT TRAINING",
    image: "/images/coach-four.jpg",
    description:
      "Integrates individualized mobility assessment, postural balance, movement restoration, and customized progressive resistance.",
    tags: ["Mobility", "Postural Balance", "Recovery"],
    bio: "Sarah focuses on individualized training, mobility, movement quality, and recovery-oriented exercise programming.",
    philosophy:
      "Longevity and strength are not mutually exclusive. Building a strong foundation makes consistent performance more sustainable.",
    certifications: [
      "Doctor of Physical Therapy",
      "PRI Practitioner",
      "ACSM Clinical Exercise",
      "FRC Mobility Specialist",
    ],
  },
];

const standards = [
  {
    number: "01",
    label: "SCREENING PROTOCOL",
    title: "BIOLOGICAL BASELINE ASSESSMENT",
    description:
      "Every training journey starts with an assessment of your current fitness level, movement quality, mobility, and individual goals.",
    metric: "PERSONALIZED STARTING POINT",
    progress: "100%",
    width: "100%",
  },
  {
    number: "02",
    label: "EXECUTION METRICS",
    title: "STRUCTURED TRAINING PROGRESSION",
    description:
      "Your coach monitors exercise technique, training volume, intensity, and progress to keep your program purposeful.",
    metric: "PROGRESSIVE OVERLOAD",
    progress: "85%",
    width: "85%",
  },
  {
    number: "03",
    label: "RECOVERY STRATEGY",
    title: "RECOVERY & ADAPTATION",
    description:
      "Training plans account for recovery, rest, mobility, and consistency to support long-term physical development.",
    metric: "RECOVERY FOCUSED",
    progress: "92%",
    width: "92%",
  },
];

function TrainersPage() {
  const pageRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Main page animations
  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      // HERO ANIMATION
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          ".trainers-hero-image",
          {
            clipPath: "inset(0 100% 0 0)",
            scale: 1.12,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            duration: 1.6,
            ease: "power4.inOut",
          },
        )
        .fromTo(
          ".trainers-hero-overlay",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
          "-=1",
        )
        .fromTo(
          ".trainers-hero-heading .section-eyebrow",
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.7",
        )
        .fromTo(
          ".trainers-hero-heading h1",
          {
            y: 75,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".trainers-hero-description",
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          "-=0.6",
        );

      // Reusable scroll reveal animation
      const reveal = (
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
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: options.y ?? 45,
              x: options.x ?? 0,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: options.duration ?? 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: options.start ?? "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      };

      // SECTION HEADINGS
      reveal(".directory-heading > div, .directory-heading > p", {
        y: 45,
        duration: 1,
      });

      reveal(".standards-intro .section-eyebrow", {
        y: 25,
      });

      reveal(".standards-intro h2", {
        y: 55,
        duration: 1,
      });

      reveal(".standards-intro p", {
        y: 35,
        duration: 0.9,
      });

      // COACH CARDS
      const coachCards = gsap.utils.toArray<HTMLElement>(".trainer-card", page);

      coachCards.forEach((card, index) => {
        const image = card.querySelector(".trainer-card-image");
        const imageElement = card.querySelector("img");
        const name = card.querySelector(".trainer-card-name");
        const content = card.querySelector(".trainer-card-content");
        const footer = card.querySelector(".trainer-card-footer");

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        cardTimeline.fromTo(
          card,
          {
            y: 75,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
          },
        );

        if (image) {
          cardTimeline.fromTo(
            image,
            {
              clipPath: "inset(100% 0 0 0)",
            },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "power3.inOut",
            },
            "-=0.6",
          );
        }

        if (imageElement) {
          cardTimeline.fromTo(
            imageElement,
            {
              scale: 1.18,
            },
            {
              scale: 1,
              duration: 1.3,
              ease: "power2.out",
            },
            "<",
          );
        }

        if (name) {
          cardTimeline.fromTo(
            name,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.6",
          );
        }

        if (content) {
          cardTimeline.fromTo(
            content,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4",
          );
        }

        if (footer) {
          cardTimeline.fromTo(
            footer,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4",
          );
        }
      });

      // COACH TAGS
      gsap.utils
        .toArray<HTMLElement>(".trainer-tags", page)
        .forEach((tagContainer) => {
          const tags = tagContainer.querySelectorAll("span");

          gsap.fromTo(
            tags,
            {
              y: 15,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: tagContainer,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      // STANDARDS CARDS
      const standardCards = gsap.utils.toArray<HTMLElement>(
        ".standard-card",
        page,
      );

      standardCards.forEach((card, index) => {
        const number = card.querySelector(".standard-number");
        const heading = card.querySelector("h3");
        const description = card.querySelector("p");
        const metric = card.querySelector(".standard-metric");
        const progressBar = card.querySelector(".standard-progress span");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        timeline.fromTo(
          card,
          {
            y: 65,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
          },
        );

        if (number) {
          timeline.fromTo(
            number,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
            },
            "-=0.5",
          );
        }

        if (heading) {
          timeline.fromTo(
            heading,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.35",
          );
        }

        if (description) {
          timeline.fromTo(
            description,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.35",
          );
        }

        if (metric) {
          timeline.fromTo(
            metric,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.3",
          );
        }

        if (progressBar) {
          gsap.set(progressBar, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          timeline.to(
            progressBar,
            {
              scaleX: 1,
              duration: 1.3,
              ease: "power3.inOut",
            },
            "-=0.3",
          );
        }
      });

      // CTA IMAGE
      const ctaImage = page.querySelector(".trainers-cta-image");

      if (ctaImage) {
        gsap.fromTo(
          ctaImage,
          {
            clipPath: "inset(0 100% 0 0)",
            scale: 1.12,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            duration: 1.3,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: ".trainers-cta",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // CTA CONTENT
      reveal(".trainers-cta-badge", {
        y: 25,
      });

      reveal(".trainers-cta-main h2", {
        y: 55,
        duration: 1,
      });

      reveal(".trainers-cta-main > p", {
        y: 30,
      });

      reveal(".trainers-cta-actions", {
        y: 25,
      });

      // EVALUATION BOX
      reveal(".evaluation-box", {
        x: 45,
        y: 0,
        duration: 1,
      });

      const evaluationItems = gsap.utils.toArray<HTMLElement>(
        ".evaluation-box li",
        page,
      );

      evaluationItems.forEach((item) => {
        gsap.fromTo(
          item,
          {
            x: -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 94%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  // Modal entrance animation
  useLayoutEffect(() => {
    if (!selectedCoach || !modalRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".coach-modal-backdrop",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
          },
        )
        .fromTo(
          ".coach-modal",
          {
            y: 45,
            scale: 0.96,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.1",
        )
        .fromTo(
          ".coach-modal-header, .coach-modal-details, .coach-booking-box",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.25",
        );
    }, modalRef);

    return () => ctx.revert();
  }, [selectedCoach]);

  // Lock background scrolling while the modal is open
  useEffect(() => {
    if (!selectedCoach) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCoach(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedCoach]);

  const openCoach = (coach: Coach) => {
    setSubmitted(false);
    setSelectedCoach(coach);
  };

  const closeCoach = () => {
    setSelectedCoach(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="trainers-page" ref={pageRef}>
      {/* Hero */}
      <section className="trainers-hero">
        <div className="trainers-hero-image" />
        <div className="trainers-hero-overlay" />

        <div className="trainers-container trainers-hero-content">
          <div className="trainers-hero-heading">
            <span className="section-eyebrow">
              [ THE PEOPLE BEHIND THE PROGRESS ]
            </span>

            <h1>
              EXPERIENCE.
              <br />
              <span>KNOWLEDGE.</span> PURPOSE.
            </h1>
          </div>

          <p className="trainers-hero-description">
            Great training starts with uncompromising guidance. Meet the
            specialists dedicated to helping you build strength, improve
            performance, and reach your next level.
          </p>
        </div>
      </section>

      {/* Coaches Directory */}
      <section className="trainers-section directory-section">
        <div className="trainers-container">
          <div className="section-heading directory-heading">
            <div>
              <span className="section-eyebrow">THE COACHING DIRECTORY</span>

              <h2>SPECIALIZED PRACTITIONERS</h2>
            </div>

            <p>
              Every coach brings a different approach to training. Find the
              specialist whose expertise matches your goals.
            </p>
          </div>

          <div className="trainer-grid">
            {coaches.map((coach) => (
              <article className="trainer-card" key={coach.id}>
                <div className="trainer-card-image">
                  <img src={coach.image} alt={coach.name} loading="lazy" />

                  <div className="trainer-card-image-overlay" />

                  <div className="trainer-card-name">
                    <span>{coach.categoryLabel}</span>
                    <h3>{coach.name}</h3>
                  </div>
                </div>

                <div className="trainer-card-content">
                  <span className="trainer-experience">
                    <span className="material-symbols-outlined">
                      history_edu
                    </span>
                    {coach.experience}
                  </span>

                  <p>{coach.description}</p>

                  <div className="trainer-tags">
                    {coach.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="trainer-card-footer">
                  <button type="button" onClick={() => openCoach(coach)}>
                    VIEW METHODOLOGY
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Standards */}
      <section className="trainers-section standards-section">
        <div className="trainers-container">
          <div className="standards-intro">
            <span className="section-eyebrow">
              PROTOCOL - SCIENTIFIC DISCIPLINE
            </span>

            <h2>THE THREE PILLARS OF COACHING INTEGRITY</h2>

            <p>
              We eliminate guesswork from your training journey. Every program
              follows a structured approach built around assessment,
              progression, and recovery.
            </p>
          </div>

          <div className="standards-grid">
            {standards.map((standard) => (
              <article className="standard-card" key={standard.number}>
                <div>
                  <div className="standard-top">
                    <span className="standard-number">{standard.number}</span>

                    <span className="standard-label">{standard.label}</span>
                  </div>

                  <h3>{standard.title}</h3>
                  <p>{standard.description}</p>
                </div>

                <div className="standard-metric">
                  <div>
                    <span>{standard.metric}</span>
                    <strong>{standard.progress}</strong>
                  </div>

                  <div className="standard-progress">
                    <span style={{ width: standard.width }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="trainers-section trainers-cta-section">
        <div className="trainers-container">
          <div className="trainers-cta">
            <div className="trainers-cta-image" />

            <div className="trainers-cta-content">
              <div className="trainers-cta-main">
                <span className="trainers-cta-badge">
                  <span className="status-dot" />
                  YOUR NEXT LEVEL STARTS HERE
                </span>

                <h2>
                  READY TO WORK WITH A <span>MASTER COACH?</span>
                </h2>

                <p>
                  Tell us about your goals and let our team help you find the
                  right coaching approach for your fitness journey.
                </p>

                <div className="trainers-cta-actions">
                  <Link to="/membership" className="button-secondary">
                    VIEW MEMBERSHIP PLANS
                  </Link>
                </div>
              </div>

              <div className="evaluation-box">
                <span className="small-label">YOUR FIRST STEP</span>
                <h3>START WITH A PLAN.</h3>

                <ul>
                  <li>
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Personal fitness goals discussion
                  </li>

                  <li>
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Coach and program recommendations
                  </li>

                  <li>
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Training approach overview
                  </li>

                  <li>
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Next-step guidance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Dossier Modal */}
      {selectedCoach && (
        <div
          className="coach-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCoach();
            }
          }}
        >
          <div
            className="coach-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
          >
            <div className="coach-modal-header">
              <div>
                <span className="section-eyebrow">
                  {selectedCoach.categoryLabel}
                </span>

                <h2 id="coach-modal-title">{selectedCoach.name}</h2>

                <p>{selectedCoach.title}</p>
              </div>

              <button
                type="button"
                className="coach-modal-close"
                onClick={closeCoach}
                aria-label="Close coach details"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="coach-modal-body">
              <div className="coach-modal-details">
                <div className="modal-info-box">
                  <span className="small-label">BIOGRAPHY & BACKGROUND</span>

                  <p>{selectedCoach.bio}</p>
                </div>

                <div className="modal-info-box">
                  <span className="small-label">COACHING PHILOSOPHY</span>

                  <p className="modal-philosophy">
                    “{selectedCoach.philosophy}”
                  </p>
                </div>

                <div className="modal-certifications">
                  <span className="small-label">
                    CERTIFICATIONS & SPECIALIZATIONS
                  </span>

                  <div>
                    {selectedCoach.certifications.map((certification) => (
                      <span key={certification}>{certification}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="coach-booking-box">
                {submitted ? (
                  <div className="form-success">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>

                    <h3>REQUEST PREPARED</h3>

                    <p>
                      This is a front-end demonstration. Connect the form to
                      your backend to receive consultation requests.
                    </p>

                    <button
                      type="button"
                      className="button-primary"
                      onClick={closeCoach}
                    >
                      CLOSE
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="small-label">
                      REQUEST A COACH CONSULTATION
                    </span>

                    <form onSubmit={handleSubmit}>
                      <label htmlFor="athlete-name">FULL NAME</label>

                      <input
                        id="athlete-name"
                        type="text"
                        placeholder="Your full name"
                        required
                      />

                      <label htmlFor="athlete-email">EMAIL ADDRESS</label>

                      <input
                        id="athlete-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />

                      <label htmlFor="athlete-objective">
                        PRIMARY OBJECTIVE
                      </label>

                      <select id="athlete-objective" defaultValue="" required>
                        <option value="" disabled>
                          Select your objective
                        </option>
                        <option>Strength & Performance</option>
                        <option>Muscle Growth</option>
                        <option>Functional Training</option>
                        <option>Mobility & Recovery</option>
                        <option>General Fitness</option>
                      </select>

                      <button type="submit" className="button-primary">
                        REQUEST CONSULTATION
                      </button>
                    </form>

                    <div className="coach-availability">
                      <span className="status-dot" />
                      REQUESTS ARE SUBJECT TO CONFIRMATION
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default TrainersPage;
