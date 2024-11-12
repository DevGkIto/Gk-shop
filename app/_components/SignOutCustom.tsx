"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignOutCustom = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      <LogOut />
    </Button>
  );
};

export default SignOutCustom;
