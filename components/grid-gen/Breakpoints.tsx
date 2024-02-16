"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@nextui-org/button";
import breakpointsContent from "@lib/content/breakpointsContent";
import type { PressEvent } from "@react-types/shared";

export default function Breakpoints() {
  const { breakPoints, nullPoint, urlParam } = breakpointsContent;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selected = searchParams.get(urlParam)?.toString();

  function handleSetBreakpoint(e: PressEvent) {
    const value = e.target.textContent;

    const params = new URLSearchParams(searchParams);
    if (value && value !== nullPoint) {
      params.set(urlParam, value);
    } else {
      params.delete(urlParam);
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  // Styles
  const getColor = (isSelected: boolean) =>
    isSelected ? "primary" : "default";

  const getVariant = (isSelected: boolean) => (isSelected ? "shadow" : "solid");

  return (
    <ButtonGroup>
      {breakPoints.map((bp) => (
        <Button
          key={bp || nullPoint}
          color={getColor(bp === selected)}
          variant={getVariant(bp === selected)}
          onPress={(e) => handleSetBreakpoint(e)}
        >
          {bp || nullPoint}
        </Button>
      ))}
    </ButtonGroup>
  );
}
