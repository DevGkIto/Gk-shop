// components/SidebarSheetWrapper.tsx
import { db } from "@/lib/prisma";
import SidebarSheet from "@/components/sidebarSheet";

const SidebarSheetWrapper = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      productTitle: true,
      league: true,
      team: true,
    },
  });

  // Group products by league
  const productsByLeague = products.reduce((acc, product) => {
    if (!acc[product.league]) {
      acc[product.league] = [];
    }
    acc[product.league].push(product);
    return acc;
  }, {} as Record<string, { id: string; productTitle: string; team: string }[]>);

  return <SidebarSheet productsByLeague={productsByLeague} />;
};

export default SidebarSheetWrapper;
