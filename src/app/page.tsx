"use client";

import { useMemo, useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { CitationForm } from "@/components/CitationForm";
import { CitationOutputs } from "@/components/CitationOutputs";
import { SourceType, CitationFormValues } from "@/types/citation";
import { CITATION_SCHEMAS, getInitialValues } from "@/lib/schemas";
import { buildOutputs } from "@/lib/formatters";
import { SourceTypeSelector } from "@/components/SourceTypeSelector";

const createInitialState = (): Record<SourceType, CitationFormValues> => {
  return (Object.keys(CITATION_SCHEMAS) as SourceType[]).reduce(
    (acc, type) => {
      acc[type] = getInitialValues(type);
      return acc;
    },
    {} as Record<SourceType, CitationFormValues>
  );
};

export default function Home() {
  const [activeType, setActiveType] = useState<SourceType>("publication");
  const [formState, setFormState] = useState<Record<SourceType, CitationFormValues>>(createInitialState());

  const handleFieldChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        [name]: value,
      },
    }));
  };

  const activeValues = formState[activeType];
  const outputs = useMemo(() => buildOutputs(activeType, activeValues), [activeType, activeValues]);

  return (
    <div className="relative min-h-screen bg-surface">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#ffe8d0,_transparent),radial-gradient(circle_at_20%_20%,_#fff7ee,_transparent)]" />
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:gap-16 lg:py-20">
        <section className="flex-1 space-y-8">
          <BrandHeader />
          <div className="rounded-3xl border border-sand/60 bg-white/90 p-6 shadow-2xl backdrop-blur">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Source type</p>
                <SourceTypeSelector active={activeType} onChange={setActiveType} />
              </div>
              <CitationForm
                fields={CITATION_SCHEMAS[activeType]}
                values={formState[activeType]}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </section>
        <section className="flex-1 space-y-6">
          <div className="rounded-3xl border border-brand/20 bg-brand/10 p-6 text-brand shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em]">Live outputs</p>
            <p className="mt-2 text-lg text-ink">Four formats update in real time as you type.</p>
          </div>
          <CitationOutputs outputs={outputs} />
        </section>
      </main>
    </div>
  );
}
