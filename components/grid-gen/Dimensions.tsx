"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import dimensionsContent from "@lib/content/dimensionsContent";
import type { ChangeEvent } from "react";

export default function Dimensions() {
  const {
    colParam,
    rowParam,
    gapParam,
    columnLabel,
    rowLabel,
    gapLabel,
    minNum,
    maxNum,
    defNum,
    badContentMessage,
  } = dimensionsContent;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedCols = searchParams.get(colParam)?.toString() || defNum;
  const selectedRows = searchParams.get(rowParam)?.toString() || defNum;
  const selectedGap = searchParams.get(gapParam)?.toString() || defNum;

  const valid = (value?: string) => {
    return (
      value &&
      /^[0-9]+$/.test(value) &&
      Number(value) < maxNum + 1 &&
      Number(value) > minNum - 1
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    const paramName =
      name === columnLabel ? colParam : name === rowLabel ? rowParam : gapParam;

    const params = new URLSearchParams(searchParams);
    if (valid(value)) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const inputs = [columnLabel, rowLabel, gapLabel];

  function isNotWholeNumber(num: number) {
    return num !== Math.floor(num);
  }

  return (
    <form className="flex gap-4">
      {inputs.map((label) => {
        const selected =
          label === columnLabel
            ? selectedCols
            : label === rowLabel
            ? selectedRows
            : selectedGap;

        const invalid = !selected || isNotWholeNumber(Number(selected));
        return (
          <Input
            key={label}
            type="number"
            min={1}
            max={12}
            name={label}
            label={label}
            onChange={(e) => handleChange(e)}
            value={selected}
            isInvalid={invalid}
            errorMessage={invalid ? badContentMessage : ""}
          />
        );
      })}
    </form>
  );
}
