"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
};

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-transparent bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
