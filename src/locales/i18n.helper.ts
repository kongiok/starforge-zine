import { normalizedLocales } from "./i18n.config";
import type { Locale } from "./i18n.type";

export const getLocaleBySegment = (segment: string): Locale | undefined => {
  const normalized = segment.toLowerCase();
  return normalizedLocales.find((locale) =>
    locale._matchKeys.includes(normalized),
  );
};
