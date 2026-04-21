"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { removeItemFromCart } from "app/_actions/remove-item-cart";
import { toast } from "sonner";
import ProductQuantity from "./productQuantity";
import { updateItemQuantity } from "app/_actions/update-item-quantity";

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
  const { product } = item;

  const handleQuantityChange = async (newQuantity: number) => {
    const isAdding = newQuantity > item.quantity;
    const label = isAdding ? "Adicionando..." : "Removendo...";

    const toastId = toast.loading(label);

    try {
      await updateItemQuantity({
        orderId: item.orderId,
        productId: item.productId,
        size: item.size,
        newQuantity,
      });

      toast.success(isAdding ? "Adicionado!" : "Removido!", { id: toastId });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Erro ao atualizar quantidade.", { id: toastId });
    }
  };

  const handleRemoveItem = async () => {
    const toastId = toast.loading("Removendo item do carrinho...");
    try {
      await removeItemFromCart(item.orderId, item.productId, item.size);
      toast.success("Item removido com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Erro ao remover item!", { id: toastId });
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-2">
      <div className="relative h-[100px] w-[100px]">
        <Image
          alt={product?.productTitle || "Product Image"}
          src={product?.imageUrl || ""}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="font-semibold">{product?.productTitle}</div>
        <div className="flex items-center justify-end gap-3 text-sm">
          <ProductQuantity
            className="scale-90 gap-2 !bg-transparent !p-0"
            value={item.quantity}
            onQuantityChange={handleQuantityChange}
          />

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
