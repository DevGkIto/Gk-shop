import { SheetContent, SheetHeader } from "./ui/sheet";
import LeagueDropdown from "app/_components/leagueDropown";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import CurrentUserCustom from "./currentUserCustom";
import SignOutCustom from "./signOutCustom";
import Link from "next/link";

interface Product {
  id: string;
  productTitle: string;
  team: string;
}

interface SidebarSheetProps {
  productsByLeague: Record<string, Product[]>;
}

const SidebarSheet: React.FC<SidebarSheetProps> = async ({
  productsByLeague,
}) => {
  const user = await currentUser();
  return (
    <SheetContent className="p-0">
      <SheetHeader className="py-6">
        <DialogTitle className="sr-only">Product Categories</DialogTitle>{" "}
      </SheetHeader>
      <div>
        <Link href="/">
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
  );
};

export default SidebarSheet;
