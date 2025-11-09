import { CitationFormValues, CitationOutputs, SourceType } from "@/types/citation";

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const joinWith = (parts: Array<string | undefined>, separator = ", ") =>
  parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(separator);

const formatAuthor = (values: CitationFormValues) => {
  const first = values.authorFirst?.trim();
  const last = values.authorLast?.trim();
  if (!first && !last) return "";
  if (last && first) return `${last}, ${first}`;
  return last ?? first ?? "";
};

const formatApaAuthor = (values: CitationFormValues) => {
  const first = values.authorFirst?.trim();
  const last = values.authorLast?.trim();
  if (!first && !last) return "";
  if (!last) return first ?? "";
  if (!first) return last;
  const initials = first
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => `${token[0]?.toUpperCase()}.`)
    .join(" ");
  return `${last}, ${initials}`;
};

const wrapTitle = (title?: string) => {
  if (!title) return "";
  return `"${title.trim()}"`;
};

const italicize = (value?: string) => (value ? `<i>${value}</i>` : "");

const ensurePeriod = (value?: string) => (value ? `${value.trim().replace(/[.]+$/, "")}.` : "");

const formatApaDate = (primary?: string, fallback?: string) => {
  if (primary) return `(${primary}).`;
  if (fallback) return `(${fallback}).`;
  return "(n.d.).";
};

const buildBibKey = (values: CitationFormValues, fallback: string) => {
  const last = values.authorLast?.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const year =
    values.publicationYear ??
    values.publicationDate?.match(/\d{4}/)?.[0] ??
    values.accessedDate?.match(/\d{4}/)?.[0];
  const safeFallback = fallback.replace(/\s+/g, "").toLowerCase();
  return collapseWhitespace([last, year ?? "", safeFallback].filter(Boolean).join("-")) || "citation";
};

const formatPublication = (values: CitationFormValues) => {
  const author = formatAuthor(values);
  const edition = values.edition ? `${values.edition}` : "";
  const city = values.publisherCity;
  const publisher = values.publisher;
  const year = values.publicationYear;
  const title = values.title ? `${values.title}.` : "";
  return joinWith(
    [
      author,
      title,
      joinWith([edition, city, publisher].filter(Boolean), ", "),
      year,
    ].filter(Boolean),
    " "
  );
};

const formatArticle = (values: CitationFormValues) => {
  const author = formatAuthor(values);
  const title = wrapTitle(values.title);
  const container = italicize(values.container);
  const volumeIssue = joinWith(
    [
      values.volume ? `vol. ${values.volume}` : undefined,
      values.issue ? `no. ${values.issue}` : undefined,
    ].filter(Boolean),
    ", "
  );
  const pages = values.pages ? `pp. ${values.pages}` : "";
  const date = values.publicationDate;
  const url = values.url;
  const accessed = values.accessedDate ? `Accessed ${values.accessedDate}` : "";
  return joinWith([author, title, container, volumeIssue, pages, date, url, accessed], ". ");
};

const formatOpinion = (values: CitationFormValues) => {
  const author = formatAuthor(values);
  const title = wrapTitle(values.title);
  const outlet = italicize(values.outlet);
  const section = values.section;
  const date = values.publicationDate;
  const url = values.url;
  const accessed = values.accessedDate ? `Accessed ${values.accessedDate}` : "";
  return joinWith([author, title, outlet, section, date, url, accessed], ". ");
};

const formatWebsite = (values: CitationFormValues) => {
  const author = formatAuthor(values);
  const title = wrapTitle(values.title);
  const site = italicize(values.siteName);
  const date = values.publicationDate;
  const url = values.url;
  const accessed = values.accessedDate ? `Accessed ${values.accessedDate}` : "";
  return joinWith([author, title, site, date, url, accessed], ". ");
};

const mlaFormatters: Record<SourceType, (values: CitationFormValues) => string> =
  {
    publication: formatPublication,
    article: formatArticle,
    opinion: formatOpinion,
    website: formatWebsite,
  };

const formatAPAForPublication = (values: CitationFormValues) => {
  const author = formatApaAuthor(values);
  const date = formatApaDate(undefined, values.publicationYear);
  const title = italicize(values.title);
  const publisher = ensurePeriod(values.publisher);
  return collapseWhitespace(
    [author && `${author}.`, date, title && `${title}.`, publisher].filter(Boolean).join(" ")
  );
};

const formatAPAForArticle = (values: CitationFormValues) => {
  const author = formatApaAuthor(values);
  const date = formatApaDate(values.publicationDate);
  const title = ensurePeriod(values.title);
  const container = italicize(values.container);
  const volumeIssue = joinWith(
    [
      values.volume ? values.volume : undefined,
      values.issue ? `(${values.issue})` : undefined,
    ].filter(Boolean),
    ""
  );
  const pages = values.pages ? `${values.pages}.` : "";
  const url = ensurePeriod(values.url);
  return collapseWhitespace(
    [
      author && `${author}.`,
      date,
      title,
      container && `${container}${volumeIssue ? `, ${volumeIssue}` : ""},`,
      pages,
      url,
    ]
      .filter(Boolean)
      .join(" ")
  );
};

const formatAPAForOpinion = (values: CitationFormValues) => {
  const author = formatApaAuthor(values);
  const date = formatApaDate(values.publicationDate);
  const title = ensurePeriod(values.title);
  const outlet = italicize(values.outlet);
  const url = ensurePeriod(values.url);
  return collapseWhitespace(
    [author && `${author}.`, date, title, outlet && `${outlet}.`, url].filter(Boolean).join(" ")
  );
};

const formatAPAForWebsite = (values: CitationFormValues) => {
  const authorOrSite = formatApaAuthor(values) || values.siteName;
  const date = formatApaDate(values.publicationDate);
  const title = ensurePeriod(values.title);
  const site = italicize(values.siteName);
  const accessed = values.accessedDate ? `Retrieved ${values.accessedDate}.` : "";
  const url = ensurePeriod(values.url);
  return collapseWhitespace(
    [
      authorOrSite && `${authorOrSite}.`,
      date,
      title,
      site && `${site}.`,
      accessed,
      url,
    ]
      .filter(Boolean)
      .join(" ")
  );
};

const apaFormatters: Record<SourceType, (values: CitationFormValues) => string> = {
  publication: formatAPAForPublication,
  article: formatAPAForArticle,
  opinion: formatAPAForOpinion,
  website: formatAPAForWebsite,
};

const buildBibtexFields = (pairs: Record<string, string | undefined>) =>
  Object.entries(pairs)
    .filter(([, value]) => Boolean(value && value.trim()))
    .map(([key, value]) => `  ${key} = {${value?.trim()}}`)
    .join("\n");

const bibtexFormatters: Record<SourceType, (values: CitationFormValues) => { type: string; fields: Record<string, string | undefined> }> =
  {
    publication: (values) => ({
      type: "book",
      fields: {
        author: formatAuthor(values),
        title: values.title,
        publisher: values.publisher,
        address: values.publisherCity,
        year: values.publicationYear,
        edition: values.edition,
      },
    }),
    article: (values) => ({
      type: "article",
      fields: {
        author: formatAuthor(values),
        title: values.title,
        journal: values.container,
        volume: values.volume,
        number: values.issue,
        pages: values.pages,
        year: values.publicationDate?.match(/\d{4}/)?.[0],
        date: values.publicationDate,
        url: values.url,
        urldate: values.accessedDate,
      },
    }),
    opinion: (values) => ({
      type: "misc",
      fields: {
        author: formatAuthor(values),
        title: values.title,
        howpublished: values.outlet,
        note: values.section,
        date: values.publicationDate,
        url: values.url,
        urldate: values.accessedDate,
      },
    }),
    website: (values) => ({
      type: "online",
      fields: {
        author: formatAuthor(values),
        title: values.title,
        organization: values.siteName,
        date: values.publicationDate,
        url: values.url,
        urldate: values.accessedDate,
      },
    }),
  };

const inlineFormatters: Record<SourceType, (values: CitationFormValues) => string> = {
  publication: (values) => {
    const author = values.authorLast || values.authorFirst;
    const year = values.publicationYear;
    return author ? `(${author}${year ? ` ${year}` : ""})` : "";
  },
  article: (values) => {
    const author = values.authorLast || values.authorFirst;
    const pages = values.pages;
    return author
      ? `(${author}${pages ? ` ${pages.split("-")[0]}` : ""})`
      : "";
  },
  opinion: (values) => {
    const author = values.authorLast || values.authorFirst;
    const date = values.publicationDate?.match(/\d{4}/)?.[0];
    return author ? `(${author}${date ? ` ${date}` : ""})` : "";
  },
  website: (values) => {
    const site = values.siteName ?? values.authorLast ?? "n.p.";
    const accessed = values.accessedDate?.match(/\d{4}/)?.[0];
    return `(${site}${accessed ? ` ${accessed}` : ""})`;
  },
};

export const buildOutputs = (type: SourceType, values: CitationFormValues): CitationOutputs => {
  const mla = mlaFormatters[type](values) || "Add more details to generate a full MLA citation.";
  const apa = apaFormatters[type](values) || "Add more details to generate a full APA citation.";
  const { type: bibType, fields } = bibtexFormatters[type](values);
  const key = buildBibKey(values, type);
  const bibtex = `@${bibType}{${key},\n${buildBibtexFields(fields)}\n}`;
  const inline = inlineFormatters[type](values) || "Add author details for in-line citation.";

  return {
    mla,
    apa,
    bibtex,
    inline,
  };
};
