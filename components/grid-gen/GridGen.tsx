"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Breakpoints from "@components/grid-gen/Breakpoints";
import Dimensions from "@components/grid-gen/Dimensions";
import breakpointsContent from "@lib/content/breakpointsContent";
import dimensionsContent from "@lib/content/dimensionsContent";
import { getGridCols, getGridGap, getGridRows } from "@lib/utilities/helpers";
import Cell from "./Cell";
import DynamicCell from "./DynamicCell";
import { useEffect, useRef, useState } from "react";

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

  // Top div
  const constraintsRef = useRef(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // Access the div's width and height
    if (constraintsRef.current) {
      const { offsetWidth, offsetHeight } = constraintsRef.current;
      setWidth(offsetWidth);
      setHeight(offsetHeight);
    }
  }, [constraintsRef.current]);

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
        <motion.div
          className="absolute z-50 top-0 bottom-0 left-0 right-0"
          ref={constraintsRef}
        >
          <DynamicCell
            {...{ constraintsRef, height, width }}
            cols={selectedCols}
            rows={selectedRows}
            gap={selectedGap}
          />
        </motion.div>
      </div>
    </>
  );
}
