import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "@iarna/toml";
import { I18nDictionary, I18nDictionarySchema } from "./i18n.type";

export const loadLocale = (code: string): I18nDictionary => {
  const filePath = join(
    process.cwd(),
    "src",
    "locales",
    `dictionaries/${code}.toml`,
  );
  const raw = readFileSync(filePath, "utf-8");
  const parsed = parse(raw);

  return I18nDictionarySchema.parse(parsed);
};

export const getTranslator = (code: string) => {
  const dict = loadLocale(code);

  const t = <T = string | string[]>(key: string): T => {
    const keys = key.split(".");
    let result: unknown = dict;

    for (const k of keys) {
      if (typeof result !== "object" || result === null) {
        return key as T;
      }
      result = (result as Record<string, unknown>)[k];
    }

    return (result ?? key) as T;
  };

  return t;
};
