import ProductItem from "app/_components/productItem";
import { db } from "@/lib/prisma";

interface LeaguePageProps {
  params: {
    leagueName: string;
  };
}

const LeaguePage = async ({ params }: LeaguePageProps) => {
  let { leagueName } = await params;
  leagueName = decodeURIComponent(leagueName);

  const leagueProducts = await db.product.findMany({
    where: {
      league: leagueName,
    },
  });

  return (
    <>
      <>
        <div className="p-5">
          <h1 className=" text-gray-400">{`Início > ${leagueProducts[0].league}`}</h1>
          <div className="grid grid-cols-2 gap-4 py-4">
            {leagueProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default LeaguePage;
