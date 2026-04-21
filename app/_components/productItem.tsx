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
  const href = user ? `/products/${product.id}` : "/login";

  return (
    <Link href={href} className="group block h-full outline-none">
      <Card className="flex h-full flex-col overflow-hidden border-none shadow-sm transition-all duration-300 hover:ring-2 hover:ring-gray-200">
        <CardContent className="flex h-full flex-col p-0">
          <div className="relative aspect-square w-full bg-zinc-50">
            <Image
              alt={product.productTitle}
              src={product.imageUrl}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-1 flex-col items-center justify-between gap-2 bg-white p-4">
            <div className="space-y-1 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {product.team}
              </p>
              <p className="line-clamp-2 text-xs font-semibold text-zinc-900 md:text-sm">
                {product.productTitle}
              </p>
            </div>

            <p className="text-sm font-black text-zinc-900 md:text-lg">
              R${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
