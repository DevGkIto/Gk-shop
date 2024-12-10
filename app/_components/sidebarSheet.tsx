"use client";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import LeagueDropdown from "app/_components/leagueDropown";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleUserRound, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";
import CurrentUserCustom from "./currentUserCustom";
import SignOutCustom from "./signOutCustom";
import Link from "next/link";
import useProductStore from "./_stores/useProductStore";

interface Product {
  id: string;
  productTitle: string;
  team: string;
}

interface SerializableUser {
  id: string;
}

interface SidebarSheetProps {
  productsByLeague: Record<string, Product[]>;
  user: SerializableUser | null;
}

const SidebarSheet: React.FC<SidebarSheetProps> = ({
  productsByLeague,
  user,
}) => {
  const { sheetOpen, openSheet, closeSheet } = useProductStore();
  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={(isOpen) => (isOpen ? openSheet() : closeSheet())}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon style={{ width: "35px", height: "35px" }} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="py-6">
          <DialogTitle className="sr-only">Product Categories</DialogTitle>{" "}
        </SheetHeader>
        <div>
          <Link href="/" onClick={closeSheet}>
            <h2 className="p-3 font-bold text-2xl">Início</h2>
          </Link>
          {Object.entries(productsByLeague).map(([league, teams]) => (
            <LeagueDropdown key={league} league={league} teams={teams} />
          ))}
          {user ? (
            <div className="absolute bottom-0 p-4 w-full flex justify-between">
              <CurrentUserCustom />
              <SignOutCustom />
            </div>
          ) : (
            <SignInButton>
              <Button
                className="absolute bottom-0 flex items-center w-full py-7"
                variant="outline"
              >
                <CircleUserRound style={{ width: "25px", height: "25px" }} />
                <h2 className="font-semibold">
                  Criar uma conta | Iniciar sessão
                </h2>
              </Button>
            </SignInButton>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
