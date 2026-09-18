import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

const LOGOS = [
  { name: "Google", style: { fontWeight: 500, letterSpacing: "0.01em" } },
  { name: "Microsoft", style: { fontWeight: 600, letterSpacing: "0.02em" } },
  { name: "Zoho", style: { fontWeight: 700, letterSpacing: "0.04em" } },
  { name: "Swiggy", style: { fontWeight: 600, fontStyle: "italic" } },
  { name: "Razorpay", style: { fontWeight: 500, letterSpacing: "0.02em" } },
];

// Slow right-to-left drift: ~3 logos visible in the viewport at a time,
// looping seamlessly through a duplicated track.
const SPEED_PX_PER_SEC = 24;

const logoWordClass = "text-[#a9a49a] text-[1.05rem] whitespace-nowrap shrink-0";

const LogoMarquee = () => {
  const trackRef = useRef(null);
  const halfWidthRef = useRef(0);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (isPaused || shouldReduceMotion || !halfWidthRef.current) return;
    let next = x.get() - (SPEED_PX_PER_SEC * delta) / 1000;
    if (next <= -halfWidthRef.current) next += halfWidthRef.current;
    x.set(next);
  });

  return (
    <div
      className="w-full max-w-[270px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex gap-8 w-max">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className={logoWordClass}
            style={logo.style}
          >
            {logo.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoMarquee;
