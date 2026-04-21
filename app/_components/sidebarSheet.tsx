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
        <Button
          variant="ghost"
          className="flex h-8 w-8 items-center justify-center p-5"
        >
          <MenuIcon className="!h-8 !w-8 text-white" strokeWidth={1.2} />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[85vw] p-0 sm:max-w-[400px]">
        <SheetHeader className="py-6">
          <DialogTitle className="sr-only">Product Categories</DialogTitle>
        </SheetHeader>

        <div className="flex h-full flex-col overflow-y-auto pb-24">
          <Link href="/" onClick={closeSheet}>
            <h2 className="p-3 text-2xl font-bold">Início</h2>
          </Link>

          {Object.entries(productsByLeague).map(([league, teams]) => (
            <LeagueDropdown key={league} league={league} teams={teams} />
          ))}

          {user ? (
            <div className="absolute bottom-0 flex w-full justify-between border-t bg-background p-4">
              <CurrentUserCustom />
              <SignOutCustom />
            </div>
          ) : (
            <SignInButton>
              <Button
                className="absolute bottom-0 flex w-full items-center border-t py-8"
                variant="outline"
              >
                <CircleUserRound className="mr-2 h-6 w-6" />
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
