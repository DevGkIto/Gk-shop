"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ProductQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const quantityAdd = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const quantityRemove = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex px-4 py-3 gap-5 items-center justify-center bg-gray-300 rounded-lg">
      <button
        className="rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
        onClick={quantityAdd}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <p className="text-lg">{quantity}</p>
      <button
        className="rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
        onClick={quantityRemove}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

export default ProductQuantity;
