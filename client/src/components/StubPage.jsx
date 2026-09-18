const StubPage = ({ eyebrow, title, description }) => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#f5f1ea] text-[#1a1a1a] [font-family:Inter,sans-serif] px-6 pt-28 pb-20">
      <div className="max-w-[560px] text-center">
        <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[#6b6b6b] font-medium mb-3">
          {eyebrow}
        </p>
        <h1 className="font-medium text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] mb-4">
          {title}
        </h1>
        <p className="text-[0.95rem] leading-[1.6] text-[#6b6b6b]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default StubPage;
