const FIELDS = [
  { label: "Who are you gifting for?", value: "Employees" },
  { label: "Quantity", value: "100 – 250" },
  { label: "Budget per person", value: "₹1,000 – ₹2,500" },
  { label: "Preferred category", value: "Drinkware" },
];

// Positioned zone + card sizing, ~20% smaller (width and effective height,
// via reduced padding/gaps/font sizes) than the original card for a more
// compact, minimal footprint.
const cardZoneClass = `
  absolute top-[clamp(300px,37vh,400px)] right-[clamp(24px,5.5vw,90px)] w-[clamp(288px,21.6vw,352px)] z-[3]
  [font-family:Inter,sans-serif]
  max-[1200px]:top-[50vh] max-[1200px]:right-[4vw] max-[1200px]:w-[clamp(256px,27.2vw,304px)]
  max-[760px]:static max-[760px]:inset-auto max-[760px]:w-full max-[760px]:max-w-[336px] max-[760px]:mx-auto max-[760px]:mb-8
`;

const cardClass =
  "bg-[#fffdfa] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] px-5 py-5 w-full";

const cardTitleClass = "text-lg font-medium mb-1";

const cardSubClass = "text-[#6b6b6b] text-[0.68rem] mb-4";

const fieldsClass = "flex flex-col gap-[0.68rem] mb-5";

const fieldLabelClass = "block text-[0.6rem] text-[#6b6b6b] mb-1";

const fieldControlClass =
  "flex items-center justify-between border border-[#e2ddd2] rounded-lg px-3 py-2 text-[0.74rem] text-[#1a1a1a]";

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

const BuildYourGiftCard = () => (
  <div className={cardZoneClass}>
    <div className={cardClass}>
      <h3 className={cardTitleClass}>Build your gift</h3>
      <p className={cardSubClass}>
        Get personalized recommendations in seconds.
      </p>

      <div className={fieldsClass}>
        {FIELDS.map((f) => (
          <div key={f.label}>
            <label className={fieldLabelClass}>{f.label}</label>
            <div className={fieldControlClass}>
              <span>{f.value}</span>
              <span className="text-[#6b6b6b] shrink-0">
                <ChevronIcon />
              </span>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={btnClass}>
        Get Recommendations <span aria-hidden="true">→</span>
      </button>

      <p className={cardNoteClass}>
        <ShieldIcon />
        No obligation. Just better gifting ideas.
      </p>
    </div>
  </div>
);

export default BuildYourGiftCard;
