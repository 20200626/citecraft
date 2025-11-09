import { CitationSchema, CitationFormValues, SourceType } from "@/types/citation";

export const SOURCE_LABELS: Record<SourceType, string> = {
  publication: "Publication",
  article: "Article",
  opinion: "Opinion",
  website: "Website",
};

export const CITATION_SCHEMAS: CitationSchema = {
  publication: [
    {
      name: "authorFirst",
      label: "Author first name",
      placeholder: "Alex",
    },
    {
      name: "authorLast",
      label: "Author last name",
      placeholder: "Rivera",
    },
    {
      name: "title",
      label: "Title",
      placeholder: "Designing with Purpose",
    },
    {
      name: "publisher",
      label: "Publisher",
      placeholder: "Fieldstone Press",
    },
    {
      name: "publisherCity",
      label: "Publisher city",
      placeholder: "Brooklyn",
      optional: true,
    },
    {
      name: "publicationYear",
      label: "Publication year",
      placeholder: "2023",
      type: "number",
    },
    {
      name: "edition",
      label: "Edition",
      placeholder: "2nd ed.",
      optional: true,
    },
  ],
  article: [
    {
      name: "authorFirst",
      label: "Author first name",
      placeholder: "Nia",
    },
    {
      name: "authorLast",
      label: "Author last name",
      placeholder: "Khan",
    },
    {
      name: "title",
      label: "Article title",
      placeholder: "Cities that Heal",
    },
    {
      name: "container",
      label: "Journal / publication",
      placeholder: "Quarterly Urbanism",
    },
    {
      name: "publicationDate",
      label: "Publication date",
      placeholder: "12 Mar. 2024",
    },
    {
      name: "volume",
      label: "Volume",
      placeholder: "44",
      optional: true,
    },
    {
      name: "issue",
      label: "Issue",
      placeholder: "2",
      optional: true,
    },
    {
      name: "pages",
      label: "Page range",
      placeholder: "122-137",
      optional: true,
    },
    {
      name: "url",
      label: "URL",
      placeholder: "https://example.com/article",
      type: "url",
      optional: true,
    },
    {
      name: "accessedDate",
      label: "Accessed date",
      placeholder: "25 Apr. 2024",
      optional: true,
    },
  ],
  opinion: [
    {
      name: "authorFirst",
      label: "Author first name",
      placeholder: "Jordan",
    },
    {
      name: "authorLast",
      label: "Author last name",
      placeholder: "Lee",
    },
    {
      name: "title",
      label: "Opinion title",
      placeholder: "Why Local Voices Matter",
    },
    {
      name: "outlet",
      label: "Outlet",
      placeholder: "Metro Ledger",
    },
    {
      name: "section",
      label: "Section / column",
      placeholder: "Perspective",
      optional: true,
    },
    {
      name: "publicationDate",
      label: "Publication date",
      placeholder: "7 Jan. 2025",
    },
    {
      name: "url",
      label: "URL",
      placeholder: "https://example.com/opinion",
      type: "url",
    },
    {
      name: "accessedDate",
      label: "Accessed date",
      placeholder: "8 Jan. 2025",
      optional: true,
    },
  ],
  website: [
    {
      name: "authorFirst",
      label: "Author first name",
      placeholder: "Maya",
      optional: true,
    },
    {
      name: "authorLast",
      label: "Author last name",
      placeholder: "Fern",
      optional: true,
    },
    {
      name: "title",
      label: "Page title",
      placeholder: "Modern MLA Style",
    },
    {
      name: "siteName",
      label: "Site name",
      placeholder: "CiteCraft Studio",
    },
    {
      name: "publicationDate",
      label: "Published / updated date",
      placeholder: "10 Sep. 2024",
      optional: true,
    },
    {
      name: "url",
      label: "URL",
      placeholder: "https://example.com/resource",
      type: "url",
    },
    {
      name: "accessedDate",
      label: "Accessed date",
      placeholder: "12 Sep. 2024",
    },
  ],
};

export const getInitialValues = (type: SourceType): CitationFormValues => {
  const schema = CITATION_SCHEMAS[type];
  return schema.reduce<CitationFormValues>((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
};
