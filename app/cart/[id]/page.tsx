import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

const CartPage = async ({ params }: any) => {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id: id },
    select: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!order) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Pedido não encontrado.
        </p>
      </main>
    );
  }

  const itemsWithProduct = await Promise.all(
    order.items.map(async (item) => {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      });
      return { ...item, product: product || null };
    })
  );

  const subtotal = itemsWithProduct.reduce((acc, item) => {
    return acc + (item.product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1200px] py-8">
      <h2 className="px-4 pb-6 text-2xl font-black uppercase tracking-tighter text-zinc-900">
        Meu Carrinho
      </h2>

      <div className="flex flex-col gap-8 px-4 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          {itemsWithProduct.map((item) => (
            <CartItem key={`${item.productId}-${item.size}`} item={item} />
          ))}

          {itemsWithProduct.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-20">
              <p className="font-bold uppercase tracking-widest text-zinc-900">
                Vazio
              </p>
              <p className="text-sm text-zinc-400">
                Seu carrinho está esperando por uma camisa :D
              </p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[380px]">
          <div className="flex flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="border-b border-zinc-100 pb-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              Resumo do Pedido
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-900">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-zinc-500">Entrega</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
                  Grátis
                </span>
              </div>
            </div>

            <div className="flex justify-between border-t border-zinc-100 pt-6">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                Total
              </span>
              <span className="text-xl font-black text-zinc-900">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>

            <Button className="w-full rounded-none bg-zinc-900 py-8 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-black">
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
