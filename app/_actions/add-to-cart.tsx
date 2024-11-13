"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddProductParams {
  userId: string | undefined;
  productId: string;
  shirtSize: string;
  customDescription?: string;
  productQuantity: number;
}

export async function addToCart({
  userId,
  productId,
  shirtSize,
  customDescription,
  productQuantity,
}: AddProductParams) {
  try {
    let order = await db.order.findFirst({
      where: { userId: userId },
      include: { items: true },
    });

    if (order) {
      const existingOrderItem = order.items.find(
        (item) => item.productId === productId && item.size === shirtSize
      );

      if (existingOrderItem) {
        await db.orderItem.update({
          where: {
            orderId_productId_size: {
              orderId: order.id,
              productId: productId,
              size: shirtSize,
            },
          },
          data: { quantity: existingOrderItem.quantity + productQuantity },
        });
      } else {
        await db.orderItem.create({
          data: {
            orderId: order.id,
            productId: productId,
            size: shirtSize,
            quantity: productQuantity,
            customDescription: customDescription || null,
          },
        });
      }
    } else {
      order = await db.order.create({
        data: {
          userId: userId!,
          totalPrice: 0,
          items: {
            create: {
              productId: productId,
              size: shirtSize,
              quantity: productQuantity,
              customDescription: customDescription || null,
            },
          },
        },
        include: { items: true },
      });
    }

    await updateOrderTotalPrice(order.id);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

async function updateOrderTotalPrice(orderId: string) {
  const orderItems = await db.orderItem.findMany({
    where: { orderId: orderId },
    include: { product: true },
  });

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  await db.order.update({
    where: { id: orderId },
    data: { totalPrice: totalPrice },
  });
}
