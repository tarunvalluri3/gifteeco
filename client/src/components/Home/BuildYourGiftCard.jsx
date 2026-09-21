import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  "bg-[#fffdfa] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] px-5 py-5 w-full";

const cardTitleClass = "text-lg font-medium mb-1";

const cardSubClass = "text-[#6b6b6b] text-[0.68rem] mb-4";

const fieldsClass = "flex flex-col gap-[0.68rem] mb-5";

const fieldLabelClass = "block text-[0.6rem] text-[#6b6b6b] mb-1";

const fieldControlClass =
  "block w-full appearance-none bg-transparent border border-[#e2ddd2] rounded-lg pl-3 pr-8 py-2 text-[0.74rem] text-[#1a1a1a] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f1d2a]";

const btnClass =
  "inline-flex items-center justify-center gap-[0.6rem] bg-[#1a1a1a] text-white rounded-full font-medium no-underline border-none cursor-pointer transition duration-200 whitespace-nowrap hover:opacity-[0.88] hover:-translate-y-px px-[1.44rem] py-[0.76rem] text-[0.72rem] w-full";

const cardNoteClass =
  "flex items-center justify-center gap-1.5 text-[0.62rem] text-[#6b6b6b] mt-3";

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
        <h3 className={cardTitleClass}>Build your gift</h3>
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
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b]">
                    <ChevronIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button type="submit" className={btnClass}>
          Get Recommendations <span aria-hidden="true">→</span>
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
