import { SheetContent, SheetHeader } from "./ui/sheet";
import LeagueDropdown from "app/_components/leagueDropown";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleUserRound, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import CurrentUserCustom from "./CurrentUserCustom";
import SignOutCustom from "./SignOutCustom";

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
  const { userId } = await auth();
  return (
    <SheetContent className="p-0">
      <SheetHeader className="py-6">
        <DialogTitle className="sr-only">Product Categories</DialogTitle>{" "}
      </SheetHeader>
      <div>
        <h2 className="p-3 font-bold text-2xl">Início</h2>
        {Object.entries(productsByLeague).map(([league, teams]) => (
          <LeagueDropdown key={league} league={league} teams={teams} />
        ))}
        {userId ? (
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
