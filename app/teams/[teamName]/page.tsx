import { db } from "@/lib/prisma";
import ProductItem from "app/_components/productItem";

interface TeamPageParams {
  params: {
    teamName: string;
  };
}

const TeamPage = async ({ params }: TeamPageParams) => {
  let { teamName } = await params; // Next require this, unless shows a annoying warning
  teamName = decodeURIComponent(teamName);

  const teamProducts = await db.product.findMany({
    where: {
      team: teamName,
    },
  });

  return (
    <>
      <div className="p-5">
        <h1 className=" text-gray-400">{`Início > ${teamProducts[0].league} > ${teamName}`}</h1>
        <div className="grid grid-cols-2 gap-4 py-4">
          {teamProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamPage;
