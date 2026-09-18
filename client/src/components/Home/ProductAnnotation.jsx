import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Keyed by the matching id in Hero.jsx's PRODUCTS array.
const ANNOTATIONS = {
  organizer: {
    category: "DESK ESSENTIALS",
    lines: ["Keep everything in place.", "Designed to impress."],
  },
  notebook: {
    category: "STATIONERY",
    lines: ["Ideas worth writing down.", "Finished with your brand."],
  },
  bag: {
    category: "WORKBAGS",
    lines: ["Built for the commute.", "Refined for the boardroom."],
  },
  bottle: {
    category: "DRINKWARE",
    lines: ["Everyday essentials.", "Made memorable."],
  },
  tshirt: {
    category: "APPAREL",
    lines: ["Made for your team.", "Built for your brand."],
  },
};

// Positioned relative to the hero's own horizontal center (not the product
// frame, whose width varies per product) so it never shifts between products.
const wrapClass = `
  absolute z-[2] top-[21%] left-[calc(50%-403px)] pointer-events-none
  max-[1200px]:left-[calc(50%-331px)] max-[1200px]:top-[19%]
  max-[760px]:hidden
`;

const ruleRowClass = "flex items-center gap-2 mb-1.5";

const ruleClass = "w-6 h-px bg-[#1a1a1a]/25 shrink-0";

const categoryClass =
  "text-[0.68rem] tracking-[0.18em] uppercase text-[#6b6b6b] font-medium";

const linesWrapClass = "pl-8";

const lineClass = "text-[0.82rem] leading-[1.4] text-[#1a1a1a]";

const textVariants = (shouldReduceMotion) => ({
  initial: shouldReduceMotion ? false : { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: shouldReduceMotion ? undefined : { opacity: 0, y: -4 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
});

const ProductAnnotation = ({ productId }) => {
  const shouldReduceMotion = useReducedMotion();
  const data = ANNOTATIONS[productId];

  if (!data) return null;

  const variants = textVariants(shouldReduceMotion);

  return (
    <div className={wrapClass}>
      <div className={ruleRowClass}>
        <span className={ruleClass} />
        <AnimatePresence mode="wait">
          <motion.span
            key={`${productId}-category`}
            className={categoryClass}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={variants.transition}
          >
            {data.category}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className={linesWrapClass}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${productId}-lines`}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={variants.transition}
          >
            <p className={lineClass}>{data.lines[0]}</p>
            <p className={lineClass}>{data.lines[1]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductAnnotation;
