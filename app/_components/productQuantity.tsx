"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import useProductStore from "./_stores/useProductStore";
import { cn } from "@/lib/utils";

interface ProductQuantityProps {
  className?: string;
  // If these are passed, we are in "Cart Mode"
  value?: number;
  onQuantityChange?: (newValue: number) => void;
}

const ProductQuantity = ({
  className,
  value,
  onQuantityChange,
}: ProductQuantityProps) => {
  const { productQuantity, setProductQuantity } = useProductStore();

  const isCartMode = value !== undefined && onQuantityChange !== undefined;

  const displayQuantity = isCartMode ? value : productQuantity;

  const handleAdd = () => {
    const nextValue = displayQuantity + 1;
    if (isCartMode) {
      onQuantityChange(nextValue);
    } else {
      setProductQuantity(nextValue);
    }
  };

  const handleRemove = () => {
    if (displayQuantity > 1) {
      const nextValue = displayQuantity - 1;
      if (isCartMode) {
        onQuantityChange(nextValue);
      } else {
        setProductQuantity(nextValue);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-md bg-zinc-100 px-2 py-1 text-zinc-900",
        className
      )}
    >
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 disabled:opacity-20"
        onClick={handleRemove}
        disabled={displayQuantity <= 1}
      >
        <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
      </button>

      <p className="min-w-[1.5rem] text-center text-sm font-bold">
        {displayQuantity}
      </p>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-zinc-200"
        onClick={handleAdd}
      >
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
      </button>
    </div>
  );
};

export default ProductQuantity;
