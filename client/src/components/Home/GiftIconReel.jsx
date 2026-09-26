import { useMotionValue, useAnimationFrame, useReducedMotion, motion } from "motion/react";
import {
  TbShirt,
  TbMug,
  TbBottle,
  TbNotebook,
  TbBriefcase,
  TbGift,
  TbHeadphones,
  TbPencil,
} from "react-icons/tb";

const ICONS = [TbShirt, TbMug, TbBottle, TbNotebook, TbBriefcase, TbGift, TbHeadphones, TbPencil];

const ICON_PX = 16;
const ICON_STROKE_WIDTH = 2.4; // between Tabler's default (2) and the buttons' full bold weight
const SPEED_PX_PER_SEC = 18; // in line with the page's other rotators

// Continuously-scrolling vertical reel used inside the two Home CTA buttons,
// replacing the previous static arrow. Same seamless-loop technique as
// LogoMarquee.jsx (duplicated track + wrapping motion value) but on the Y axis
// with a fixed slot height instead of a measured scrollWidth.
const GiftIconReel = ({ isPaused = false, phaseOffset = 0 }) => {
  const totalHeight = ICONS.length * ICON_PX;
  const y = useMotionValue(-phaseOffset);
  const shouldReduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (isPaused || shouldReduceMotion) return;
    let next = y.get() - (SPEED_PX_PER_SEC * delta) / 1000;
    if (next <= -totalHeight) next += totalHeight;
    y.set(next);
  });

  return (
    <span
      aria-hidden="true"
      className="relative inline-block overflow-hidden shrink-0"
      style={{ width: ICON_PX, height: ICON_PX }}
    >
      <motion.span style={{ y }} className="flex flex-col">
        {[...ICONS, ...ICONS].map((Icon, i) => (
          <span
            key={i}
            className="flex items-center justify-center shrink-0"
            style={{ width: ICON_PX, height: ICON_PX }}
          >
            <Icon size={13} strokeWidth={ICON_STROKE_WIDTH} />
          </span>
        ))}
      </motion.span>
    </span>
  );
};

export default GiftIconReel;
