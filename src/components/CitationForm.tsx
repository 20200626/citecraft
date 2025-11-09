import { CitationField, CitationFormValues } from "@/types/citation";

type CitationFormProps = {
  fields: CitationField[];
  values: CitationFormValues;
  onChange: (name: string, value: string) => void;
};

export function CitationForm({ fields, values, onChange }: CitationFormProps) {
  const inputClass =
    "w-full rounded-2xl border border-sand/70 bg-white px-4 py-3 text-sm text-ink shadow-inner-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => {
          const value = values[field.name] ?? "";
          const label = (
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
              {field.label}
              {field.optional && (
                <span className="rounded-full bg-chalk px-2 py-0.5 text-[10px] font-semibold text-muted">
                  optional
                </span>
              )}
            </span>
          );

          return (
            <label key={field.name} className="flex flex-col gap-2 text-sm font-medium text-slate">
              {label}
              {field.multiline ? (
                <textarea
                  className={`${inputClass} min-h-[120px] resize-none`}
                  name={field.name}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  rows={6}
                  spellCheck={false}
                />
              ) : (
                <input
                  className={inputClass}
                  type={field.type === "url" ? "url" : "text"}
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  name={field.name}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  spellCheck={false}
                />
              )}
              {field.helper && <span className="text-xs text-muted">{field.helper}</span>}
            </label>
          );
        })}
      </div>
    </div>
  );
}
