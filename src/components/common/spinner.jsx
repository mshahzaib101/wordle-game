import React from "react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "w-4 h-4 border-4 border-white border-dotted rounded-full animate-spin",
          className
        )}
      ></div>
    </div>
  );
};

export default Spinner;
