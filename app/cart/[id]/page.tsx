import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

const CartPage = async ({ params }: any) => {
  const { id } = await params;
  const order = await db.order.findUnique({
    where: {
      id: id,
    },
    select: {
      items: true,
    },
  });

  if (!order) {
    return <p>Order not found.</p>;
  }

  const itemsWithProduct = await Promise.all(
    order.items.map(async (item) => {
      const product = await db.product.findUnique({
        where: {
          id: item.productId,
        },
      });
      if (!product) {
        return { ...item, product: null };
      }

      return { ...item, product };
    })
  );

  return (
    <>
      <h2 className="font-bold p-4 text-lg"> Meu Carrinho </h2>
      <div className="flex flex-col gap-2 border-2 mx-4 rounded-md p-2">
        {itemsWithProduct.map((item) => (
          <CartItem key={`${item.productId}-${item.size}`} item={item} />
        ))}
        {/* <Button variant="outline" className="text-gray-700 hover:text-gray-700">
          Finalizar Compra
        </Button> */}
      </div>
    </>
  );
};

export default CartPage;
