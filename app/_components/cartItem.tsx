"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { removeItemFromCart } from "app/_actions/remove-item-cart";
import { toast } from "sonner";

interface CartItemProps {
  item: {
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    orderId: string;
    quantity: number;
    size: string;
    customDescription: string | null;
    product: {
      id: string;
      productTitle: string;
      imageUrl: string;
      price: number;
    } | null;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const handleRemoveItem = async () => {
    try {
      await removeItemFromCart(item.orderId, item.productId, item.size);
      toast.success("Item removido com sucesso!");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Erro ao remover item!");
    }
  };
  const { product } = item;
  return (
    <div className="flex items-center gap-2 bg-gray-100">
      <div className="relative h-[100px] w-[100px]">
        <Image
          alt={product?.productTitle || "Product Image"}
          src={product?.imageUrl || ""}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3 w-[70%]">
        <div className="font-semibold">{product?.productTitle}</div>
        <div className="flex text-sm items-center justify-between">
          <div>Quantidade: {item.quantity}</div>
          <div>Tamanho: {item.size}</div>
          <Button variant="outline" size="icon" onClick={handleRemoveItem}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
