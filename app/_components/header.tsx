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
      <div className="bg-[#9F3434] flex h-[71px] items-center justify-between">
        <div>
          <Link href="/">
            <Image alt="GK" src="/GKlogo.svg" width={60} height={60} />
          </Link>
        </div>
        <div className="relative">
          <Search />
        </div>
        <div className="flex gap-1 mr-2 justify-center items-center">
          {user && orderId && (
            <Link href={`cart/${orderId}`}>
              <Button variant="ghost" size="icon" asChild>
                <div className="relative">
                  <ShoppingBag style={{ width: "30px", height: "30px" }} />
                  <div
                    className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4
                     text-xs rounded-full bg-white px-1"
                  >
                    {cartQuantity}
                  </div>
                </div>
              </Button>
            </Link>
          )}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon style={{ width: "35px", height: "35px" }} />
              </Button>
            </SheetTrigger>
            <SidebarSheetWrapper />
          </Sheet> */}
          <SidebarSheetWrapper />
        </div>
      </div>
    </>
  );
};

export default Header;
