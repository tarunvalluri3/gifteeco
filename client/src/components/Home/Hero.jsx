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
  initial: { opacity: 0, scale: 0.97, rotate: tilt },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: tilt,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    rotate: tilt,
    transition: { duration: 0.35, ease: "easeIn" },
  },
});

const reducedProductVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Shared Tailwind class strings, kept as named constants for readable JSX.
// Layout is a flow-based grid (no vh/vw-offset absolute positioning):
// 1 column < 768px, 2 columns 768-1279px, 3 columns 1280px+.
const heroSectionClass = `
  relative flex flex-col bg-[#164A5A] text-white [font-family:Inter,sans-serif]
  min-h-[max(720px,100svh)]
`;

const heroGridClass = `
  flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 gap-x-8 gap-y-10
  px-[clamp(20px,5.5vw,90px)] pt-24 pb-10
  max-md:pt-20
  md:grid-cols-2 md:grid-rows-[1fr_auto] md:gap-y-12 md:pb-12
  xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.85fr)]
`;

const contentZoneClass =
  "md:col-start-1 md:row-start-1 md:self-center max-w-[620px]";

const eyebrowBase =
  "text-[0.68rem] tracking-[0.18em] uppercase text-[#B8CBCE] font-medium";

const announcementPillClass =
  "inline-flex items-center gap-3 min-h-11 rounded-[6px] border border-white/[0.16] bg-white/[0.08] px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:border-[#E77C67]/50 hover:text-[#E77C67] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E77C67]";

const headlineClass = `
  font-medium text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.01em] mb-4
`;

const descClass =
  "text-[0.95rem] leading-[1.6] text-[#B8CBCE] max-w-[30rem] mb-8";

const ctasClass = "flex items-center gap-5 flex-wrap";

const btnPrimaryBase =
  "inline-flex items-center justify-center gap-[0.6rem] min-h-11 bg-[#E77C67] text-[#202326] rounded-full font-bold no-underline border-none cursor-pointer transition duration-200 whitespace-nowrap hover:opacity-[0.88] hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const productZoneClass =
  "relative isolate flex flex-col md:col-start-2 md:row-start-1 md:self-center";

const productFrameClass = `
  relative flex items-center justify-center
  h-[clamp(300px,70vw,380px)]
  md:h-[clamp(420px,52vh,560px)]
`;

const sideStackClass = `
  flex flex-col gap-3 w-full max-w-[352px]
  md:col-start-2 md:row-start-2 md:justify-self-center
  xl:col-start-3 xl:row-start-1 xl:self-center xl:justify-self-end
`;

const productImgBase = "block w-auto max-h-full object-contain mx-auto";

const shadowClass =
  "absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[46%] h-[34px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3),transparent_70%)] blur-[8px] z-0";

const trustedZoneClass =
  "max-w-[560px] max-md:mt-6 md:col-start-1 md:row-start-2 md:self-end";

// Right-side animated use-case strip, aligned with BuildYourGiftCard below it.
const USE_CASES = ["EMPLOYEES", "CLIENTS", "EVENTS", "FESTIVALS"];
const USE_CASE_INTERVAL_MS = 2600;

const useCaseWrapClass = "w-full";

const useCaseHeadingClass =
  "text-[0.6rem] tracking-[0.2em] uppercase text-[#B8CBCE] font-medium mb-1.5";

const useCaseWordClass =
  "text-[0.8rem] font-medium text-white";

const UseCaseStrip = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % USE_CASES.length);
    }, USE_CASE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <div className={useCaseWrapClass}>
      <p className={useCaseHeadingClass}>CUSTOM GIFTS FOR</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={USE_CASES[activeIndex]}
          className={useCaseWordClass}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {USE_CASES[activeIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

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
      <div className={heroGridClass}>
        <div className={contentZoneClass}>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/brand-your-products" className={`${announcementPillClass} mb-6`}>
              <span aria-hidden="true">🎁</span>
              Personalize your gifts!
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
            <Link
              to="/products"
              className={`${btnPrimaryBase} px-[1.3rem] py-[0.65rem] text-[0.8rem]`}
            >
              Explore Collection <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={productZoneClass} {...pauseHandlers}>
          <ProductAnnotation productId={active.id} />
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
                className="relative z-[1] h-full flex items-center"
                variants={
                  shouldReduceMotion
                    ? reducedProductVariants
                    : getProductVariants(active.tilt)
                }
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <img
                  src={active.src}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  loading="eager"
                  fetchPriority={active.id === PRODUCTS[0].id ? "high" : "auto"}
                  className={`${productImgBase} ${active.imgSize} ${
                    active.blend ? "mix-blend-multiply" : ""
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={sideStackClass}>
          <UseCaseStrip />
          <BuildYourGiftCard />
        </div>

        <div className={trustedZoneClass}>
          <p className={`${eyebrowBase} mb-4`}>
            TRUSTED BY MODERN BUSINESSES
          </p>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
};

export default Hero;
