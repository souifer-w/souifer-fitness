import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PricingSection.css";

gsap.registerPlugin(ScrollTrigger);

type Frequency = "monthly" | "yearly";

interface Plan {
  name: string;
  info: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    tooltip?: string;
  }[];
  btn: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
}

interface PricingSectionProps {
  heading?: string;
  description?: string;
  selectedPlan?: string;
  onSelect?: (planName: string) => void;
}

const plans: Plan[] = [
  {
    name: "Essential",
    info: "Your foundation for a stronger lifestyle.",
    price: {
      monthly: 299,
      yearly: 299 * 10,
    },
    features: [
      { text: "Full gym access" },
      { text: "Locker room access" },
      { text: "Personal fitness assessment" },
      { text: "Standard training hours" },
    ],
    btn: {
      text: "CHOOSE ESSENTIAL",
      href: "/JoinUs",
    },
  },
  {
    name: "Performance",
    info: "More flexibility. More progress.",
    price: {
      monthly: 499,
      yearly: 499 * 10,
    },
    features: [
      { text: "Everything in Essential" },
      { text: "Priority class booking" },
      { text: "Monthly progress review" },
      { text: "Extended access hours" },
      { text: "Guest pass every month" },
    ],
    btn: {
      text: "CHOOSE PERFORMANCE",
      href: "/JoinUs",
    },
    highlighted: true,
  },
  {
    name: "Elite",
    info: "A premium training experience.",
    price: {
      monthly: 799,
      yearly: 799 * 10,
    },
    features: [
      { text: "Everything in Performance" },
      { text: "Personal training session" },
      { text: "Recovery area access" },
      { text: "Priority support" },
      { text: "Exclusive member events" },
    ],
    btn: {
      text: "CHOOSE ELITE",
      href: "/JoinUs",
    },
  },
];

const formatPrice = (value: number) =>
  Math.round(value).toLocaleString("en-US");

export function PricingSection({
  heading = "CHOOSE YOUR LEVEL.",
  description = "Three membership options. One commitment to becoming stronger.",
  selectedPlan,
  onSelect,
}: PricingSectionProps) {
  const [frequency, setFrequency] = useState<Frequency>("monthly");

  const sectionRef = useRef<HTMLElement>(null);
  const previousFrequency = useRef<Frequency>("monthly");
  const countedPrices = useRef<boolean[]>(plans.map(() => false));

  // Main page animations
  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.from(".pricing-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-heading",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".pricing-heading h2", {
        y: 55,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".pricing-heading",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".pricing-heading p", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-heading",
          start: "top 85%",
          once: true,
        },
      });

      // Billing selector
      gsap.from(".pricing-frequency", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-frequency",
          start: "top 90%",
          once: true,
        },
      });

      // Pricing cards
      gsap.from(".pricing-card", {
        y: 65,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 82%",
          once: true,
        },
      });

      // Card labels and headings
      gsap.from(".pricing-plan-label, .pricing-card-header h3", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 78%",
          once: true,
        },
      });

      // Card descriptions
      gsap.from(".pricing-card-header p", {
        y: 15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 78%",
          once: true,
        },
      });

      // Price number counter animation
      const priceElements = section.querySelectorAll<HTMLElement>(
        ".pricing-price strong",
      );

      priceElements.forEach((element, index) => {
        const target = plans[index].price[frequency];
        const counter = { value: 0 };

        element.textContent = "0";

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = formatPrice(counter.value);
          },
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
            onEnter: () => {
              countedPrices.current[index] = true;
            },
          },
        });
      });

      // Divider reveal
      gsap.from(".pricing-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 75%",
          once: true,
        },
      });

      // Features reveal
      section.querySelectorAll(".pricing-card").forEach((card) => {
        const features = card.querySelectorAll(".pricing-feature");

        gsap.from(features, {
          x: -18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            once: true,
          },
        });
      });

      // Buttons
      gsap.from(".pricing-button", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 65%",
          once: true,
        },
      });

      // Bottom contact
      gsap.from(".pricing-bottom-note", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-bottom-note",
          start: "top 95%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate prices when switching billing frequency
  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const oldFrequency = previousFrequency.current;

    if (oldFrequency === frequency) return;

    const priceElements = section.querySelectorAll<HTMLElement>(
      ".pricing-price strong",
    );

    priceElements.forEach((element, index) => {
      const oldPrice = plans[index].price[oldFrequency];
      const newPrice = plans[index].price[frequency];

      gsap.killTweensOf(element);

      // If the price has not appeared yet, update it without
      // running a second counter animation later.
      if (!countedPrices.current[index]) {
        countedPrices.current[index] = true;
        element.textContent = formatPrice(newPrice);

        return;
      }

      const counter = { value: oldPrice };

      element.textContent = formatPrice(oldPrice);

      gsap.to(counter, {
        value: newPrice,
        duration: 0.85,
        ease: "power3.out",
        onUpdate: () => {
          element.textContent = formatPrice(counter.value);
        },
        onComplete: () => {
          element.textContent = formatPrice(newPrice);
        },
      });

      // Small visual emphasis during price change
      gsap.fromTo(
        element,
        {
          y: 9,
          opacity: 0.55,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    });

    // Animate yearly discount message
    const discountLabels = section.querySelectorAll(".pricing-discount");

    if (frequency === "yearly") {
      gsap.fromTo(
        discountLabels,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    }

    previousFrequency.current = frequency;
  }, [frequency]);

  const handlePlanSelect = (planName: string) => {
    onSelect?.(planName);
  };

  return (
    <section className="pricing-section" ref={sectionRef}>
      <div className="pricing-heading">
        <span className="pricing-eyebrow">
          <span className="pricing-eyebrow-dot" />
          SOUIFER / MEMBERSHIP
        </span>

        <h2>{heading}</h2>

        {description && <p>{description}</p>}
      </div>

      <div className="pricing-frequency">
        <button
          type="button"
          className={`pricing-frequency-button ${
            frequency === "monthly" ? "active" : ""
          }`}
          onClick={() => setFrequency("monthly")}
          aria-pressed={frequency === "monthly"}
        >
          {frequency === "monthly" && (
            <span className="pricing-frequency-active" />
          )}
          <span>MONTHLY</span>
        </button>

        <button
          type="button"
          className={`pricing-frequency-button ${
            frequency === "yearly" ? "active" : ""
          }`}
          onClick={() => setFrequency("yearly")}
          aria-pressed={frequency === "yearly"}
        >
          {frequency === "yearly" && (
            <span className="pricing-frequency-active" />
          )}
          <span>YEARLY</span>
          <span className="pricing-save-label">2 MONTHS FREE</span>
        </button>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.name;
          const currentPrice = plan.price[frequency];

          return (
            <article
              key={plan.name}
              className={`pricing-card ${
                plan.highlighted ? "pricing-card-featured" : ""
              } ${isSelected ? "pricing-card-selected" : ""}`}
            >
              {plan.highlighted && (
                <div className="pricing-popular">
                  <Star size={13} fill="currentColor" />
                  MOST POPULAR
                </div>
              )}

              <div className="pricing-card-header">
                <span className="pricing-plan-label">
                  0{index + 1} / SOUIFER MEMBERSHIP
                </span>

                <h3>{plan.name}</h3>

                <p>{plan.info}</p>

                <div className="pricing-price">
                  <strong data-price={currentPrice}>
                    {formatPrice(currentPrice)}
                  </strong>

                  <span className="pricing-currency">DH</span>

                  <span className="pricing-period">
                    / {frequency === "monthly" ? "MONTH" : "YEAR"}
                  </span>
                </div>

                {frequency === "yearly" && (
                  <span className="pricing-discount">
                    2 MONTHS FREE WITH YEARLY BILLING
                  </span>
                )}
              </div>

              <div className="pricing-divider" />

              <div className="pricing-features">
                <span className="pricing-features-title">WHAT'S INCLUDED</span>

                {plan.features.map((feature, featureIndex) => (
                  <div
                    className="pricing-feature"
                    key={`${plan.name}-${featureIndex}`}
                    title={feature.tooltip || undefined}
                  >
                    <span className="pricing-feature-icon">
                      <Check size={14} />
                    </span>

                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="pricing-card-footer">
                <Link
                  to={`${plan.btn.href}?plan=${encodeURIComponent(
                    plan.name,
                  )}&billing=${frequency}`}
                  className={`pricing-button ${
                    plan.highlighted || isSelected
                      ? "pricing-button-primary"
                      : ""
                  }`}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {isSelected ? "SELECTED" : plan.btn.text}
                  <span>↗</span>
                </Link>

                <span className="pricing-footer-note">
                  BUILT FOR YOUR NEXT LEVEL.
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="pricing-bottom-note">
        NEED HELP CHOOSING? <Link to="/contact">TALK TO OUR TEAM ↗</Link>
      </p>
    </section>
  );
}
