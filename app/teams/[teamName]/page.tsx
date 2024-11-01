import { db } from "@/lib/prisma";
import ProductItem from "@/components/productItem";

interface TeamPageProps {
  params: {
    teamName: string;
  };
}

const TeamPage = async ({ params }: TeamPageProps) => {
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
        <h1 className="font-semibold">Resultado para "{`${teamName}"`}</h1>
        <div className="py-5">
          {teamProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamPage;
