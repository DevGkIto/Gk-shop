"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeItemFromCart = async (
  orderId: string,
  productId: string,
  size: string
) => {
  try {
    const deletedItem = await db.orderItem.delete({
      where: {
        orderId_productId_size: {
          orderId: orderId,
          productId: productId,
          size: size,
        },
      },
    });
    revalidatePath("/");
    return deletedItem;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw new Error("Could not remove item from cart.");
  }
};
