"use server";

import { db } from "@/lib/prisma";

export const removeItemFromCart = async (
  orderId: string,
  productId: string
) => {
  try {
    const deletedItem = await db.orderItem.delete({
      where: {
        orderId_productId: {
          orderId: orderId,
          productId: productId,
        },
      },
    });

    return deletedItem;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw new Error("Could not remove item from cart.");
  }
};
