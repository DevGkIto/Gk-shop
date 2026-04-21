import Image from "next/image";
import { db } from "./_lib/prisma";
import ProductItem from "./_components/productItem";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({});
  const user = await currentUser();

  const productsByLeague = products.reduce(
    (acc, product) => {
      if (!acc[product.league]) acc[product.league] = [];
      acc[product.league].push(product);
      return acc;
    },
    {} as Record<string, typeof products>
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1400px] pb-10">
      <div className="relative mx-2 mt-4 h-[180px] overflow-hidden rounded-xl md:h-[350px]">
        <Image
          src="/banner.png"
          alt="Football Banner"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {Object.entries(productsByLeague).map(([league, leagueProducts]) => {
        const leagueName = decodeURIComponent(league);

        return (
          <section key={league} className="mt-10">
            <div className="mb-4 flex items-center justify-between px-4">
              <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 md:text-2xl">
                {leagueName}
              </h2>
              <Link
                href={`/leagues/${leagueName}`}
                className="text-xs font-semibold text-zinc-500 underline transition-colors hover:text-black"
              >
                Ver todos
              </Link>
            </div>

            <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto px-4 pb-6 pt-4">
              {leagueProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[160px] max-w-[160px] md:min-w-[240px] md:max-w-[240px]"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Home;
