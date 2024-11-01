import { SheetContent, SheetHeader } from "./ui/sheet";
import LeagueDropdown from "@/components/leagueDropown";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Product {
  id: string;
  productTitle: string;
  team: string;
}

interface SidebarSheetProps {
  productsByLeague: Record<string, Product[]>;
}

const SidebarSheet: React.FC<SidebarSheetProps> = ({ productsByLeague }) => {
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
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
