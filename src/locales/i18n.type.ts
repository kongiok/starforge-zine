import { z } from "zod/v4";

export const LocaleSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, {
    message: "Invalid locale code. Expected format like 'en' or 'zh-TW'",
  }),
  path: z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, {
    message: "Invalid locale code. Expected format like 'en' or 'zh-TW'",
  }),
  direction: z.enum(["ltr", "rtl"]),
  priority: z.number().int().nonnegative().min(10).max(100),
});

export const SupportedLocalesSchema = z.array(LocaleSchema);

export type Locale = z.infer<typeof LocaleSchema>;
export type SupportedLocales = z.infer<typeof SupportedLocalesSchema>;

const I18nDictionaryAcceptSchema = z.union([z.string(), z.array(z.string())]);
export const I18nDictionarySchema = z.lazy(() =>
  z.record(
    z.string(),
    z.union([
      I18nDictionaryAcceptSchema,
      z.lazy(() => z.record(z.string(), I18nDictionaryAcceptSchema)),
    ]),
  ),
);

// ✅ 導出型別供全站使用
export type I18nDictionary = z.infer<typeof I18nDictionarySchema>;
