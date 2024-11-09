"use client";

import CustomizationSelector from "./customizationSelector";
import ProductQuantity from "./productQuantity";
import ShirtSizes from "./shirtSizes";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

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
}

const ProductDetails = ({ product }: ProductProps) => {
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
            <div className="flex justify-between w-full">
              <ProductQuantity />
              <button className="px-5 font-bold text-white text-sm bg-amber-600 rounded-3xl">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetails;
