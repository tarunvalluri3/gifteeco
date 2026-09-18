import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BuildYourGiftCard from "./BuildYourGiftCard";
import LogoMarquee from "./LogoMarquee";
import ProductAnnotation from "./ProductAnnotation";

const PRODUCTS = [
  {
    id: "organizer",
    src: "/images/organizer.webp",
    alt: "Leather executive desk organizer set with phone, cards, and watch trays",
    imgSize: "h-[clamp(260px,30vh,320px)]",
    tilt: -2,
    width: 1536,
    height: 1024,
  },
  {
    id: "notebook",
    src: "/images/notebook.webp",
    alt: "Leather-bound notebook with matching Gifteeco pen",
    imgSize: "h-[clamp(340px,38vh,400px)]",
    tilt: 3,
    width: 1254,
    height: 1254,
  },
  {
    id: "bag",
    src: "/images/bag.webp",
    alt: "Leather laptop bag with shoulder strap and Gifteeco luggage tag",
    imgSize: "h-[clamp(320px,36vh,380px)]",
    tilt: -3,
    width: 1254,
    height: 1254,
  },
  {
    id: "bottle",
    src: "/images/bottle.webp",
    alt: "Insulated steel bottle engraved with the Gifteeco wordmark",
    imgSize: "h-[clamp(400px,44vh,480px)]",
    tilt: -4,
    width: 2048,
    height: 2048,
    blend: true,
  },
  {
    id: "tshirt",
    src: "/images/tshirt.webp",
    alt: "Maroon polo shirt embroidered with the Gifteeco logo",
    imgSize: "h-[clamp(360px,39vh,430px)] mt-2",
    tilt: 0,
    width: 1254,
    height: 1254,
    blend: true,
  },
];

const ROTATE_INTERVAL_MS = 2100;

const getProductVariants = (tilt = 0) => ({
  initial: { opacity: 0, y: 26, scale: 0.9, rotate: tilt - 3 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: tilt,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.94,
    rotate: tilt - 2,
    transition: { duration: 0.3, ease: "easeIn" },
  },
});

const reducedProductVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Shared Tailwind class strings, kept as named constants for readable JSX.
const heroSectionClass = `
  relative bg-[#f5f1ea] text-[#1a1a1a] [font-family:Inter,sans-serif]
  h-[clamp(760px,100vh,1000px)] overflow-hidden
  max-[1200px]:h-auto max-[1200px]:min-h-[1200px] max-[1200px]:pb-12
  max-[760px]:h-auto max-[760px]:min-h-screen max-[760px]:overflow-visible
  max-[760px]:pt-6 max-[760px]:px-5 max-[760px]:pb-10
`;

const contentZoneClass = `
  absolute left-[clamp(24px,5.5vw,90px)] bottom-[clamp(150px,20vh,230px)] max-w-[620px] z-[3]
  max-[1200px]:bottom-[16vh] max-[1200px]:max-w-[480px]
  max-[760px]:static max-[760px]:inset-auto max-[760px]:w-auto max-[760px]:max-w-none max-[760px]:my-6
`;

const eyebrowBase =
  "text-[0.68rem] tracking-[0.18em] uppercase text-[#6b6b6b] font-medium";

const announcementPillClass =
  "inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fffdfa]/80 px-4 py-2 text-[0.78rem] font-medium text-[#1a1a1a] no-underline transition duration-200 hover:border-black/20 hover:-translate-y-px";

const headlineClass = `
  font-medium text-[clamp(2.25rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.01em] mb-4
  max-[1200px]:text-[clamp(2rem,4vw,2.4rem)]
  max-[760px]:text-[clamp(1.75rem,6vw,2.1rem)]
`;

const descClass =
  "text-[0.95rem] leading-[1.6] text-[#6b6b6b] max-w-[30rem] mb-6";

const ctasClass =
  "flex items-center gap-5 flex-wrap max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-4";

const btnPrimaryBase =
  "inline-flex items-center justify-center gap-[0.6rem] bg-[#1a1a1a] text-white rounded-full font-medium no-underline border-none cursor-pointer transition duration-200 whitespace-nowrap hover:opacity-[0.88] hover:-translate-y-px";

const watchClass =
  "inline-flex items-center gap-3 bg-transparent border-none cursor-pointer text-[0.85rem] text-[#1a1a1a] p-0";

const playDotClass =
  "inline-flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] text-[#1a1a1a]";

const productZoneClass = `
  absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-[2] isolate
  max-[1200px]:top-[40%]
  max-[760px]:static max-[760px]:inset-auto max-[760px]:translate-x-0 max-[760px]:translate-y-0 max-[760px]:w-auto max-[760px]:max-w-none max-[760px]:z-auto
`;

const productFrameClass = `
  relative h-[clamp(420px,55vh,640px)] flex items-center justify-center
  max-[1200px]:h-[clamp(340px,42vh,420px)]
  max-[760px]:h-[clamp(260px,60vw,340px)] max-[760px]:mx-auto
`;

const productImgBase = "block w-auto object-contain mx-auto";

const shadowClass =
  "absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[46%] h-[34px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3),transparent_70%)] blur-[8px] z-0";

const trustedZoneClass = `
  absolute left-[clamp(24px,5.5vw,90px)] bottom-[clamp(40px,6vh,64px)] max-w-[560px] z-[3]
  max-[1200px]:bottom-[3vh]
  max-[760px]:static max-[760px]:inset-auto max-[760px]:max-w-none max-[760px]:z-auto
`;

const PlayIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <polygon points="1,0 10,5 1,10" fill="currentColor" />
  </svg>
);

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const id = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % PRODUCTS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeIndex, isPaused, shouldReduceMotion]);

  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  const pauseHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onFocus: () => setIsPaused(true),
    onBlur: () => setIsPaused(false),
  };

  const active = PRODUCTS[activeIndex];

  return (
    <section className={heroSectionClass}>
      <div className={contentZoneClass}>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/brand-your-products" className={`${announcementPillClass} mb-5`}>
            <span aria-hidden="true">🎁</span>
            Try your brand &amp; logo on our products
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <p className={`${eyebrowBase} mb-3`}>CORPORATE GIFTING</p>
        <h1 className={headlineClass}>
          Thoughtful gifts
          <br />
          for ambitious brands.
        </h1>
        <p className={descClass}>
          Premium corporate gifting solutions designed to strengthen
          relationships and inspire loyalty.
        </p>

        <div className={ctasClass}>
          <a
            href="#"
            className={`${btnPrimaryBase} px-[1.3rem] py-[0.65rem] text-[0.8rem]`}
          >
            Explore Collection <span aria-hidden="true">→</span>
          </a>
          <button type="button" className={watchClass}>
            <span className={playDotClass} aria-hidden="true">
              <PlayIcon />
            </span>
            Watch our story
          </button>
        </div>
      </div>

      <ProductAnnotation productId={active.id} />

      <div className={productZoneClass} {...pauseHandlers}>
        <div className={productFrameClass}>
          <motion.div
            className={shadowClass}
            animate={
              shouldReduceMotion
                ? { opacity: 0.4 }
                : { scaleX: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="relative z-[1]"
              variants={
                shouldReduceMotion
                  ? reducedProductVariants
                  : getProductVariants(active.tilt)
              }
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.img
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                loading="eager"
                fetchPriority="high"
                className={`${productImgBase} ${active.imgSize} ${
                  active.blend ? "mix-blend-multiply" : ""
                }`}
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BuildYourGiftCard />

      <div className={trustedZoneClass}>
        <p className={`${eyebrowBase} mb-[1.1rem]`}>
          TRUSTED BY MODERN BUSINESSES
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
};

export default Hero;
