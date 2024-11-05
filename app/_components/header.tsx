import Link from "next/link";
import { Button } from "app/_components/ui/button";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { MenuIcon, ShoppingBag } from "lucide-react";
import SidebarSheetWrapper from "app/_components/sidebarSheetWrapper";

const Header = () => {
  return (
    <>
      <div className="bg-[#331D1D] flex justify-center">
        <p className="text-white font-semibold">
          Promoção de 25% acaba em 23:59:59
        </p>
      </div>
      <div className="bg-[#9F3434] flex h-[71px] items-center justify-between">
        <div>
          <Link href="/">
            <img src="/GKlogo.svg" className="w-[70px] h-[60px]" />
          </Link>
        </div>
        <div className="relative">
          <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img src="/search.png" alt="Search" className="h-[20px] w-[20px]" />
          </button>
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="pl-10 p-2 rounded-3xl border-none focus:outline-none placeholder:text-sm"
          />
        </div>
        <div className="flex gap-3 mr-2 justify-center items-center">
          <Button variant="ghost" size="icon">
            <ShoppingBag style={{ width: "30px", height: "30px" }} />
          </Button>
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
