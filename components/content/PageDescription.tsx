import pageContent from "@lib/content/pageContent";
import { Link } from "@nextui-org/react";

export default function PageDescription() {
  const {
    description,
    userLink: { label: userLabel, href: userHref },
    pageLink: { label: pageLabel, href: pageHref },
  } = pageContent;

  const descFirst = description.split("[userLink]");

  return (
    <p className="text-center">
      {descFirst[0]}
      <Link href={userHref} size="lg" isExternal>
        {userLabel}
      </Link>
      {descFirst[1].split("[pageLink]")[0]}
      <Link href={pageHref} size="lg" isExternal>
        {pageLabel}
      </Link>
      {descFirst[1].split("[pageLink]")[1]}
    </p>
  );
}
