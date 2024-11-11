import ProductItem from "@/components/productItem";
import { db } from "@/lib/prisma";

interface SearchParams {
  searchParams: {
    title: string;
  };
}

const ProductPages = async ({ searchParams }: SearchParams) => {
  const searchParam = await searchParams;
  const products = await db.product.findMany({
    where: {
      productTitle: {
        contains: searchParam.title,
        mode: "insensitive",
      },
    },
  });
  return (
    <div>
      <div className="p-4">
        <h1 className="text-gray-400">
          Resultados para: "{searchParam.title}"
        </h1>
        <div className="grid grid-cols-2 gap-4 py-4">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPages;
