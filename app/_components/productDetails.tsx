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
  const { shirtSize, productQuantity, customDescription } = useProductStore();

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
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };
  return (
    <>
      <Card className="bg-gray-100">
        <CardContent className="p-0">
          <div className="relative h-[450px]">
            <Image
              alt={product.productTitle || "Product image"}
              src={product.imageUrl || "GKlogo.svg"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col gap-2 items-start">
            <h1>{product.productTitle}</h1>
            <p className="font-semibold">R${product.price.toFixed(2)}</p>
            <p className="text-md">Tamanho:</p>
            <div className="flex gap-2">
              <ShirtSizes />
            </div>
            <p>Personalização:</p>
            <CustomizationSelector />
            <div className="flex justify-between w-full items-center">
              <ProductQuantity />
              {shirtSize !== "" && (
                <Button
                  className="bg-amber-600"
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
    </>
  );
};

export default ProductDetails;
