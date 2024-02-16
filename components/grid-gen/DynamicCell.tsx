"use client";

import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { PanInfo, motion, useMotionValue } from "framer-motion";
import { Button } from "@nextui-org/react";

type DynamicCellProps = {
  width: number;
  height: number;
  cols: number;
  rows: number;
  gap: number;
  constraintsRef: MutableRefObject<null>;
};

const calculateCellWidth = (
  width: number,
  gap: number,
  cols: number
): number => {
  const trueGap = (gap / 4) * 16;
  return (width - trueGap * (cols - 1)) / cols;
};

export default function DynamicCell({
  width,
  height,
  cols,
  rows,
  gap,
  constraintsRef,
}: DynamicCellProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const [cellWidths, setCellWidths] = useState(0);
  const [cellHeights] = useState(64);

  console.log(cellWidths);

  const mHeight = useMotionValue(64);
  const mWidth = useMotionValue(cellWidths);

  const handleExpand = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      mHeight.set(mHeight.get() + info.delta.y);
      mWidth.set(mWidth.get() + info.delta.x);
    },
    []
  );

  useEffect(() => {
    mWidth.set(calculateCellWidth(width, gap, cols));
    setCellWidths(calculateCellWidth(width, gap, cols));
  }, [width, cols, gap]);

  return (
    <motion.div
      className="overlay-cell bg-default-500 resize rounded-lg"
      style={{
        width: mWidth,
        height: mHeight,
      }}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
    >
      <div className="flex h-full items-center justify-center relative">
        <Button
          size="sm"
          color="danger"
          aria-label="Delete"
          className="absolute top-0 right-0 w-unit-6 h-unit-5 min-w-0"
          isIconOnly
        >
          <Icon icon="streamline:delete-1-solid" />
        </Button>
        <p className="text-black">3</p>
        <motion.div
          className="absolute bottom-0 right-0"
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleExpand}
          onDragEnd={() => {
            setIsExpanding(false);
          }}
          onDragStart={() => {
            setIsExpanding(true);
          }}
        >
          <Icon
            icon="iconamoon:arrow-left-2"
            className="cursor-nwse-resize text-black text-xl -rotate-[135deg]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
