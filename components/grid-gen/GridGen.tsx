"use client";

import { useSearchParams } from "next/navigation";
import Breakpoints from "@components/grid-gen/Breakpoints";
import Dimensions from "@components/grid-gen/Dimensions";
import breakpointsContent from "@lib/content/breakpointsContent";
import dimensionsContent from "@lib/content/dimensionsContent";
import { getGridCols, getGridGap, getGridRows } from "@lib/utilities/helpers";
import Cell from "./Cell";

export default function GridGen() {
  const { urlParam } = breakpointsContent;
  const { colParam, rowParam, gapParam, defNum } = dimensionsContent;

  const searchParams = useSearchParams();

  const selectedBreakPoint = searchParams.get(urlParam)?.toString();
  const selectedCols = Number(searchParams.get(colParam)?.toString() || defNum);
  const selectedRows = Number(searchParams.get(rowParam)?.toString() || defNum);
  const selectedGap = Number(searchParams.get(gapParam)?.toString() || defNum);

  const colsClass = getGridCols(selectedCols);
  const rowsClass = getGridRows(selectedRows);
  const gapClass = getGridGap(selectedGap);

  const length = selectedCols * selectedRows;
  const divs = Array.from({ length }, () => 0);

  return (
    <>
      <Breakpoints />
      <Dimensions />
      <div
        className={`grid ${colsClass} ${rowsClass} ${gapClass} w-full h-full bg-default-50 rounded-lg`}
      >
        {divs.map((div, i) => (
          <Cell key={`grid-cell-${i + 1}`} />
        ))}
      </div>
    </>
  );
}
