export function BrandHeader() {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
        CiteCraft
        <span className="text-white">MLA</span>
        <span className="text-white">•</span>
        <span className="text-white">APA</span>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          MLA & APA citations without the busy work.
        </h1>
        <p className="text-base leading-relaxed text-slate md:text-lg">
          Choose your source, fill in the essentials, and CiteCraft instantly drafts MLA, APA, BibTeX, and in-line citations. Nothing stored, nothing shared—just fast formatting in your browser.
        </p>
      </div>
    </div>
  );
}
