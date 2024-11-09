import { db } from "@/lib/prisma";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface CartItemProps {
  item: {
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    orderId: string;
    quantity: number;
    size: string;
    customDescription: string | null;
  };
}

const CartItem = async ({ item }: CartItemProps) => {
  const product = await db.product.findUnique({
    where: {
      id: item.productId,
    },
  });
  return (
    <div className="flex items-center gap-2 bg-gray-100">
      <div className="relative h-[100px] w-[100px]">
        <Image
          alt={product?.productTitle}
          src={product?.imageUrl}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3 w-[70%]">
        <div className="font-semibold">{product?.productTitle}</div>
        <div className="flex text-sm items-center justify-between">
          <div>Quantidade: {item.quantity}</div>
          <div>Tamanho: {item.size}</div>
          <Button variant="outline" size="icon">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
