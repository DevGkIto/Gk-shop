import Image from "next/image";
import { db } from "./_lib/prisma";
import ProductItem from "./_components/productItem";

const Home = async () => {
  const products = await db.product.findMany({});

  return (
    <>
      <div className="relative h-[200px] m-4">
        <Image src="/banner.svg" alt="banner" fill className="object-cover" />
      </div>
      <p className="w-full flex justify-center font-bold text-xl underline text-amber-300">
        Populares
      </p>
      <div className="grid grid-cols-2 gap-4 p-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
