import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import GiftIconReel from "./GiftIconReel";

const FIELDS = [
  {
    name: "audience",
    label: "Who are you gifting for?",
    options: ["Employees", "Clients", "Events", "Festivals"],
  },
  {
    name: "quantity",
    label: "Quantity",
    options: ["Under 50", "50 – 100", "100 – 250", "250 – 500", "500+"],
  },
  {
    name: "budget",
    label: "Budget per person",
    options: ["Under ₹1,000", "₹1,000 – ₹2,500", "₹2,500 – ₹5,000", "₹5,000+"],
  },
  {
    name: "category",
    label: "Preferred category",
    options: ["Drinkware", "Apparel", "Bags", "Stationery", "Desk accessories"],
  },
];

const DEFAULTS = {
  audience: "Employees",
  quantity: "100 – 250",
  budget: "₹1,000 – ₹2,500",
  category: "Drinkware",
};

const cardZoneClass = "w-full [font-family:Inter,sans-serif]";

const cardClass =
  "bg-[#202326] border border-white/[0.08] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] px-5 py-5 w-full";

const cardTitleClass = "text-lg font-medium mb-1 text-white";

const cardSubClass = "text-[#9BA5A9] text-[0.68rem] mb-4";

const fieldsClass = "flex flex-col gap-[0.68rem] mb-5";

const fieldLabelClass = "block text-[0.6rem] text-[#9BA5A9] mb-1";

const fieldControlClass =
  "block w-full appearance-none bg-[#2A2E32] border border-white/[0.10] rounded-lg pl-3 pr-8 py-2 pointer-coarse:min-h-11 text-[0.74rem] text-[#E5E8E9] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E77C67]";

const btnClass =
  "inline-flex items-center justify-center gap-[0.6rem] min-h-11 bg-[#E77C67] text-[#202326] rounded-full font-bold no-underline border-none cursor-pointer transition duration-200 whitespace-nowrap hover:opacity-[0.88] hover:-translate-y-px px-[1.44rem] py-[0.76rem] text-[0.72rem] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const cardNoteClass =
  "flex items-center justify-center gap-1.5 text-[0.62rem] text-[#9BA5A9] mt-3";

const ChevronIcon = () => (
  <svg width="10" height="7" viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path
      d="M1 1l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="10"
    height="11"
    viewBox="0 0 12 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 1l5 2v4c0 3.5-2.2 5.7-5 6.5C3.2 12.7 1 10.5 1 7V3l5-2z"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const BuildYourGiftCard = () => {
  const navigate = useNavigate();
  const idPrefix = useId();
  const [values, setValues] = useState(DEFAULTS);
  const [reelPaused, setReelPaused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/build-your-own-kit",
      search: new URLSearchParams(values).toString(),
    });
  };

  return (
    <div className={cardZoneClass}>
      <form className={cardClass} onSubmit={handleSubmit}>
        <h2 className={cardTitleClass}>Build your gift</h2>
        <p className={cardSubClass}>
          Get personalized recommendations in seconds.
        </p>

        <div className={fieldsClass}>
          {FIELDS.map((f) => {
            const id = `${idPrefix}-${f.name}`;
            return (
              <div key={f.name}>
                <label htmlFor={id} className={fieldLabelClass}>
                  {f.label}
                </label>
                <div className="relative">
                  <select
                    id={id}
                    name={f.name}
                    value={values[f.name]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.name]: e.target.value }))
                    }
                    className={fieldControlClass}
                  >
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9BA5A9]">
                    <ChevronIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className={btnClass}
          onMouseEnter={() => setReelPaused(true)}
          onMouseLeave={() => setReelPaused(false)}
          onFocus={() => setReelPaused(true)}
          onBlur={() => setReelPaused(false)}
        >
          Get Recommendations <GiftIconReel isPaused={reelPaused} phaseOffset={64} />
        </button>

        <p className={cardNoteClass}>
          <ShieldIcon />
          No obligation. Just better gifting ideas.
        </p>
      </form>
    </div>
  );
};

export default BuildYourGiftCard;
