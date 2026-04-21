import ProductItem from "app/_components/productItem";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

const LeaguePage = async ({ params }: any) => {
  let { leagueName } = await params;
  leagueName = decodeURIComponent(leagueName);

  const leagueProducts = await db.product.findMany({
    where: {
      league: leagueName,
    },
  });

  if (leagueProducts.length === 0) return notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1400px] py-4">
      <h1 className="px-4 text-sm text-gray-400">{`Início > ${leagueProducts[0].league}`}</h1>

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {leagueProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default LeaguePage;
