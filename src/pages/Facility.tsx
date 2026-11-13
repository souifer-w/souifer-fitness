import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Dumbbell,
  HeartPulse,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Facility.css";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    number: "01",
    title: "STRENGTH FLOOR",
    category: "STRENGTH & PERFORMANCE",
    description:
      "A dedicated environment for serious strength training, built around premium equipment and space to perform.",
    image: "/images/image-facility-mobility.jpg",
    features: ["Free weights", "Power racks", "Strength machines"],
  },
  {
    number: "02",
    title: "PERFORMANCE ZONE",
    category: "CONDITIONING & ATHLETICS",
    description:
      "Push your physical limits with dedicated conditioning equipment and functional training space.",
    image: "/images/image-facility-performance.jpg",
    features: ["Functional rigs", "Cardio equipment", "Athletic training"],
  },
  {
    number: "03",
    title: "RECOVERY SUITE",
    category: "RECOVERY & WELLNESS",
    description:
      "A dedicated space to slow down, recover properly, and prepare your body for the next session.",
    image: "/images/image-facility-recovery.jpg",
    features: ["Recovery area", "Mobility space", "Relaxation zone"],
  },
  {
    number: "04",
    title: "GROUP STUDIO",
    category: "COMMUNITY & MOVEMENT",
    description:
      "Train together in a focused environment designed for coached sessions and group workouts.",
    image: "/images/image-facility-olympic.jpg",
    features: ["Group sessions", "Coached workouts", "Open training space"],
  },
];

const amenities = [
  {
    icon: Dumbbell,
    title: "PREMIUM EQUIPMENT",
    description:
      "Carefully selected training equipment for strength, conditioning, and performance.",
  },
  {
    icon: Activity,
    title: "FUNCTIONAL TRAINING",
    description:
      "Dedicated areas for movement, athletic development, and full-body training.",
  },
  {
    icon: HeartPulse,
    title: "RECOVERY SPACES",
    description:
      "Spaces designed to support mobility, recovery, and post-workout routines.",
  },
  {
    icon: ShieldCheck,
    title: "CLEAN ENVIRONMENT",
    description: "A clean, organised, and maintained training environment.",
  },
  {
    icon: Clock3,
    title: "FLEXIBLE TRAINING",
    description:
      "A convenient training environment designed to fit your routine.",
  },
  {
    icon: Waves,
    title: "WELLNESS EXPERIENCE",
    description:
      "A balanced approach to training, recovery, and everyday wellbeing.",
  },
];

const stats = [
  { value: "24/7", label: "TRAINING MINDSET" },
  { value: "04", label: "DEDICATED ZONES" },
  { value: "100%", label: "FOCUS ON YOU" },
];

export default function Facility() {
  const pageRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const imageListeners: {
      image: HTMLImageElement;
      handler: () => void;
    }[] = [];

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const reveal = (
        element: Element,
        from: gsap.TweenVars,
        to: gsap.TweenVars = {},
        start = "top 86%",
      ) => {
        gsap.fromTo(
          element,
          {
            ...from,
          },
          {
            ...to,
            duration: to.duration ?? 1,
            ease: to.ease ?? "power3.out",
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play reverse play reverse",
            },
          },
        );
      };

      // HERO IMAGE REVEAL
      const heroImage = page.querySelector(".facility-hero-image");

      if (heroImage) {
        gsap.fromTo(
          heroImage,
          {
            clipPath: "inset(0 100% 0 0)",
            scale: 1.12,
            x: -35,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            x: 0,
            duration: 1.8,
            ease: "power4.inOut",
            delay: 0.1,
          },
        );

        gsap.to(heroImage, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".facility-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // HERO OVERLAY
      const heroOverlay = page.querySelector(".facility-hero-overlay");

      if (heroOverlay) {
        gsap.fromTo(
          heroOverlay,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      }

      // HERO CONTENT ENTRANCE
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        delay: 0.45,
      });

      heroTimeline
        .fromTo(
          ".facility-eyebrow",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
        )
        .fromTo(
          ".facility-hero-content h1",
          {
            opacity: 0,
            y: 75,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
          },
          "-=0.4",
        )
        .fromTo(
          ".facility-hero-content > p",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
          },
          "-=0.55",
        )
        .fromTo(
          ".facility-hero-actions > *",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.45",
        )
        .fromTo(
          ".facility-hero-bottom span, .facility-hero-scroll",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.3",
        );

      // SECTION LABELS
      gsap.utils
        .toArray<HTMLElement>(".facility-section-label")
        .forEach((label) => {
          reveal(
            label,
            {
              opacity: 0,
              x: -35,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
            },
          );

          const labelParts = label.querySelectorAll("span");

          gsap.fromTo(
            labelParts,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: label,
                start: "top 88%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

      // INTRODUCTION HEADING
      const introHeading = page.querySelector(".facility-intro-heading h2");

      if (introHeading) {
        reveal(
          introHeading,
          {
            opacity: 0,
            x: -75,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
          },
        );
      }

      // INTRODUCTION COPY
      const introCopy = page.querySelector(".facility-intro-copy");

      if (introCopy) {
        gsap.fromTo(
          introCopy.children,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introCopy,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // STATS
      gsap.fromTo(
        ".facility-stat",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".facility-stats",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // TRAINING SPACES SECTION HEADING
      const spacesHeading = page.querySelector(".facility-section-heading h2");

      if (spacesHeading) {
        reveal(
          spacesHeading,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
        );
      }

      const spacesDescription = page.querySelector(
        ".facility-section-heading > p",
      );

      if (spacesDescription) {
        reveal(
          spacesDescription,
          {
            opacity: 0,
            x: 55,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
          },
        );
      }

      // TRAINING SPACE IMAGES
      gsap.utils
        .toArray<HTMLElement>(".facility-space-image")
        .forEach((image, index) => {
          const imageElement = image.querySelector("img");
          const direction = index % 2 === 0 ? -70 : 70;
          const revealClip =
            index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

          const imageTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          });

          imageTimeline.fromTo(
            image,
            {
              opacity: 0,
              x: direction,
              clipPath: revealClip,
            },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0 0 0)",
              duration: 1.25,
              ease: "power4.out",
            },
          );

          if (imageElement) {
            imageTimeline.fromTo(
              imageElement,
              {
                scale: 1.2,
                transformOrigin: "center center",
              },
              {
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                overwrite: "auto",
              },
              "-=1.1",
            );
          }

          // IMAGE NUMBER
          const number = image.querySelector(".facility-space-number");

          if (number) {
            imageTimeline.fromTo(
              number,
              {
                opacity: 0,
                y: 20,
                scale: 0.8,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.5)",
              },
              "-=0.9",
            );
          }

          // IMAGE CATEGORY
          const category = image.querySelector(".facility-space-category");

          if (category) {
            imageTimeline.fromTo(
              category,
              {
                opacity: 0,
                x: 25,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              "-=0.7",
            );
          }
        });

      // TRAINING SPACE CONTENT
      gsap.utils
        .toArray<HTMLElement>(".facility-space-content")
        .forEach((content) => {
          gsap.fromTo(
            content.children,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.13,
              ease: "power3.out",
              scrollTrigger: {
                trigger: content,
                start: "top 88%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

      // TRAINING SPACE TITLE ICONS
      gsap.fromTo(
        ".facility-space-title svg",
        {
          opacity: 0,
          rotate: -35,
          scale: 0.6,
        },
        {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.16,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".facility-spaces-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // AMENITIES HEADING
      const amenitiesHeading = page.querySelector(
        ".facility-amenities-heading h2",
      );

      if (amenitiesHeading) {
        reveal(
          amenitiesHeading,
          {
            opacity: 0,
            x: -65,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
          },
        );
      }

      const amenitiesDescription = page.querySelector(
        ".facility-amenities-heading > p",
      );

      if (amenitiesDescription) {
        reveal(
          amenitiesDescription,
          {
            opacity: 0,
            x: 65,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
          },
        );
      }

      // AMENITIES CARDS
      gsap.utils
        .toArray<HTMLElement>(".facility-amenity-card")
        .forEach((card, index) => {
          const direction = index % 2 === 0 ? 35 : -35;

          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          });

          cardTimeline.fromTo(
            card,
            {
              opacity: 0,
              y: 45,
              x: direction,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
            },
          );

          const icon = card.querySelector(".facility-amenity-top svg");

          if (icon) {
            cardTimeline.fromTo(
              icon,
              {
                opacity: 0,
                rotate: -45,
                scale: 0.5,
              },
              {
                opacity: 1,
                rotate: 0,
                scale: 1,
                duration: 0.65,
                ease: "back.out(1.7)",
              },
              "-=0.5",
            );
          }

          const textElements = card.querySelectorAll("h3, p");

          cardTimeline.fromTo(
            textElements,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.4",
          );
        });

      // FINAL CTA HEADING
      const finalHeading = page.querySelector(".facility-final-content h2");

      if (finalHeading) {
        reveal(
          finalHeading,
          {
            opacity: 0,
            y: 75,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
          },
        );
      }

      // FINAL CTA CONTENT
      const finalContent = page.querySelector(".facility-final-content");

      if (finalContent) {
        const elements = finalContent.querySelectorAll("p, .facility-button");

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: finalContent,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // FINAL FOOTER
      const finalFooter = page.querySelector(".facility-final-footer");

      if (finalFooter) {
        reveal(
          finalFooter,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "top 95%",
        );
      }

      // REFRESH WHEN IMAGES FINISH LOADING
      const images = gsap.utils.toArray<HTMLImageElement>("img", page);

      const refreshScroll = () => ScrollTrigger.refresh();

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refreshScroll);
          image.addEventListener("error", refreshScroll);

          imageListeners.push({
            image,
            handler: refreshScroll,
          });
        }
      });

      ScrollTrigger.refresh();
    }, page);

    return () => {
      imageListeners.forEach(({ image, handler }) => {
        image.removeEventListener("load", handler);
        image.removeEventListener("error", handler);
      });

      context.revert();
    };
  }, []);

  return (
    <main className="facility-page" ref={pageRef}>
      {/* HERO */}
      <section className="facility-hero">
        <div className="facility-hero-image" aria-hidden="true" />
        <div className="facility-hero-overlay" aria-hidden="true" />

        <div className="facility-hero-content">
          <div className="facility-eyebrow">
            <span className="facility-eyebrow-line" />
            THE SOUIFER EXPERIENCE
          </div>

          <h1>
            BUILT FOR
            <br />
            <span>YOUR</span> PERFORMANCE.
          </h1>

          <p>
            More than a gym. A purpose-built training environment designed to
            help you move better, train harder, and become stronger.
          </p>

          <div className="facility-hero-actions">
            <Link
              to="/JoinUs"
              className="facility-button facility-button-primary"
            >
              EXPLORE MEMBERSHIP
              <ArrowUpRight />
            </Link>

            <a href="#facility-spaces" className="facility-text-link">
              EXPLORE THE FACILITY
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className="facility-hero-bottom">
          <span>ENGINEERED FOR PERFORMANCE</span>
          <span>01 / 04 — THE ENVIRONMENT</span>
        </div>

        <div className="facility-hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <div />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="facility-intro section-padding">
        <div className="facility-section-label">
          <span>01</span>
          <span>OUR ENVIRONMENT</span>
        </div>

        <div className="facility-intro-grid">
          <div className="facility-intro-heading">
            <h2>
              EVERY DETAIL.
              <br />
              <span>EVERY REP.</span>
              <br />
              EVERY RESULT.
            </h2>
          </div>

          <div className="facility-intro-copy">
            <p className="facility-intro-lead">
              Your environment shapes your performance.
            </p>

            <p>
              At SOUIFER FITNESS, every training space has a purpose. From
              strength equipment to functional training and recovery areas, the
              environment is designed to support every stage of your fitness
              journey.
            </p>

            <p>
              Whether you're building strength, improving conditioning, or
              working towards a new personal best, you'll find the space to make
              it happen.
            </p>

            <Link to="/about" className="facility-inline-link">
              DISCOVER OUR PHILOSOPHY
              <ArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="facility-stats">
          {stats.map((stat) => (
            <div className="facility-stat" key={stat.label}>
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRAINING SPACES */}
      <section className="facility-spaces section-padding" id="facility-spaces">
        <div className="facility-section-heading">
          <div>
            <div className="facility-section-label">
              <span>02</span>
              <span>EXPLORE THE SPACES</span>
            </div>

            <h2>
              FIND YOUR
              <br />
              <span>TRAINING ZONE.</span>
            </h2>
          </div>

          <p>
            Different goals. Different spaces. One environment built around your
            progress.
          </p>
        </div>

        <div className="facility-spaces-grid">
          {spaces.map((space) => (
            <article className="facility-space-card" key={space.number}>
              <div className="facility-space-image">
                <img src={space.image} alt={space.title} loading="lazy" />

                <span className="facility-space-number">{space.number}</span>

                <span className="facility-space-category">
                  {space.category}
                </span>
              </div>

              <div className="facility-space-content">
                <div className="facility-space-title">
                  <h3>{space.title}</h3>
                  <ArrowUpRight />
                </div>

                <p>{space.description}</p>

                <div className="facility-space-features">
                  {space.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="facility-amenities section-padding">
        <div className="facility-section-label">
          <span>03</span>
          <span>THE DETAILS THAT MATTER</span>
        </div>

        <div className="facility-amenities-heading">
          <h2>
            MORE THAN
            <br />
            <span>EQUIPMENT.</span>
          </h2>

          <p>
            Everything has a purpose. Discover the details that make your
            training experience better.
          </p>
        </div>

        <div className="facility-amenities-grid">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;

            return (
              <article className="facility-amenity-card" key={amenity.title}>
                <div className="facility-amenity-top">
                  <span>0{index + 1}</span>
                  <Icon />
                </div>

                <h3>{amenity.title}</h3>
                <p>{amenity.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="facility-final-cta">
        <div className="facility-section-label">
          <span>04</span>
          <span>YOUR MOVE</span>
        </div>

        <div className="facility-final-content">
          <h2>
            READY TO
            <br />
            <span>GET STRONGER?</span>
          </h2>

          <p>
            Your goals deserve the right environment. Make your next move with
            SOUIFER FITNESS.
          </p>

          <Link
            to="/JoinUs"
            className="facility-button facility-button-primary"
          >
            JOIN THE CLUB
            <ArrowUpRight />
          </Link>
        </div>

        <div className="facility-final-footer">
          <span>SOUIFER FITNESS®</span>
          <span>BUILT FOR PERFORMANCE.</span>
        </div>
      </section>
    </main>
  );
}
