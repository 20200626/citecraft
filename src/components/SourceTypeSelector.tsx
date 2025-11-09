import { SOURCE_LABELS } from "@/lib/schemas";
import { SourceType } from "@/types/citation";

type SourceTypeSelectorProps = {
  active: SourceType;
  onChange: (type: SourceType) => void;
};

export function SourceTypeSelector({ active, onChange }: SourceTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {(Object.keys(SOURCE_LABELS) as SourceType[]).map((type) => {
        const isActive = type === active;
        return (
          <button
            key={type}
            type="button"
            className={[
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              "border-sand/60 text-slate",
              isActive
                ? "bg-brand text-white shadow-lg"
                : "bg-white/80 hover:border-brand hover:text-brand",
            ].join(" ")}
            aria-pressed={isActive}
            onClick={() => onChange(type)}
          >
            {SOURCE_LABELS[type]}
          </button>
        );
      })}
    </div>
  );
}
