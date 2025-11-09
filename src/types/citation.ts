export type SourceType = "publication" | "article" | "opinion" | "website";

export type CitationField = {
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
  optional?: boolean;
  type?: "text" | "date" | "number" | "url";
  multiline?: boolean;
};

export type CitationSchema = Record<SourceType, CitationField[]>;

export type CitationFormValues = Record<string, string>;

export type CitationOutputs = {
  mla: string;
  apa: string;
  bibtex: string;
  inline: string;
};
