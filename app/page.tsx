import Image from "next/image";
import { db } from "./_lib/prisma";
import ProductItem from "./_components/productItem";
import { currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const products = await db.product.findMany({});

  const user = await currentUser();

  return (
    <>
      {user ? (
        <div className="px-4 pt-2 font-semibold">
          Bem vindo, {user?.fullName}!
        </div>
      ) : (
        <div className="px-4 pt-2 font-semibold">
          <div>Bem vindo,</div>
          <div>Faça o login para uma melhor experiência!</div>
        </div>
      )}
      <div className="relative h-[200px] m-2">
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
