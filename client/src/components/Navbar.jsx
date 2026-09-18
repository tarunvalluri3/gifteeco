import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Catalogs", to: "/catalogs" },
  { label: "Build Your Own Kit", to: "/build-your-own-kit" },
  { label: "Pricing", to: "/pricing" },
];

const MOBILE_BREAKPOINT = 900;

const ctaBase =
  "inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white rounded-full font-medium whitespace-nowrap transition duration-200 hover:opacity-90 hover:-translate-y-px";

const desktopLinkClass = ({ isActive }) => `
  relative py-2 text-[0.85rem] font-medium transition-colors duration-200
  after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-[#1a1a1a] after:transition-all after:duration-300
  ${isActive ? "text-[#1a1a1a] after:w-full" : "text-[#4a4a4a] hover:text-[#1a1a1a] after:w-0 hover:after:w-full"}
`;

const mobileLinkClass = ({ isActive }) => `
  block text-[1.65rem] font-medium tracking-tight py-3 transition-colors duration-200
  ${isActive ? "text-[#1a1a1a]" : "text-[#4a4a4a]"}
`;

const BrandMark = () => (
  <span className="inline-flex items-center gap-2 select-none">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M12 9.5c-1.6-2.8-4.2-3.9-5.6-2.7-1.2 1-.4 2.7 5.6 2.7Z"
        stroke="#1a1a1a"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.5c1.6-2.8 4.2-3.9 5.6-2.7 1.2 1 .4 2.7-5.6 2.7Z"
        stroke="#1a1a1a"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3.5" y="9.5" width="17" height="9.5" rx="1.4" fill="#F2635E" />
      <rect x="3.5" y="9.5" width="17" height="3.2" fill="#1a1a1a" opacity="0.82" />
      <rect x="10.6" y="9.5" width="2.8" height="9.5" fill="#1a1a1a" opacity="0.82" />
    </svg>
    <span className="font-semibold text-[1.45rem] tracking-tight text-[#1a1a1a] leading-none">
      GifteeCo
    </span>
  </span>
);

const HamburgerIcon = ({ open }) => (
  <span className="relative block w-6 h-5" aria-hidden="true">
    <span
      className={`absolute left-0 h-[1.5px] w-6 bg-[#1a1a1a] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
      }`}
    />
    <span
      className={`absolute left-0 h-[1.5px] w-6 bg-[#1a1a1a] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[9px]"
      }`}
    />
    <span
      className={`absolute left-0 h-[1.5px] w-6 bg-[#1a1a1a] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "top-1/2 opacity-0 -translate-y-1/2" : "top-[18px] opacity-100"
      }`}
    />
  </span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [lastPathname, setLastPathname] = useState(null);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        open ? "bg-[#f5f1ea]" : "bg-transparent"
      } ${scrolled && !open ? "border-black/[0.07]" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-[clamp(20px,5vw,90px)] max-[900px]:h-16">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="GifteeCo home"
          onClick={() => setOpen(false)}
        >
          {!logoError ? (
            <img
              src="/images/logo.png"
              alt="GifteeCo"
              className="h-11 w-auto max-[900px]:h-9"
              onError={() => setLogoError(true)}
            />
          ) : (
            <BrandMark />
          )}
        </Link>

        <ul className="flex items-center gap-8 max-[900px]:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-5">
          <Link
            to="/get-started"
            className={`${ctaBase} px-5 py-[0.55rem] text-[0.82rem] max-[900px]:hidden`}
          >
            Get Started
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="hidden max-[900px]:flex items-center justify-center -mr-1 h-9 w-9"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-[#f5f1ea] [font-family:Inter,sans-serif] min-[901px]:hidden"
          >
            <nav className="flex flex-col px-[clamp(20px,6vw,40px)] pt-6">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={mobileLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto px-[clamp(20px,6vw,40px)] pb-10 pt-6 border-t border-black/[0.07]">
              <Link
                to="/get-started"
                className={`${ctaBase} w-full py-3 text-[0.95rem]`}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
