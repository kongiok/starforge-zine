import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "@iarna/toml";

export const loadLocale = (code: string): Record<string, any> => {
  const filePath = join(
    process.cwd(),
    "src",
    "locales",
    `dictionaries/${code}.toml`,
  );
  const raw = readFileSync(filePath, "utf-8");
  return parse(raw);
};

export const getTranslator = (code: string) => {
  const dict = loadLocale(code);

  const t = <T = string | string[]>(key: string): T => {
    const keys = key.split(".");
    let result: any = dict;

    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key as any;
    }

    return result;
  };

  return t;
};
