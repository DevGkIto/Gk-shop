"use client";

import React, { useState } from "react";
import useProductStore from "./_stores/useProductStore";

const ShirtSizes = () => {
  const { shirtSize, setShirtSize } = useProductStore();

  const sizes = ["P", "M", "G", "GG"];

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`px-4 py-2 rounded-sm ${
            shirtSize === size ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setShirtSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default ShirtSizes;
