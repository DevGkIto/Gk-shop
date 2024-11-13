import Link from "next/link";
import { Button } from "app/_components/ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { MenuIcon, ShoppingBag } from "lucide-react";
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
  console.log(user?.id);

  const order = await db.order.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });

  const orderId = order ? order.id : null;
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
        <div className="flex gap-3 mr-2 justify-center items-center">
          {user && orderId && (
            <Link href={`cart/${orderId}`}>
              <Button variant="ghost" size="icon" asChild>
                <ShoppingBag style={{ width: "30px", height: "30px" }} />
              </Button>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon style={{ width: "35px", height: "35px" }} />
              </Button>
            </SheetTrigger>
            <SidebarSheetWrapper />
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Header;
