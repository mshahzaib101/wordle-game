import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-4 border-white border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
