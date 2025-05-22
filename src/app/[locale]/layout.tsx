import { getTranslator } from "~/locales/i18n.helper.edge";
import { getLocaleBySegment } from "~/locales/i18n.helper";
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const resolved = getLocaleBySegment(locale);
  const t = getTranslator(resolved?.path ?? "zh-TW");
  return {
    title: t("generic.seo.title"),
    description: t("generic.seo.description"),
    keywords: t("generic.seo.keywords"),
  };
};

const Layout = async ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const localeCurrent = getLocaleBySegment(locale)?.code;
  return (
    <html lang={localeCurrent}>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
