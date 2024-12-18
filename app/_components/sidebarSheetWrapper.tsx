import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import SidebarSheet from "app/_components/sidebarSheet";

const SidebarSheetWrapper = async () => {
  const user = await currentUser();

  const serializableUser = user ? { id: user.id } : null;

  const products = await db.product.findMany({
    select: {
      id: true,
      productTitle: true,
      league: true,
      team: true,
    },
  });

  products.sort((a, b) => a.league.localeCompare(b.league));

  // Group products by league
  const productsByLeague = products.reduce((acc, product) => {
    if (!acc[product.league]) {
      acc[product.league] = [];
    }
    acc[product.league].push(product);
    return acc;
  }, {} as Record<string, { id: string; productTitle: string; team: string; league: string }[]>);

  return (
    <SidebarSheet productsByLeague={productsByLeague} user={serializableUser} />
  );
};

export default SidebarSheetWrapper;
