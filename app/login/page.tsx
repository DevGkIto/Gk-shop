import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = async () => {
  const user = await currentUser();
  if (user) {
    redirect("/");
  }
  return (
    <Card className="m-4">
      <CardContent className="rounded-lg bg-zinc-900 p-0">
        <div className="mx-auto flex max-w-[550px] flex-col items-center justify-center py-10">
          <div className="relative">
            <Image
              src="/GKlogo.svg"
              width={173}
              height={39}
              alt="Finance AI"
              className="mb-8"
            />
          </div>
          <div className="p-4">
            <h1 className="mb-3 text-center text-4xl font-bold text-white">
              Bem-vindo
            </h1>
            <p className="mb-8 text-white">
              Bem-vindo a Gk store, faça o login ou crie sua conta para
              adicionar ao carrinho. Aqui você encontra as camisas das
              principais ligas do mundo!
            </p>
          </div>
          <SignInButton>
            <Button variant="outline">
              <LogInIcon className="mr-2" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
