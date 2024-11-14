"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import useProductStore from "./_stores/useProductStore";

const ProductQuantity = () => {
  const { productQuantity, setProductQuantity } = useProductStore();
  const [quantity, setQuantity] = useState(productQuantity);

  const quantityAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setProductQuantity(newQuantity);
  };

  const quantityRemove = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex px-2 py-2 gap-5 items-center justify-center bg-gray-300 rounded-lg">
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
