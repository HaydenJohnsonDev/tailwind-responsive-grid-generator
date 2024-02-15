import pageContent from "@lib/content/pageContent";

export default function HowToSection() {
  const { howToTitle, howToSteps } = pageContent;

  return (
    <>
      <h2>{howToTitle}</h2>
      <ol className="list-decimal flex flex-col gap-2">
        {howToSteps.map((step, i) => (
          <li key={`how-to-step-${i + 1}`} className="font-bold text-lg">
            <span className="font-normal text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
