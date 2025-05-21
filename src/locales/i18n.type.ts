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
