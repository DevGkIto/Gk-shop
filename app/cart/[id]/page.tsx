import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

interface CartPageParams {
  params: {
    id: string;
  };
}

const CartPage = async ({ params }: CartPageParams) => {
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

  return (
    <>
      <h2 className="font-bold p-4 text-lg"> Meu Carrinho </h2>
      <div className="flex flex-col gap-2 border-2 mx-4 rounded-md pb-2">
        {order.items.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
        <Button
          variant="outline"
          className=" text-gray-700 hover:text-gray-700"
        >
          Finalizar Compra
        </Button>
      </div>
    </>
  );
};

export default CartPage;
