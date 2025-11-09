import { CitationOutputs as CitationOutputsType } from "@/types/citation";
import { CopyButton } from "./CopyButton";

type CitationOutputsProps = {
  outputs: CitationOutputsType;
};

const cards = [
  {
    key: "mla",
    label: "MLA Works Cited",
    description: "Standard MLA 9 format for the end of your article.",
  },
  {
    key: "apa",
    label: "APA Reference",
    description: "APA 7 citation, ready for reference lists.",
  },
  {
    key: "bibtex",
    label: "BibTeX",
    description: "Paste straight into your .bib file or reference manager.",
  },
  {
    key: "inline",
    label: "In-line citation",
    description: "Drop directly into your paragraphs.",
  },
] as const;

export function CitationOutputs({ outputs }: CitationOutputsProps) {
  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const value = outputs[card.key];
        return (
          <section
            key={card.key}
            className="rounded-3xl border border-white/40 bg-white/90 p-5 shadow-xl ring-1 ring-sand/60 backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{card.label}</p>
                <p className="text-sm text-slate">{card.description}</p>
              </div>
              <CopyButton value={value} />
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-chalk/60 p-4 text-sm leading-relaxed text-ink">
              {value}
            </pre>
          </section>
        );
      })}
    </div>
  );
}
