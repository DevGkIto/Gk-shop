"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import useProductStore from "./_stores/useProductStore";

interface Product {
  id: string;
  productTitle: string;
  team: string;
}

interface LeagueDropdownProps {
  league: string;
  teams: Product[];
}

const LeagueDropdown: React.FC<LeagueDropdownProps> = ({ league, teams }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { closeSheet } = useProductStore();

  const handleToggle = () => {
    console.log(uniqueTeams);
    setIsOpen((prevState) => !prevState);
  };

  const uniqueTeams = Array.from(new Set(teams.map((product) => product.team)));

  return (
    <div className="p-3 relative">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">{league}</h1>
        <button onClick={handleToggle} className="p-1">
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="bg-gray-100 absolute left-0 top-full w-full mt-1 shadow-lg z-10">
          <Link href={`/leagues/${league}`} onClick={closeSheet}>
            <div className="pl-6 py-2 text-lg hover:bg-gray-200 cursor-pointer">
              Todos da Liga
            </div>
          </Link>
          {uniqueTeams.map((team, index) => (
            <Link key={index} href={`/teams/${team}`} onClick={closeSheet}>
              <div className="pl-6 py-2 text-lg hover:bg-gray-200 cursor-pointer">
                {team}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeagueDropdown;
