"use server";

import { db } from "@/lib/prisma";

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
    console.log("Starting addToCart function");
    console.log("Received parameters:", {
      userId,
      productId,
      shirtSize,
      customDescription,
      productQuantity,
    });

    let order = await db.order.findFirst({
      where: { userId: userId },
      include: { items: true },
    });
    console.log("Order found:", order);

    if (order) {
      const existingOrderItem = order.items.find(
        (item) => item.productId === productId && item.size === shirtSize
      );
      console.log("Existing order item:", existingOrderItem);

      if (existingOrderItem) {
        console.log("Updating existing item quantity");
        await db.orderItem.update({
          where: {
            orderId_productId: {
              orderId: order.id,
              productId: productId,
            },
          },
          data: { quantity: existingOrderItem.quantity + productQuantity },
        });
      } else {
        console.log("Creating a new item in the order");
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
      console.log("No existing order found, creating a new one");
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

    console.log("Updating total price for order:", order.id);
    await updateOrderTotalPrice(order.id);
    console.log("Order updated successfully");
    return { success: true, message: "Product added to order successfully." };
  } catch (error) {
    console.error("Error adding product to order:", error);
    return { success: false, message: "Failed to add product to order." };
  }
}

async function updateOrderTotalPrice(orderId: string) {
  console.log("Updating total price for order ID:", orderId);
  const orderItems = await db.orderItem.findMany({
    where: { orderId: orderId },
    include: { product: true },
  });
  console.log("Order items:", orderItems);

  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  console.log("Calculated total price:", totalPrice);

  await db.order.update({
    where: { id: orderId },
    data: { totalPrice: totalPrice },
  });
  console.log("Total price updated successfully");
}
