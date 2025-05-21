import { getTranslator } from "~/locales/i18n.helper.edge";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = getTranslator(locale);
  return (
    <main>
      <h1>{t("generic.page.title")}</h1>
      <span>{t("generic.page.description")}</span>
    </main>
  );
};

export default Page;
