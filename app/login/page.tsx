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
      <CardContent className="bg-[#9F3434] rounded-lg p-0">
        <div className="mx-auto flex max-w-[550px] flex-col justify-center py-10 items-center">
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
            <h1 className="mb-3 text-white text-4xl font-bold text-center">
              Bem-vindo
            </h1>
            <p className="mb-8 text-white">
              A Finance AI é uma plataforma de gestão financeira que utiliza IA
              para monitorar suas movimentações, e oferecer insights
              personalizados, facilitando o controle do seu orçamento.
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