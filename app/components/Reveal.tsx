"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Server-rendered and no-JS default: fully visible. The scroll-triggered
  // fade is a progressive enhancement layered on top after mount, not a
  // gate on content visibility — see bug.md CRITICAL / ux.md #1 and #7.
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in (or near) the viewport at mount — leave it visible as
    // rendered, no animation needed, no flash.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) return;

    setAnimate(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${animate ? "transition-all duration-700 ease-out" : ""} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
