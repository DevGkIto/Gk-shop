"use client";

import React, { useState } from "react";

const ShirtSizes = () => {
  const [selectedSize, setSelectedSize] = useState(""); // State to manage selected size

  const sizes = ["P", "M", "G", "GG"]; // Size options

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`px-4 py-2 rounded-sm ${
            selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedSize(size)} // Set selected size on click
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default ShirtSizes;
