import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "app/_components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  productTitle: string;
  description: string;
  price: number;
  imageUrl: string;
  league: string;
  team: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductItemProps {
  product: Product;
}
const ProductItem: React.FC<ProductItemProps> = async ({ product }) => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <Link href={`/products/${product.id}`}>
          <Card className="max-w-[200px] overflow-hidden flex flex-col justify-between">
            <CardContent className="p-0 flex flex-col justify-between h-full">
              <div className="relative h-[200px] w-full border-b-2 border-b-amber-300 overflow-hidden">
                <Image
                  alt={product.productTitle}
                  src={product.imageUrl}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="flex flex-col items-center gap-1 py-3">
                <p className="text-xs text-center h-[30px]">
                  {product.productTitle}
                </p>
                <p className="font-semibold">R${product.price.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Link href="/login">
          <Card className="max-w-[200px] overflow-hidden flex flex-col justify-between">
            <CardContent className="p-0 flex flex-col justify-between h-full">
              <div className="relative h-[200px] w-full border-b-2 border-b-amber-300 overflow-hidden">
                <Image
                  alt={product.productTitle}
                  src={product.imageUrl}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="flex flex-col items-center gap-1 py-3">
                <p className="text-xs text-center h-[30px]">
                  {product.productTitle}
                </p>
                <p className="font-semibold">R${product.price.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </>
  );
};

export default ProductItem;
