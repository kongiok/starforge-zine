import type { SupportedLocales } from "~/locales/i18n.type";
export const locales: SupportedLocales = [
  {
    name: "正體中文",
    code: "zh-Hant",
    path: "zh-TW",
    direction: "ltr",
    priority: 100,
  },
  {
    name: "English",
    code: "en",
    path: "en-US",
    direction: "ltr",
    priority: 50,
  },
  {
    name: "台灣台語",
    code: "nan-TW",
    path: "tw-TW",
    direction: "ltr",
    priority: 50,
  },
];

export const defaultLocale = locales.reduce((max, current) =>
  current.priority > max.priority ? current : max,
);

export const normalizedLocales = locales.map((locale) => ({
  ...locale,
  _matchKeys: [locale.code, locale.path, locale.name].map((v) =>
    v.toLowerCase(),
  ),
}));
