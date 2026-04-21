import { db } from "@/lib/prisma";
import ProductItem from "../../_components/productItem";
import { notFound } from "next/navigation";

const TeamPage = async ({ params }: any) => {
  let { teamName } = await params; //Next.js require this
  teamName = decodeURIComponent(teamName);

  const teamProducts = await db.product.findMany({
    where: {
      team: teamName,
    },
  });

  if (teamProducts.length === 0) return notFound();

  return (
    <main className="w-full py-4">
      <h1 className="pl-3 text-gray-400">{`Início > ${teamProducts[0].league} > ${teamName}`}</h1>

      <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto px-4 py-4">
        {teamProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[160px] max-w-[160px] md:min-w-[220px] md:max-w-[220px]"
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default TeamPage;
