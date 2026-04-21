"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateQuantityParams {
  orderId: string;
  productId: string;
  size: string;
  newQuantity: number;
}

export async function updateItemQuantity({
  orderId,
  productId,
  size,
  newQuantity,
}: UpdateQuantityParams) {
  try {
    // CRITICAL: We use the composite unique key to target EXACTLY one row
    await db.orderItem.update({
      where: {
        orderId_productId_size: {
          orderId,
          productId,
          size,
        },
      },
      data: {
        quantity: newQuantity,
      },
    });

    // Update the total price logic
    const orderItems = await db.orderItem.findMany({
      where: { orderId },
      include: { product: true },
    });

    const totalPrice = orderItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);

    await db.order.update({
      where: { id: orderId },
      data: { totalPrice },
    });

    // This refreshes the Server Component data
    revalidatePath(`/cart/${orderId}`);
  } catch (error) {
    console.error("DB Update Error:", error);
  }
}
