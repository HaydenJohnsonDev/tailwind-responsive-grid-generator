"use client";

import { useSearchParams } from "next/navigation";
import Breakpoints from "@components/grid-gen/Breakpoints";
import Dimensions from "@components/grid-gen/Dimensions";
import breakpointsContent from "@lib/content/breakpointsContent";
import dimensionsContent from "@lib/content/dimensionsContent";
import { getGridCols, getGridGap, getGridRows } from "@lib/utilities/helpers";
import Cell from "./Cell";
import DynamicCell from "./DynamicCell";

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

  const handleDrag = () => {
    // Implement drag logic here
  };

  return (
    <>
      <Breakpoints />
      <Dimensions />
      <div className="resize  bg-white"></div>
      <div className="relative w-full h-full">
        <div
          className={`grid ${colsClass} ${rowsClass} ${gapClass} w-full h-full bg-default-50 rounded-lg`}
        >
          {divs.map((div, i) => (
            <Cell key={`grid-cell-${i + 1}`} />
          ))}
        </div>
        <div className="absolute z-50 top-0 bottom-0 left-0 right-0">
          <DynamicCell height={60} width={60} />
        </div>
      </div>
    </>
  );
}
