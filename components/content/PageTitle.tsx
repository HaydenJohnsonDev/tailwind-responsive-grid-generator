import pageContent from "@lib/content/pageContent";

export default function PageTitle() {
  const { title } = pageContent;
  return <h1>{title}</h1>;
}
