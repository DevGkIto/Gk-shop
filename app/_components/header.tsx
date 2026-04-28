import Link from "next/link";
import { Button } from "app/_components/ui/button";
import { ShoppingBag } from "lucide-react";
import SidebarSheetWrapper from "app/_components/sidebarSheetWrapper";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import Search from "./search";
import Image from "next/image";

const Header = async () => {
  const user = await currentUser();

  if (user) {
    await db.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
      },
    });
  }

  const order = await db.order.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      items: true,
    },
  });

  const orderId = order ? order.id : null;

  const cartQuantity =
    order?.items.reduce((total, cartItem) => total + cartItem.quantity, 0) || 0;

  return (
    <>
      <div className="sticky top-0 z-50 flex h-[71px] items-center justify-between bg-zinc-900 px-4">
        <div>
          <Link href="/">
            <Image alt="GK" src="/GKlogo.svg" width={60} height={60} />
          </Link>
        </div>

        <div className="mx-8 flex max-w-[600px] flex-1 justify-center">
          <Search />
        </div>

        <div className="mr-2 flex items-center justify-center gap-1">
          {user && orderId && (
            <Link href={`/cart/${orderId}`}>
              <Button variant="ghost" size="icon" asChild>
                <div className="relative">
                  <ShoppingBag
                    strokeWidth={1.2}
                    className="text-white"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-black">
                    {cartQuantity}
                  </div>
                </div>
              </Button>
            </Link>
          )}
          <SidebarSheetWrapper />
        </div>
      </div>
    </>
  );
};

export default Header;
