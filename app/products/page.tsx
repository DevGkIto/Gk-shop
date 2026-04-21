import ProductItem from "@/components/productItem";
import { db } from "@/lib/prisma";

const ProductPages = async ({ searchParams }: any) => {
  const searchParam = await searchParams;

  const products = await db.product.findMany({
    where: {
      OR: [
        {
          productTitle: {
            contains: searchParam.title,
            mode: "insensitive",
          },
        },
        {
          team: {
            contains: searchParam.title,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1400px] py-4">
      <div className="p-4">
        <h1 className="text-sm font-medium uppercase tracking-tight text-zinc-500">
          Resultados para:{" "}
          <span className="font-bold text-zinc-900">
            &quot;{searchParam.title}&quot;
          </span>
        </h1>

        <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-20">
            <p className="font-bold uppercase tracking-widest text-zinc-900">
              Sem resultados
            </p>
            <p className="text-sm text-zinc-400">
              Tente buscar por outro time ou modelo.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPages;
