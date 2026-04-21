"use client";

import { addToCart } from "app/_actions/add-to-cart";
import useProductStore from "./_stores/useProductStore";
import CustomizationSelector from "./customizationSelector";
import ProductQuantity from "./productQuantity";
import ShirtSizes from "./shirtSizes";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: {
    id: string;
    productTitle: string;
    description: string;
    price: number;
    imageUrl: string;
    league: string;
    team: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userId: string | undefined;
}

const ProductDetails = ({ product, userId }: ProductProps) => {
  const shirtSize = useProductStore((state) => state.shirtSize);
  const productQuantity = useProductStore((state) => state.productQuantity);
  const customDescription = useProductStore((state) => state.customDescription);

  const setProductQuantity = useProductStore(
    (state) => state.setProductQuantity
  );
  const setShirtSize = useProductStore((state) => state.setShirtSize);
  const setCustomDescription = useProductStore(
    (state) => state.setCustomDescription
  );

  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        userId,
        productId: product.id,
        shirtSize,
        customDescription,
        productQuantity,
      });

      toast.success("Adicionado ao carrinho com sucesso!");
      setProductQuantity(1);
      setShirtSize("");
      setCustomDescription("");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Erro ao adicionar ao carrinho. Tente novamente.");
    }
  };

  return (
    <Card className="overflow-hidden border-none bg-white shadow-md">
      <CardContent className="flex flex-col p-0 lg:flex-row">
        <div className="relative h-[400px] bg-zinc-50 md:h-[500px] lg:h-[600px] lg:flex-1">
          <Image
            alt={product.productTitle || "Product image"}
            src={product.imageUrl || "/GKlogo.svg"}
            fill
            className="object-contain p-6 lg:p-12"
            priority
          />
        </div>

        <div className="flex flex-col gap-8 p-8 lg:flex-1 lg:justify-center lg:px-16">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              {product.team}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 lg:text-4xl">
              {product.productTitle}
            </h1>
            <p className="text-2xl font-black text-zinc-900">
              R${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Tamanho
            </p>
            <div className="flex flex-wrap gap-2">
              <ShirtSizes />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Personalização
            </p>
            <CustomizationSelector />
          </div>

          <div className="flex w-full flex-col items-center gap-4 pt-6 sm:flex-row">
            <ProductQuantity />
            {shirtSize !== "" && (
              <Button
                className="w-full rounded-none bg-zinc-900 py-8 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-black sm:flex-1"
                size="lg"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
