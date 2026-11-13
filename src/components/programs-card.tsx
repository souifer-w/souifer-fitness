import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import "./programs-card.css";

interface LocationCardProps {
  city: string;
  address: string;
  imageUrl: string;
  directionsUrl: string;
  category: string;
  duration: string;
  level: string;
  tags: string[];
  className?: string;
}

export const LocationCard = ({
  city,
  address,
  imageUrl,
  directionsUrl,
  category,
  duration,
  level,
  tags,
  className = "",
}: LocationCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 180,
    damping: 22,
  });

  const mouseYSpring = useSpring(y, {
    stiffness: 180,
    damping: 22,
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="sf-program-scene">
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`sf-program-card ${className}`}
      >
        <div
          className="sf-program-card-image"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />

        <div className="sf-program-card-overlay" />

        <span className="sf-program-number">{category}</span>

        <div
          className="sf-program-card-content"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="sf-program-info">
            <div className="sf-program-meta">
              <span>{duration}</span>
              <span>{level}</span>
            </div>

            <h3>{city}</h3>

            <p>{address}</p>

            <div className="sf-program-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <a
            className="sf-program-link"
            href={directionsUrl}
            aria-label={`Explore ${city} program`}
          >
            <span>EXPLORE PROGRAM</span>

            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_outward
            </span>
          </a>
        </div>

        <span className="sf-program-index" aria-hidden="true">
          SOUIFER / TRAINING
        </span>
      </motion.article>
    </div>
  );
};
