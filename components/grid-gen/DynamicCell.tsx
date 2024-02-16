"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type DynamicCellProps = {
  width: number;
  height: number;
};

export default function DynamicCell({ width, height }: DynamicCellProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Implement logic to snap to nearest cell underneath
  };

  return (
    <motion.div
      className="overlay-cell bg-white"
      style={{ width: `${width}px`, height: `${height}px` }}
      drag
      dragConstraints={{
        left: 0,
        right: window.innerWidth,
        top: 0,
        bottom: window.innerHeight,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Content of the cell */}
    </motion.div>
  );
}
