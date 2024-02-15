import HowToSection from "@components/content/HowToSection";
import PageDescription from "@components/content/PageDescription";
import PageTitle from "@components/content/PageTitle";
import pageContent from "@lib/content/pageContent";

export default function Home() {
  const { howToTitle } = pageContent;

  return (
    <>
      <PageTitle />
      <PageDescription />
      <HowToSection />
    </>
  );
}
